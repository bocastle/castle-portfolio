import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import WorkHistory from "../src/components/WorkHistory";

jest.mock("react-markdown", () => function ReactMarkdownMock({ children }) {
  return <div>{children}</div>;
});

jest.mock("remark-gfm", () => function remarkGfmMock() {
  return undefined;
});

describe("WorkHistory", () => {
  it("경력 설명과 최근/재직 배지를 보여준다", () => {
    render(<WorkHistory />);

    expect(
      screen.getByText(
        /최근 경력인 소프트위즈와 직전 링크커넥션을 먼저 보여주고/
      )
    ).toBeInTheDocument();
    expect(screen.queryByText("실무 경력")).not.toBeInTheDocument();
    expect(screen.getAllByText("최근 경력").length).toBeGreaterThan(0);
    expect(screen.getByText("재직 중")).toBeInTheDocument();
    expect(screen.queryByText("핵심 경력")).not.toBeInTheDocument();
    expect(screen.queryByText("Recent Work Evidence")).not.toBeInTheDocument();
  });

  it("소프트위즈 경력은 시니어 면접관이 확인할 문제, 판단, 결과, 리스크 관리 근거를 보여준다", () => {
    render(<WorkHistory />);

    expect(screen.getByText("실무 문제")).toBeInTheDocument();
    expect(
      screen.getAllByText(/로그인 이력, 거래 이력, 계좌 정보 선계산 병목/)
        .length
    ).toBeGreaterThan(0);
    expect(screen.getByText("설계 판단")).toBeInTheDocument();
    expect(
      screen.getAllByText(/페이지 대상 고객 선조회 후 부가 정보 조회/)
        .length
    ).toBeGreaterThan(0);
    expect(screen.getByText("검증 결과")).toBeInTheDocument();
    expect(screen.getByText(/1\.6s -> 216ms/)).toBeInTheDocument();
    expect(screen.getByText("운영 리스크 관리")).toBeInTheDocument();
    expect(
      screen.getByText(/검색\/필터\/정렬은 legacy query 유지/)
    ).toBeInTheDocument();
  });
});
