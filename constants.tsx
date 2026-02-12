import { 
  BarChart3, 
  Users, 
  Eye, 
  Brain, 
  Database, 
  LineChart,
  Zap,
  Terminal,
  Cpu
} from 'lucide-react';
import { Project, Experience, SocialStat, SkillCategory, NavItem } from './types';

// Using GitHub profile image for reliability.
// To use a local image, save it as 'hero.png' in the 'public' folder and set this to "/hero.png"
export const HERO_IMAGE = "https://github.com/maheshushir.png";

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
    theme: 'emerald',
    icon: Zap,
    groups: [
      { name: "LLM Mastery", skills: ["ChatGPT", "Gemini", "Claude", "Perplexity", "DeepSeek"] },
      { name: "Workflow & Agentic Logic", skills: ["n8n", "Make.com", "Power Automate Cloud", "Relevance AI", "Copilot"] },
      { name: "AI-Native Prototyping", skills: ["Google AI Studio", "Lovable", "Anti-gravity", "Manus", "Canva (AI Features)"] },
      { name: "AI Video & Content", skills: ["HeyGen", "Gamma"] },
      { name: "Next-Gen Development", skills: ["Cursor"] }
    ]
  },
  {
    title: "Technical Arsenal",
    theme: 'blue',
    icon: Terminal,
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
    theme: 'violet',
    icon: Users,
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
      'Architected a full-stack BI dashboard integrated with Shopify API signals, automating multi-niche reporting for 50+ founders and reclaiming 15+ hours/week of CEO operational time.',
      'Engineered a "Jewellers Dead Stock Analyser" implementing ITR logic to identify slow-moving capital (ITR < 3.0x) in gold and diamond assets for high-value manufacturers.',
      'Developed automated modules for RFM Segmentation and Retention Funnels, improving client decision-making speed by 40% via real-time visibility into unit economics and fiscal health.',
      'Managed direct feedback loops with CEOs to translate complex business friction into automated software logic with a 100% adoption rate across the community of D2C founders.'
    ]
  },
  {
    id: '2',
    role: 'Data Analyst | Automation Strategist',
    company: 'IMpulse Consultancy',
    period: 'Dec 2024 – Mar 2025',
    type: 'Full-time',
    description: [
      'Launched the "Impulse Automation Hub" portal, blending market research with data-driven workflow strategies to scale consultancy offerings and performance auditing.',
      'Delivered strategic reports on coach and CEO performance metrics that guided high-level resource allocation and internal scaling strategies.',
      'Promoted to the parent company (HyperScale) within 3 months based on the technical success and scalability of the developed systems.'
    ]
  },
  {
    id: '3',
    role: 'Freelance Sports Analyst | Mod',
    company: 'QUORA',
    period: 'Aug 2022 – Present',
    type: 'Freelance',
    description: [
      'Processed 715+ match narratives and statistical deep-dives for global media leaders including Bleacher Report and 433.',
      'Delivered comprehensive tactical scouting and live-match performance tracking meeting international coverage standards.',
      'Scaled organic Quora community to 17K+ followers and 2.3M+ views via data storytelling and trend analysis.',
      'Ensured 100% data accuracy for international clients under high-pressure, live-match delivery windows.'
    ]
  },
  {
    id: '4',
    role: 'Data Analyst & Data Scientist Intern',
    company: 'AI Variant',
    period: 'Jan 2024 – Nov 2024',
    type: 'Internship',
    description: [
      'Developed a Bankruptcy Detection model achieving 93% accuracy, reducing potential loan default exposure for banking clients by an estimated 15%.',
      'Audited 30,000+ loan accounts using SQL and Power BI to identify delinquency patterns and inform risk assessment strategies.'
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
    image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?fm=webp&fit=crop&q=80&w=800',
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
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?fm=webp&fit=crop&q=80&w=800',
    featured: true,
    spotlight: true
  },
  {
    id: '5',
    title: 'Global Weather Intelligence Repository',
    category: 'Data Analysis',
    description: 'Real-time global monitoring system utilizing Power BI and Excel to track atmospheric variables across multiple regions.',
    techStack: ['Power BI', 'Excel', 'Real-time Reporting'],
    link: 'https://github.com/Maheshushir/Global-Weather-Repository-',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?fm=webp&fit=crop&q=80&w=800',
    featured: true
  },
  {
    id: '1',
    title: 'Euro Tournament 2024 Dashboard',
    category: 'Sports Analytics',
    description: 'Client demand-based creative dashboard for UEFA Euro 1960-2024 stats. Statistics of finals with a tournament summary.',
    techStack: ['Power BI', 'Excel', 'Data Viz'],
    link: 'https://www.linkedin.com/posts/mahesh-ushir_uefaeuro-freelanceventure-footballhistory-activity-7238935442962665472-lYqf?utm_source=share&utm_medium=member_desktop', 
    image: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?fm=webp&fit=crop&q=80&w=800',
    featured: true
  },
  {
    id: '2',
    title: 'Bank Analytics',
    category: 'Data Analysis',
    description: 'Comprehensive review of loan repayment data across 30,000 accounts. Identified patterns informing risk assessment strategies leading to reduced delinquency.',
    techStack: ['SQL', 'Power BI', 'Tableau', 'Excel'],
    link: 'https://github.com/Maheshushir/Bank_Analytics',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?fm=webp&fit=crop&q=80&w=800',
    featured: false
  },
  {
    id: '3',
    title: 'Bankruptcy Detection',
    category: 'Data Science',
    description: 'Developed a Support Vector Classifier (SVC) model to predict bankruptcy, achieving 93% accuracy with hyperparameter tuning.',
    techStack: ['Python', 'Scikit-Learn', 'ML'],
    link: 'https://github.com/Maheshushir/BANKRUPTCY_PROJECT',
    image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?fm=webp&fit=crop&q=80&w=800',
    featured: false
  },
  {
    id: '4',
    title: 'Retail Analysis (Quantium)',
    category: 'Data Analysis',
    description: 'In-depth exploration of customer purchasing behavior and sales trends targeting chip categories with soaring demand.',
    techStack: ['Data Analysis', 'Python', 'Commercial Insights'],
    link: 'https://www.linkedin.com/posts/mahesh-ushir_update-i-completed-part-2-and-final-stage-activity-7240617791744065536-XGRR?utm_source=share&utm_medium=member_desktop&rcm=ACoAADX7iq8BhTPW1dIGxiwHFZfNjMTkYfHbJqk',
    image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?fm=webp&fit=crop&q=80&w=800',
    featured: false
  },
  {
    id: '6',
    title: 'Global Treasury & Currency Intelligence',
    category: 'Data Analysis',
    description: 'Developed a comprehensive treasury analytics suite monitoring 93 global currencies against the USD to support strategic financial decision-making.',
    techStack: ['Power BI', 'Excel', 'Financial Modeling', 'FX Analytics'],
    link: 'https://www.linkedin.com/posts/mahesh-ushir_global-weather-repository-power-bi-dashboard-activity-7273362289834008576-UUbP?utm_source=share&utm_medium=member_desktop&rcm=ACoAADX7iq8BhTPW1dIGxiwHFZfNjMTkYfHbJqk',
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?fm=webp&fit=crop&q=80&w=800',
    featured: true
  },
  {
    id: '7',
    title: 'Telecom Customer Churn Predictor',
    category: 'Data Science',
    description: 'Engineered a predictive intelligence system to forecast customer attrition using advanced machine learning algorithms to identify at-risk segments.',
    techStack: ['Python', 'XGBoost', 'SMOTE', 'Predictive Modeling'],
    link: 'https://telecomechurnprediction-7prokjhha4796ddws2pcxj.streamlit.app/',
    image: 'https://images.unsplash.com/photo-1534224039826-c7a0eda0e6b3?fm=webp&fit=crop&q=80&w=800',
    featured: true,
    live: true,
    badge: 'Predictive Model'
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