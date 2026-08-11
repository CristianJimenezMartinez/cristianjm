export interface ServiceOffering {
  id: string;
  icon: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  setupPrice: string;
  recurringPrice?: string;
  ctaLabel: string;
  popular?: boolean;
}
