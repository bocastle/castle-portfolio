import { render, screen } from "@testing-library/react";
import Projects from "../src/components/Projects";

describe("Projects", () => {
  it("개인 프로젝트 섹션에 castleCms를 보여준다", () => {
    render(<Projects />);

    expect(screen.getByRole("heading", { name: "개인 프로젝트" })).toBeInTheDocument();
    expect(screen.getByText("castleCms")).toBeInTheDocument();
    expect(
      screen.getByText(/Next\.js와 Spring Boot로 만든 운영형 풀스택 CMS/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/요구사항을 기능 단위로 나누고 화면 구조, API 계약, 권한 모델/)
    ).toBeInTheDocument();
  });
});
