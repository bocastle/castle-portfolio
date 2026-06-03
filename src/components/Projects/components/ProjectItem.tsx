"use client";

import Image from "next/image";
import { useState } from "react";
import { Project } from "../types";

const ProjectItem = ({
  name,
  type,
  period,
  summary,
  description,
  highlights,
  techStack,
  screenshots,
  repositoryNote,
}: Project) => {
  const initialScreenshot = screenshots[1] ?? screenshots[0];
  const [selectedScreenshot, setSelectedScreenshot] =
    useState(initialScreenshot);

  return (
    <article className="grid gap-6 md:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)]">
      <div className="flex flex-col gap-5">
        <div>
          <p className="text-sm font-semibold text-teal-700 dark:text-teal-300">
            {type}
          </p>
          <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <h3>{name}</h3>
            <span className="text-sm text-gray-500 dark:text-gray-300">
              {period}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-3 text-base leading-7 text-gray-700 dark:text-gray-200">
          <p>{summary}</p>
          <p>{description}</p>
        </div>
        <div>
          <h4 className="text-xl">주요 포인트</h4>
          <ul className="text-gray-700 dark:text-gray-200">
            {highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </div>
        <div className="flex flex-wrap gap-2">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-gray-300 px-2.5 py-1 text-sm text-gray-700 dark:border-slate-600 dark:text-gray-200"
            >
              {tech}
            </span>
          ))}
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-300">
          {repositoryNote}
        </p>
      </div>
      <div className="flex flex-col gap-3">
        {selectedScreenshot ? (
          <a
            href={selectedScreenshot.src}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${selectedScreenshot.alt} 원본 이미지 새 창으로 보기`}
            className="group block"
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
              onClick={() => setSelectedScreenshot(screenshot)}
              className="rounded-md text-left focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-950"
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
    </article>
  );
};

export default ProjectItem;
