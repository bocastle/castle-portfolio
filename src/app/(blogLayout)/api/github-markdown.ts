import fs from "fs/promises";
import path from "path";
import {
  AllArticle,
  ArticleCategoryProps,
  ArticlePageFooterData,
  ArticlePageHeaderDataWithBlur,
  BlogCategory,
  BlogTag,
} from "./types";

const GITHUB_PAGE_ID_PREFIX = "github-";
const DEFAULT_THUMBNAIL_URL = "https://i.ibb.co/7nxjpqB/image.png";
const DEFAULT_BLUR_DATA_URL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg==";

type MarkdownFrontmatter = {
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  category: string[];
  tags: string[];
  thumbnailUrl: string;
  releasable: boolean;
};

type MarkdownArticleRecord = {
  body: string;
  fileSlug: string;
  frontmatter: MarkdownFrontmatter;
};

const getMarkdownBlogDirectory = () =>
  process.env.GITHUB_MARKDOWN_BLOG_DIR ??
  path.join(process.cwd(), "public", "markdown", "blog");

const isReadableDirectory = async (directory: string) => {
  try {
    const stat = await fs.stat(directory);
    return stat.isDirectory();
  } catch {
    return false;
  }
};

const readMarkdownArticleRecords = async (): Promise<MarkdownArticleRecord[]> => {
  const directory = getMarkdownBlogDirectory();
  if (!(await isReadableDirectory(directory))) {
    return [];
  }

  const entries = await fs.readdir(directory, { withFileTypes: true });
  const markdownFiles = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
    .sort((left, right) => left.name.localeCompare(right.name));

  const records = await Promise.all(
    markdownFiles.map(async (entry) => {
      const filePath = path.join(directory, entry.name);
      const raw = await fs.readFile(filePath, "utf8");
      const parsed = parseMarkdownWithFrontmatter(raw);
      const fileSlug = entry.name.replace(/\.md$/, "");
      return parsed ? { ...parsed, fileSlug } : undefined;
    })
  );

  return records
    .filter((record): record is MarkdownArticleRecord => Boolean(record))
    .filter((record) => record.frontmatter.releasable)
    .sort(
      (left, right) =>
        new Date(right.frontmatter.createdAt).getTime() -
        new Date(left.frontmatter.createdAt).getTime()
    );
};

const parseMarkdownWithFrontmatter = (
  raw: string
): Omit<MarkdownArticleRecord, "fileSlug"> | undefined => {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/m.exec(raw);
  if (!match) {
    return undefined;
  }

  const parsed = parseFrontmatterBlock(match[1] ?? "");
  const title = toRequiredString(parsed.title);
  const createdAt = toRequiredString(parsed.createdAt);

  if (!title || !createdAt) {
    return undefined;
  }

  return {
    body: match[2] ?? "",
    frontmatter: {
      title,
      description: toRequiredString(parsed.description),
      createdAt,
      updatedAt: toRequiredString(parsed.updatedAt) || createdAt,
      category: toStringArray(parsed.category),
      tags: toStringArray(parsed.tags),
      thumbnailUrl:
        toRequiredString(parsed.thumbnailUrl) || DEFAULT_THUMBNAIL_URL,
      releasable: toBoolean(parsed.releasable, true),
    },
  };
};

const parseFrontmatterBlock = (block: string) => {
  const result: Record<string, unknown> = {};
  const lines = block.split(/\r?\n/);
  let currentArrayKey: string | undefined;

  lines.forEach((line) => {
    if (!line.trim()) {
      return;
    }

    const arrayItemMatch = /^\s*-\s+(.+)$/.exec(line);
    if (arrayItemMatch && currentArrayKey) {
      const currentValue = result[currentArrayKey];
      const list = Array.isArray(currentValue) ? currentValue : [];
      result[currentArrayKey] = [...list, parseScalarValue(arrayItemMatch[1])];
      return;
    }

    const keyValueMatch = /^([A-Za-z][A-Za-z0-9_-]*):\s*(.*)$/.exec(line);
    if (!keyValueMatch) {
      currentArrayKey = undefined;
      return;
    }

    const [, key, rawValue] = keyValueMatch;
    if (!key) {
      return;
    }

    if (!rawValue) {
      result[key] = [];
      currentArrayKey = key;
      return;
    }

    result[key] = parseScalarValue(rawValue);
    currentArrayKey = undefined;
  });

  return result;
};

const parseScalarValue = (rawValue: string) => {
  const value = rawValue.trim();

  if (value === "true") {
    return true;
  }

  if (value === "false") {
    return false;
  }

  if (value.startsWith("[") && value.endsWith("]")) {
    return value
      .slice(1, -1)
      .split(",")
      .map((item) => stripQuotes(item.trim()))
      .filter(Boolean);
  }

  return stripQuotes(value);
};

