import React from 'react';

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  techStack: string[];
  link?: string;
  image: string;
  featured?: boolean;
  spotlight?: boolean; // New property for Flagship apps
  live?: boolean; // New property for Live App badge on standard cards
  badge?: string; // Custom text for the badge (e.g., "Predictive Model")
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string[];
  type: 'Full-time' | 'Freelance' | 'Internship';
}

export interface SocialStat {
  label: string;
  value: string;
  icon: React.ElementType;
}

export interface Skill {
  name: string;
  category: 'Technical' | 'Non-Technical' | 'Tools';
}

export interface NavItem {
  label: string;
  href: string;
}

export interface SkillGroup {
  name: string;
  skills: string[];
}

export interface SkillCategory {
  title: string;
  groups: SkillGroup[];
  highlight?: boolean; // To give extra emphasis to AI/Automation
}