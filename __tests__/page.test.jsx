import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Page from "../src/app/not-found";

describe("Page", () => {
  it("not-found 페이지 확인", () => {
    render(<Page />);

    const div = screen.getByRole("html");
    expect(div).toBeInTheDocument();
    const div1 = screen.getByText("coming soon...");

    expect(div1).toBeInTheDocument();
  });
});
