import {
  getBlogCategoryLabel,
  getBlogTagLabel,
} from "../src/utils/blog-labels";

describe("blog display labels", () => {
  it("shows hiring-facing Korean labels without changing source names", () => {
    expect(getBlogCategoryLabel("Backend")).toBe("백엔드");
    expect(getBlogCategoryLabel("Frontend")).toBe("프론트엔드");
    expect(getBlogCategoryLabel("DevOps")).toBe("운영/배포");
    expect(getBlogCategoryLabel("AI 개발")).toBe("AI 개발");

    expect(getBlogTagLabel("Deployment")).toBe("배포");
    expect(getBlogTagLabel("Performance")).toBe("성능");
    expect(getBlogTagLabel("Reliability")).toBe("안정성");
    expect(getBlogTagLabel("React Query")).toBe("React Query");
  });
});
