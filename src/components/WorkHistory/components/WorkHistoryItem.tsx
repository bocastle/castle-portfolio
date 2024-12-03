import fs from "fs";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { WorkHistorProps } from "../typs";
const WorkHistoryItem = ({
  id,
  name,
  position,
  period,
  imgSrc,
}: WorkHistorProps) => {
  let filePath = `./public/markdown/workHistory/${id}.md`;
  const file = fs.readFileSync(filePath, "utf8");

  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-0">
      <div className="flex md:flex-col items-center md:items-start mr-4 gap-6">
        <Image
          src={`${process.env.NEXT_PUBLIC_IMG}/${imgSrc}`}
          width="200"
          height="200"
          alt={name}
          className="object-cover rounded-lg border-[1px] border-GRAY_LIGHT border-solid w-24 h-24"
        />
        <div className="w-48">
          <h3>{name}</h3>
          <div className="flex flex-col">
            <span className="m-0">{position}</span>
            <span>{`${period[0]} - ${period[1]}`}</span>
          </div>
        </div>
      </div>
      <div className="md:border-gray-400 md:border-solid md:border-l-[1px] md:pl-4 markdown w-full">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{file}</ReactMarkdown>
      </div>
    </div>
  );
};

export default WorkHistoryItem;
