import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Information from "../src/components/Information";

describe("Information", () => {
  it("풀스택 포지션과 운영/AI 개발 워크플로우 키워드를 보여준다", () => {
    render(<Information />);

    expect(
      screen.getByRole("heading", {
        name: /김보성, 서비스를 끝까지 다루는 풀스택 개발자입니다/,
      })
    ).toBeInTheDocument();
    expect(screen.getByText(/웹\/앱과 백엔드/)).toBeInTheDocument();
    expect(screen.getAllByText(/Go\/Node\.js\/Java\/Spring/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/React\/React Native\/Next\.js/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/결제\/정산\/CRM/).length).toBeGreaterThan(0);
    expect(screen.getByText(/CI\/CD\/운영 검증/)).toBeInTheDocument();
    expect(screen.getByText(/Codex\/Cursor 워크플로우/)).toBeInTheDocument();
    expect(screen.getByText(/운영 이슈 분석/)).toBeInTheDocument();
    expect(screen.getByText("AI 협업 방식")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /이력서 보기/ })).toHaveAttribute(
      "href",
      "/resume/kim-bosung.pdf"
    );
    expect(screen.getByText("채용 요약")).toBeInTheDocument();
  });
});
