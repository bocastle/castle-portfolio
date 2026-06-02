import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import ProfileTabs from "../src/components/ProfileTabs";

describe("ProfileTabs", () => {
  it("경력과 개인 프로젝트를 탭으로 전환한다", () => {
    render(
      <ProfileTabs
        projects={<section>castleCms</section>}
        workHistory={<section>경력 목록</section>}
      />
    );

    expect(screen.getByRole("tab", { name: "경력" })).toHaveAttribute(
      "aria-selected",
      "true"
    );
    expect(screen.getByText("경력 목록")).toBeInTheDocument();
    expect(screen.queryByText("castleCms")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("tab", { name: "개인 프로젝트" }));

    expect(screen.getByRole("tab", { name: "개인 프로젝트" })).toHaveAttribute(
      "aria-selected",
      "true"
    );
    expect(screen.getByText("castleCms")).toBeInTheDocument();
  });
});
