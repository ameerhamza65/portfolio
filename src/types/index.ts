export type ProjectRole = 'Solo' | 'Team' | 'Led team';

export interface Project {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  role: ProjectRole;
  roleDetails?: string;
  techTags: string[];
  keyOutcomes: string[];
  liveUrl?: string;
  domain?: string;
  isPrivate?: boolean;
  featured: boolean;
  category: 'Government' | 'Enterprise' | 'Social' | 'Real-time' | 'AI & Web';
  screenshots: {
    desktop: string;
    mobile?: string;
  };
  allowIframe?: boolean;
}

export interface SkillGroup {
  category: string;
  description?: string;
  skills: {
    name: string;
    level?: 'Advanced' | 'Proficient' | 'Core';
    iconName?: string;
  }[];
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  location?: string;
  description: string[];
  technologies: string[];
  highlight?: string;
}

export interface StatItem {
  value: string;
  label: string;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar?: string;
  quote: string;
}

