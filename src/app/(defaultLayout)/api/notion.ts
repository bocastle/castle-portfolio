import { Client } from "@notionhq/client";

export const notionDatabase = new Client({
  auth: process.env.NEXT_PUBLIC_NOTION_SECRET,
});
