import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Information from "../src/components/Information";

describe("Information", () => {
  it("풀스택 포지션과 운영/AI 개발 워크플로우 키워드를 보여준다", () => {
    render(<Information />);

    expect(
      screen.getByRole("heading", {
        name: /김보성, 서비스 흐름을 끝까지 연결하는 풀스택 개발자입니다/,
      })
    ).toBeInTheDocument();
    expect(screen.getByText(/운영\/결제\/관리자 도구/)).toBeInTheDocument();
    expect(screen.getByText(/Go\/Node\.js\/Spring API/)).toBeInTheDocument();
    expect(screen.getAllByText(/React\/Next\.js 화면/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/결제\/정산\/CRM/).length).toBeGreaterThan(0);
    expect(screen.getByText(/Codex\/Cursor 활용/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /이력서 보기/ })).toHaveAttribute(
      "href",
      "/resume/kim-bosung.pdf"
    );
    expect(screen.getByText("채용 요약")).toBeInTheDocument();
  });
});
