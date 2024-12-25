import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import "server-only";

export const notionDatabase = new Client({
  auth: process.env.NOTION_SECRET!,
});

export const n2m = new NotionToMarkdown({
  notionClient: notionDatabase,
  // config: {
  //   parseChildPages: false,
  // },
});
