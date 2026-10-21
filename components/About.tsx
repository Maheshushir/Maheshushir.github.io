import React from 'react';
import { motion } from 'motion/react';
import { Reveal, SectionHead } from '@/components/primitives';
import { ABOUT, PROFILE } from '@/lib/content';
import { EASE, VIEWPORT } from '@/lib/motion';

const About: React.FC = () => {
  return (
    <section id="about" className="bg-paper py-24 text-paper-fg md:py-36" aria-label="About">
      <div className="shell">
        <SectionHead index="01" label="About" title={'Beyond the\n*numbers.*'} />

        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <motion.figure
            className="md:col-span-4 lg:col-span-3"
            initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            viewport={VIEWPORT}
            transition={{ duration: 1.1, ease: EASE }}
          >
            <img
              src={PROFILE.photo}
              alt="Portrait of Mahesh Ushir in a light suit jacket"
              width={460}
              height={460}
              loading="lazy"
              decoding="async"
              className="aspect-[4/5] w-full max-w-sm object-cover grayscale"
            />
            <figcaption className="label mt-4 flex justify-between text-paper-muted">
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
            <div className="mt-10 grid gap-6 text-paper-muted sm:grid-cols-2 sm:gap-10">
              {ABOUT.body.map((p, i) => (
                <Reveal key={i} delay={0.08 * i}>
                  <p className="leading-relaxed">{p}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

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
                className="border-t border-paper-line py-8 md:border-t-0 md:border-l md:py-2 md:pr-8 md:pl-6 md:first:border-l-0 md:first:pl-0"
              >
                <span className="font-mono text-xs text-paper-muted">0{i + 1}</span>
                <h3 className="mt-6 text-2xl font-medium tracking-[-0.03em]">{p.title}</h3>
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
          <dl className="grid grid-cols-3 gap-4 md:col-span-8">
            {ABOUT.stats.map((s, i) => (
              <Reveal key={s.label} delay={0.08 * i} className="flex flex-col">
                <dt className="order-2 mt-3 text-sm leading-snug text-paper-muted">{s.label}</dt>
                <dd className="text-[clamp(2rem,5vw,4.5rem)] leading-none font-medium tracking-[-0.045em] tabular-nums">
                  {s.value}
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>

        <Reveal className="mt-24 md:mt-32">
          <blockquote className="mx-auto max-w-4xl text-center">
            <p className="serif text-[clamp(1.75rem,4vw,3.5rem)] leading-[1.1]">“{ABOUT.quote.text}”</p>
            <footer className="label mt-6 text-paper-muted">— {ABOUT.quote.by}</footer>
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
};

export default About;
