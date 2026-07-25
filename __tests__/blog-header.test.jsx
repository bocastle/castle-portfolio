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
  it("제목이 좁은 화면에서도 줄바꿈되며 폭을 채운다", () => {
    render(<BlogHeader headerItem={headerItem} />);

    const title = screen.getByRole("heading", { name: headerItem.title });

    expect(title).toHaveClass("break-words");
    expect(title.parentElement).toHaveClass("w-full");
    expect(title.parentElement).not.toHaveClass("max-md:w-max");
  });

  it("상세 상단에 히어로 썸네일을 노출하지 않는다", () => {
    render(<BlogHeader headerItem={headerItem} />);

    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });
});
