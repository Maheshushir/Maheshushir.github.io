import React from 'react';
import { motion } from 'motion/react';
import DashboardBuild from '@/components/DashboardBuild';
import { Button, SplitWords } from '@/components/primitives';
import { HERO_METRICS, PROFILE } from '@/lib/content';
import { EASE } from '@/lib/motion';

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: EASE, delay },
});

// The two proof points the headline doesn't already carry.
const PROOF = HERO_METRICS.slice(1);

const Hero: React.FC = () => {
  return (
    <section id="home" aria-labelledby="hero-title" className="relative flex min-h-[100svh] flex-col overflow-hidden bg-ink">
      {/* Chart paper: a faint grid behind the first screen */}
      <div
        aria-hidden
        className="absolute inset-0 [background-image:linear-gradient(var(--color-ink-3)_1px,transparent_1px),linear-gradient(90deg,var(--color-ink-3)_1px,transparent_1px)] [background-size:calc(100%/12)_calc(100%/8)] [mask-image:linear-gradient(to_bottom,black_40%,transparent)]"
      />
      <div aria-hidden className="absolute top-1/3 right-[-10%] size-[42rem] rounded-full bg-accent/[0.06] blur-3xl" />

      <div className="shell relative z-10 flex flex-1 flex-col pt-28 pb-12 md:pt-32 lg:pt-28">
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

        <div className="my-auto grid grid-cols-[minmax(0,1fr)] gap-10 pt-10 lg:grid-cols-12 lg:items-center lg:gap-x-10 lg:gap-y-0 lg:pt-8">
          <div className="min-w-0 lg:col-span-5 lg:self-end">
            <h1 id="hero-title">
              <motion.span {...fade(0.05)} className="mb-6 flex items-center gap-3 text-base font-normal tracking-tight text-muted xs:text-lg">
                <img
                  src={PROFILE.photo}
                  alt=""
                  width={48}
                  height={48}
                  className="size-12 rounded-full object-cover ring-2 ring-accent ring-offset-2 ring-offset-ink"
                />
                <span>
                  Hi, I’m <span className="text-fg">{PROFILE.name}</span>.
                </span>
              </motion.span>
              <SplitWords
                immediate
                delay={0.12}
                stagger={0.05}
                className="block text-[clamp(2.4rem,4.1vw,3.75rem)] leading-[1] font-medium tracking-[-0.04em]"
                text={'The analyst behind\n*₹50 Cr* of D2C\nrevenue.'}
              />
            </h1>
            <motion.p {...fade(0.6)} className="mt-6 max-w-[44ch] text-lead text-muted">
              I take messy business data, prove it’s right, and turn it into dashboards and models
              teams act on. Watch one build itself.
            </motion.p>
            <motion.div {...fade(0.75)} className="mt-8 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
              <Button href="/#projects" size="lg" className="justify-between xs:justify-start">
                Explore my work
              </Button>
              <Button href={PROFILE.resume} variant="outline" className="justify-between bg-ink/80 xs:justify-start">
                Download resume
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24, rotateX: 8 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.35 }}
            className="min-w-0 [perspective:1200px] lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1"
          >
            <DashboardBuild />
          </motion.div>

          <motion.dl {...fade(0.9)} className="grid grid-cols-2 gap-6 border-t border-line pt-5 lg:col-span-5 lg:col-start-1 lg:row-start-2 lg:mt-10 lg:self-start">
            {PROOF.map((m) => (
              <div key={m.label}>
                <dt className="sr-only">{m.label}</dt>
                <dd className="text-2xl font-medium tracking-[-0.03em] md:text-3xl">
                  {m.prefix}
                  {m.value}
                  {m.suffix}
                </dd>
                <dd className="mt-1 text-xs leading-snug text-muted sm:text-sm">{m.label}</dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </div>
    </section>
  );
};

export default Hero;
