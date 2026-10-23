import React from 'react';
import {
  siApacheparquet, siClaude, siDuckdb, siGithubactions, siHackerrank, siJupyter, siMake,
  siMysql, siN8n, siNumpy, siPandas, siPostgresql, siPython, siQuora, siScikitlearn,
  siShopify, siSnowflake, siStreamlit, siSupabase,
} from 'simple-icons';
import {
  ArrowRightLeft, BookOpen, Database, Boxes, ChartLine, ChartScatter, Handshake, Landmark, LayoutGrid,
  Package, Presentation, ShieldCheck, Sigma, SquareKanban, TrendingDown, Users, UsersRound,
  Webhook, Workflow, Zap, type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';

/*
 * Brand marks come from Simple Icons (CC0). Brands missing from that set
 * (Power BI, Excel, Tableau, AWS) are drawn as simple marks in brand colour.
 * Very dark brand colours are lifted so they stay visible on the ink background.
 */
type Brand = { title: string; hex: string; path?: string; draw?: React.ReactNode };

const si = (icon: { title: string; hex: string; path: string }, hex = `#${icon.hex}`): Brand => ({
  title: icon.title,
  hex,
  path: icon.path,
});

// A plus sign centred on (cx, cy): `len` long, `t` thick. Tableau's mark is built from these.
const plus = (cx: number, cy: number, len: number, t: number) => (
  <g key={`${cx}-${cy}`}>
    <rect x={cx - t / 2} y={cy - len / 2} width={t} height={len} />
    <rect x={cx - len / 2} y={cy - t / 2} width={len} height={t} />
  </g>
);

const BRANDS = {
  python: si(siPython, '#4B8BBE'),
  mysql: si(siMysql, '#5D9BD0'),
  postgresql: si(siPostgresql, '#6B8FE8'),
  pandas: si(siPandas, '#E70488'),
  numpy: si(siNumpy, '#4DABCF'),
  duckdb: si(siDuckdb),
  snowflake: si(siSnowflake),
  parquet: si(siApacheparquet),
  githubactions: si(siGithubactions),
  scikitlearn: si(siScikitlearn),
  streamlit: si(siStreamlit),
  jupyter: si(siJupyter),
  n8n: si(siN8n),
  make: si(siMake, '#B56CFF'),
  shopify: si(siShopify),
  supabase: si(siSupabase),
  claude: si(siClaude),
  hackerrank: si(siHackerrank),
  quora: si(siQuora, '#D9473F'),
  powerbi: {
    title: 'Power BI',
    hex: '#F2C811',
    draw: (
      <>
        <rect x="2.5" y="11" width="4.5" height="11" rx="1.2" opacity=".55" />
        <rect x="9.75" y="6.5" width="4.5" height="15.5" rx="1.2" opacity=".8" />
        <rect x="17" y="2" width="4.5" height="20" rx="1.2" />
      </>
    ),
  },
  excel: {
    title: 'Excel',
    hex: '#21A366',
    draw: (
      <>
        <rect x="2" y="2" width="20" height="20" rx="4" />
        <path d="M8 7l8 10M16 7l-8 10" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" />
      </>
    ),
  },
  tableau: {
    title: 'Tableau',
    hex: '#E97627',
    draw: (
      <>
        {plus(12, 12, 9, 2.2)}
        {plus(12, 3.5, 4.5, 1.4)}
        {plus(12, 20.5, 4.5, 1.4)}
        {plus(3.5, 12, 4.5, 1.4)}
        {plus(20.5, 12, 4.5, 1.4)}
        {plus(5.5, 5.5, 3, 1)}
        {plus(18.5, 5.5, 3, 1)}
        {plus(5.5, 18.5, 3, 1)}
        {plus(18.5, 18.5, 3, 1)}
      </>
    ),
  },
  aws: {
    title: 'AWS',
    hex: '#FF9900',
    draw: (
      <path
        d="M2.5 14.5c5.6 3.9 13.4 3.9 19 0M18.2 13.4l3.3 1.1-.9 3.3"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
} satisfies Record<string, Brand>;

export type BrandKey = keyof typeof BRANDS;

export function BrandMark({ name, size = 16, className }: { name: BrandKey; size?: number; className?: string }) {
  const b: Brand = BRANDS[name];
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden
      className={cn('shrink-0', className)}
      style={{ color: b.hex }}
    >
      {b.path ? <path d={b.path} /> : b.draw}
    </svg>
  );
}

export const brandTitle = (name: BrandKey) => BRANDS[name].title;

// Each skill or stack entry resolves to a brand mark, or a concept icon in the accent colour.
const SKILL_ICON: Record<string, BrandKey | LucideIcon> = {
  // Skills
  'SQL (MySQL, PostgreSQL)': 'postgresql',
  Python: 'python',
  Pandas: 'pandas',
  NumPy: 'numpy',
  Excel: 'excel',
  'Statistical analysis': Sigma,
  'Power BI': 'powerbi',
  DAX: 'powerbi',
  'Power Query': 'powerbi',
  Tableau: 'tableau',
  'IBM Cognos': ChartLine,
  Matplotlib: ChartLine,
  Seaborn: ChartScatter,
  'ETL / ELT pipelines': Workflow,
  'Star-schema modelling': Boxes,
  DuckDB: 'duckdb',
  Snowflake: 'snowflake',
  'AWS S3 · Glue · Athena': 'aws',
  Parquet: 'parquet',
  'Validation & reconciliation': ShieldCheck,
  'Source-to-target mapping': ArrowRightLeft,
  'CI testing': 'githubactions',
  'RFM segmentation': Users,
  'Cohort analysis': LayoutGrid,
  'Churn & retention': TrendingDown,
  'Credit risk & delinquency': Landmark,
  'Inventory turnover (ITR)': Package,
  'Machine learning (SVM, XGBoost)': 'scikitlearn',
  n8n: 'n8n',
  'Make.com': 'make',
  Pabbly: Zap,
  'Power Automate': Workflow,
  'Shopify Admin API': 'shopify',
  Supabase: 'supabase',
  'REST APIs': Webhook,
  'LLM tooling (Claude, ChatGPT, Gemini)': 'claude',
  'Data storytelling': BookOpen,
  Presentation: Presentation,
  'Stakeholder collaboration': Handshake,
  'Project management': SquareKanban,
  'Team leading': UsersRound,
  // Project stacks
  SQL: Database,
  'GitHub Actions CI': 'githubactions',
  XGBoost: 'scikitlearn',
  SMOTE: Sigma,
  Streamlit: 'streamlit',
  'Public APIs': Webhook,
};

export function SkillIcon({ name, size = 15 }: { name: string; size?: number }) {
  const icon = SKILL_ICON[name];
  if (!icon) return null;
  if (typeof icon === 'string') return <BrandMark name={icon} size={size} />;
  const Icon = icon;
  return <Icon aria-hidden size={size} strokeWidth={1.75} className="shrink-0 text-accent" />;
}

// The strip of tools in the hero, in the order a project usually meets them.
export const TOOLKIT: BrandKey[] = [
  'python', 'postgresql', 'excel', 'powerbi', 'tableau', 'pandas', 'numpy', 'duckdb',
  'snowflake', 'aws', 'parquet', 'githubactions', 'scikitlearn', 'jupyter', 'streamlit',
  'shopify', 'supabase', 'n8n', 'make', 'claude',
];
