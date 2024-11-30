import fs from "fs";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
const WorkHistory = () => {
  let filePath = `./public/markdown/workHistory/0.md`;
  const file = fs.readFileSync(filePath, "utf8");

  return (
    <div>
      <h2>경력</h2>
      <div className="mt-2 h-[1px] bg-gray-600 dark:bg-gray-400 mb-16" />
      <div className="flex flex-col gap-24">
        <div className="flex flex-col md:flex-row gap-6 md:gap-0">
          <div className="flex md:flex-col items-center md:items-start mr-4 gap-6">
            <Image
              src={`${process.env.NEXT_PUBLIC_IMG}/FbvNCdV/6-linker.png`}
              width="200"
              height="200"
              alt={"회사명"}
              className="object-cover rounded-lg border-[1px] border-GRAY_LIGHT border-solid w-24 h-24"
            />
            <div className="w-48">
              <h3>링크커넥션</h3>
              <div className="flex flex-col">
                <span className="m-0">개발팀</span>
                <span>2023.11 - 2024.12</span>
              </div>
            </div>
          </div>
          <div className="md:border-gray-400 md:border-solid md:border-l-[1px] md:pl-4 markdown w-full">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{file}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkHistory;
