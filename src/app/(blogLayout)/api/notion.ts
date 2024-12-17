import { Client } from "@notionhq/client";
import { NotionAPI } from "notion-client";
import { cache } from "react";
import { blogList, QueryPageResponse } from "./types";

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
