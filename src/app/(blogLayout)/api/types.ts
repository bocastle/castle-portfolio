import {
  DatabaseObjectResponse,
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
    ID: {
      type: "unique_id";
      unique_id: {
        prefix: string | null;
        /** 데이터베이스 상에서 자동으로 부여되는 ID */
        number: number;
      };
      id: string;
    };
    category: {
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
        description: string | null;
      }>;
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
      type: "created_time";
      created_time: string;
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

/** 게시글 카테고리 */
export interface BlogCategory {
  id: string;
  name: string;
  description: string | null;
}

export interface DataBaseCategoryResponse
  extends Omit<DatabaseObjectResponse, "properties"> {
  properties: {
    category: {
      type: "multi_select";
      multi_select: {
        options: Array<{
          id: string;
          name: string;
          description: string | null;
        }>;
      };
      id: string;
      name: string;
    };
  };
}

/** 게시글 태그 */
export interface BlogTag {
  id: string;
  name: string;
}
export interface DataBaseMetaDataResponse
  extends Omit<DatabaseObjectResponse, "properties"> {
  properties: {
    tags: {
      type: "multi_select";
      multi_select: {
        options: Array<{
          id: string;
          name: string;
          description: string | null;
        }>;
      };
      id: string;
      name: string;
    };
  };
}

export interface ArticlePageHeaderData {
  /** 게시글 제목 */
  title: string;
  /** 게시글 요약 설명 */
  description: string;
  /** 게시글 카테고리 목록 */
  categoryList: BlogCategory[];
  /** 게시글 태그 목록 */
  tagList: BlogTag[];
  /** 게시글 생성 일자*/
  createdAt: Date;
  /** 게시글 썸네일 url */
  thumbnailUrl: string;
}
export interface ArticlePageHeaderDataWithBlur extends ArticlePageHeaderData {
  blurDataUrl: string;
}
/** 모든 게시글 항목에 있는 게시글 */
export interface AllArticle {
  /** notion database id property */
  id: number;
  /** 게시글 제목 */
  title: string;
  /** 게시글 카테고리 목록 */
  categoryList: BlogCategory[];
  /** 게시글 태그 목록 */
  tagList: BlogTag[];
  /** 게시글 생성 일자*/
  createdAt: Date;
  /** 게시글 수정 일자*/
  updatedAt: Date;
  /** 게시글 썸네일 url */
  thumbnailUrl: string;
  /** queried notion page id */
  pageId: string;
}

export interface ArticleLinkerData {
  pageId: AllArticle["pageId"];
  title: AllArticle["title"];
}

// 추천 게시글
export interface FeaturedArticle {
  /** notion database id property */
  id: number;
  /** 게시글 제목 */
  title: string;
  /** 게시글 description */
  description: string;
  /** 게시글 생성 일자*/
  createdAt: Date;
  /** 게시글 수정 일자*/
  updatedAt: Date;
  /** 게시글 썸네일 url */
  thumbnailUrl: string;
  /** queried notion page id */
  pageId: string;
}

export interface FeaturedArticleWithBlur extends FeaturedArticle {
  /** blurData url */
  blurDataUrl: string;
}

// 모든 게시글
export interface AllArticle {
  /** notion database id property */
  id: number;
  /** 게시글 제목 */
  title: string;
  /** 게시글 카테고리 목록 */
  categoryList: BlogCategory[];
  /** 게시글 태그 목록 */
  tagList: BlogTag[];
  /** 게시글 생성 일자*/
  createdAt: Date;
  /** 게시글 썸네일 url */
  thumbnailUrl: string;
  /** queried notion page id */
  pageId: string;
}

export interface AllArticleWithBlur extends AllArticle {
  /** blurData url */
  blurDataUrl: string;
}

export type FileImageBlock = {
  type: "file";
  file: {
    url: string;
  };
};
export interface ArticlePageFooterData {
  prevArticle?: ArticleLinkerData;
  nextArticle?: ArticleLinkerData;
}

// 카테고리 선택
export interface ArticleCategoryProps {
  /* 게시글 카테고리 */
  categoryName: string;
}
