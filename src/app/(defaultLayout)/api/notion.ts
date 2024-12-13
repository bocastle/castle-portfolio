import { Client } from "@notionhq/client";

export const notionDatabase = new Client({
  auth: process.env.NOTION_SECRET,
});
