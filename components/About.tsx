import React from 'react';
import { motion } from 'motion/react';
import { Eye, Target, Trophy, Workflow, ShieldCheck } from 'lucide-react';
import { Reveal, SectionHead } from '@/components/primitives';
import { BrandMark } from '@/components/Logo';
import CuriosityChart from '@/components/CuriosityChart';
import { ABOUT, PROFILE } from '@/lib/content';
import { EASE, VIEWPORT } from '@/lib/motion';

const PRINCIPLE_ICONS = [Target, ShieldCheck, Workflow];
const STAT_ICONS = [
  <Trophy key="t" aria-hidden size={20} strokeWidth={1.75} />,
  <Eye key="e" aria-hidden size={20} strokeWidth={1.75} />,
  <BrandMark key="q" name="quora" size={20} />,
];

const About: React.FC = () => {
  return (
    <section id="about" className="bg-paper py-20 text-paper-fg md:py-32" aria-label="About">
      <div className="shell">
        <SectionHead index="01" label="About" title={'Beyond the\n*numbers.*'} />

        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <motion.figure
            className="w-full max-w-[17rem] sm:max-w-[20rem] md:col-span-4 md:max-w-none lg:col-span-3"
            initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            viewport={VIEWPORT}
            transition={{ duration: 1.1, ease: EASE }}
          >
            <div className="relative pr-3 pb-3">
            <span aria-hidden className="absolute inset-0 top-3 left-3 bg-accent" />
            <img
              src={PROFILE.photo}
              alt="Portrait of Mahesh Ushir in a light suit jacket"
              width={460}
              height={460}
              loading="lazy"
              decoding="async"
              className="relative aspect-[4/5] w-full object-cover grayscale"
            />
            </div>
            <figcaption className="label mt-6 flex justify-between border-t border-paper-line pt-3 text-paper-muted">
              <span>{PROFILE.name}</span>
              <span>{PROFILE.location}</span>
            </figcaption>
          </motion.figure>

          <div className="md:col-span-8 md:col-start-5 lg:col-span-8 lg:col-start-5">
            <Reveal>
              <p className="text-[clamp(1.5rem,2.6vw,2.5rem)] leading-[1.18] font-normal tracking-[-0.025em]">
                {ABOUT.intro}
              </p>
            </Reveal>
            <Reveal delay={0.08} className="mt-8 grid gap-4 text-[1.0625rem] leading-[1.7] text-paper-muted sm:grid-cols-2 sm:gap-x-10 sm:gap-y-5 md:mt-10 md:text-base">
              {ABOUT.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </Reveal>
          </div>
        </div>

        <CuriosityChart />

        {/* How I work */}
        <div className="mt-24 md:mt-36">
          <Reveal className="label mb-8 flex items-center gap-4 text-paper-muted">
            <span>How I work</span>
            <span aria-hidden className="h-px flex-1 bg-paper-line" />
          </Reveal>
          <ol className="grid md:grid-cols-3">
            {ABOUT.principles.map((p, i) => (
              <Reveal
                as="li"
                key={p.title}
                delay={0.08 * i}
                className="border-t border-paper-line py-6 md:border-t-0 md:border-l md:py-2 md:pr-8 md:pl-6 md:first:border-l-0 md:first:pl-0"
              >
                <span className="flex items-center justify-between">
                  {React.createElement(PRINCIPLE_ICONS[i], {
                    'aria-hidden': true,
                    size: 40,
                    strokeWidth: 1.5,
                    className: 'rounded-full bg-accent p-2.5 text-paper-fg',
                  })}
                  <span className="font-mono text-xs text-paper-muted">0{i + 1}</span>
                </span>
                <h3 className="mt-5 text-2xl font-medium tracking-[-0.03em] md:mt-6">{p.title}</h3>
                <p className="mt-3 max-w-[38ch] leading-relaxed text-paper-muted">{p.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>

        {/* Off the clock */}
        <div className="mt-24 grid gap-12 border-t border-paper-line pt-10 md:mt-32 md:grid-cols-12 md:gap-8">
          <Reveal className="md:col-span-4">
            <p className="label text-paper-muted">Off the clock</p>
            <p className="mt-4 max-w-[34ch] leading-relaxed text-paper-muted">
              Football analytics, written for an audience of millions: match statistics for outlets
              including Bleacher Report and 433.
            </p>
          </Reveal>
          <dl className="grid grid-cols-3 gap-3 sm:gap-4 md:col-span-8">
            {ABOUT.stats.map((s, i) => (
              <Reveal key={s.label} delay={0.08 * i} className="flex flex-col">
                <dt className="order-2 mt-3 text-sm leading-snug text-paper-muted">{s.label}</dt>
                <dd className="text-[clamp(1.75rem,5vw,4.5rem)] leading-none font-medium tracking-[-0.045em] tabular-nums">
                  <span className="mb-4 flex size-10 items-center justify-center rounded-full border border-paper-line bg-white">{STAT_ICONS[i]}</span>
                  {s.value}
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>

        <Reveal className="mt-24 md:mt-32">
          <blockquote className="mx-auto max-w-4xl text-center">
            <p className="serif text-[clamp(1.75rem,4vw,3.5rem)] leading-[1.1]">“{ABOUT.quote.text}”</p>
            <footer className="label mt-6 text-paper-muted">{ABOUT.quote.by}</footer>
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
};

export default About;
