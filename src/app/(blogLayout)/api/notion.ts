import { ARTICLE_CONTENT, ARTICLE_HEADER } from "@/constants/cache-key";
import {
  GetBlockResponse,
  ImageBlockObjectResponse,
  ListBlockChildrenResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { unstable_cache } from "next/cache";
import { getPlaiceholder } from "plaiceholder";
import { cache } from "react";
import {
  NotionDataBaseMetaDataAdapter,
  NotionPageAdapter,
  NotionPageListAdapter,
} from "../utils/adapter";
import { n2m, notionDatabase } from "./clients";
import { cloudinaryApi } from "./cloudinary";
import {
  AllArticle,
  ArticlePageHeaderDataWithBlur,
  DataBaseMetaDataResponse,
  FileImageBlock,
  QueryPageResponse,
} from "./types";

/**
 * 게시글 목록을 조회해오는 함수
 */
export const getPageList = cache(async (): Promise<AllArticle[]> => {
  const queryResponse = await notionDatabase.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    filter: {
      and: [
        {
          property: "releasable",
          checkbox: {
            equals: true,
          },
        },
      ],
    },
    sorts: [
      {
        property: "createdAt",
        direction: "descending",
      },
    ],
  });
  // console.log("queryResponse.results", queryResponse.results);
  const convertedAllArticleList = new NotionPageListAdapter(
    queryResponse.results as Array<QueryPageResponse>
  ).convertToAllArticleList();
  return Promise.all(
    convertedAllArticleList.map(async ({ thumbnailUrl, pageId, ...rest }) => {
      const convertedThumbnailUrl = await cloudinaryApi.convertToPermanentImage(
        thumbnailUrl,
        `${pageId}_thumbnail`
      );

      return {
        ...rest,
        pageId,
        thumbnailUrl: convertedThumbnailUrl,
        blurDataUrl: await fetchBlurDataUrl(convertedThumbnailUrl),
      };
    })
  );
  // return Promise.all(
  //   convertedAllArticleList.map(async ({ thumbnailUrl, pageId, ...rest }) => {
  //     return {
  //       ...rest,
  //       pageId,
  //       thumbnailUrl: thumbnailUrl,
  //     };
  //   })
  // );
});

/**
 * article tag 목록을 조회해오는 함수
 */
export const getArticleTagList = cache(async () => {
  const metaDataResponse = await notionDatabase.databases.retrieve({
    database_id: process.env.NOTION_DATABASE_ID!,
  });

  return new NotionDataBaseMetaDataAdapter(
    metaDataResponse as unknown as DataBaseMetaDataResponse
  )
    .convertToTagList()
    .sort((tag1, tag2) => (tag1.name > tag2.name ? 1 : -1));
});
/**
 * thumbnailUrl을 blurdataUrl로 변환하는 함수
 */
export const fetchBlurDataUrl = async (thumbnailUrl: string) => {
  try {
    const buffer = await fetch(thumbnailUrl, {
      cache: process.env.NODE_ENV === "development" ? "no-cache" : "default",
    }).then(async (res) => Buffer.from(await res.arrayBuffer()));
    const { base64 } = await getPlaiceholder(buffer);
    return base64;
  } catch (err) {
    return thumbnailUrl;
  }
};
/**
 * 해당 아티클 페이지의 header 부분의 데이터를 불러오는 함수
 */
export const getArticlePageHeaderData = (pageId: string) => {
  const cacheKey = ARTICLE_HEADER(pageId);

  return unstable_cache(
    async (pageId: string): Promise<ArticlePageHeaderDataWithBlur> => {
      const pageResponse = await notionDatabase.pages.retrieve({
        page_id: pageId,
      });

      const { thumbnailUrl, ...rest } = new NotionPageAdapter(
        pageResponse as QueryPageResponse
      ).convertToArticlePageHeaderData();

      return {
        ...rest,
        thumbnailUrl: thumbnailUrl,
        blurDataUrl: await fetchBlurDataUrl(thumbnailUrl),
      };
    },
    [cacheKey],
    {
      tags: [cacheKey],
      revalidate: 60,
    }
  )(pageId);
};

/**
 * 해당 아티클 페이지의 모든 block들을 불러오는 함수
 */
export const fetchAllBlocksInPage = cache(
  async (blockOrPageId: string): Promise<GetBlockResponse[]> => {
    let hasMore = true;
    let nextCursor: string | null = null;
    const blocks: GetBlockResponse[] = [];
    while (hasMore) {
      const result: ListBlockChildrenResponse =
        await notionDatabase.blocks.children.list({
          block_id: blockOrPageId,
          start_cursor: nextCursor ?? undefined,
        });

      blocks.push(...result.results);
      hasMore = result.has_more;
      nextCursor = result.next_cursor;

      if (hasMore) {
        console.log("load more blocks in page...");
      }
    }

    // nested block(ex - toggle block) 불러오기
    const childBlocks = await Promise.all(
      blocks
        .filter((block) => "has_children" in block && block.has_children)
        .map(async (block) => {
          const childBlocks = await fetchAllBlocksInPage(block.id);
          return childBlocks;
        })
    );

    return [...blocks, ...childBlocks.flat()];
  }
);
/**
 * 해당 아티클 페이지의 모든 image block들을 불러오는 함수
 */
export const fetchAllImageBlocksInPage = cache(async (pageId: string) => {
  const allBlocks = await fetchAllBlocksInPage(pageId);
  return allBlocks.filter(
    (block) => "type" in block && block.type === "image"
  ) as ImageBlockObjectResponse[];
});

/**
 * 페이지 내의 image 블락들을 불러들여 파싱 진행
 */
export const updateImageBlocks = async (pageId: string) => {
  const allImageBlocks = await fetchAllImageBlocksInPage(pageId);

  for (const [index, imageBlock] of allImageBlocks.entries()) {
    const { image, id: blockId } = imageBlock;
    // notion에 직접 업로드된 이미지 파일들만 cloudinary에 업로드하여 변환
    if ("type" in image && image.type === "file") {
      const convertedImageUrl = await cloudinaryApi.convertToPermanentImage(
        (image as FileImageBlock).file.url,
        `${pageId}_imageblock_${index + 1}`
      );
      await notionDatabase.blocks.update({
        block_id: blockId,
        image: {
          external: {
            url: convertedImageUrl,
          },
        },
      });
    }
  }
};

/**
 * 해당 아티클 페이지의 content 부분의 데이터를 불러오는 함수
 */
export const fetchArticlePageContent = (pageId: string) => {
  const cacheKey = ARTICLE_CONTENT(pageId);

  return unstable_cache(
    async (pageId: string) => {
      await updateImageBlocks(pageId);

      const mdBlocks = await n2m.pageToMarkdown(pageId);
      return n2m.toMarkdownString(mdBlocks);
    },
    [cacheKey],
    {
      tags: [cacheKey],
      revalidate: 60,
    }
  )(pageId);
};
