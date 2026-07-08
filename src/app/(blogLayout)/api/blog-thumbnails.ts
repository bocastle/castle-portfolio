type ThumbnailOwner = {
  thumbnailUrl: string;
  blurDataUrl?: string;
};

const GENERATED_BLOG_THUMBNAILS = {
  "github-fullstack-service-ops":
    "/images/blog/generated/github-fullstack-service-ops.webp",
  "github-codex-portfolio-qa":
    "/images/blog/generated/github-codex-portfolio-qa.webp",
  "logs-cicd-pipeline": "/images/blog/generated/logs-cicd-pipeline.webp",
  "logs-api-gateway": "/images/blog/generated/logs-api-gateway.webp",
  "logs-cors": "/images/blog/generated/logs-cors.webp",
  "logs-db-replication": "/images/blog/generated/logs-db-replication.webp",
  "logs-jpa-n-plus-one": "/images/blog/generated/logs-jpa-n-plus-one.webp",
  "logs-database-index": "/images/blog/generated/logs-database-index.webp",
  "logs-spring-transaction-aop":
    "/images/blog/generated/logs-spring-transaction-aop.webp",
  "logs-external-service-failure":
    "/images/blog/generated/logs-external-service-failure.webp",
  "logs-rate-limiting": "/images/blog/generated/logs-rate-limiting.webp",
  "logs-optimistic-pessimistic-lock":
    "/images/blog/generated/logs-optimistic-pessimistic-lock.webp",
  "logs-spring-next-cache":
    "/images/blog/generated/logs-spring-next-cache.webp",
  "logs-react-query-server-state":
    "/images/blog/generated/logs-react-query-server-state.webp",
  "logs-ssr-csr": "/images/blog/generated/logs-ssr-csr.webp",
  "logs-browser-rendering": "/images/blog/generated/logs-browser-rendering.webp",
  "logs-react-error-boundary":
    "/images/blog/generated/logs-react-error-boundary.webp",
  "logs-nextjs-architecture":
    "/images/blog/generated/logs-nextjs-architecture.webp",
  "logs-web-accessibility": "/images/blog/generated/logs-web-accessibility.webp",
  "logs-zendesk-i18n-js": "/images/blog/generated/logs-zendesk-i18n-js.webp",
  "logs-testable-code": "/images/blog/generated/logs-testable-code.webp",
  "logs-async-mutex": "/images/blog/generated/logs-async-mutex.webp",
  "logs-goroutine": "/images/blog/generated/logs-goroutine.webp",
} as const;

export type GeneratedBlogThumbnailPageId =
  keyof typeof GENERATED_BLOG_THUMBNAILS;

export const getGeneratedBlogThumbnailUrl = (pageId: string) =>
  GENERATED_BLOG_THUMBNAILS[pageId as GeneratedBlogThumbnailPageId];

export const withGeneratedBlogThumbnailForPageId = <T extends ThumbnailOwner>(
  pageId: string,
  item: T
): T => {
  const thumbnailUrl = getGeneratedBlogThumbnailUrl(pageId);

  if (!thumbnailUrl) {
    return item;
  }

  return {
    ...item,
    thumbnailUrl,
    ...("blurDataUrl" in item ? { blurDataUrl: thumbnailUrl } : {}),
  } as T;
};

export const withGeneratedBlogThumbnail = <
  T extends ThumbnailOwner & { pageId: string },
>(
  item: T
) => withGeneratedBlogThumbnailForPageId(item.pageId, item);
