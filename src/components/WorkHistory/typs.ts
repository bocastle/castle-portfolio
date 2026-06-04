export interface WorkHistorProps {
  id: number;
  name: string;
  position: string;
  period: string[];
  imgSrc: string;
  summary?: string;
  domain?: string;
  featured?: boolean;
  techStack?: string[];
  topHighlights?: string[];
}
