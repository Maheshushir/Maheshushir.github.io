import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import AnimatedCounter from '@/components/ui/animated-counter';
import TrendCanvas from '@/components/TrendCanvas';
import { Button, SplitWords } from '@/components/primitives';
import { HERO_METRICS, PROFILE, type Metric } from '@/lib/content';
import { EASE } from '@/lib/motion';

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: EASE, delay },
});

const noop = () => {};

function Counter({ metric, delay }: { metric: Metric; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const id = setTimeout(() => setValue(metric.value), delay * 1000);
    return () => clearTimeout(id);
  }, [inView, metric.value, delay]);

  return (
    <div ref={ref} className="border-t border-line pt-3 md:pt-4">
      <AnimatedCounter
        value={value}
        duration={1.1}
        prefix={metric.prefix}
        suffix={metric.suffix}
        className="text-[clamp(1.5rem,3.2vw,3rem)] leading-none font-medium tracking-[-0.04em]"
        aria-label={`${metric.prefix ?? ''}${metric.value}${metric.suffix ?? ''}`}
      />
      <p className="mt-2 max-w-[24ch] text-xs leading-snug text-muted sm:text-sm md:mt-3">{metric.label}</p>
    </div>
  );
}

const Hero: React.FC = () => {
  const area = useRef<HTMLElement>(null);
  const reduced = !!useReducedMotion();

  return (
    <section
      id="home"
      ref={area}
      aria-labelledby="hero-title"
      className="relative flex min-h-[100svh] touch-manipulation flex-col overflow-hidden bg-ink"
    >
      {/* Chart paper with a live regression on the visitor's cursor: texture, not the message */}
      <div
        aria-hidden
        className="absolute inset-0 [background-image:linear-gradient(var(--color-ink-3)_1px,transparent_1px),linear-gradient(90deg,var(--color-ink-3)_1px,transparent_1px)] [background-size:calc(100%/12)_calc(100%/8)]"
      />
      <div aria-hidden className="absolute inset-0 opacity-35 md:opacity-70 md:[mask-image:linear-gradient(90deg,rgba(0,0,0,0.2),black_60%)]">
        <TrendCanvas target={area} onFit={noop} reduced={reduced} />
      </div>
      <span aria-hidden className="label absolute right-[var(--gutter)] bottom-4 hidden text-faint/70 md:block">
        Move your cursor: the line refits live
      </span>

      <div className="shell relative z-10 flex flex-1 flex-col pt-28 pb-12 md:pt-32">
        <motion.div {...fade(0)} className="label flex flex-wrap items-center justify-between gap-x-6 gap-y-3 text-muted">
          <span>
            {PROFILE.role} · {PROFILE.location}
          </span>
          <span className="flex items-center gap-2 text-fg">
            <span aria-hidden className="relative flex size-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative size-2 rounded-full bg-accent" />
            </span>
            {PROFILE.availability}
          </span>
        </motion.div>

        <div className="mt-12 max-w-4xl md:mt-16">
          <h1 id="hero-title">
            <motion.span {...fade(0.05)} className="mb-5 block text-base font-normal tracking-tight text-muted xs:text-lg md:text-xl">
              Hi, I’m <span className="text-fg">{PROFILE.name}</span>.
            </motion.span>
            <SplitWords
              immediate
              delay={0.12}
              stagger={0.05}
              className="block text-headline font-medium"
              text={'I turn raw business data\ninto *decisions.*'}
            />
          </h1>
          <motion.p {...fade(0.6)} className="mt-6 max-w-[52ch] text-lead text-muted">
            2.5+ years building the analysis, dashboards and pipelines behind real business calls in D2C,
            retail and financial services.
          </motion.p>
          <motion.div {...fade(0.75)} className="mt-8 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
            <Button href="/#projects" size="lg" className="justify-between xs:justify-start">
              Explore my work
            </Button>
            <Button href={PROFILE.resume} variant="outline" className="justify-between bg-ink/80 backdrop-blur-sm xs:justify-start">
              Download resume
            </Button>
          </motion.div>
        </div>

        <motion.div {...fade(0.9)} className="mt-auto grid grid-cols-3 gap-4 pt-14 sm:gap-8 md:max-w-4xl">
          {HERO_METRICS.map((m, i) => (
            <Counter key={m.label} metric={m} delay={1 + i * 0.12} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
