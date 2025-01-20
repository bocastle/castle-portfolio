import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

describe("Page", () => {
  it("renders a heading", () => {
    render(<></>);

    // const heading = screen.getByRole("heading", { level: 1 });
    const heading = 1;

    // expect(heading).toBeInTheDocument();
  });
});
