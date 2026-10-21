// Every fact on the site lives here. Figures are taken from the previous
// site, the project repositories or the dashboards themselves; nothing is
// estimated. When a number changes, change it here only.

export const SITE_URL = 'https://maheshushir.vercel.app';

export const PROFILE = {
  name: 'Mahesh Ushir',
  role: 'Data Analyst & Strategist',
  location: 'Pune, India',
  availability: 'Open to Data Analyst roles',
  photo: '/mahesh-ushir.webp',
  resume:
    'https://drive.google.com/file/d/1y_mLwTdoD25GG-w4jahcvqy8OkErxuf5/view?usp=sharing',
};

export const CONTACT = {
  email: '135790mahesh@gmail.com',
  phone: '+91 7796463777',
  linkedin: 'https://www.linkedin.com/in/mahesh-ushir/',
  github: 'https://github.com/maheshushir',
  telegram: 'https://t.me/Grimreaper47',
  telegramHandle: '@Grimreaper47',
};

export const NAV = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Expertise', id: 'expertise' },
  { label: 'Projects', id: 'projects' },
  { label: 'Experience', id: 'experience' },
  { label: 'Contact', id: 'contact' },
] as const;

export type Metric = {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

export const HERO_METRICS: Metric[] = [
  { value: 50, prefix: '₹', suffix: ' Cr', label: 'Client revenue driven by RFM and retention models' },
  { value: 100, suffix: '+', label: 'Hours a month of manual reporting automated away' },
  { value: 141, suffix: 'M', label: 'Rows of IMDb data queried in pure SQL' },
];

export const ABOUT = {
  intro:
    'I’m a Data Analyst with 2.5+ years of turning raw business data into revenue and decisions across D2C, retail and financial-services data.',
  body: [
    'At HyperScale Leaders Tribe I built the RFM segmentation and retention models behind INR 50 Cr (~$6M) of client revenue, and the reporting layer of an internal ERP that serves 300+ active founder accounts.',
    'My work sits where analysis meets engineering: SQL and Python for the hard questions, Power BI and Tableau for the answers people actually read, and automation (n8n, Pabbly, Shopify Admin API, Supabase) so the same report never has to be built by hand twice.',
  ],
  principles: [
    {
      title: 'Start from the decision',
      text: 'Every dashboard begins with the question a stakeholder has to answer, not with the data that happens to be available.',
    },
    {
      title: 'Never drop a row silently',
      text: 'Invalid data is quarantined and explained, so totals reconcile to source and every exclusion can be argued about.',
    },
    {
      title: 'Automate the second time',
      text: 'If a report is built twice, it becomes a pipeline. That habit has returned 100+ hours a month to the teams I work with.',
    },
  ],
  stats: [
    { value: '925+', label: 'Statistical match analyses published' },
    { value: '2.4M+', label: 'Views on data-storytelling content' },
    { value: '17K+', label: 'Followers on Quora' },
  ],
  quote: {
    text: 'Without data, you’re just another person with an opinion.',
    by: 'W. Edwards Deming',
  },
};

export type SkillArea = {
  title: string;
  summary: string;
  skills: string[];
};

export const EXPERTISE: SkillArea[] = [
  {
    title: 'Data Analytics',
    summary: 'Querying, shaping and testing data until it answers a business question.',
    skills: ['SQL (MySQL, PostgreSQL)', 'Python', 'Pandas', 'NumPy', 'Excel', 'Statistical analysis'],
  },
  {
    title: 'Business Intelligence',
    summary: 'Dashboards built for the person who has to act on them.',
    skills: ['Power BI', 'DAX', 'Power Query', 'Tableau', 'IBM Cognos', 'Matplotlib', 'Seaborn'],
  },
  {
    title: 'Data Engineering & Quality',
    summary: 'Pipelines that are idempotent, tested and reconcile to source.',
    skills: [
      'ETL / ELT pipelines',
      'Star-schema modelling',
      'DuckDB',
      'Snowflake',
      'AWS S3 · Glue · Athena',
      'Parquet',
      'Validation & reconciliation',
      'Source-to-target mapping',
      'CI testing',
    ],
  },
  {
    title: 'Analytical Techniques',
    summary: 'The methods behind segmentation, retention and risk work.',
    skills: [
      'RFM segmentation',
      'Cohort analysis',
      'Churn & retention',
      'Credit risk & delinquency',
      'Inventory turnover (ITR)',
      'Machine learning (SVM, XGBoost)',
    ],
  },
  {
    title: 'Automation & AI',
    summary: 'Removing the manual steps between data and the people who need it.',
    skills: [
      'n8n',
      'Make.com',
      'Pabbly',
      'Power Automate',
      'Shopify Admin API',
      'Supabase',
      'REST APIs',
      'LLM tooling (Claude, ChatGPT, Gemini)',
    ],
  },
  {
    title: 'Communication',
    summary: 'Making the finding land with people who don’t read SQL.',
    skills: ['Data storytelling', 'Presentation', 'Stakeholder collaboration', 'Project management', 'Team leading'],
  },
];

// `matte` sits light-background charts on paper so they read as prints, not glare.
export type Image = { src: string; alt: string; width: number; height: number; caption?: string; matte?: boolean };
export type Link = { label: string; href: string };

export type CaseStudy = {
  context: string;
  approach: { title: string; text: string }[];
  findings: { figure: string; text: string }[];
  outcome: string;
  gallery: Image[];
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  problem: string;
  outcome: string;
  stack: string[];
  links: Link[];
  cover?: Image;
  facts?: { value: string; label: string }[];
  caseStudy?: CaseStudy;
};

export const FEATURED: Project[] = [
  {
    slug: 'bank-analytics',
    title: 'Bank Analytics',
    category: 'Credit risk · BI',
    problem:
      'A lender needs one view of its loan book: how much is lent, funded and repaid, and where risk concentrates by grade, state and borrower profile.',
    outcome:
      'Reviewed loan repayment data across 30,000 accounts and surfaced the patterns that informed the risk-assessment strategy.',
    stack: ['SQL', 'Power BI', 'Tableau', 'Excel'],
    links: [{ label: 'GitHub', href: 'https://github.com/Maheshushir/Bank_Analytics' }],
    cover: {
      src: '/work/bank-analytics-powerbi.webp',
      alt: 'Bank Analytics Power BI dashboard showing $444.54M loan amount, $433.80M funded, $530.32M revolving balance, year-wise loan growth, revolving balance by grade and loan status by state.',
      width: 1001,
      height: 561,
    },
    facts: [
      { value: '$444.54M', label: 'Loan amount' },
      { value: '$433.80M', label: 'Funded amount' },
      { value: '$530.32M', label: 'Revolving balance' },
    ],
    caseStudy: {
      context:
        'Loan-level bank data covering loan purpose, grade and sub-grade, home ownership, verification status, state and repayment status for roughly 30,000 accounts. The work ran in four phases, each in a different tool, so the same KPIs were checked against each other.',
      approach: [
        { title: 'Excel', text: 'Cleaned and prepared the loan and customer data, and built a first interactive dashboard of the key metrics.' },
        { title: 'SQL', text: 'Extracted the KPIs with SQL queries: loan performance, funded versus requested amounts, repayment and customer behaviour.' },
        { title: 'Power BI', text: 'Built the interactive dashboard: slicers for home ownership, loan status and month, with drill-downs by grade, state and year.' },
        { title: 'Tableau', text: 'Rebuilt the analysis as a Tableau workbook to highlight trends, patterns and outliers for a second audience.' },
      ],
      findings: [
        { figure: '$2.2M → $260.5M', text: 'Annual loan volume grows more than a hundredfold across the period on the dashboard.' },
        { figure: '$160.89M', text: 'Grade B carries the largest revolving balance of any grade, ahead of A ($114.58M) and C ($109.97M).' },
        { figure: '58.9%', text: 'Share of total payments that come from verified borrowers, against 41.1% from unverified ones.' },
        { figure: '2.72K', text: 'Texas leads the state-wise loan-status count, roughly double the next state, Virginia (1.40K).' },
      ],
      outcome:
        'A single loan-book view that risk teams can slice by grade, state, ownership and verification, with KPIs reconciled across Excel, SQL, Power BI and Tableau. The delinquency patterns it surfaced informed the risk-assessment strategy.',
      gallery: [
        {
          src: '/work/bank-analytics-powerbi.webp',
          alt: 'Full Bank Analytics Power BI dashboard.',
          width: 1001,
          height: 561,
          caption: 'Power BI dashboard: KPIs, year-wise volume, grade-wise revolving balance, verification split, state-wise loan status and home ownership.',
        },
      ],
    },
  },
  {
    slug: 'nyc-taxi-etl-pipeline',
    title: 'NYC Taxi ETL Pipeline',
    category: 'Data engineering · Data quality',
    problem:
      'Public taxi data is full of impossible trips. Drop them silently and nobody can audit the totals; keep them and every average is wrong.',
    outcome:
      '9,554,778 real trips validated against 13 declared expectations. 369,850 invalid rows are quarantined with the rule that rejected them, so loaded + quarantined reconciles exactly to source.',
    stack: ['Python', 'DuckDB', 'SQL', 'Parquet', 'GitHub Actions CI'],
    links: [{ label: 'GitHub', href: 'https://github.com/Maheshushir/nyc-taxi-etl-pipeline' }],
    cover: {
      src: '/work/nyc-taxi-demand-surface.webp', matte: true,
      alt: 'Heatmap of NYC taxi trips by weekday and hour, peaking on Thursday at 18:00.',
      width: 1475,
      height: 664,
    },
    facts: [
      { value: '9.55M', label: 'Trips processed' },
      { value: '369,850', label: 'Rows quarantined' },
      { value: '53,134', label: 'Rows per second' },
    ],
    caseStudy: {
      context:
        'Q1 2024 trip records from the NYC Taxi & Limousine Commission, pulled from the TLC CDN as Parquet: 9,554,778 trips across three monthly files, loaded into a DuckDB star schema with 265 zones.',
      approach: [
        { title: 'Extract', text: 'Idempotent download staged to .part files and renamed on success, with a SHA-256 and size manifest so files are never fetched twice.' },
        { title: 'Transform', text: 'Streamed through DuckDB: normalised column names, derived duration, speed, tip % and fare per mile, then evaluated 13 expectations declared as data with a severity and rationale.' },
        { title: 'Load', text: 'HARD failures go to a quarantine table tagged with the failing rule; SOFT failures load as boolean flags. Each month is replaced inside one transaction, and the load aborts if loaded + quarantined ever differs from rows read.' },
        { title: 'Analyse', text: 'Ten SQL analyses over the warehouse, each stating its own exclusions in its WHERE clause, rendered to charts and reports.' },
      ],
      findings: [
        { figure: '55×', text: 'Demand swings across the week: Thursday 18:00 books 116,292 trips, Tuesday 03:00 books 2,118.' },
        { figure: '52%', text: 'Manhattan speeds collapse from 18.2 mph at 05:00 to 8.7 mph at 15:00, so the same mile costs 33% more at the daytime peak.' },
        { figure: '44%', text: 'Airport trips earn more per minute ($2.25 vs $1.56) and are 9.3% of trips but 26.3% of revenue.' },
        { figure: '1,443,334 mph', text: 'The maximum “average speed” before filtering sub-minute trips: a number wrong by five orders of magnitude.' },
      ],
      outcome:
        'A production-shaped pipeline that converges on the same warehouse state no matter how often it runs, with every rejected row preserved, counted and explained, and CI that keeps it that way.',
      gallery: [
        { src: '/work/nyc-taxi-quarantine.webp', matte: true, alt: 'Bar chart of quarantined rows by failing rule, led by zero distance and negative money.', width: 1154, height: 664, caption: 'Quarantine composition: 369,850 rows, each tagged with the rule it failed.' },
        { src: '/work/nyc-taxi-congestion.webp', matte: true, alt: 'Line chart of average taxi speed by hour for Manhattan and outer boroughs.', width: 1189, height: 943, caption: 'Manhattan speeds halve by mid-afternoon; outer boroughs never drop below 17.4 mph.' },
        { src: '/work/nyc-taxi-airport-economics.webp', matte: true, alt: 'Chart comparing revenue per minute for airport and non-airport trips.', width: 1143, height: 664, caption: 'Airport runs earn 44% more per minute.' },
        { src: '/work/nyc-taxi-zone-concentration.webp', matte: true, alt: 'Ranked bar chart of revenue by pickup zone with JFK and LaGuardia on top.', width: 1234, height: 873, caption: 'JFK and LaGuardia out-earn every Manhattan neighbourhood.' },
      ],
    },
  },
  {
    slug: 'telecom-churn-prediction',
    title: 'Telecom Churn Prediction',
    category: 'Machine learning · Retention',
    problem:
      'Telecom customers who are about to leave look like everyone else until they’re gone. The question is who is at risk early enough to act.',
    outcome:
      'A churn classifier trained on 20 customer features, with class imbalance handled by SMOTE, deployed as a live Streamlit app that scores a customer on demand.',
    stack: ['Python', 'XGBoost', 'SMOTE', 'Streamlit'],
    links: [
      { label: 'Live app', href: 'https://telecomechurnprediction-7prokjhha4796ddws2pcxj.streamlit.app/' },
      { label: 'GitHub', href: 'https://github.com/Maheshushir/Telecom_Churn_Prediction' },
    ],
    facts: [
      { value: '20', label: 'Customer features' },
      { value: 'Live', label: 'Streamlit deployment' },
    ],
    caseStudy: {
      context:
        'Customer records from a telecom provider with 20 features covering account length, voice and international plans, day/evening/night/international minutes, calls and charges, and customer-service calls. The target is whether the customer churned.',
      approach: [
        { title: 'Preprocess', text: 'Handled missing values, normalised numerical features and encoded categorical ones such as state and plan flags.' },
        { title: 'Engineer', text: 'Adjusted and derived features from usage and charges to improve predictive power.' },
        { title: 'Model', text: 'Trained classifiers including XGBoost, using SMOTE to rebalance the minority churn class.' },
        { title: 'Evaluate & deploy', text: 'Compared models on accuracy, precision, recall and F1, then deployed the chosen model as a Streamlit app.' },
      ],
      findings: [],
      outcome:
        'A working, publicly accessible churn scorer: enter a customer’s plan and usage profile and get a churn prediction, the starting point for targeted retention.',
      gallery: [],
    },
  },
  {
    slug: 'uefa-euro-dashboard',
    title: 'UEFA EURO 1960–2024',
    category: 'Sports analytics · Freelance',
    problem:
      'A client wanted the whole history of the European Championship, sixty-four years of finals, goals, cards and crowds, readable on one screen.',
    outcome:
      'A client-commissioned Power BI dashboard covering every tournament from 1960 to 2024, with a summary view and a finals view filterable by year.',
    stack: ['Power BI', 'Excel', 'Public APIs'],
    links: [
      { label: 'GitHub', href: 'https://github.com/Maheshushir/UEFA_EUROS_FOOTBALL_CHAMPIONSHIP-1960-2024' },
      {
        label: 'LinkedIn post',
        href: 'https://www.linkedin.com/posts/mahesh-ushir_uefaeuro-freelanceventure-footballhistory-activity-7238935442962665472-lYqf',
      },
    ],
    cover: {
      src: '/work/uefa-euro-summary.webp',
      alt: 'UEFA EURO summary dashboard: average attendance 634.20K, 44.61 goals and 2.31 red cards per tournament, attendance by edition and every final since 1960.',
      width: 1285,
      height: 726,
    },
    facts: [
      { value: '634.20K', label: 'Avg attendance per EURO' },
      { value: '44.61', label: 'Avg goals per EURO' },
      { value: '17', label: 'Tournaments covered' },
    ],
    caseStudy: {
      context:
        'Official UEFA European Championship match data for every edition from 1960 to 2024, supplemented with player and team data from public APIs and historical archives.',
      approach: [
        { title: 'Prepare', text: 'Processed and cleaned the match, attendance, goals and disciplinary data in Excel.' },
        { title: 'Model', text: 'Built the Power BI model so every visual responds to a single year filter.' },
        { title: 'Design', text: 'Laid out two pages, a tournament summary and a finals view, with match results, historical comparisons and player of the tournament.' },
      ],
      findings: [
        { figure: '2.7M', text: 'EURO 2024 drew the largest total attendance of any edition, ahead of 2016 (2.4M).' },
        { figure: '142', text: 'Goals at EURO 2020, the highest of any tournament; 1968 saw just 7.' },
        { figure: '8', text: 'Red cards at EURO 2000, the most in a single edition.' },
      ],
      outcome:
        'Delivered to the client as an interactive dashboard and shared publicly as part of a freelance engagement in football analytics.',
      gallery: [
        { src: '/work/uefa-euro-summary.webp', alt: 'EURO summary page of the Power BI dashboard.', width: 1285, height: 726, caption: 'Summary: attendance, goals and red cards per edition, and every final.' },
        { src: '/work/uefa-euro-finals.webp', alt: 'EURO finals page of the Power BI dashboard.', width: 1285, height: 728, caption: 'Finals view, filterable by year.' },
      ],
    },
  },
];

// The rest of the work, shown as a typographic index.
export const ARCHIVE: Project[] = [
  {
    slug: 'imdb-sql-portfolio',
    title: 'IMDb SQL Portfolio',
    category: 'SQL',
    problem: '',
    outcome: "15 queries over IMDb's full 141M-row dataset, including a recursive-CTE degrees-of-separation traversal across 18,120 actors in 2.2s.",
    stack: ['SQL', 'DuckDB', 'Recursive CTE'],
    links: [{ label: 'GitHub', href: 'https://github.com/Maheshushir/imdb-sql-portfolio' }],
    cover: { src: '/work/imdb-bacon-numbers.webp', matte: true, alt: 'Distribution of Bacon numbers across actors.', width: 1131, height: 687 },
  },
  {
    slug: 'superstore-cloud-analytics',
    title: 'Superstore Cloud Analytics',
    category: 'Cloud analytics',
    problem: '',
    outcome: 'Retail analytics designed for AWS S3, Glue and Athena with a DuckDB engine-parity harness. Found $135K of margin lost to discounts above 20%.',
    stack: ['AWS S3', 'Glue', 'Athena', 'SQL', 'DuckDB'],
    links: [{ label: 'GitHub', href: 'https://github.com/Maheshushir/superstore-cloud-analytics' }],
    cover: { src: '/work/superstore-discount-cliff.webp', matte: true, alt: 'Profit margin falling off a cliff as discount passes 20%.', width: 1131, height: 990 },
  },
  {
    slug: 'netflix-elt-data-cleaning',
    title: 'Netflix ELT & Data Cleaning',
    category: 'Data quality',
    problem: '',
    outcome: 'Layered staging-to-marts ELT with 10 data tests. A naive distinct-country count reports 681; the real answer is 117.',
    stack: ['SQL', 'DuckDB', 'dbt-style models', 'Data tests'],
    links: [{ label: 'GitHub', href: 'https://github.com/Maheshushir/netflix-elt-data-cleaning' }],
    cover: { src: '/work/netflix-cleaning-impact.webp', matte: true, alt: 'Before-and-after counts showing the impact of cleaning.', width: 1149, height: 688 },
  },
  {
    slug: 'yelp-reviews-snowflake',
    title: 'Yelp Reviews on Snowflake',
    category: 'Warehousing · Text',
    problem: '',
    outcome: 'S3 external stage to a VARIANT landing table to a star schema over 10k reviews, with a DuckDB mirror and a lexicon sentiment score validated against held-out ratings.',
    stack: ['Snowflake', 'AWS S3', 'Python', 'SQL'],
    links: [{ label: 'GitHub', href: 'https://github.com/Maheshushir/yelp-reviews-snowflake' }],
    cover: { src: '/work/yelp-length-intensity.webp', matte: true, alt: 'Review length against sentiment intensity by star rating.', width: 1131, height: 990 },
  },
  {
    slug: 'bankruptcy-detection',
    title: 'Bankruptcy Detection',
    category: 'Machine learning',
    problem: '',
    outcome: 'A hyperparameter-tuned Support Vector Classifier that predicts bankruptcy with 93% accuracy.',
    stack: ['Python', 'Scikit-learn', 'SVM'],
    links: [{ label: 'GitHub', href: 'https://github.com/Maheshushir/BANKRUPTCY_PROJECT' }],
  },
  {
    slug: 'motorcycle-parts-sales',
    title: 'Motorcycle Parts Sales Analysis',
    category: 'SQL',
    problem: '',
    outcome: 'SQL analysis of motorcycle-part sales data to uncover trends and top-selling products for inventory and supply-chain decisions.',
    stack: ['SQL'],
    links: [{ label: 'GitHub', href: 'https://github.com/Maheshushir/Motorcycle-Part-Sales-Analysis-using-SQL---Data-Camp-Project' }],
  },
  {
    slug: 'jeweller-dead-stock-auditor',
    title: 'Jeweller Dead Stock Auditor',
    category: 'Inventory analytics',
    problem: '',
    outcome: 'Visualises capital trapped in slow-moving jewellery stock (ITR below 3.0x) to plan liquidation.',
    stack: ['Inventory turnover', 'Web app'],
    links: [{ label: 'Live app', href: 'https://jeweller-dead-stock-auditor.vercel.app/' }],
  },
  {
    slug: 'd2c-analytics-pro',
    title: 'D2C Analytics Pro',
    category: 'Customer analytics',
    problem: '',
    outcome: 'RFM segmentation and churn logic to analyse LTV and forecast retention for D2C brands.',
    stack: ['RFM', 'Cohorts', 'Web app'],
    links: [{ label: 'Live app', href: 'https://d2c-analytics-pro.vercel.app/' }],
  },
  {
    slug: 'treasury-currency-intelligence',
    title: 'Treasury & Currency Intelligence',
    category: 'Finance · BI',
    problem: '',
    outcome: 'Treasury analytics monitoring 93 currencies against the USD to support financial decisions.',
    stack: ['Power BI', 'Excel'],
    links: [{ label: 'GitHub', href: 'https://github.com/Maheshushir/Treasury-Exchange-Rate-Report' }],
  },
  {
    slug: 'global-weather-repository',
    title: 'Global Weather Repository',
    category: 'BI',
    problem: '',
    outcome: 'Monitoring of temperature and atmospheric variables across global regions in Power BI.',
    stack: ['Power BI', 'Excel'],
    links: [{ label: 'GitHub', href: 'https://github.com/Maheshushir/Global-Weather-Repository-' }],
  },
  {
    slug: 'quantium-retail-analysis',
    title: 'Retail Analysis (Quantium)',
    category: 'Retail analytics',
    problem: '',
    outcome: 'Customer purchasing behaviour and sales trends in a supermarket chips category.',
    stack: ['Python', 'Data analysis'],
    links: [
      {
        label: 'LinkedIn post',
        href: 'https://www.linkedin.com/posts/mahesh-ushir_update-i-completed-part-2-and-final-stage-activity-7240617791744065536-XGRR',
      },
    ],
  },
];

export type Role = {
  role: string;
  company: string;
  descriptor?: string;
  period: string;
  type: string;
  steps?: { role: string; period: string }[];
  highlights: string[];
};

export const EXPERIENCE: Role[] = [
  {
    role: 'Data Analyst',
    company: 'HyperScale Leaders Tribe',
    descriptor: 'D2C growth consultancy serving 300+ active founders',
    period: 'Dec 2024 — Present',
    type: 'Full-time',
    steps: [
      { role: 'Data Analyst', period: 'Mar 2025 — Present' },
      { role: 'Data Analyst, Impulse Consultancy (group company)', period: 'Dec 2024 — Mar 2025' },
    ],
    highlights: [
      'Powered INR 50 Cr (~$6M) in client revenue by building the RFM segmentation and retention models that directed targeting and re-activation of high-value cohorts.',
      'Built the centralised data and reporting layer of an internal ERP managing 300+ founder accounts, eliminating 60+ hours a month of manual reporting.',
      'Architected an end-to-end pipeline, custom Shopify app to Shopify API to Supabase to dashboards, with automated daily metric delivery.',
      'Acted as the validation checkpoint before data entered the ERP, tracing quality issues to source and reconciling spend-to-revenue and ROAS reporting.',
      'Automated Google Sheets workflows with Pabbly, saving another 40+ hours a month.',
      'Delivered full-stack BI dashboards on Shopify Admin API data for D2C founders, and engineered a “Jewellers Dead Stock Analyser” (ITR < 3.0x) to surface slow-moving inventory capital.',
      'Launched the “Impulse Automation Hub” and delivered performance-metric reports on coach/CEO KPIs that guided resource allocation and scaling decisions.',
      'Promoted to the parent company within 3 months on the strength of the analytics systems delivered.',
    ],
  },
  {
    role: 'Data Analyst & Data Scientist Intern',
    company: 'AI Variant',
    descriptor: 'Data science and analytics services firm',
    period: 'Jan 2024 — Nov 2024',
    type: 'Internship',
    highlights: [
      'Built a hyperparameter-tuned SVM bankruptcy-detection model at 93% accuracy, cutting estimated loan-default exposure by ~15%.',
      'Audited 30,000+ loan accounts in SQL and Power BI to surface delinquency patterns that informed risk-assessment strategy.',
    ],
  },
  {
    role: 'Football Data Analyst',
    company: 'Independent / Quora',
    period: 'Aug 2022 — Dec 2025',
    type: 'Freelance',
    highlights: [
      'Produced 925+ statistical match analyses for global sports media including Bleacher Report and 433.',
      'Grew an analytics community to 17K+ followers and 2.4M+ views through data storytelling.',
      'Maintained 100% data accuracy under live-match delivery windows.',
    ],
  },
];

export const EDUCATION = [
  { title: 'M.Sc. Data Science', org: 'Chandigarh University', period: '2026 — 2028', note: 'Ongoing' },
  { title: 'B.Sc. Physics', org: 'Savitribai Phule Pune University', period: '2018 — 2021', note: '78.78%' },
];

export const CERTIFICATIONS = [
  { title: 'Data Analyst Professional Certification', org: 'IBM | NASSCOM' },
  { title: 'SQL (Basic, Intermediate, Advanced)', org: 'HackerRank' },
];
