import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import ArticleTagList from "../src/components/ArticleTagList";
import {
  addFilterBlogTag,
  removeFilterBlogTag,
} from "../src/store/article-filter.store";

jest.mock("../src/store/article-filter.store", () => ({
  addFilterBlogTag: jest.fn(),
  removeFilterBlogTag: jest.fn(),
  useArticleFilterStore: () => ({
    filterBlogTagList: [],
  }),
}));

describe("ArticleTagList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("shows Korean tag labels while filtering with the canonical tag name", () => {
    const tag = { id: "logs-tag-deployment", name: "Deployment" };

    render(<ArticleTagList articleTagInfo={tag} />);
    fireEvent.click(screen.getByText("배포"));

    expect(addFilterBlogTag).toHaveBeenCalledWith(tag);
    expect(removeFilterBlogTag).not.toHaveBeenCalled();
  });
});
