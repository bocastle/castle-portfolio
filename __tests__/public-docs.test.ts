import { readFileSync } from "fs";
import path from "path";

const readProjectFile = (relativePath: string) =>
  readFileSync(path.join(process.cwd(), relativePath), "utf8");

describe("public documentation copy", () => {
  it("keeps castleCms public briefs free from internal prep wording", () => {
    const publicBriefs = [
      "docs/project-briefs/castlecms-project-brief.md",
      "docs/project-briefs/castlecms-api-brief.md",
      "src/components/Projects/data.json",
    ].map(readProjectFile);

    const combinedCopy = publicBriefs.join("\n");

    expect(combinedCopy).not.toMatch(/말하지 않을 것/);
    expect(combinedCopy).not.toMatch(/다음 보강 후보/);
    expect(combinedCopy).not.toMatch(/docs\/interview/);
    expect(combinedCopy).not.toMatch(/private-project-brief/);
    expect(combinedCopy).not.toMatch(/AI가 전체 프로젝트/);
    expect(combinedCopy).not.toMatch(/코드 공개가 불가능/);
  });

  it("keeps Softwiz copy outcome-focused and free from provider or internal auth details", () => {
    const workHistoryCopy = [
      "src/components/WorkHistory/data.json",
      "public/markdown/workHistory/7.md",
      "src/components/Information/index.tsx",
    ].map(readProjectFile);

    const combinedCopy = workHistoryCopy.join("\n");

    expect(combinedCopy).toMatch(/재직 중/);
    expect(combinedCopy).toMatch(/외부 결제 연동/);
    expect(combinedCopy).not.toMatch(/STICPAY/);
    expect(combinedCopy).not.toMatch(/Help2Pay/);
    expect(combinedCopy).not.toMatch(/2FA/);
    expect(combinedCopy).not.toMatch(/비밀번호 재설정/);
    expect(combinedCopy).not.toMatch(/DB taxonomy/);
    expect(combinedCopy).not.toMatch(/퇴사/);
  });
});
