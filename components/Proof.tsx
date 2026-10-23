import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'motion/react';
import AnimatedCounter from '@/components/ui/animated-counter';
import { BrandMark, TOOLKIT, brandTitle } from '@/components/Logo';
import { Reveal } from '@/components/primitives';
import { HERO_METRICS, type Metric } from '@/lib/content';

// After the experiment, the real numbers: headline results and the toolkit behind them.

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
      className="grid grid-cols-[minmax(7.5rem,auto)_1fr] items-center gap-x-5 border-t border-line pt-4 sm:block md:border-t-0 md:border-l md:pt-0 md:pl-6 md:first:border-l-0 md:first:pl-0"
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

const Proof: React.FC = () => {
  return (
    <section id="proof" aria-label="Results and toolkit" className="border-t border-line bg-ink py-16 md:py-24">
      <div className="shell grid gap-10 md:grid-cols-12 md:items-end md:gap-8">
        <Reveal className="md:col-span-4">
          <p className="label text-accent">Real data, real results</p>
          <p className="mt-4 max-w-[34ch] text-lead text-muted">
            I turn raw data into decisions people can act on, through analytics, business
            intelligence, automation and careful problem-solving.
          </p>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-3 sm:gap-6 md:col-span-8 md:gap-0">
          {HERO_METRICS.map((m, i) => (
            <Counter key={m.label} metric={m} delay={0.1 + i * 0.12} />
          ))}
        </div>
      </div>

      <div className="shell mt-14 md:mt-20">
        <p className="label mb-4 text-faint">Toolkit</p>
        <div className="marquee overflow-hidden">
          <ul className="marquee-track flex w-max">
            {[...TOOLKIT, ...TOOLKIT].map((t, i) => (
              <li
                key={i}
                aria-hidden={i >= TOOLKIT.length}
                className="mr-3 flex items-center gap-2.5 rounded-full border border-line bg-ink-2/80 py-2 pr-4 pl-3 text-sm whitespace-nowrap text-muted"
              >
                <BrandMark name={t} size={18} />
                {brandTitle(t)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Proof;
