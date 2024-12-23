import { ARTICLE_HEADER } from "@/constants/cache-key";
import { Client } from "@notionhq/client";
import { unstable_cache } from "next/cache";
import { NotionAPI } from "notion-client";
import { getPlaiceholder } from "plaiceholder";
import { cache } from "react";
import {
  NotionDataBaseMetaDataAdapter,
  NotionPageAdapter,
  NotionPageListAdapter,
} from "../utils/adapter";
import { cloudinaryApi } from "./cloudinary";
import {
  AllArticle,
  ArticlePageHeaderDataWithBlur,
  DataBaseMetaDataResponse,
  QueryPageResponse,
} from "./types";
export const notionDatabase = new Client({
  auth: process.env.NOTION_SECRET,
});

export const notion = new NotionAPI();

export async function getData(rootPageId: string) {
  return await notion.getPage(rootPageId);
}

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
    }
  )(pageId);
};
