export interface Project {
  id: string;
  number: string;
  sector: string;
  title: string;
  problem: string;
  description: string;
  fullDescription: string;
  stack: string[];
  metrics?: string;
  liveUrl?: string;
  badgeText?: string;
}
