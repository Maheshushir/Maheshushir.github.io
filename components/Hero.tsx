import React, { useCallback, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowDown } from 'lucide-react';
import AnimatedCounter from '@/components/ui/animated-counter';
import TrendCanvas, { type Fit } from '@/components/TrendCanvas';
import { Button, SplitWords } from '@/components/primitives';
import { PROFILE } from '@/lib/content';
import { EASE } from '@/lib/motion';

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: EASE, delay },
});

// What the analyst says about the visitor's data.
function verdict(f: Fit) {
  if (f.ghost) return 'This is a sample visitor. Make your own data to replace it.';
  if (f.n < 12) return 'Keep going. A trend needs a few more points.';
  const time = f.ms < 0.1 ? 'under 0.1 ms' : `${f.ms.toFixed(1)} ms`;
  const read =
    f.r2 > 0.6 ? 'A strong pattern.' : f.r2 < 0.15 ? 'Mostly noise. Real data usually is.' : 'Some signal, some noise.';
  return `You just made ${f.n} data points. I found your trend in ${time}. ${read} Imagine what I’d find in your business data.`;
}

function direction(slope: number) {
  if (slope > 0.15) return 'Rising';
  if (slope < -0.15) return 'Falling';
  return 'Flat';
}

function Readout({ fit }: { fit: Fit }) {
  return (
    <div className="pointer-events-none max-w-md rounded-2xl border border-line bg-ink/75 p-4 backdrop-blur-md md:p-5">
      <div className="label flex items-center justify-between text-faint">
        <span>{fit.ghost ? 'Sample data' : 'Your data'}</span>
        <span className="flex items-center gap-2 text-accent">
          <span aria-hidden className="size-1.5 rounded-full bg-accent" />
          Live fit
        </span>
      </div>
      <dl className="mt-4 grid grid-cols-3 gap-3" aria-hidden>
        <div>
          <dt className="label text-faint">Points</dt>
          <dd className="mt-1 text-2xl font-medium tracking-[-0.03em] md:text-3xl">
            <AnimatedCounter value={fit.n} duration={0.4} />
          </dd>
        </div>
        <div>
          <dt className="label text-faint">R²</dt>
          <dd className="mt-1 text-2xl font-medium tracking-[-0.03em] md:text-3xl">
            <AnimatedCounter value={Math.round(fit.r2 * 100) / 100} decimals={2} duration={0.4} />
          </dd>
        </div>
        <div>
          <dt className="label text-faint">Trend</dt>
          <dd className="mt-1 text-2xl font-medium tracking-[-0.03em] text-accent md:text-3xl">{direction(fit.slope)}</dd>
        </div>
      </dl>
      <p className="mt-4 border-t border-line pt-3 text-sm leading-relaxed text-muted">{verdict(fit)}</p>
    </div>
  );
}

const Hero: React.FC = () => {
  const area = useRef<HTMLElement>(null);
  const reduced = !!useReducedMotion();
  const [fit, setFit] = useState<Fit>({ n: 0, slope: 0, r2: 0, ms: 0, ghost: true });
  const onFit = useCallback((f: Fit) => setFit(f), []);

  return (
    <section
      id="home"
      ref={area}
      aria-labelledby="hero-title"
      className="relative flex min-h-[100svh] cursor-crosshair touch-manipulation flex-col overflow-hidden bg-ink select-none"
    >
      {/* Chart paper: a faint grid with axis notes, under the visitor's points */}
      <div
        aria-hidden
        className="absolute inset-0 [background-image:linear-gradient(var(--color-ink-3)_1px,transparent_1px),linear-gradient(90deg,var(--color-ink-3)_1px,transparent_1px)] [background-size:calc(100%/12)_calc(100%/8)]"
      />
      <span aria-hidden className="label absolute right-[var(--gutter)] bottom-4 text-faint/70">
        x · where you moved →
      </span>

      <TrendCanvas target={area} onFit={onFit} reduced={reduced} />

      <div className="shell relative z-10 flex flex-1 flex-col pt-28 pb-12 md:pt-32">
        <motion.div {...fade(0)} className="label pointer-events-none flex flex-wrap items-center justify-between gap-x-6 gap-y-3 text-muted">
          <span>
            Live experiment<span className="hidden sm:inline"> · nothing leaves your browser</span>
          </span>
          <span className="flex items-center gap-2 text-fg">
            <span aria-hidden className="relative flex size-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative size-2 rounded-full bg-accent" />
            </span>
            {PROFILE.availability}
          </span>
        </motion.div>

        <div className="pointer-events-none mt-12 max-w-3xl md:mt-16">
          <h1 id="hero-title">
            <motion.span {...fade(0.05)} className="mb-5 block text-base font-normal tracking-tight text-muted xs:text-lg md:text-xl">
              <span className="text-fg">{PROFILE.name}</span>, Data Analyst & Strategist
            </motion.span>
            <SplitWords
              immediate
              delay={0.12}
              stagger={0.05}
              className="block text-headline font-medium"
              text={'Make some data.\nI’ll find the *trend.*'}
            />
          </h1>
          <motion.p {...fade(0.6)} className="mt-6 text-lead text-muted">
            <span className="hidden [@media(pointer:fine)]:inline">Move your cursor anywhere on this screen.</span>
            <span className="[@media(pointer:fine)]:hidden">Tap anywhere on this screen.</span>
          </motion.p>
        </div>

        <div className="mt-auto grid gap-8 pt-12 md:grid-cols-12 md:items-end">
          <motion.div {...fade(0.8)} className="md:col-span-6 lg:col-span-5">
            <Readout fit={fit} />
          </motion.div>
          <motion.div
            {...fade(0.9)}
            className="flex flex-col gap-3 xs:flex-row xs:flex-wrap md:col-span-6 md:flex-col md:items-end lg:col-span-7 lg:flex-row lg:justify-end"
          >
            <Button href="/#projects" size="lg" className="justify-between xs:justify-start">
              Explore my work
            </Button>
            <Button href={PROFILE.resume} variant="outline" className="justify-between xs:justify-start">
              Download resume
            </Button>
          </motion.div>
        </div>

        <motion.a
          {...fade(1)}
          href="#proof"
          className="label group mt-8 inline-flex min-h-11 w-fit items-center gap-3 text-faint hover:text-fg"
        >
          <ArrowDown aria-hidden size={14} strokeWidth={1.5} className="transition-transform duration-200 group-hover:translate-y-0.5" />
          Scroll for the real numbers
        </motion.a>
      </div>
    </section>
  );
};

export default Hero;
