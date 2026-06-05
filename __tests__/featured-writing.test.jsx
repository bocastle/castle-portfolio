import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import FeaturedWriting from "../src/components/FeaturedWriting";

describe("FeaturedWriting", () => {
  it("shows six hiring-focused writing links", () => {
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
    expect(screen.getByText("CI/CD 파이프라인 정리")).toBeInTheDocument();
    expect(
      screen.getByText("외부 서비스 장애 대응 전략 정리")
    ).toBeInTheDocument();
    expect(screen.getByText("JPA N+1 문제")).toBeInTheDocument();
    expect(
      screen.getByText("Spring Boot와 Next.js 캐시 정리")
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
      screen.getByRole("link", { name: "CI/CD 파이프라인 정리 글 보기" })
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
        eyebrow="추천 글"
        title="먼저 볼 글"
        description="블로그 상단 추천 글 설명"
      />
    );

    expect(screen.getByText("추천 글")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "먼저 볼 글" })).toBeInTheDocument();
    expect(screen.getByText("블로그 상단 추천 글 설명")).toBeInTheDocument();
  });
});
