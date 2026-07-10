export type WhyUsItem = { title: string; desc: string };
export type Testimonial = { text: string; author: string; role: string };
export type StatItem = { target: number; decimals: number; suffix: string; label: string };
export type OneStopCard = { title: string; desc: string };

export type ResourceSection = { heading: string; body: string };

export type ResourceItem = {
  _id: string;
  tab: 'articles' | 'downloads';
  title: string;
  category?: string;
  order: number;
  // article fields
  slug?: string;
  excerpt?: string;
  date?: string;
  readTime?: string;
  author?: string;
  img?: string;
  sections?: ResourceSection[];
  keyTakeaways?: string[];
  // download fields
  desc?: string;
  size?: string;
  format?: string;
  downloadType?: 'Download' | 'Resource';
  fileUrl?: string;
};

export type InsightCard = {
  category: string;
  title: string;
  desc: string;
  img: string;
  date: string;
  articleUrl: string;
};

export type HomeContent = {
  _id?: string;
  heroLine1: string;
  heroPhrases: string[];
  heroLine2: string;
  heroDescription: string;
  heroVideoUrl: string;
  heroImage1Url: string;
  heroImage2Url: string;
  ctaPrimaryText: string;
  ctaSecondaryText: string;
  oneStopLabel: string;
  oneStopTitle: string;
  oneStopCards: OneStopCard[];
  whyUsLogoUrl: string;
  whyUsHeading: string;
  whyUsBody: string;
  whyUsItems: WhyUsItem[];
  servicesPreviewLabel: string;
  servicesPreviewTitle: string;
  servicesPreviewDescription: string;
  testimonialsHeading: string;
  testimonials: Testimonial[];
  stats: StatItem[];
  featuredServiceSlugs: string[];
  latestInsights: InsightCard[];
};

export type Deliverable = { title: string; desc: string };

export type ServiceContent = {
  _id: string;
  slug: string;
  title: string;
  img: string;
  desc: string;
  headline?: string;
  subhead?: string;
  intro?: string;
  body?: string;
  deliverables?: Deliverable[];
  order?: number;
};

export type JobContent = {
  _id: string;
  slug: string;
  title: string;
  location: string;
  type: string;
  department: string;
  experience: string;
  category: 'internal' | 'client';
  about: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
  ctc: string;
  postedOn: string;
};
