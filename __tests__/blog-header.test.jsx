import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import BlogHeader from "../src/components/BlogHeader";

jest.mock("next/image", () => function ImageMock(props) {
  const { alt, src, ...rest } = props;
  const imageProps = { ...rest };
  delete imageProps.unoptimized;
  delete imageProps.priority;

  return <img alt={alt} src={src} {...imageProps} />;
});

const headerItem = {
  id: "article-id",
  title:
    "모바일에서도 아주 긴 블로그 제목이 화면 밖으로 밀리지 않고 읽히는지 확인하는 제목",
  description: "description",
  createdAt: new Date("2026-06-01T00:00:00.000Z"),
  updatedAt: new Date("2026-06-01T00:00:00.000Z"),
  tagList: [{ id: 1, name: "Frontend" }],
  categoryList: [{ id: 1, name: "Frontend" }],
  thumbnailUrl: "/images/blog/logs/frontend.svg",
  blurDataUrl: "/images/blog/logs/frontend.svg",
  source: "github",
};

describe("BlogHeader", () => {
  it("keeps title and thumbnail fluid on mobile widths", () => {
    render(<BlogHeader headerItem={headerItem} />);

    const title = screen.getByRole("heading", { name: headerItem.title });
    const image = screen.getByAltText(headerItem.title);

    expect(title).toHaveClass("break-words");
    expect(title).toHaveClass("text-3xl");
    expect(title).toHaveClass("md:text-5xl");
    expect(title.parentElement).toHaveClass("w-full");
    expect(title.parentElement).not.toHaveClass("max-md:w-max");
    expect(image.parentElement).toHaveClass("w-full");
    expect(image.parentElement).not.toHaveClass("max-md:w-96");
  });
});
