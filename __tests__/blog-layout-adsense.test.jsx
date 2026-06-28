import React from "react";
import BlogLayout from "../src/app/(blogLayout)/layout";
import { GoogleAdSense } from "../src/components/GoogleAds/GoogleAdSense";
import { getArticleCategoryList } from "../src/app/(blogLayout)/api/blog";

jest.mock("../src/app/(blogLayout)/api/blog", () => ({
  getArticleCategoryList: jest.fn(),
}));

jest.mock("../src/app/(blogLayout)/components/ArticleCategory", () => ({
  ArticleCategory: () => <aside data-testid="article-category" />,
}));

jest.mock("../src/components/GoogleAds/GoogleAdSense", () => ({
  GoogleAdSense: () => null,
}));

describe("BlogLayout AdSense placement", () => {
  const collectElementsByType = (node, type) => {
    if (Array.isArray(node)) {
      return node.flatMap((child) => collectElementsByType(child, type));
    }

    if (!React.isValidElement(node)) {
      return [];
    }

    const matches = node.type === type ? [node] : [];
    const childMatches = React.Children.toArray(node.props.children).flatMap(
      (child) => collectElementsByType(child, type)
    );

    return [...matches, ...childMatches];
  };

  beforeEach(() => {
    getArticleCategoryList.mockResolvedValue([]);
  });

  it("does not mount a second AdSense script inside the blog layout", async () => {
    const tree = await BlogLayout({
      children: <main>blog content</main>,
    });

    expect(collectElementsByType(tree, GoogleAdSense)).toHaveLength(0);
  });
});
