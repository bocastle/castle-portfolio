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
    expect(
      screen.getByText(/관리자 Bearer token 인증과 외부 API Key 인증을 분리/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/스크린샷과 구조 설명으로 설계 의도를 검증 가능/)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "면접 설명 자료" })
    ).toHaveAttribute(
      "href",
      "https://github.com/bocastle/castle-portfolio/blob/main/docs/interview/castlecms-private-project-brief.md"
    );
    expect(screen.getByRole("link", { name: "API 설명 자료" })).toHaveAttribute(
      "href",
      "https://github.com/bocastle/castle-portfolio/blob/main/docs/interview/castlecms-api-brief.md"
    );
    expect(screen.getByText("AI 협업 기반 포트폴리오 개선")).toBeInTheDocument();
    expect(screen.getAllByText(/개발 프로세스 개선 사례/).length).toBeGreaterThan(0);
    expect(screen.getAllByText("검증 기록").length).toBeGreaterThan(0);
    expect(screen.getByText(/포트폴리오를 운영 가능한 서비스처럼 개선/)).toBeInTheDocument();
    expect(screen.queryByText("코드/구조 설명 가능")).not.toBeInTheDocument();
    expect(screen.queryByText(/설명 가능/)).not.toBeInTheDocument();
    expect(screen.queryByText(/실무 경력/)).not.toBeInTheDocument();
    expect(screen.queryByText(/이직용 제품/)).not.toBeInTheDocument();
  });
});
