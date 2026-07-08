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

  it("소프트위즈 경력은 백엔드, 운영, 인프라 기여를 보여준다", () => {
    render(<WorkHistory />);

    expect(screen.getByText("서비스 범위")).toBeInTheDocument();
    expect(
      screen.getAllByText(
        /CRM, Gateway, Client API, Client Portal, Office Portal/
      )
        .length
    ).toBeGreaterThan(0);
    expect(screen.getByText("운영 기여")).toBeInTheDocument();
    expect(
      screen.getAllByText(/결제 연동, 정산 수동 실행 안정화, CRM 성능 개선/)
        .length
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByText(/Jenkins 배포 자동화, Gateway 배포 검증/)
        .length
    ).toBeGreaterThan(0);
    expect(screen.getByText("검증 결과")).toBeInTheDocument();
    expect(screen.getByText(/1\.6s -> 216ms/)).toBeInTheDocument();
    expect(screen.getByText("리스크 관리")).toBeInTheDocument();
    expect(
      screen.getAllByText(/검색\/필터\/정렬.*기존 쿼리 흐름/)
        .length
    ).toBeGreaterThan(0);
    expect(screen.queryByText(/커밋\s*[0-9]/)).not.toBeInTheDocument();
    expect(
      screen.getAllByText(/외부 데이터 수신, 토큰 재발급 실패/)
        .length
    ).toBeGreaterThan(0);
  });
});
