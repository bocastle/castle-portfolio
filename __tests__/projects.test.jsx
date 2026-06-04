import { render, screen } from "@testing-library/react";
import Projects from "../src/components/Projects";

describe("Projects", () => {
  it("개인 프로젝트 섹션에 castleCms를 보여준다", () => {
    render(<Projects />);

    expect(screen.getByRole("heading", { name: "대표 프로젝트" })).toBeInTheDocument();
    expect(screen.getByText("castleCms")).toBeInTheDocument();
    expect(
      screen.getByText(/Next\.js와 Spring Boot로 만든 운영형 풀스택 CMS/)
    ).toBeInTheDocument();
    expect(
      screen.getAllByText(/게시글, 미디어, 조직\/사용자, 외부 API 클라이언트/)
        .length
    ).toBeGreaterThan(0);
    expect(screen.getByText("AI 협업 기반 포트폴리오 개선")).toBeInTheDocument();
    expect(screen.getAllByText(/개발 프로세스 개선 사례/).length).toBeGreaterThan(0);
  });
});
