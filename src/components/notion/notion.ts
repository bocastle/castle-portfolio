import { Client } from "@notionhq/client";

console.log(
  "process.env.NEXT_PUBLIC_NOTION_SECRET111",
  process.env.NEXT_PUBLIC_NOTION_SECRET
);
export const notionDatabase = new Client({
  auth: process.env.NEXT_PUBLIC_NOTION_SECRET,
});

// export const notion = new NotionAPI();

// export async function getData(rootPageId: string) {
//   return await notion.getPage(rootPageId);
// }
