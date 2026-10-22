import React from 'react';
import { Reveal, SectionHead } from '@/components/primitives';
import { EXPERTISE } from '@/lib/content';

const Expertise: React.FC = () => {
  return (
    <section id="expertise" className="bg-ink py-20 md:py-28" aria-label="Expertise">
      <div className="shell">
        <SectionHead
          index="02"
          label="Expertise"
          title={'The tools are easy.\nThe *questions* aren’t.'}
          aside={
            <p className="text-muted">
              Six areas of practice, each listed with the tools I’ve used on real work, not tools
              I’ve only read about.
            </p>
          }
        />

        <ol>
          {EXPERTISE.map((area, i) => (
            <Reveal
              as="li"
              key={area.title}
              delay={Math.min(i, 3) * 0.05}
              className="group grid gap-4 border-t border-line py-6 transition-colors duration-300 last:border-b md:grid-cols-12 md:gap-8 md:py-7"
            >
              {/* Phones: number sits inline with the title. From md the wrapper dissolves into the grid. */}
              <div className="flex items-baseline gap-3 md:contents">
                <span className="font-mono text-xs text-faint transition-colors duration-300 group-hover:text-fg md:col-span-1 md:pt-3">
                  0{i + 1}
                </span>
                <div className="md:col-span-5">
                  <h3 className="text-[clamp(1.625rem,3vw,2.75rem)] leading-[1.05] font-medium tracking-[-0.035em] transition-transform duration-500 ease-out-expo md:group-hover:translate-x-2">
                    {area.title}
                  </h3>
                  <p className="mt-2 max-w-[40ch] leading-snug text-muted md:mt-3">{area.summary}</p>
                </div>
              </div>
              <ul className="flex flex-wrap content-start gap-2 md:col-span-6 md:pt-2">
                {area.skills.map((s) => (
                  <li
                    key={s}
                    className="max-w-full rounded-full border border-line px-3 py-1 text-sm leading-6 break-words text-muted transition-colors duration-300 group-hover:border-faint group-hover:text-fg"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Expertise;
