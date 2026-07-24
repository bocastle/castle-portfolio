import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import WorkHistoryPage from "../src/app/(workHistoryLayout)/workHistory/page";

jest.mock("../src/components/Information", () => function InformationMock() {
  return <section>profile summary</section>;
});

jest.mock("../src/components/WorkHistory", () => function WorkHistoryMock() {
  return <section>career list</section>;
});

jest.mock("../src/components/Projects", () => function ProjectsMock() {
  return <section>castleCms</section>;
});

// 당분간 블로그만 운영 (2026-07-25). /workHistory는 /blog로 리다이렉트되어
// 아래 렌더 기반 테스트는 성립하지 않는다. SHOW_PORTFOLIO 복구 시 skip을 해제한다.
describe.skip("WorkHistoryPage", () => {
  it("경력 페이지에서도 개인 프로젝트 탭으로 전환한다", () => {
    render(<WorkHistoryPage />);

    const tabs = screen.getAllByRole("tab");

    expect(tabs).toHaveLength(2);
    expect(tabs[0]).toHaveAttribute("aria-selected", "true");
    expect(screen.queryByText("castleCms")).not.toBeInTheDocument();

    fireEvent.click(tabs[1]);

    expect(tabs[1]).toHaveAttribute("aria-selected", "true");
    expect(screen.getByText("castleCms")).toBeInTheDocument();
  });
});
