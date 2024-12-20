import { ARTICLE_HEADER } from "@/constants/cache-key";
import { Client } from "@notionhq/client";
import { unstable_cache } from "next/cache";
import { NotionAPI } from "notion-client";
import { getPlaiceholder } from "plaiceholder";
import { cache } from "react";
import {
  NotionDataBaseMetaDataAdapter,
  NotionPageAdapter,
} from "../utils/adapter";
import {
  ArticlePageHeaderDataWithBlur,
  blogList,
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

export const getPageList = cache(async (): Promise<any[]> => {
  let db;
  try {
    if (!process.env.NOTION_DATABASE_ID) {
      throw new Error("데이터베이스 아이디가 없습니다.");
    }
    db = await notionDatabase.databases.query({
      database_id: process.env.NOTION_DATABASE_ID,
      filter: {
        // 필터 추가
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
          property: "createdAt", // 정렬의 기준이 될 데이터베이스 속성
          direction: "descending", // 내림차순 : descending, 오름차순 : ascending
        },
      ],
    });
  } catch (error) {
    console.error("error:::::", error);
  }
  console.log("db?.results", db?.results);
  let data = db?.results as Array<QueryPageResponse>;

  let pageList: Array<blogList> = [];
  data.map((item, index) => {
    pageList.push({
      cover: null,
      created_time: item.created_time,
      id: item.id,
      name: item.properties.name.title[0].plain_text,
    });
  });
  return pageList;
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
