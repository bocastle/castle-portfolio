export type BlogTocItem = {
  depth: 2 | 3;
  id: string;
  title: string;
};

export const createHeadingSlugger = () => {
  const usedSlugs = new Map<string, number>();

  return (value: string) => {
    const baseSlug = toHeadingSlug(value);
    const count = usedSlugs.get(baseSlug) ?? 0;
    usedSlugs.set(baseSlug, count + 1);

    return count === 0 ? baseSlug : `${baseSlug}-${count}`;
  };
};

export const extractBlogTocItems = (content: string): BlogTocItem[] => {
  const slug = createHeadingSlugger();
  const items: BlogTocItem[] = [];
  let isInCodeBlock = false;

  content.split(/\r?\n/).forEach((line) => {
    if (line.trim().startsWith("```")) {
      isInCodeBlock = !isInCodeBlock;
      return;
    }

    if (isInCodeBlock) {
      return;
    }

    const match = /^(#{2,3})\s+(.+?)\s*#*$/.exec(line.trim());
    if (!match) {
      return;
    }

    const title = stripMarkdownInlineSyntax(match[2] ?? "");
    if (title.length === 0) {
      return;
    }

    items.push({
      depth: match[1]?.length === 3 ? 3 : 2,
      id: slug(title),
      title,
    });
  });

  return items;
};

const toHeadingSlug = (value: string) => {
  const slug = value
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  return slug.length > 0 ? slug : "section";
};

const stripMarkdownInlineSyntax = (value: string) =>
  value
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/__([^_]+)__/g, "$1")
    .replace(/_([^_]+)_/g, "$1")
    .replace(/\[([^\]]+)]\([^)]+\)/g, "$1")
    .trim();
