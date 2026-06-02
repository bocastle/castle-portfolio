export type ProjectScreenshot = {
  src: string;
  alt: string;
};

export type Project = {
  id: string;
  name: string;
  type: string;
  period: string;
  summary: string;
  description: string;
  highlights: string[];
  techStack: string[];
  screenshots: ProjectScreenshot[];
  repositoryNote: string;
};
