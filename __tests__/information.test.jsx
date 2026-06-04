import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Information from "../src/components/Information";

describe("Information", () => {
  it("풀스택 포지션과 운영/AI 개발 워크플로우 키워드를 보여준다", () => {
    render(<Information />);

    expect(
      screen.getByRole("heading", {
        name: /서비스를 끝까지 다루는 풀스택 개발자 김보성/,
      })
    ).toBeInTheDocument();
    expect(screen.getByText(/React\/React Native/)).toBeInTheDocument();
    expect(screen.getByText(/Go\/Node\.js/)).toBeInTheDocument();
    expect(screen.getByText(/Java\/Spring/)).toBeInTheDocument();
    expect(screen.getByText(/CI\/CD와 운영/)).toBeInTheDocument();
    expect(screen.getByText(/Cursor\/Codex/)).toBeInTheDocument();
  });
});
