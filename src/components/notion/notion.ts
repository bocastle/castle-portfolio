import { Client } from "@notionhq/client";

export const notionDatabase = new Client({
  auth: process.env.NOTION_SECRET,
});

// export const notion = new NotionAPI();

// export async function getData(rootPageId: string) {
//   return await notion.getPage(rootPageId);
// }
