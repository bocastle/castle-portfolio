/**
 * @jest-environment node
 */
import {
  getGeneratedBlogThumbnailUrl,
  withGeneratedBlogThumbnail,
  withGeneratedBlogThumbnailForPageId,
} from "../src/app/(blogLayout)/api/blog-thumbnails";

describe("generated blog thumbnails", () => {
  it("returns permanent generated thumbnail URLs for selected page ids", () => {
    expect(getGeneratedBlogThumbnailUrl("logs-cicd-pipeline")).toBe(
      "/images/blog/generated/logs-cicd-pipeline.webp"
    );
    expect(getGeneratedBlogThumbnailUrl("logs-cors")).toBe(
      "/images/blog/generated/logs-cors.webp"
    );
    expect(getGeneratedBlogThumbnailUrl("logs-rate-limiting")).toBe(
      "/images/blog/generated/logs-rate-limiting.webp"
    );
    expect(getGeneratedBlogThumbnailUrl("logs-goroutine")).toBe(
      "/images/blog/generated/logs-goroutine.webp"
    );
    expect(getGeneratedBlogThumbnailUrl("github-fullstack-service-ops")).toBe(
      "/images/blog/generated/github-fullstack-service-ops.webp"
    );
    expect(getGeneratedBlogThumbnailUrl("unknown-page")).toBeUndefined();
  });

  it("keeps the original article when no generated thumbnail exists", () => {
    const article = {
      pageId: "notion-page",
      thumbnailUrl: "https://example.com/notion.png",
      title: "Notion article",
    };

    expect(withGeneratedBlogThumbnail(article)).toBe(article);
  });

  it("replaces article and header thumbnails when a generated thumbnail exists", () => {
    const article = {
      pageId: "logs-cicd-pipeline",
      thumbnailUrl: "/images/blog/logs/backend.svg",
      title: "CI/CD",
    };
    const header = {
      title: "CI/CD",
      thumbnailUrl: "/images/blog/logs/backend.svg",
      blurDataUrl: "/images/blog/logs/backend.svg",
    };

    expect(withGeneratedBlogThumbnail(article)).toMatchObject({
      thumbnailUrl: "/images/blog/generated/logs-cicd-pipeline.webp",
    });
    expect(
      withGeneratedBlogThumbnailForPageId("logs-cicd-pipeline", header)
    ).toMatchObject({
      thumbnailUrl: "/images/blog/generated/logs-cicd-pipeline.webp",
      blurDataUrl: "/images/blog/generated/logs-cicd-pipeline.webp",
    });
  });
});
