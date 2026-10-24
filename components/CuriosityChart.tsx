import React from 'react';
import { motion } from 'motion/react';
import { Reveal } from '@/components/primitives';
import { EASE, VIEWPORT } from '@/lib/motion';
import { cn } from '@/lib/utils';

/*
 * The career as a sketched line chart: curiosity over time, annotated by hand.
 * Milestones are spaced evenly rather than to scale; the chart says so.
 */

type Milestone = { x: number; y: number; year: string; title: string; note: string; now?: boolean };

const MILESTONES: Milestone[] = [
  { x: 0.06, y: 0.14, year: '2021', title: 'Physics graduate', note: 'B.Sc., Pune University' },
  { x: 0.28, y: 0.38, year: '2022–25', title: 'Football stats', note: '925+ analyses, 2.4M views' },
  { x: 0.5, y: 0.54, year: '2024', title: 'First analyst role', note: 'AI Variant' },
  { x: 0.72, y: 0.76, year: '2025', title: 'HyperScale', note: 'promoted in 3 months' },
  { x: 0.94, y: 0.92, year: 'Now', title: 'You are here', note: 'M.Sc. Data Science in progress', now: true },
];

const W = 1000;
const H = 400;
const PAD = { t: 40, b: 40 };
const px = (x: number) => x * W;
const py = (y: number) => PAD.t + (1 - y) * (H - PAD.t - PAD.b);

// A smooth line through the milestones with a little hand-made wobble between them.
function sketch(offset = 0) {
  const pts = [{ x: 0, y: 0.08 }, ...MILESTONES, { x: 1, y: 0.96 }];
  let d = `M ${px(pts[0].x)} ${py(pts[0].y) + offset}`;
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1], b = pts[i];
    const mx = (px(a.x) + px(b.x)) / 2;
    const wobble = (i % 2 ? -1 : 1) * 14 + offset;
    d += ` C ${mx} ${py(a.y) + wobble}, ${mx} ${py(b.y) - wobble}, ${px(b.x)} ${py(b.y) + offset}`;
  }
  return d;
}

const LINE = sketch();
const ECHO = sketch(2.5);

export default function CuriosityChart() {
  return (
    <figure className="mt-24 md:mt-36">
      <Reveal className="label mb-8 flex items-center gap-4 text-paper-muted">
        <span>The story so far</span>
        <span aria-hidden className="h-px flex-1 bg-paper-line" />
      </Reveal>

      <div className="flex items-baseline justify-between gap-6">
        <h3 className="serif text-[clamp(1.75rem,3.4vw,3rem)] leading-none">Curiosity over time</h3>
        <p className="label hidden text-paper-muted sm:block">x-axis not to scale. Neither was the learning curve.</p>
      </div>

      <p className="label mt-3 text-paper-muted sm:hidden">Swipe the chart →</p>

      {/* Phones scroll the chart sideways at a readable size; wider screens fit it to the column. */}
      <div className="bleed mt-8 overflow-x-auto pt-8 pb-10 sm:mx-0 sm:overflow-visible sm:p-0">
      <div className="relative mx-[var(--gutter)] h-[22rem] w-[46rem] sm:mx-0 sm:mt-20 sm:aspect-[2/1] sm:h-auto sm:w-full md:aspect-[5/2]">
        {/* Axes, drawn like a notebook sketch */}
        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden className="absolute inset-0 size-full overflow-visible">
          <path d={`M 0 ${H - 6} L ${W} ${H - 6}`} className="stroke-paper-line" strokeWidth={1.5} vectorEffect="non-scaling-stroke" fill="none" />
          <path d={`M 2 ${H} L 2 0`} className="stroke-paper-line" strokeWidth={1.5} vectorEffect="non-scaling-stroke" fill="none" />
          <motion.path
            d={ECHO}
            fill="none"
            className="stroke-paper-fg/25"
            strokeWidth={1.25}
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={VIEWPORT}
            transition={{ duration: 2.2, ease: EASE, delay: 0.15 }}
          />
          <motion.path
            d={LINE}
            fill="none"
            className="stroke-paper-fg"
            strokeWidth={2.25}
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={VIEWPORT}
            transition={{ duration: 2.2, ease: EASE }}
          />
        </svg>

        <span aria-hidden className="label absolute -top-6 left-0 text-paper-muted">curiosity ↑</span>
        <span aria-hidden className="label absolute right-0 -bottom-7 text-paper-muted">time →</span>

        {/* Hand-written notes at each milestone */}
        <ol>
          {MILESTONES.map((m, i) => {
            const above = i % 2 === 0;
            const align = m.x > 0.85 ? 'right' : m.x < 0.12 ? 'left' : 'center';
            return (
              <motion.li
                key={m.title}
                className="absolute"
                style={{ left: `${m.x * 100}%`, top: `${(py(m.y) / H) * 100}%` }}
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.5, ease: EASE, delay: 0.3 + m.x * 1.8 }}
              >
                <span
                  aria-hidden
                  className={cn(
                    'absolute top-0 left-0 block size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-paper-fg',
                    m.now ? 'bg-accent' : 'bg-paper',
                  )}
                >
                  {m.now && <span className="absolute -inset-1.5 animate-ping rounded-full bg-accent/60" />}
                </span>
                <span
                  className={cn(
                    'absolute block w-max max-w-[9rem] sm:max-w-[12rem]',
                    above ? 'bottom-4' : 'top-4',
                    align === 'center' && '-translate-x-1/2 text-center',
                    align === 'right' && '-translate-x-full text-right',
                    align === 'left' && '-translate-x-2',
                  )}
                >
                  <span className="label block text-paper-muted">{m.year}</span>
                  <span className="serif block text-lg leading-tight md:text-2xl">
                    <span className={cn(m.now && 'accent-word')}>{m.title}</span>
                  </span>
                  <span className="block text-sm leading-snug text-paper-muted">{m.note}</span>
                </span>
              </motion.li>
            );
          })}
        </ol>
      </div>
      </div>
      <figcaption className="sr-only">
        A sketched line chart of curiosity rising over time, through these milestones:{' '}
        {MILESTONES.map((m) => `${m.year}, ${m.title} (${m.note})`).join('; ')}.
      </figcaption>
    </figure>
  );
}
