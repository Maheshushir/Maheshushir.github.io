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
export const HERO_IMAGE = "https://avatars.githubusercontent.com/u/161416107?s=400&u=e99fc8656d6b4a2bed75f20c90110d919c6ccfcb&v=4";

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export const SOCIAL_STATS: SocialStat[] = [
  { label: 'Quora Followers', value: '17K+', icon: Users },
  { label: 'Content Views', value: '2.4M+', icon: Eye },
  { label: 'Contributions', value: '925+', icon: BarChart3 },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Data & Analytics",
    highlight: true,
    theme: 'blue',
    icon: Terminal,
    groups: [
      { name: "Programming & Databases", skills: ["Python", "SQL (MySQL, PostgreSQL)", "Snowflake", "AWS Athena", "DuckDB"] },
      { name: "Business Intelligence", skills: ["Power BI", "Tableau", "IBM Cognos", "Power Query", "DAX"] },
      { name: "Data Science & Analysis", skills: ["Pandas", "NumPy", "Machine Learning", "Statistical Analysis"] },
      { name: "Data Visualization", skills: ["Seaborn", "Matplotlib"] },
      { name: "Engineering Tools", skills: ["MS Excel", "GitHub", "Anaconda"] }
    ]
  },
  {
    title: "AI & Automation Suite",
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
    title: "Data Engineering & Quality",
    theme: 'blue',
    icon: Database,
    groups: [
      { name: "Pipelines & ETL", skills: ["ETL", "ELT", "Data Pipelines", "Data Modeling", "Star Schema", "Supabase", "Shopify Admin API", "REST APIs"] },
      { name: "Cloud & Warehousing", skills: ["AWS S3", "AWS Glue", "AWS Athena", "Snowflake", "DuckDB", "Parquet", "Partitioning"] },
      { name: "Data Quality", skills: ["Data Validation", "Reconciliation", "Source-to-Target Mapping", "Data Dictionaries", "Expectation Suites", "Quarantine Patterns", "CI Testing"] },
      { name: "Analytics Techniques", skills: ["RFM Segmentation", "Cohort Analysis", "Churn & Retention", "Credit Risk & Delinquency Analysis", "Inventory Turnover (ITR)"] }
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
    role: 'Data Analyst',
    company: 'HyperScale Leaders Tribe',
    companyDescriptor: 'D2C growth consultancy serving 300+ active founders',
    period: 'Dec 2024 - Present',
    type: 'Full-time',
    subRoles: [
      {
        role: 'Data Analyst',
        period: 'Mar 2025 - Present'
      },
      {
        role: 'Data Analyst, Impulse Consultancy (group company)',
        period: 'Dec 2024 - Mar 2025'
      }
    ],
    description: [
      'Powered INR 50 Cr (~$6M) in client revenue by building the RFM segmentation and retention models that directed targeting and re-activation campaigns for high-value customer cohorts.',
      'Built the centralized data & reporting layer of an internal ERP managing 300+ active founder accounts, unifying operations and inventory data and eliminating 60+ hours/month of manual reporting.',
      'Architected an end-to-end data pipeline (custom-built Shopify app to Shopify API to Supabase to dashboards) with automated daily metric delivery, owning the flow of data from source to consumption.',
      'Acted as the validation checkpoint across every stage and field before data entered the ERP, tracing data-quality issues back to the source system and reconciling spend-to-revenue and ROAS reporting.',
      'Automated repetitive Google Sheets workflows with Pabbly, saving the team an additional 40+ hours/month of manual effort.',
      'Delivered full-stack BI dashboards on Shopify Admin API data for D2C founders, and engineered a "Jewellers Dead Stock Analyser" (ITR < 3.0x) to surface slow-moving inventory capital.',
      'Launched the "Impulse Automation Hub" and delivered performance-metric reports on coach/CEO KPIs that guided resource allocation and scaling decisions.',
      'Promoted to parent company (HyperScale) within 3 months on the strength of the analytics systems delivered.'
    ]
  },
  {
    id: '2',
    role: 'Data Analyst & Data Scientist Intern',
    company: 'AI Variant',
    companyDescriptor: 'Data science and analytics services firm',
    period: 'Jan 2024 - Nov 2024',
    type: 'Internship',
    description: [
      'Built a bankruptcy-detection model (SVM, hyperparameter-tuned) at 93% accuracy, cutting estimated loan-default exposure by ~15%.',
      'Audited 30,000+ loan accounts in SQL and Power BI to surface delinquency patterns informing risk-assessment strategy.'
    ]
  },
  {
    id: '3',
    role: 'Football Data Analyst (Freelance)',
    company: 'Independent / Quora',
    period: 'Aug 2022 - Dec 2025',
    type: 'Freelance',
    description: [
      'Produced 925+ statistical match analyses for global sports media including Bleacher Report and 433.',
      'Grew an organic analytics community to 17K+ followers and 2.4M+ views through data storytelling and trend analysis.',
      'Maintained 100% data accuracy under high-pressure, live-match delivery windows.'
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
    id: 'de-1',
    title: 'NYC Taxi ETL Pipeline',
    category: 'Data Engineering',
    description: 'ETL over 9.55M real NYC TLC trip records. 369,850 invalid rows are quarantined with the rule that rejected them, so counts still reconcile exactly to source.',
    techStack: ['Python', 'DuckDB', 'SQL', 'Parquet', 'Data Quality'],
    link: 'https://github.com/Maheshushir/nyc-taxi-etl-pipeline',
    image: 'https://raw.githubusercontent.com/Maheshushir/nyc-taxi-etl-pipeline/main/outputs/charts/01_demand_surface.png',
    featured: true,
    badge: '9.5M rows'
  },
  {
    id: 'de-2',
    title: 'IMDb SQL Portfolio',
    category: 'Data Engineering',
    description: "15 queries over IMDb's full 141M-row dataset, including a recursive-CTE traversal computing degrees of separation across 18,120 actors in 2.2s.",
    techStack: ['SQL', 'DuckDB', 'Recursive CTE', 'Window Functions'],
    link: 'https://github.com/Maheshushir/imdb-sql-portfolio',
    image: 'https://raw.githubusercontent.com/Maheshushir/imdb-sql-portfolio/main/outputs/charts/01_bacon_numbers.png',
    featured: true,
    badge: '141M rows'
  },
  {
    id: 'de-3',
    title: 'Superstore Cloud Analytics',
    category: 'Data Engineering',
    description: 'Medallion pipeline to partitioned Parquet on S3, catalogued in Glue and queried via Athena. Found $135K of margin lost to discounts above 20%.',
    techStack: ['AWS S3', 'Glue', 'Athena', 'SQL', 'QuickSight'],
    link: 'https://github.com/Maheshushir/superstore-cloud-analytics',
    image: 'https://raw.githubusercontent.com/Maheshushir/superstore-cloud-analytics/main/outputs/charts/01_discount_cliff.png',
    featured: true,
    badge: 'AWS Pipeline'
  },
  {
    id: 'de-4',
    title: 'Netflix ELT & Data Cleaning',
    category: 'Data Engineering',
    description: 'Layered staging-to-marts ELT with 10 data tests, correcting defects that made a naive distinct-country count report 681 instead of the real 117.',
    techStack: ['SQL', 'DuckDB', 'dbt-style Modelling', 'Data Testing'],
    link: 'https://github.com/Maheshushir/netflix-elt-data-cleaning',
    image: 'https://raw.githubusercontent.com/Maheshushir/netflix-elt-data-cleaning/main/outputs/charts/01_cleaning_impact.png',
    featured: true,
    badge: 'Tested ELT'
  },
  {
    id: 'de-5',
    title: 'Yelp Reviews on Snowflake',
    category: 'Data Engineering',
    description: 'S3 external stage to a VARIANT landing table to a flattened star schema, with a lexicon sentiment score validated against held-out star ratings.',
    techStack: ['Snowflake', 'AWS S3', 'Python', 'SQL', 'Text Analytics'],
    link: 'https://github.com/Maheshushir/yelp-reviews-snowflake',
    image: 'https://raw.githubusercontent.com/Maheshushir/yelp-reviews-snowflake/main/outputs/charts/01_length_and_intensity.png',
    featured: true,
    badge: 'Snowflake'
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
    link: 'https://github.com/Maheshushir/Treasury-Exchange-Rate-Report',
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