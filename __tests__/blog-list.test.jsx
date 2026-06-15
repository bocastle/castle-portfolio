import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import BlogList from "../src/components/BlogList";

jest.mock("next/image", () => function ImageMock(props) {
  const { alt, src, ...rest } = props;
  const imageProps = { ...rest };
  delete imageProps.unoptimized;
  delete imageProps.placeholder;
  delete imageProps.blurDataURL;
  delete imageProps.fill;

  return <img alt={alt} src={src} {...imageProps} />;
});

jest.mock("../src/store/article-filter.store", () => ({
  loadMoreArticle: jest.fn(),
  useArticleFilterStore: () => ({
    filterBlogTagList: [],
    articleSliceLength: 10,
  }),
}));

jest.mock("../src/utils/analytics", () => ({
  trackEvent: jest.fn(),
}));

const article = {
  id: 1,
  pageId: "logs-cicd-pipeline",
  title: "CI/CD 파이프라인 운영 흐름",
  categoryList: [{ id: 1, name: "DevOps" }],
  tagList: [{ id: 1, name: "CI/CD" }],
  createdAt: new Date("2026-06-01T00:00:00.000Z"),
  updatedAt: new Date("2026-06-01T00:00:00.000Z"),
  thumbnailUrl: "/images/blog/logs/devops.svg",
  source: "github",
};

describe("BlogList", () => {
  it("keeps the card steady while lifting the thumbnail subtly", () => {
    render(<BlogList list={[article]} />);

    const cardLink = screen.getByRole("link", {
      name: /CI\/CD 파이프라인 운영 흐름/,
    });
    const thumbnail = screen.getByAltText("thumbnail");

    expect(cardLink).toHaveClass("group");
    expect(cardLink).toHaveClass("transition-colors");
    expect(cardLink).not.toHaveClass("hover:-translate-y-2");
    expect(cardLink).not.toHaveClass("hover:shadow-2xl");
    expect(thumbnail.parentElement).toHaveClass("group-hover:-translate-y-1");
    expect(thumbnail.parentElement).toHaveClass("group-hover:shadow-lg");
  });
});
