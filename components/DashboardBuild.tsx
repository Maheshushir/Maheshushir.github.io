import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react';
import { ArrowRight, RotateCcw } from 'lucide-react';
import AnimatedCounter from '@/components/ui/animated-counter';
import { HERO_BUILDS, type BuildDataset } from '@/lib/content';
import { EASE } from '@/lib/motion';
import { onInternalLink } from '@/lib/router';
import { cn } from '@/lib/utils';

/*
 * The hero's centrepiece: a dashboard that builds itself from raw rows.
 * Each run replays one project: messy rows arrive, a validation pass flags
 * the bad ones, they are removed, and the cleaned data becomes KPIs, charts
 * and one insight. Until someone picks a dataset, it moves on to the next.
 */

// raw, validate, clean, kpis, charts, insight
const PHASE_AT = [0, 1300, 2700, 3700, 4600, 5800];
const HOLD_MS = 5500;
const STEPS = ['Raw data', 'Validate', 'Clean', 'Dashboard', 'Insight'];
const stepOf = (phase: number) => [0, 1, 2, 3, 3, 4][phase];

function RawTable({ ds, phase }: { ds: BuildDataset; phase: number }) {
  const cols = `1.15fr 1.5fr ${'1fr '.repeat(ds.columns.length - 2)}`;
  const rows = ds.raw.map((r, id) => ({ ...r, id })).filter((r) => phase < 2 || !r.issue);
  return (
    <div className="relative h-full font-mono text-[0.6875rem] sm:text-xs">
      <div className="grid gap-x-3 border-b border-line pb-2 text-faint" style={{ gridTemplateColumns: cols }}>
        {ds.columns.map((c) => (
          <span key={c} className="truncate">{c}</span>
        ))}
      </div>
      <ul className="relative overflow-hidden">
        <AnimatePresence initial={false}>
          {rows.map((r) => {
            const flagged = phase >= 1 && !!r.issue;
            return (
              <motion.li
                key={r.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{
                  opacity: 0,
                  height: 0,
                  paddingTop: 0,
                  paddingBottom: 0,
                  borderWidth: 0,
                  transition: { duration: 0.35, ease: EASE, opacity: { duration: 0.2 }, default: { delay: 0.15, duration: 0.35, ease: EASE } },
                }}
                transition={{ duration: 0.35, ease: EASE, delay: phase === 0 ? r.id * 0.12 : 0 }}
                className={cn(
                  'relative grid items-center gap-x-3 overflow-hidden border-b border-line/60 py-2.5 transition-colors duration-300',
                  flagged ? 'bg-flag/10 text-flag' : 'text-muted',
                )}
                style={{ gridTemplateColumns: cols }}
              >
                {r.cells.map((c, j) => (
                  <span key={j} className={cn('truncate', flagged && 'line-through decoration-flag/60')}>
                    {c || '∅'}
                  </span>
                ))}
                {flagged && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute right-1 rounded-full border border-flag/50 bg-ink px-2 py-0.5 text-[0.625rem] tracking-wide text-flag no-underline"
                  >
                    {r.issue}
                  </motion.span>
                )}
              </motion.li>
            );
          })}
        </AnimatePresence>
        {phase === 1 && (
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 h-10 bg-gradient-to-b from-transparent via-accent/20 to-transparent"
            initial={{ top: '-15%' }}
            animate={{ top: '100%' }}
            transition={{ duration: 1.2, ease: 'linear' }}
          />
        )}
      </ul>
      <AnimatePresence>
        {phase >= 2 && (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 flex items-center gap-2 text-accent"
          >
            <span aria-hidden className="size-1.5 rounded-full bg-accent" />
            {ds.removed} · totals reconcile to source
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function Dashboard({ ds, phase, reduced }: { ds: BuildDataset; phase: number; reduced: boolean }) {
  return (
    <div className="flex h-full flex-col gap-3 md:gap-4">
      <div className="grid grid-cols-3 gap-2 md:gap-3">
        {ds.kpis.map((k, i) => (
          <motion.div
            key={k.label}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE, delay: i * 0.08 }}
            className="rounded-xl border border-line bg-ink/60 p-2.5 md:p-3.5"
          >
            <AnimatedCounter
              value={phase >= 3 ? k.value : 0}
              decimals={k.decimals}
              prefix={k.prefix}
              suffix={k.suffix}
              duration={reduced ? 0 : 1}
              className="text-base leading-none font-medium tracking-[-0.03em] xs:text-lg md:text-2xl"
            />
            <p className="mt-1.5 text-[0.6875rem] leading-tight text-faint md:text-xs">{k.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-2 sm:grid-cols-2 md:gap-3">
        {ds.charts.map((c, ci) => {
          const max = Math.max(...c.bars.map((b) => b.value));
          return (
            <div key={c.title} className="rounded-xl border border-line bg-ink/60 p-3 md:p-4">
              <p className="label text-faint">{c.title}</p>
              <ul className="mt-3 space-y-2">
                {c.bars.map((b, bi) => (
                  <li key={b.label} className="grid grid-cols-[6.25rem_1fr] items-center gap-2 text-xs">
                    <span className={cn('truncate', b.highlight ? 'text-fg' : 'text-faint')}>{b.label}</span>
                    <span className="flex items-center gap-2">
                      <motion.span
                        aria-hidden
                        className={cn('h-3 rounded-sm', b.highlight ? 'bg-accent' : 'bg-fg/25')}
                        initial={{ width: 0 }}
                        animate={{ width: phase >= 4 ? `${Math.max(4, (b.value / max) * 62)}%` : 0 }}
                        transition={{ duration: reduced ? 0 : 0.8, ease: EASE, delay: reduced ? 0 : ci * 0.2 + bi * 0.08 }}
                      />
                      <span className={cn('shrink-0 tabular-nums', b.highlight ? 'text-accent' : 'text-muted')}>
                        {b.display}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <AnimatePresence>
        {phase >= 5 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="mt-auto flex flex-col gap-2 rounded-xl border border-accent/50 bg-accent/[0.07] p-3 sm:flex-row sm:items-center sm:justify-between md:p-4"
          >
            <p className="text-sm leading-snug text-fg md:text-[0.9375rem]">
              <span className="label mr-2 text-accent">Insight</span>
              {ds.insight}
            </p>
            <a
              href={ds.href}
              onClick={onInternalLink}
              className="group inline-flex min-h-10 shrink-0 items-center gap-2 text-sm font-medium text-fg underline-offset-4 hover:underline"
            >
              See the case study
              <ArrowRight aria-hidden size={15} className="text-accent transition-transform group-hover:translate-x-0.5" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function DashboardBuild() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const reduced = !!useReducedMotion();
  const [active, setActive] = useState(0);
  const [run, setRun] = useState(0);
  const [phase, setPhase] = useState(0);
  const [picked, setPicked] = useState(false);
  const [started, setStarted] = useState(false);
  if (inView && !started) setStarted(true);

  // Play one build: step through the phases on a fixed timeline.
  useEffect(() => {
    if (reduced) {
      setPhase(5);
      return;
    }
    setPhase(0);
    if (!started) return;
    const ids = PHASE_AT.map((t, p) => window.setTimeout(() => setPhase(p), t));
    return () => ids.forEach(window.clearTimeout);
  }, [active, run, reduced, started]);

  // When a build finishes, move on to the next dataset unless someone chose one.
  useEffect(() => {
    if (phase < 5 || picked || reduced || !inView) return;
    const id = window.setTimeout(() => setActive((i) => (i + 1) % HERO_BUILDS.length), HOLD_MS);
    return () => window.clearTimeout(id);
  }, [phase, picked, reduced, inView]);

  const ds = HERO_BUILDS[active];
  const built = phase >= 3;

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-2xl border border-line bg-ink-2/90 shadow-[0_40px_120px_-40px_rgba(200,240,60,0.18)] backdrop-blur-md"
    >
      {/* Window bar: file or dashboard name, and the datasets to build from */}
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-line px-3 py-2.5 md:px-4">
        <div className="flex min-w-0 items-center gap-3">
          <span aria-hidden className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-fg/15" />
            <span className="size-2.5 rounded-full bg-fg/15" />
            <span className="size-2.5 rounded-full bg-accent" />
          </span>
          <span className="truncate font-mono text-[0.6875rem] text-faint sm:text-xs">
            {built ? `dashboard / ${ds.name.toLowerCase()}` : `${ds.file} · ${ds.rows}`}
          </span>
        </div>
        <div role="group" aria-label="Dataset" className="flex items-center gap-1">
          {HERO_BUILDS.map((b, i) => (
            <button
              key={b.name}
              type="button"
              aria-pressed={i === active}
              onClick={() => {
                setPicked(true);
                setActive(i);
                setRun((r) => r + 1);
              }}
              className={cn(
                'min-h-8 rounded-full px-2 text-xs whitespace-nowrap transition-colors duration-200 xs:px-2.5',
                i === active ? 'bg-fg text-ink' : 'text-muted hover:bg-fg/10 hover:text-fg',
              )}
            >
              {b.name}
            </button>
          ))}
          <button
            type="button"
            aria-label="Replay the build"
            onClick={() => {
              setPicked(true);
              setRun((r) => r + 1);
            }}
            className="ml-1 grid size-8 place-items-center rounded-full text-muted hover:bg-fg/10 hover:text-fg"
          >
            <RotateCcw aria-hidden size={14} />
          </button>
        </div>
      </div>

      {/* Pipeline stepper: where the build is right now */}
      <ol className="flex gap-1 px-3 pt-3 md:px-4 md:pt-4" aria-label="Build steps">
        {STEPS.map((s, i) => {
          const at = stepOf(phase);
          return (
            <li key={s} className="flex-1" aria-current={i === at ? 'step' : undefined}>
              <span className="block h-1 overflow-hidden rounded-full bg-fg/10">
                <motion.span
                  className="block h-full bg-accent"
                  initial={false}
                  animate={{ width: i <= at ? '100%' : '0%' }}
                  transition={{ duration: reduced ? 0 : 0.5, ease: EASE }}
                />
              </span>
              <span className={cn('label mt-2 hidden truncate sm:block', i === at ? 'text-fg' : 'text-faint')}>{s}</span>
            </li>
          );
        })}
      </ol>
      <p className="label px-3 pt-2 text-fg sm:hidden">{STEPS[stepOf(phase)]}</p>

      <div className="h-[27.5rem] p-3 sm:h-[21rem] md:h-[22.5rem] md:p-4">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`${active}-${run}-${built ? 'dash' : 'raw'}`}
            className="h-full"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98, filter: 'blur(4px)' }}
            transition={{ duration: reduced ? 0 : 0.35, ease: EASE }}
          >
            {built ? <Dashboard ds={ds} phase={phase} reduced={reduced} /> : <RawTable ds={ds} phase={phase} />}
          </motion.div>
        </AnimatePresence>
      </div>

      <p className="sr-only" aria-live="polite">
        {phase >= 5 ? `${ds.name}: ${ds.insight}` : ''}
      </p>
    </div>
  );
}
