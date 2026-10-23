import React from 'react';
import { GraduationCap } from 'lucide-react';
import { Reveal, SectionHead } from '@/components/primitives';
import { BrandMark } from '@/components/Logo';
import { CERTIFICATIONS, EDUCATION, EXPERIENCE } from '@/lib/content';

const tile = 'flex size-12 shrink-0 items-center justify-center rounded-xl font-mono text-sm font-medium';

// Company marks: Quora's real logo; monograms for firms without a public mark.
const BADGES: Record<string, React.ReactNode> = {
  'HyperScale Leaders Tribe': <span className={`${tile} bg-accent text-paper-fg`}>HS</span>,
  'AI Variant': <span className={`${tile} bg-paper-fg text-accent`}>AV</span>,
  'Independent / Quora': (
    <span className={`${tile} border border-paper-line bg-white`}>
      <BrandMark name="quora" size={22} />
    </span>
  ),
};

const CERT_BADGES: Record<string, React.ReactNode> = {
  HackerRank: <BrandMark name="hackerrank" size={22} />,
  'IBM | NASSCOM': <span className="font-mono text-xs font-bold tracking-tight text-[#0F62FE]">IBM</span>,
};

function SubHead({ children }: { children: React.ReactNode }) {
  return (
    <Reveal className="label mb-6 flex items-center gap-4 text-paper-muted">
      <span>{children}</span>
      <span aria-hidden className="h-px flex-1 bg-paper-line" />
    </Reveal>
  );
}

const Experience: React.FC = () => {
  return (
    <section id="experience" className="bg-paper py-20 text-paper-fg md:py-32" aria-label="Experience">
      <div className="shell">
        <SectionHead index="04" label="Experience" title={'Where the work\n*happened.*'} />

        <ol>
          {EXPERIENCE.map((job) => (
            <Reveal
              as="li"
              key={job.company}
              className="grid gap-6 border-t border-paper-line py-10 md:grid-cols-12 md:gap-8 md:py-14"
            >
              <div className="flex items-center gap-4 md:col-span-3 md:block">
                <span aria-hidden className="md:mb-5 md:flex">{BADGES[job.company]}</span>
                <div>
                <p className="font-mono text-sm tabular-nums">{job.period}</p>
                <p className="label mt-2 text-paper-muted">{job.type}</p>
                </div>
              </div>

              <div className="md:col-span-9 lg:col-span-8">
                <h3 className="text-[clamp(1.625rem,3vw,2.75rem)] leading-[1.05] font-medium tracking-[-0.035em]">
                  {job.role}
                  <span className="text-paper-muted"> at {job.company}</span>
                </h3>
                {job.descriptor && <p className="mt-3 text-paper-muted">{job.descriptor}</p>}

                {job.steps && (
                  <ul className="mt-6 flex flex-col gap-1 border-l border-paper-line pl-4 text-sm">
                    {job.steps.map((s) => (
                      <li key={s.role} className="flex flex-wrap gap-x-3">
                        <span>{s.role}</span>
                        <span className="font-mono text-paper-muted">{s.period}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <ul className="mt-8 grid gap-4 lg:grid-cols-2 lg:gap-x-10">
                  {job.highlights.map((h) => (
                    <li key={h} className="grid grid-cols-[1rem_1fr] leading-relaxed text-paper-muted">
                      <span aria-hidden className="mt-[0.55em] size-1.5 rounded-full bg-accent ring-1 ring-paper-fg/30" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </ol>

        <div className="mt-20 grid gap-16 md:mt-28 md:grid-cols-2 md:gap-8">
          <div>
            <SubHead>Education</SubHead>
            <ul>
              {EDUCATION.map((e) => (
                <Reveal as="li" key={e.title} className="flex gap-4 border-t border-paper-line py-6">
                  <span aria-hidden className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent">
                    <GraduationCap size={18} strokeWidth={1.75} />
                  </span>
                  <div className="flex-1">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-xl font-medium tracking-[-0.02em]">{e.title}</h3>
                    <span className="shrink-0 font-mono text-sm text-paper-muted">{e.period}</span>
                  </div>
                  <p className="mt-1 text-paper-muted">
                    {e.org} · {e.note}
                  </p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
          <div>
            <SubHead>Certifications</SubHead>
            <ul>
              {CERTIFICATIONS.map((c) => (
                <Reveal as="li" key={c.title} className="flex gap-4 border-t border-paper-line py-6">
                  <span aria-hidden className="flex size-10 shrink-0 items-center justify-center rounded-full border border-paper-line bg-white">
                    {CERT_BADGES[c.org]}
                  </span>
                  <div>
                    <h3 className="text-xl font-medium tracking-[-0.02em]">{c.title}</h3>
                    <p className="mt-1 text-paper-muted">{c.org}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
