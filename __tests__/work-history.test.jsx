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
  it("실무 경력 라벨과 최근/재직 배지를 보여준다", () => {
    render(<WorkHistory />);

    expect(screen.getByText("실무 경력")).toBeInTheDocument();
    expect(screen.getAllByText("최근 경력").length).toBeGreaterThan(0);
    expect(screen.getByText("재직 중")).toBeInTheDocument();
    expect(screen.queryByText("핵심 경력")).not.toBeInTheDocument();
    expect(screen.queryByText("Recent Work Evidence")).not.toBeInTheDocument();
  });
});
