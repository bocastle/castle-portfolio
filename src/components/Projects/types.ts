export type ProjectScreenshot = {
  src: string;
  alt: string;
};

export type ProjectDocumentationLink = {
  label: string;
  href: string;
};

export type Project = {
  id: string;
  name: string;
  type: string;
  period: string;
  role?: string;
  problem?: string;
  solution?: string;
  result?: string;
  aiUsage?: string;
  repoVisibility?: "public" | "private";
  reviewAvailable?: boolean;
  summary: string;
  description: string;
  highlights: string[];
  techStack: string[];
  screenshots: ProjectScreenshot[];
  documentationLinks?: ProjectDocumentationLink[];
  repositoryNote: string;
};
