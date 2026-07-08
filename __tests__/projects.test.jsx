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
      screen.getByText(/공개 자료에서는 스크린샷과 구조 설명으로 설계 의도를 검증 가능/)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "프로젝트 요약" })
    ).toHaveAttribute(
      "href",
      "https://github.com/bocastle/castle-portfolio/blob/main/docs/project-briefs/castlecms-project-brief.md"
    );
    expect(screen.getByRole("link", { name: "API 설계 요약" })).toHaveAttribute(
      "href",
      "https://github.com/bocastle/castle-portfolio/blob/main/docs/project-briefs/castlecms-api-brief.md"
    );
    expect(screen.getByText("Paperbox")).toBeInTheDocument();
    expect(
      screen.getByText(/SwiftUI macOS 앱 \+ Vite 브라우저 문서 패킷 도구/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/macOS 앱으로 먼저 검증한 뒤, 설치 장벽을 줄이기 위해 브라우저 버전까지 확장/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/서버 업로드 없이 사용자의 기기 안에서 처리/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Paperbox Browser MVP를 만들어 설치 없이 문서 패킷/)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "브라우저 데모" })
    ).toHaveAttribute("href", "https://paperbox-browser.vercel.app/");
    expect(
      screen.getByRole("link", { name: "macOS 앱 저장소" })
    ).toHaveAttribute("href", "https://github.com/bocastle/paperbox");
    expect(
      screen.getByRole("link", { name: "브라우저 버전 저장소" })
    ).toHaveAttribute("href", "https://github.com/bocastle/paperbox-browser");
    expect(screen.getByText("AI 협업 기반 포트폴리오 개선")).toBeInTheDocument();
    expect(screen.getAllByText(/개발 프로세스 개선 사례/).length).toBeGreaterThan(0);
    expect(screen.getAllByText("검증 기록").length).toBeGreaterThan(0);
    expect(screen.getByText(/포트폴리오를 운영 가능한 서비스처럼 개선/)).toBeInTheDocument();
    expect(screen.getByText("Dodge Arcade")).toBeInTheDocument();
    expect(screen.getByText(/Three\.js 기반 3D 회피 게임/)).toBeInTheDocument();
    expect(
      screen.getAllByText("설계 판단").length
    ).toBeGreaterThanOrEqual(3);
    expect(screen.getAllByText("구현 범위").length).toBeGreaterThanOrEqual(3);
    expect(screen.getAllByText("검증 방식").length).toBeGreaterThanOrEqual(3);
    expect(
      screen.getAllByText(/운영\/배포 또는 한계/).length
    ).toBeGreaterThanOrEqual(3);
    expect(
      screen.getByText(/싱글 플레이와 로그인 없는 Socket\.IO 멀티플레이 룸/)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "라이브 데모" })
    ).toHaveAttribute("href", "https://poop-dodge-3d.vercel.app/");
    expect(
      screen.getByRole("link", { name: "GitHub 저장소" })
    ).toHaveAttribute("href", "https://github.com/bocastle/poop-dodge-3d");
    expect(screen.getByText("KRX 수급 텔레그램 봇")).toBeInTheDocument();
    expect(screen.getByText(/Go 기반 KRX 데이터 리포트 봇/)).toBeInTheDocument();
    expect(screen.getByText(/Render webhook 방식으로 운영/)).toBeInTheDocument();
    expect(screen.getAllByText(/GitHub Actions health ping/).length).toBeGreaterThan(0);
    expect(
      screen.getByRole("link", { name: "KRX 봇 GitHub 저장소" })
    ).toHaveAttribute("href", "https://github.com/bocastle/krx-pension-bot");
    expect(screen.queryByText("코드/구조 설명 가능")).not.toBeInTheDocument();
    expect(screen.queryByText(/설명 가능/)).not.toBeInTheDocument();
    expect(screen.queryByText(/실무 경력/)).not.toBeInTheDocument();
    expect(screen.queryByText(/이직용 제품/)).not.toBeInTheDocument();
  });
});