const stripQuotes = (value: string) =>
  value.replace(/^['"]/, "").replace(/['"]$/, "");

const toRequiredString = (value: unknown) =>
  typeof value === "string" ? value.trim() : "";

const toStringArray = (value: unknown) =>
  Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : [];

const toBoolean = (value: unknown, defaultValue: boolean) =>
  typeof value === "boolean" ? value : defaultValue;

const toSafeSlug = (value: string) => {
  const slug = value
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  return slug || "article";
};

const toTokenId = (prefix: string, name: string) =>
  `${prefix}-${toSafeSlug(name)}`;

const toArticleNumericId = (pageId: string) =>
  pageId.split("").reduce((hash, char) => hash + char.charCodeAt(0), 0);

const toPageId = (fileSlug: string) =>
  fileSlug.startsWith(GITHUB_PAGE_ID_PREFIX)
    ? fileSlug
    : `${GITHUB_PAGE_ID_PREFIX}${toSafeSlug(fileSlug)}`;

const toCategory = (name: string): BlogCategory => ({
  id: toTokenId("github-category", name),
  name,
  description: null,
});

const toTag = (name: string): BlogTag => ({
  id: toTokenId("github-tag", name),
  name,
});

const toAllArticle = (record: MarkdownArticleRecord): AllArticle => {
  const pageId = toPageId(record.fileSlug);

  return {
    id: toArticleNumericId(pageId),
    title: record.frontmatter.title,
    categoryList: record.frontmatter.category.map(toCategory),
    tagList: record.frontmatter.tags.map(toTag),
    createdAt: new Date(record.frontmatter.createdAt),
    updatedAt: new Date(record.frontmatter.updatedAt),
    thumbnailUrl: record.frontmatter.thumbnailUrl,
    pageId,
    source: "github",
  };
};

const toArticleHeader = (
  record: MarkdownArticleRecord
): ArticlePageHeaderDataWithBlur => ({
  title: record.frontmatter.title,
  description: record.frontmatter.description,
  categoryList: record.frontmatter.category.map(toCategory),
  tagList: record.frontmatter.tags.map(toTag),
  createdAt: new Date(record.frontmatter.createdAt),
  thumbnailUrl: record.frontmatter.thumbnailUrl,
  blurDataUrl: DEFAULT_BLUR_DATA_URL,
  source: "github",
});

const findRecordByPageId = async (pageId: string) => {
  const records = await readMarkdownArticleRecords();
  const record = records.find((item) => toPageId(item.fileSlug) === pageId);

  if (!record) {
    throw new Error(`GitHub Markdown article not found: ${pageId}`);
  }

  return { record, records };
};

const uniqueByName = <T extends { name: string }>(items: T[]) =>
  Array.from(new Map(items.map((item) => [item.name, item])).values()).sort(
    (left, right) => (left.name > right.name ? 1 : -1)
  );

export const isGitHubMarkdownPageId = (pageId: string) =>
  pageId.startsWith(GITHUB_PAGE_ID_PREFIX);

export const getPageList = async (): Promise<AllArticle[]> =>
  (await readMarkdownArticleRecords()).map(toAllArticle);

export const getCategoryList = async ({
  categoryName,
}: ArticleCategoryProps): Promise<AllArticle[]> => {
  const list = await getPageList();

  if (!categoryName) {
    return list;
  }

  return list.filter((article) =>
    article.categoryList.some((category) => category.name === categoryName)
  );
};

export const getArticleCategoryList = async (): Promise<BlogCategory[]> => {
  const records = await readMarkdownArticleRecords();
  return uniqueByName(
    records.flatMap((record) => record.frontmatter.category.map(toCategory))
  );
};

export const getArticleTagList = async (): Promise<BlogTag[]> => {
  const records = await readMarkdownArticleRecords();
  return uniqueByName(
    records.flatMap((record) => record.frontmatter.tags.map(toTag))
  );
};

export const getArticlePageHeaderData = async (pageId: string) =>
  fetchArticlePageHeaderData(pageId);

export const fetchArticlePageHeaderData = async (pageId: string) => {
  const { record } = await findRecordByPageId(pageId);
  return toArticleHeader(record);
};

export const fetchArticlePageContent = async (pageId: string) => {
  const { record } = await findRecordByPageId(pageId);
  return { parent: record.body };
};

export const fetchArticlePageFooterData = async (
  pageId: string
): Promise<ArticlePageFooterData> => {
  const { records } = await findRecordByPageId(pageId);
  const articleList = records.map(toAllArticle);
  const index = articleList.findIndex((article) => article.pageId === pageId);

  return {
    prevArticle:
      index > 0
        ? {
            pageId: articleList[index - 1].pageId,
            title: articleList[index - 1].title,
          }
        : undefined,
    nextArticle:
      index >= 0 && index < articleList.length - 1
        ? {
            pageId: articleList[index + 1].pageId,
            title: articleList[index + 1].title,
          }
        : undefined,
  };
};
