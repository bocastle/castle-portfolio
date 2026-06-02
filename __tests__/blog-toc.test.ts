import {
  createHeadingSlugger,
  extractBlogTocItems,
} from "../src/components/BlogDetail/toc";

describe("blog table of contents", () => {
  it("마크다운 h2와 h3를 목차 항목으로 변환한다", () => {
    expect(
      extractBlogTocItems(`
# 글 제목

## 첫 번째 주제

본문

### 세부 항목

## 첫 번째 주제
`)
    ).toEqual([
      { depth: 2, id: "첫-번째-주제", title: "첫 번째 주제" },
      { depth: 3, id: "세부-항목", title: "세부 항목" },
      { depth: 2, id: "첫-번째-주제-1", title: "첫 번째 주제" },
    ]);
  });

  it("코드 블록 안의 heading 문법은 목차에서 제외한다", () => {
    expect(
      extractBlogTocItems(`
## 실제 제목

\`\`\`md
## 코드 안 제목
\`\`\`
`)
    ).toEqual([{ depth: 2, id: "실제-제목", title: "실제 제목" }]);
  });

  it("렌더링 heading id와 목차 id가 같은 slug 규칙을 사용한다", () => {
    const slugger = createHeadingSlugger();

    expect(slugger("중복 제목")).toBe("중복-제목");
    expect(slugger("중복 제목")).toBe("중복-제목-1");
  });
});
