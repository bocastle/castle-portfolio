"use client";

import { trackEvent } from "@/utils/analytics";
import Image from "next/image";
import { useState } from "react";
import { Project, ProjectScreenshot } from "../types";

const ProjectItem = ({
  name,
  type,
  period,
  role,
  problem,
  solution,
  result,
  aiUsage,
  repoVisibility,
  reviewAvailable,
  summary,
  description,
  highlights,
  techStack,
  screenshots,
  documentationLinks = [],
  repositoryNote,
}: Project) => {
  const initialScreenshot = screenshots[1] ?? screenshots[0];
  const [selectedScreenshot, setSelectedScreenshot] = useState<
    ProjectScreenshot | undefined
  >(initialScreenshot);

  const structuredSections = [
    { label: "문제", content: problem },
    { label: "설계 판단", content: solution },
    { label: "구현 범위", content: role },
    { label: "검증 방식", content: result },
    { label: "운영/배포 또는 한계", content: repositoryNote },
    { label: "AI 활용", content: aiUsage },
  ].filter((section): section is { label: string; content: string } =>
    Boolean(section.content)
  );
  const hasScreenshots = screenshots.length > 0;

  return (
    <article
      className={`grid transform-gpu gap-6 rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition-[border-color,box-shadow,transform] duration-200 ease-out hover:-translate-y-2 hover:border-teal-300 hover:shadow-2xl focus-within:-translate-y-2 focus-within:border-teal-300 focus-within:shadow-2xl motion-reduce:transition-none dark:border-slate-700 dark:bg-slate-900/70 dark:hover:border-teal-600 dark:focus-within:border-teal-600 ${
        hasScreenshots
          ? "md:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)]"
          : "md:grid-cols-1"
      }`}
    >
      <div className="flex min-w-0 flex-col gap-5">
        <div>
          <p className="m-0 text-sm font-semibold text-teal-700 dark:text-teal-300">
            {type}
          </p>
          <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <h3 className="py-0 text-2xl font-semibold md:text-3xl">{name}</h3>
            <span className="text-sm text-gray-500 dark:text-gray-300">
              {period}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3 text-base leading-7 text-gray-700 dark:text-gray-200">
          <p className="m-0">{summary}</p>
          <p className="m-0">{description}</p>
        </div>

        {structuredSections.length > 0 ? (
          <dl className="grid gap-3 border-l border-gray-300 pl-4 dark:border-slate-700">
            {structuredSections.map((section) => (
              <div
                key={section.label}
                className="grid gap-1"
              >
                <dt className="text-xs font-semibold uppercase text-teal-700 dark:text-teal-300">
                  {section.label}
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 dark:text-gray-200">
                  {section.content}
                </dd>
              </div>
            ))}
          </dl>
        ) : null}

        <div>
          <h4 className="py-0 text-lg font-semibold">주요 포인트</h4>
          <ul className="m-0 mt-3 grid list-none gap-2 p-0">
            {highlights.map((highlight) => (
              <li
                key={highlight}
                className="border-t border-gray-200 pt-2 text-sm leading-6 text-gray-700 first:border-t-0 first:pt-0 dark:border-slate-700 dark:text-gray-200"
              >
                {highlight}
              </li>
            ))}
          </ul>
        </div>

        <ul
          aria-label={`${name} 기술 스택`}
          className="m-0 flex list-none flex-row flex-wrap gap-2 p-0"
        >
          {techStack.map((tech) => (
            <li
              key={tech}
              className="rounded-md border border-gray-300 bg-gray-50 px-2.5 py-1 text-sm text-gray-700 dark:border-slate-600 dark:bg-slate-800 dark:text-gray-200"
            >
              {tech}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2 text-xs font-semibold">
          {repoVisibility ? (
            <span className="rounded-full border border-gray-300 px-2.5 py-1 text-gray-600 dark:border-slate-600 dark:text-gray-300">
              Repository: {repoVisibility}
            </span>
          ) : null}
          {reviewAvailable ? (
            <span className="rounded-full border border-teal-300 bg-teal-50 px-2.5 py-1 text-teal-700 dark:border-teal-700 dark:bg-teal-950 dark:text-teal-300">
              검증 기록
            </span>
          ) : null}
        </div>

        {documentationLinks.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {documentationLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent("Project Documentation Open", {
                    project: name,
                    document: link.label,
                  })
                }
                className="rounded-md border border-teal-500 px-3 py-1.5 text-sm font-semibold text-teal-700 transition hover:bg-teal-50 dark:border-teal-500 dark:text-teal-300 dark:hover:bg-teal-950"
              >
                {link.label}
              </a>
            ))}
          </div>
        ) : null}

      </div>

      {hasScreenshots ? (
        <div className="flex min-w-0 flex-col gap-3">
          {selectedScreenshot ? (
            <a
              href={selectedScreenshot.src}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${selectedScreenshot.alt} 원본 이미지 새 창으로 보기`}
              onClick={() =>
                trackEvent("Project Image Open", {
                  project: name,
                  image: selectedScreenshot.alt,
                })
              }
              className="group block transform-gpu rounded-lg transition-[box-shadow,transform] duration-200 ease-out hover:-translate-y-1 hover:shadow-lg focus-visible:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white motion-reduce:transition-none dark:focus-visible:ring-offset-slate-950"
            >
              <Image
                src={selectedScreenshot.src}
                width={1280}
                height={980}
                alt={selectedScreenshot.alt}
                className="aspect-[4/3] w-full rounded-lg border border-gray-300 object-cover object-top transition group-hover:brightness-95 dark:border-slate-600"
                priority={false}
              />
            </a>
          ) : null}
          <div className="grid grid-cols-3 gap-3">
            {screenshots.map((screenshot) => (
              <button
                key={screenshot.src}
                type="button"
                aria-label={`${screenshot.alt} 크게 보기`}
                aria-pressed={selectedScreenshot?.src === screenshot.src}
                onClick={() => {
                  setSelectedScreenshot(screenshot);
                  trackEvent("Project Screenshot Select", {
                    project: name,
                    image: screenshot.alt,
                  });
                }}
                className="transform-gpu rounded-md text-left transition-[box-shadow,transform] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-white motion-reduce:transition-none dark:focus:ring-offset-slate-950"
              >
                <Image
                  src={screenshot.src}
                  width={480}
                  height={320}
                  alt={screenshot.alt}
                  className={`aspect-[4/3] w-full rounded-md border object-cover object-top transition ${
                    selectedScreenshot?.src === screenshot.src
                      ? "border-teal-500 ring-2 ring-teal-400"
                      : "border-gray-300 hover:border-teal-400 dark:border-slate-600"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </article>
  );
};

export default ProjectItem;
