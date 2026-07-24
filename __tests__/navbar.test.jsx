import "@testing-library/jest-dom";
import { fireEvent, render, screen, within } from "@testing-library/react";
import Navbar from "../src/components/Navbar";
import { trackEvent } from "../src/utils/analytics";

jest.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

jest.mock("../src/utils/analytics", () => ({
  trackEvent: jest.fn(),
}));

jest.mock("../src/components/Navbar/components/ThemeButton", () => ({
  __esModule: true,
  default: () => <button type="button">테마 전환</button>,
}));

describe("Navbar", () => {
  it("모바일 메뉴 버튼은 alert 대신 실제 메뉴를 연다", () => {
    const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});

    render(<Navbar />);

    expect(
      screen.queryByRole("navigation", { name: "모바일 메뉴" })
    ).not.toBeInTheDocument();

    const toggle = screen.getByRole("button", { name: "모바일 메뉴 열기" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(toggle);

    expect(alertSpy).not.toHaveBeenCalled();
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(trackEvent).toHaveBeenCalledWith("Mobile Menu Open", {
      path: "/",
    });

    const mobileMenu = screen.getByRole("navigation", { name: "모바일 메뉴" });
    expect(within(mobileMenu).getByRole("link", { name: "Blog" })).toHaveAttribute(
      "href",
      "/blog"
    );
    // 당분간 블로그만 운영 (2026-07-25). WorkHistory 메뉴는 노출되지 않는다.
    expect(
      within(mobileMenu).queryByRole("link", { name: "WorkHistory" })
    ).not.toBeInTheDocument();

    alertSpy.mockRestore();
  });
});
