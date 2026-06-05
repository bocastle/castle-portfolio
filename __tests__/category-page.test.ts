/**
 * @jest-environment node
 */

const mockBlogApi = {
  getArticleCategoryList: jest.fn(),
  getCategoryList: jest.fn(),
};

jest.mock("../src/app/(blogLayout)/api/blog", () => mockBlogApi);

describe("category page routing", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("generates static params from categories instead of tags", async () => {
    mockBlogApi.getArticleCategoryList.mockResolvedValue([
      { id: "logs-category-backend", name: "Backend", description: null },
      { id: "logs-category-frontend", name: "Frontend", description: null },
    ]);

    const categoryPage = await import(
      "../src/app/(blogLayout)/categories/[categoriesName]/page"
    );

    await expect(categoryPage.generateStaticParams()).resolves.toEqual([
      { categoriesName: "Backend" },
      { categoriesName: "Frontend" },
    ]);
    expect(mockBlogApi.getArticleCategoryList).toHaveBeenCalledTimes(1);
  });

  it("uses the categories URL in metadata", async () => {
    const categoryPage = await import(
      "../src/app/(blogLayout)/categories/[categoriesName]/page"
    );

    const metadata = await categoryPage.generateMetadata({
      params: Promise.resolve({ categoriesName: "Backend" }),
    });

    expect(metadata.openGraph?.url).toBe(
      "https://bocelog.vercel.app/categories/Backend"
    );
  });

  it("encodes Korean category names in metadata URLs", async () => {
    const categoryPage = await import(
      "../src/app/(blogLayout)/categories/[categoriesName]/page"
    );

    const metadata = await categoryPage.generateMetadata({
      params: Promise.resolve({ categoriesName: "AI 개발" }),
    });

    expect(metadata.openGraph?.url).toBe(
      "https://bocelog.vercel.app/categories/AI%20%EA%B0%9C%EB%B0%9C"
    );
  });
});
