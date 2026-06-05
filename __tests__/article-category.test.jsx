import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { ArticleCategory } from "../src/app/(blogLayout)/components/ArticleCategory";

describe("ArticleCategory", () => {
  it("shows Korean category labels while keeping canonical category URLs", () => {
    render(
      <ArticleCategory
        list={[
          { id: "logs-category-backend", name: "Backend", description: null },
          { id: "logs-category-devops", name: "DevOps", description: null },
        ]}
      />
    );

    expect(screen.getByRole("link", { name: "백엔드" })).toHaveAttribute(
      "href",
      "/categories/Backend"
    );
    expect(screen.getByRole("link", { name: "운영/배포" })).toHaveAttribute(
      "href",
      "/categories/DevOps"
    );
  });
});
