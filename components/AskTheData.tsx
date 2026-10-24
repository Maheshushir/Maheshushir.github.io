import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { ASK_THE_DATA } from '@/lib/content';
import { EASE } from '@/lib/motion';
import { onInternalLink } from '@/lib/router';
import { cn } from '@/lib/utils';

/*
 * The hero's interactive card: pick a business question and see it answered
 * with a real figure from one of the projects, then follow it to the work.
 * Until someone picks, it cycles through the questions on its own.
 */

const CYCLE_MS = 6000;

export default function AskTheData() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const reduced = !!useReducedMotion();
  const [active, setActive] = useState(0);
  const [picked, setPicked] = useState(false);
  const [hover, setHover] = useState(false);
  const cycling = !picked && !reduced && !hover && inView;

  useEffect(() => {
    if (!cycling) return;
    const id = window.setTimeout(() => setActive((i) => (i + 1) % ASK_THE_DATA.length), CYCLE_MS);
    return () => window.clearTimeout(id);
  }, [cycling, active]);

  const q = ASK_THE_DATA[active];
  const max = Math.max(...q.bars.map((b) => b.value));
  const external = q.href.startsWith('http');

  return (
    <div
      ref={ref}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      className="rounded-2xl border border-line bg-ink-2/85 p-4 backdrop-blur-md sm:p-5 md:p-6"
    >
      <div className="label flex items-center justify-between gap-4 text-faint">
        <span className="flex items-center gap-2 text-accent">
          <span aria-hidden className="size-1.5 rounded-full bg-accent" />
          Ask the data
        </span>
        <span className="hidden xs:inline">Real figures from my projects</span>
      </div>

      <div role="group" aria-label="Questions" className="mt-4 flex flex-wrap gap-2">
        {ASK_THE_DATA.map((item, i) => (
          <button
            key={item.question}
            type="button"
            aria-pressed={i === active}
            onClick={() => {
              setPicked(true);
              setActive(i);
            }}
            className={cn(
              'relative overflow-hidden rounded-full border px-3 py-1.5 text-left text-[0.8125rem] leading-snug transition-colors duration-200',
              i === active ? 'border-accent bg-accent text-ink' : 'border-line text-muted hover:border-fg hover:text-fg',
            )}
          >
            {item.question}
            {i === active && cycling && (
              <motion.span
                key={active}
                aria-hidden
                className="absolute bottom-0 left-0 h-0.5 bg-ink/40"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: CYCLE_MS / 1000, ease: 'linear' }}
              />
            )}
          </button>
        ))}
      </div>

      <div aria-live="polite" className="mt-5 min-h-[15.5rem] border-t border-line pt-5 sm:min-h-[13rem]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: reduced ? 0 : 0.35, ease: EASE }}
          >
            <p className="text-2xl font-medium tracking-[-0.03em] md:text-3xl">{q.answer}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">{q.detail}</p>

            <ul className="mt-5 space-y-2.5" aria-label="Figures">
              {q.bars.map((b, i) => (
                <li key={b.label} className="grid grid-cols-[7.5rem_1fr] items-center gap-3 text-sm">
                  <span className={cn('truncate', b.highlight ? 'text-fg' : 'text-faint')}>{b.label}</span>
                  <span className="flex items-center gap-3">
                    <motion.span
                      aria-hidden
                      className={cn('h-2.5 rounded-full', b.highlight ? 'bg-accent' : 'bg-fg/25')}
                      initial={{ width: reduced ? `${(b.value / max) * 70}%` : '0%' }}
                      animate={{ width: `${(b.value / max) * 70}%` }}
                      transition={{ duration: reduced ? 0 : 0.7, ease: EASE, delay: 0.1 + i * 0.08 }}
                    />
                    <span className={cn('shrink-0 tabular-nums', b.highlight ? 'text-accent' : 'text-muted')}>
                      {b.display}
                    </span>
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
              <span className="label text-faint">{q.source}</span>
              <a
                href={q.href}
                onClick={external ? undefined : onInternalLink}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="group inline-flex min-h-11 items-center gap-2 text-sm font-medium text-fg underline-offset-4 hover:underline"
              >
                {external ? 'See the code' : 'See the case study'}
                {external ? (
                  <ArrowUpRight aria-hidden size={15} className="shrink-0 text-accent" />
                ) : (
                  <ArrowRight aria-hidden size={15} className="shrink-0 text-accent transition-transform group-hover:translate-x-0.5" />
                )}
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
