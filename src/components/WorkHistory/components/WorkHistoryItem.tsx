import { getPublicImageUrl } from "@/utils/image-url";
import fs from "fs";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { WorkHistorProps } from "../typs";

const stripLeadingHeading = (markdown: string) => {
  const lines = markdown.split(/\r?\n/);
  const firstContentIndex = lines.findIndex((line) => line.trim().length > 0);

  if (
    firstContentIndex >= 0 &&
    /^#{1,6}\s+/.test(lines[firstContentIndex].trim())
  ) {
    lines.splice(firstContentIndex, 1);
  }

  return lines.join("\n").trim();
};

const WorkHistoryItem = ({
  id,
  name,
  position,
  period,
  imgSrc,
  summary,
  domain,
  featured = false,
  techStack = [],
  topHighlights = [],
}: WorkHistorProps) => {
  const filePath = `./public/markdown/workHistory/${id}.md`;
  const file = stripLeadingHeading(fs.readFileSync(filePath, "utf8"));

  return (
    <article
      className={`grid gap-6 rounded-lg border p-5 shadow-sm md:grid-cols-[13rem_minmax(0,1fr)] md:gap-7 ${
        featured
          ? "border-teal-300 bg-teal-50/60 dark:border-teal-700 dark:bg-teal-950/20"
          : "border-gray-200 bg-white dark:border-slate-700 dark:bg-slate-900/70"
      }`}
    >
      <div className="flex gap-5 md:flex-col">
        <Image
          src={getPublicImageUrl(imgSrc)}
          width="200"
          height="200"
          alt={name}
          unoptimized
          className="h-20 w-28 shrink-0 rounded-lg border border-GRAY_LIGHT border-solid bg-white object-contain p-1 md:h-24 md:w-36"
        />
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="py-0 text-2xl font-semibold">{name}</h3>
            {featured ? (
              <span className="rounded-full bg-teal-600 px-2.5 py-1 text-xs font-semibold text-white dark:bg-teal-400 dark:text-slate-950">
                핵심 경력
              </span>
            ) : null}
          </div>
          <div className="mt-2 flex flex-col gap-1 text-sm text-gray-600 dark:text-gray-300">
            <span>{position}</span>
            <span>{`${period[0]} - ${period[1]}`}</span>
            {domain ? <span className="font-medium">{domain}</span> : null}
          </div>
        </div>
      </div>

      <div className="min-w-0 md:border-l md:border-solid md:border-gray-300 md:pl-6 dark:md:border-slate-700">
        {summary ? (
          <p className="m-0 text-base leading-7 text-gray-700 dark:text-gray-200">
            {summary}
          </p>
        ) : null}

        {topHighlights.length > 0 ? (
          <ul className="m-0 mt-4 grid list-none gap-2 p-0">
            {topHighlights.map((highlight) => (
              <li
                key={highlight}
                className="border-t border-gray-200 pt-2 text-sm leading-6 text-gray-700 first:border-t-0 first:pt-0 dark:border-slate-700 dark:text-gray-200"
              >
                {highlight}
              </li>
            ))}
          </ul>
        ) : null}

        {techStack.length > 0 ? (
          <ul
            aria-label={`${name} 기술 스택`}
            className="m-0 mt-4 flex list-none flex-row flex-wrap gap-2 p-0"
          >
            {techStack.map((tech) => (
              <li
                key={tech}
                className="rounded-md border border-gray-300 bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-700 dark:border-slate-600 dark:bg-slate-800 dark:text-gray-200"
              >
                {tech}
              </li>
            ))}
          </ul>
        ) : null}

        <div className="markdown mt-5 text-sm leading-7 text-gray-700 dark:text-gray-200">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{file}</ReactMarkdown>
        </div>
      </div>
    </article>
  );
};

export default WorkHistoryItem;
