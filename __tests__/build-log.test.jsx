import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import BuildLog from "../src/components/BuildLog";

describe("BuildLog", () => {
  it("shows portfolio improvement evidence without internal work notes", () => {
    render(<BuildLog />);

    expect(screen.getByText("브라우저 QA 자동화")).toBeInTheDocument();
    expect(screen.getByText("GA4 이벤트 추적 전환")).toBeInTheDocument();
    expect(screen.getByText("블로그 추천 글 정리")).toBeInTheDocument();
    expect(screen.getByText("배포 검증 흐름 정리")).toBeInTheDocument();
    expect(screen.queryByText("softwiz 로고 리소스 정리")).not.toBeInTheDocument();
    expect(screen.queryByText("이직용 정보 구조 재설계")).not.toBeInTheDocument();
    expect(screen.queryByText("핸드오프 문서화")).not.toBeInTheDocument();
  });
});
