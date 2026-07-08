import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import BuildLog from "../src/components/BuildLog";

describe("BuildLog", () => {
  it("shows portfolio improvement evidence without internal work notes", () => {
    render(<BuildLog />);

    expect(screen.getByText("브라우저 QA 자동화")).toBeInTheDocument();
    expect(screen.getByText("GTM 이벤트 수집 단일화")).toBeInTheDocument();
    expect(screen.getByText(/dataLayer 단일 경로/)).toBeInTheDocument();
    expect(screen.getByText("기술 기록 자동화")).toBeInTheDocument();
    expect(
      screen.getByText(/Dropbox Markdown 동기화와 GitHub Actions 스케줄 실행/)
    ).toBeInTheDocument();
    expect(screen.getByText("글 목록 정리")).toBeInTheDocument();
    expect(screen.getByText("castleCms 자료 정리")).toBeInTheDocument();
    expect(screen.getByText("배포 검증 흐름 정리")).toBeInTheDocument();
    expect(
      screen.getByText(
        "최근에 다시 정리한 글이 먼저 보이도록 블로그 목록 흐름을 다듬었습니다."
      )
    ).toBeInTheDocument();
    expect(screen.queryByText("softwiz 로고 리소스 정리")).not.toBeInTheDocument();
    expect(screen.queryByText("이직용 정보 구조 재설계")).not.toBeInTheDocument();
    expect(screen.queryByText("핸드오프 문서화")).not.toBeInTheDocument();
    expect(screen.queryByText(/풀스택 연결/)).not.toBeInTheDocument();
  });
});
