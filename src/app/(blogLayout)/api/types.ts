import {
  PageObjectResponse,
  TextRichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints";

export interface blogList {
  cover: string | null;
  id: string;
  name: string;
  created_time: string;
}

export interface QueryPageResponse
  extends Omit<PageObjectResponse, "properties"> {
  properties: {
    id: {
      type: "unique_id";
      unique_id: {
        prefix: string | null;
        /** 데이터베이스 상에서 자동으로 부여되는 ID */
        number: number;
      };
      id: string;
    };
    name: {
      type: "title";
      title: Array<TextRichTextItemResponse>;
      id: string;
    };
    description: {
      type: "rich_text";
      rich_text: Array<TextRichTextItemResponse>;
      id: string;
    };
    tags: {
      type: "multi_select";
      multi_select: Array<{
        id: string;
        name: string;
        color:
          | "default"
          | "gray"
          | "brown"
          | "orange"
          | "yellow"
          | "green"
          | "blue"
          | "purple"
          | "pink"
          | "red";
      }>;
      id: string;
    };
    featured: {
      type: "checkbox";
      checkbox: boolean;
      id: string;
    };
    createdAt: {
      type: "date";
      date: {
        start: string;
        end: string | null;
      } | null;
      id: string;
    };
    updatedAt: {
      type: "last_edited_time";
      last_edited_time: string;
      id: string;
    };
    thumbnail: {
      type: "files";
      files: Array<{
        id: string;
        file: {
          url: string;
          expiry_time: string;
        };
        name: string;
        type?: "file";
      }>;
    };
    releasable: { type: "checkbox"; checkbox: boolean; id: string };
    prevArticleId: {
      type: "number";
      number: number;
    };
    nextArticleId: {
      type: "number";
      number: number;
    };
  };
}
