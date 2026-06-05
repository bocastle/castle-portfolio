import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import FeaturedWriting from "../src/components/FeaturedWriting";

describe("FeaturedWriting", () => {
  it("shows six selected writing links", () => {
    render(<FeaturedWriting />);

    const links = screen.getAllByRole("link");

    expect(links).toHaveLength(6);
    expect(links.map((link) => link.getAttribute("href"))).toEqual([
      "/blog/logs-cicd-pipeline",
      "/blog/logs-external-service-failure",
      "/blog/logs-jpa-n-plus-one",
      "/blog/logs-spring-next-cache",
      "/blog/logs-testable-code",
      "/blog/github-codex-portfolio-qa",
    ]);
    expect(screen.getByText("CI/CD 파이프라인 운영 흐름")).toBeInTheDocument();
    expect(
      screen.getByText("외부 서비스 장애 대응 전략")
    ).toBeInTheDocument();
    expect(screen.getByText("JPA N+1 쿼리 성능 개선")).toBeInTheDocument();
    expect(
      screen.getByText("Spring Boot와 Next.js 캐시 전략")
    ).toBeInTheDocument();
    expect(screen.getByText("테스트하기 쉬운 코드의 조건")).toBeInTheDocument();
    expect(
      screen.getByText("Codex로 포트폴리오 QA 자동화하기")
    ).toBeInTheDocument();
    expect(screen.getByText("운영/배포")).toBeInTheDocument();
    expect(screen.getByText("풀스택")).toBeInTheDocument();
    expect(screen.getByText("품질/테스트")).toBeInTheDocument();
    expect(screen.queryByText("풀스택 연결")).not.toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "CI/CD 파이프라인 운영 흐름 글 보기" })
    ).toHaveAttribute("href", "/blog/logs-cicd-pipeline");
    expect(
      screen.getByRole("link", {
        name: "Codex로 포트폴리오 QA 자동화하기 글 보기",
      })
    ).toHaveAttribute("href", "/blog/github-codex-portfolio-qa");
  });

  it("can adjust copy for the blog list page", () => {
    render(
      <FeaturedWriting
        eyebrow="기술 글"
        title="먼저 읽어볼 글"
        description="서비스 운영 중 마주친 글 설명"
      />
    );

    expect(screen.getByText("기술 글")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "먼저 읽어볼 글" })).toBeInTheDocument();
    expect(screen.getByText("서비스 운영 중 마주친 글 설명")).toBeInTheDocument();
  });
});
