export interface ProjectPillar {
  icon?: string;
  title: string;
  description: string;
}

export interface MetricItem {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  number: string;
  slug: string;
  sector: string;
  title: string;
  tagline: string;
  problem: string;
  challenge: string;
  solution: string;
  description: string;
  fullDescription: string;
  stack: string[];
  metrics?: string;
  metricsList?: MetricItem[];
  liveUrl?: string;
  externalUrl?: string;
  badgeText?: string;
  role: string;
  year: string;
  pillars?: ProjectPillar[];
  keyFeatures?: string[];
  architectureDetails?: string[];
}
