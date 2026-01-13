import { 
  BarChart3, 
  Users, 
  Eye, 
  Brain, 
  Database, 
  LineChart 
} from 'lucide-react';
import { Project, Experience, SocialStat, SkillCategory, NavItem } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export const SOCIAL_STATS: SocialStat[] = [
  { label: 'Quora Followers', value: '17K+', icon: Users },
  { label: 'Content Views', value: '2.3M+', icon: Eye },
  { label: 'Contributions', value: '700+', icon: BarChart3 },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "AI & Automation Suite",
    highlight: true,
    groups: [
      { name: "LLM Mastery", skills: ["ChatGPT", "Gemini", "Claude", "Perplexity", "DeepSeek"] },
      { name: "Workflow & Agentic Logic", skills: ["n8n", "Make.com", "Relevance AI", "Copilot"] },
      { name: "AI-Native Prototyping", skills: ["Google AI Studio", "Lovable", "Anti-gravity", "Manus", "Canva (AI Features)"] },
      { name: "AI Video & Content", skills: ["HeyGen", "Gamma"] },
      { name: "Next-Gen Development", skills: ["Cursor"] }
    ]
  },
  {
    title: "Technical Arsenal",
    groups: [
      { name: "Programming & Databases", skills: ["Python", "SQL (MySQL)"] },
      { name: "Business Intelligence", skills: ["Power BI", "Tableau", "IBM Cognos"] },
      { name: "Data Science & Analysis", skills: ["Pandas", "NumPy", "Machine Learning", "Statistical Analysis"] },
      { name: "Data Visualization", skills: ["Seaborn", "Matplotlib"] },
      { name: "Engineering Tools", skills: ["MS Excel", "GitHub", "Anaconda"] }
    ]
  },
  {
    title: "Non-Technical Expertise",
    groups: [
      { name: "Strategic Thinking", skills: ["Critical thinking", "Business Understanding"] },
      { name: "Leadership & Management", skills: ["Team leading", "Project Management"] },
      { name: "Communication", skills: ["Data Storytelling", "Collaboration", "Presentation"] }
    ]
  }
];

export const EXPERIENCE: Experience[] = [
  {
    id: '1',
    role: 'Data Analyst | Automation Strategist',
    company: 'HyperScale Leaders Tribe',
    period: 'Mar 2025 – Present',
    type: 'Full-time',
    description: [
      'Leading multi-niche projects using advanced data strategies and automation tools.',
      'Building scalable solutions for coaches and business leaders across industries.',
      'Spearheading analytics initiatives informed by earlier success at IMpulse Consultancy.'
    ]
  },
  {
    id: '2',
    role: 'Data Analyst | Automation Strategist',
    company: 'IMpulse Consultancy',
    period: 'Dec 2024 – Mar 2025',
    type: 'Full-time',
    description: [
      'Led data analysis on coaches, CEOs, and business performance, guiding strategic decisions.',
      'Developed and launched Impulse Automation Hub from market research and insights.',
      'Contributed to building consultancy offerings by blending data analytics with automation strategies.'
    ]
  },
  {
    id: '3',
    role: 'Freelance Sports Analyst | Mod',
    company: 'QUORA',
    period: 'Aug 2022 – Present',
    type: 'Freelance',
    description: [
      'Built a thriving community of over 17,000 dedicated followers.',
      'Curated 600+ insightful contributions with statistical analysis and live coverage.',
      'Generated 2.3M+ views through consistent, high-quality content strategies.'
    ]
  },
  {
    id: '4',
    role: 'Data Analyst & Data Scientist Intern',
    company: 'AI Variant',
    period: 'Jan 2024 – Nov 2024',
    type: 'Internship',
    description: [
      'Hands-on experience utilizing Python for data analysis and ML tasks.',
      'Utilized various tools including Excel, Power BI, IBM Cognos, Tableau & SQL.',
      'Implemented machine learning algorithms for business insights.'
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'spotlight-1',
    title: 'Jeweller Dead Stock Auditor',
    category: 'Data Analysis',
    description: 'Focuses on Descriptive Analytics—taking historical inventory data and visualizing "trapped capital" for liquidation strategies.',
    techStack: ['Inventory Intelligence', 'Relational Logic', 'Business Automation'],
    link: 'https://jeweller-dead-stock-auditor.vercel.app/',
    image: 'https://picsum.photos/seed/jeweller/800/600',
    featured: true,
    spotlight: true
  },
  {
    id: 'spotlight-2',
    title: 'D2C Analytics Pro',
    category: 'Data Science',
    description: 'Focuses on Predictive & Prescriptive Analytics—using RFM and Churn logic to forecast future customer behavior and retention.',
    techStack: ['RFM Segmentation', 'Predictive Analytics', 'Growth Engineering'],
    link: 'https://d2c-analytics-pro.vercel.app/',
    image: 'https://picsum.photos/seed/d2c/800/600',
    featured: true,
    spotlight: true
  },
  {
    id: '1',
    title: 'Euro Tournament 2024 Dashboard',
    category: 'Sports Analytics',
    description: 'Client demand-based creative dashboard for UEFA Euro 1960-2024 stats. Statistics of finals with a tournament summary.',
    techStack: ['Power BI', 'Excel', 'Data Viz'],
    link: '#', 
    image: 'https://picsum.photos/seed/euro/800/600',
    featured: true
  },
  {
    id: '2',
    title: 'Bank Analytics',
    category: 'Data Analysis',
    description: 'Comprehensive review of loan repayment data across 30,000 accounts. Identified patterns informing risk assessment strategies leading to reduced delinquency.',
    techStack: ['SQL', 'Power BI', 'Tableau', 'Excel'],
    link: '#',
    image: 'https://picsum.photos/seed/bank/800/600',
    featured: false
  },
  {
    id: '3',
    title: 'Bankruptcy Detection',
    category: 'Data Science',
    description: 'Developed a Support Vector Classifier (SVC) model to predict bankruptcy, achieving 93% accuracy with hyperparameter tuning.',
    techStack: ['Python', 'Scikit-Learn', 'ML'],
    link: '#',
    image: 'https://picsum.photos/seed/ml/800/600',
    featured: false
  },
  {
    id: '4',
    title: 'Retail Analysis (Quantium)',
    category: 'Data Analysis',
    description: 'In-depth exploration of customer purchasing behavior and sales trends targeting chip categories with soaring demand.',
    techStack: ['Data Analysis', 'Python', 'Commercial Insights'],
    link: '#',
    image: 'https://picsum.photos/seed/retail/800/600',
    featured: false
  }
];

export const CONTACT_INFO = {
  email: '135790mahesh@gmail.com',
  phone: '+91 7796463777',
  location: 'Pune, India',
  linkedin: 'https://www.linkedin.com/in/mahesh-ushir/',
  github: 'https://github.com/maheshushir',
  telegram: 'https://t.me/Grimreaper47'
};