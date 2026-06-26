import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import BlogDetail from "../src/components/BlogDetail";

jest.mock("react-markdown", () => ({
  __esModule: true,
  default: ({ components }) => (
    <div>
      {components.h2({
        children: "아주 긴 본문 제목도 모바일 화면에서 줄바꿈되어야 한다",
      })}
      {components.img({
        alt: "큰 다이어그램",
        src: "/images/projects/castlecms/external-api-clients.png",
      })}
      {components.table({
        children: (
          <tbody>
            <tr>
              <td>긴 값</td>
            </tr>
          </tbody>
        ),
      })}
    </div>
  ),
}));

jest.mock("remark-gfm", () => ({
  __esModule: true,
  default: () => null,
}));

jest.mock("rehype-raw", () => ({
  __esModule: true,
  default: () => null,
}));

jest.mock("rehype-highlight", () => ({
  __esModule: true,
  default: () => null,
}));

describe("BlogDetail responsive content", () => {
  it("keeps markdown headings, images, and tables inside the content width", () => {
    render(
      <BlogDetail
        content={`
## 아주 긴 본문 제목도 모바일 화면에서 줄바꿈되어야 한다

![큰 다이어그램](/images/projects/castlecms/external-api-clients.png)

| 아주 긴 컬럼 제목 | 또 다른 긴 컬럼 제목 |
| --- | --- |
| 긴 값 | 긴 값 |
`}
      />
    );

    const heading = screen.getByRole("heading", {
      name: "아주 긴 본문 제목도 모바일 화면에서 줄바꿈되어야 한다",
    });
    const image = screen.getByAltText("큰 다이어그램");
    const table = screen.getByRole("table");

    expect(heading).toHaveClass("break-words");
    expect(heading).toHaveClass("text-2xl");
    expect(heading).toHaveClass("sm:text-3xl");
    expect(image).toHaveClass("max-w-full");
    expect(image).toHaveClass("h-auto");
    expect(table.parentElement).toHaveClass("overflow-x-auto");
    expect(table.parentElement).toHaveClass("w-full");
  });
});
