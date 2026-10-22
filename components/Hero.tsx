import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { ArrowDown } from 'lucide-react';
import GravityLetters from '@/components/ui/gravity-letters';
import AnimatedCounter from '@/components/ui/animated-counter';
import { Button, SplitWords } from '@/components/primitives';
import { HERO_METRICS, PROFILE, type Metric } from '@/lib/content';
import { EASE } from '@/lib/motion';

// What falls when a visitor clicks the hero: digits and the notation of the trade.
const GLYPHS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '%', 'Σ', 'μ', 'σ', 'Δ', '∑', 'n', 'x̄', '≈', '±'];

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: EASE, delay },
});

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
    <div
      ref={ref}
      className="grid grid-cols-[minmax(7.5rem,auto)_1fr] items-center gap-x-5 border-t border-line pt-4 sm:block md:border-t-0 md:border-l md:pt-0 md:pl-6"
    >
      <AnimatedCounter
        value={value}
        duration={1.1}
        prefix={metric.prefix}
        suffix={metric.suffix}
        className="text-[clamp(2rem,3.4vw,3.25rem)] leading-none font-medium tracking-[-0.04em]"
        aria-label={`${metric.prefix ?? ''}${metric.value}${metric.suffix ?? ''}`}
      />
      <p className="max-w-[22ch] text-sm leading-snug text-muted sm:mt-3">{metric.label}</p>
    </div>
  );
}

const Hero: React.FC = () => {
  return (
    <GravityLetters
      id="home"
      items={GLYPHS}
      size={30}
      color="#2b2b2b"
      maxGlyphs={160}
      deviceTilt={false}
      className="relative flex min-h-[100svh] flex-col font-mono"
    >
      <section aria-labelledby="hero-title" className="shell relative z-10 flex flex-1 flex-col pt-28 pb-8 font-sans md:pt-32">
        {/* Masthead row */}
        <motion.div {...fade(0)} className="label grid grid-cols-2 gap-y-3 text-muted md:grid-cols-4">
          <span>Data Analyst<span className="hidden sm:inline"> / Strategist</span></span>
          <span className="text-right md:text-left">{PROFILE.location}</span>
          <span className="hidden md:block">Analytics · BI · Automation</span>
          <span className="col-span-2 flex items-center gap-2 text-fg md:col-span-1 md:justify-end">
            <span aria-hidden className="size-1.5 rounded-full bg-fg" />
            {PROFILE.availability}
          </span>
        </motion.div>

        {/* Headline */}
        <div className="flex flex-1 flex-col justify-center py-11 md:py-16">
          <h1 id="hero-title">
            <motion.span {...fade(0.05)} className="mb-5 block text-base font-normal tracking-tight text-muted xs:text-lg md:mb-8 md:text-2xl">
              <span className="text-fg">{PROFILE.name}</span>, Data Analyst & Strategist
            </motion.span>
            <SplitWords
              immediate
              delay={0.12}
              stagger={0.055}
              className="block text-display font-medium"
              text={'Turning complex data\ninto *smarter* decisions.'}
            />
          </h1>
        </div>

        {/* Supporting copy, actions and evidence */}
        <div className="grid gap-10 md:grid-cols-12 md:items-end md:gap-8">
          <motion.div {...fade(0.7)} className="md:col-span-5">
            <p className="max-w-[44ch] text-lead text-muted">
              I turn raw data into decisions people can act on, through analytics, business
              intelligence, automation and careful problem-solving.
            </p>
            <div className="mt-8 grid gap-3 xs:flex xs:flex-wrap">
              <Button href="/#projects" size="lg" className="justify-between xs:justify-start">
                Explore my work
              </Button>
              <Button href={PROFILE.resume} variant="outline" className="justify-between xs:justify-start">
                Download resume
              </Button>
            </div>
          </motion.div>

          <motion.div {...fade(0.85)} className="grid gap-4 sm:grid-cols-3 sm:gap-6 md:col-span-7 md:gap-0">
            {HERO_METRICS.map((m, i) => (
              <Counter key={m.label} metric={m} delay={0.95 + i * 0.12} />
            ))}
          </motion.div>
        </div>

        {/* Footer rail */}
        <motion.div {...fade(1.05)} className="label mt-12 flex items-center justify-between border-t border-line pt-2 text-faint md:mt-20">
          <a href="#about" className="group inline-flex min-h-11 items-center gap-3 hover:text-fg">
            <ArrowDown aria-hidden size={14} strokeWidth={1.5} className="transition-transform duration-200 group-hover:translate-y-0.5" />
            Scroll
          </a>
          <span aria-hidden className="hidden md:[@media(pointer:fine)]:inline">
            Click anywhere to drop some data
          </span>
        </motion.div>
      </section>
    </GravityLetters>
  );
};

export default Hero;
