import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import BlogPage from "../src/app/(blogLayout)/blog/page";
import { getPageList } from "../src/app/(blogLayout)/api/blog";

jest.mock("../src/app/(blogLayout)/api/blog", () => ({
  getPageList: jest.fn(),
}));

jest.mock("../src/components/BlogList", () => ({
  __esModule: true,
  default: ({ list }) => (
    <div data-testid="all-article-list">all articles:{list.length}</div>
  ),
}));

jest.mock("../src/app/(blogLayout)/blog/components/ArticleTagList", () => ({
  ArticleFilterTagList: () => <div data-testid="tag-filter" />,
}));

jest.mock("../src/app/(blogLayout)/blog/components/ArticleTagTitle", () => ({
  ArticleTagTitle: () => (
    <div>
      <p>전체 글</p>
      <h1>글 목록</h1>
    </div>
  ),
}));

describe("BlogPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    getPageList.mockResolvedValue([
      { pageId: "first", title: "첫 글" },
      { pageId: "second", title: "두 번째 글" },
    ]);
  });

  it("shows curated writing before the all-article list", async () => {
    render(await BlogPage());

    const featuredHeading = screen.getByRole("heading", { name: "먼저 읽어볼 글" });
    const allArticleHeading = screen.getByRole("heading", { name: "글 목록" });
    const allArticleList = screen.getByTestId("all-article-list");

    expect(screen.getByText("전체 글", { exact: true })).toBeInTheDocument();
    expect(allArticleList).toHaveTextContent("all articles:2");
    expect(getPageList).toHaveBeenCalledTimes(1);
    expect(
      featuredHeading.compareDocumentPosition(allArticleList) &
        Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
    expect(
      featuredHeading.compareDocumentPosition(allArticleHeading) &
        Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
  });
});
