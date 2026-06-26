import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import BlogFooter from "../src/components/BlogFooter";

const longNextTitle =
  "아주 긴 다음 게시글 제목도 모바일 화면에서 카드 밖으로 밀리지 않고 자연스럽게 줄바꿈되어야 한다";

describe("BlogFooter", () => {
  it("stacks prev and next article cards on mobile and wraps long titles", () => {
    render(
      <BlogFooter
        footerItem={{
          prevArticle: {
            pageId: "prev-post",
            title: "이전 게시글",
          },
          nextArticle: {
            pageId: "next-post",
            title: longNextTitle,
          },
        }}
      />
    );

    const footer = screen.getByRole("navigation", { name: "이전/다음 게시글" });
    const nextLink = screen.getByRole("link", { name: new RegExp(longNextTitle) });
    const nextTitle = screen.getByText(longNextTitle);

    expect(footer).toHaveClass("grid-cols-1");
    expect(footer).toHaveClass("md:grid-cols-2");
    expect(nextLink).toHaveClass("min-w-0");
    expect(nextLink.firstElementChild).toHaveClass("min-h-[106px]");
    expect(nextLink.firstElementChild).not.toHaveClass("h-[106px]");
    expect(nextTitle).toHaveClass("break-words");
    expect(nextTitle).toHaveClass("whitespace-normal");
  });
});
