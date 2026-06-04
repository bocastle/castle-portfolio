import { render, screen } from "@testing-library/react";
import Projects from "../src/components/Projects";

describe("Projects", () => {
  it("개인 프로젝트 섹션에 castleCms를 보여준다", () => {
    render(<Projects />);

    expect(screen.getByRole("heading", { name: "개인 프로젝트" })).toBeInTheDocument();
    expect(screen.getByText("castleCms")).toBeInTheDocument();
    expect(
      screen.getByText(/Next\.js와 Spring Boot 기반으로 만든 풀스택 CMS 프로젝트/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/운영형 관리자 도구의 핵심 흐름을 구현했습니다/)
    ).toBeInTheDocument();
  });
});
