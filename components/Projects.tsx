import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { Reveal, SectionHead, TextLink } from '@/components/primitives';
import { ARCHIVE, FEATURED, type Image, type Project } from '@/lib/content';
import { EASE, VIEWPORT } from '@/lib/motion';
import { onInternalLink } from '@/lib/router';
import { cn } from '@/lib/utils';

// Columns of the telecom dataset, from the project README. The panel shows the
// real shape of the data instead of a stand-in photo.
const TELECOM_FEATURES = [
  'state', 'area.code', 'account.length', 'voice.plan', 'voice.messages',
  'intl.plan', 'intl.mins', 'intl.calls', 'intl.charge', 'day.mins',
  'day.calls', 'day.charge', 'eve.mins', 'eve.calls', 'eve.charge',
  'night.mins', 'night.calls', 'night.charge', 'customer.calls', 'churn',
];

/* Screenshot, desaturated to sit inside the monochrome page; colour returns on hover (or always, with `color`). */
export function Shot({ image, className, eager, color }: { image: Image; className?: string; eager?: boolean; color?: boolean }) {
  return (
    <motion.div
      className={cn('overflow-hidden', image.matte ? 'bg-paper p-3 md:p-5' : 'bg-ink-2', className)}
      initial={{ clipPath: 'inset(12% 0% 12% 0%)', opacity: 0 }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: 1, ease: EASE }}
    >
      <img
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        className={cn('block h-auto w-full transition-[filter,transform] duration-700 ease-out-expo md:group-hover:scale-[1.025]', !image.matte && !color && 'grayscale-[85%] group-hover:grayscale-0')}
      />
    </motion.div>
  );
}

export function DatasetPanel() {
  return (
    <motion.div
      className="relative flex flex-col justify-between gap-8 bg-ink-2 p-5 md:aspect-[16/10] md:p-8"
      initial={{ clipPath: 'inset(12% 0% 12% 0%)', opacity: 0 }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: 1, ease: EASE }}
    >
      <div className="label flex justify-between text-faint">
        <span>telecom_churn.csv</span>
        <span>20 columns</span>
      </div>
      <ul className="grid grid-cols-2 gap-x-6 gap-y-1.5 font-mono text-xs text-muted sm:grid-cols-3 xl:grid-cols-4">
        {TELECOM_FEATURES.map((f) => (
          <li
            key={f}
            className={cn(
              'truncate transition-colors duration-500 group-hover:text-fg',
              f === 'churn' && 'w-fit bg-fg px-1.5 text-ink group-hover:text-ink',
            )}
          >
            {f}
          </li>
        ))}
      </ul>
      <p className="label text-faint">
        Target: <span className="text-fg">churn</span> · yes / no
      </p>
    </motion.div>
  );
}

function FeaturedProject({ project, index }: { project: Project; index: number }) {
  const flip = index % 2 === 1;
  const href = `/work/${project.slug}`;
  const number = String(index + 1).padStart(2, '0');

  return (
    <article className="border-t border-line py-12 md:py-24" aria-labelledby={`p-${project.slug}`}>
      <Reveal className="label mb-6 flex items-center justify-between gap-4 text-faint md:mb-12">
        <span className="shrink-0 whitespace-nowrap">
          <span className="text-fg">{number}</span> / {String(FEATURED.length).padStart(2, '0')}
        </span>
        <span className="text-right">{project.category}</span>
      </Reveal>

      <div className="grid gap-8 md:grid-cols-12 md:gap-12 lg:gap-16">
        <a
          href={href}
          onClick={onInternalLink}
          className={cn('group bleed relative block md:col-span-7', flip && 'md:order-2')}
          aria-label={`${project.title} case study`}
        >
          {project.cover ? <Shot image={project.cover} /> : <DatasetPanel />}
          <span
            aria-hidden
            className="absolute top-4 right-4 flex size-11 scale-90 items-center justify-center rounded-full bg-fg text-ink opacity-0 transition-[opacity,transform] duration-300 ease-out-expo group-hover:scale-100 group-hover:opacity-100"
          >
            <ArrowUpRight size={18} strokeWidth={1.75} />
          </span>
        </a>

        <div className={cn('flex flex-col md:col-span-5', flip && 'md:order-1')}>
          <h3 id={`p-${project.slug}`} className="text-title font-medium">
            <a href={href} onClick={onInternalLink} className="link-draw">
              {project.title}
            </a>
          </h3>

          {/* One reveal for the whole column: the text arrives together, not line by line. */}
          <Reveal delay={0.1} className="flex flex-1 flex-col">
            <p className="mt-5 text-lead text-muted md:mt-6">{project.problem}</p>

            <div className="mt-7 border-l border-line pl-5 md:mt-8">
              <p className="label mb-2 text-faint">Outcome</p>
              <p className="leading-relaxed">{project.outcome}</p>
            </div>

            {project.facts && (
              <dl className="mt-8 grid gap-3 border-y border-line py-5 min-[360px]:grid-cols-3 min-[360px]:gap-4 md:mt-10">
                {project.facts.map((f) => (
                  <div key={f.label} className="flex items-baseline justify-between gap-4 min-[360px]:flex-col min-[360px]:items-start min-[360px]:justify-start min-[360px]:gap-0">
                    <dt className="label order-2 text-right text-faint min-[360px]:mt-2 min-[360px]:text-left md:tracking-[0.06em] xl:tracking-[0.12em]">{f.label}</dt>
                    <dd className="-order-1 text-[clamp(1.0625rem,1.6vw,1.5rem)] font-medium tracking-[-0.03em] tabular-nums">
                      {f.value}
                    </dd>
                  </div>
                ))}
              </dl>
            )}

            <div className="mt-8 md:mt-auto md:pt-10">
              <p className="font-mono text-[0.8125rem] leading-relaxed text-muted">{project.stack.join('  /  ')}</p>
              <div className="mt-6 flex flex-wrap items-center gap-x-7 gap-y-3 text-[0.9375rem]">
                <a
                  href={href}
                  onClick={onInternalLink}
                  className="group inline-flex h-12 items-center gap-3 rounded-full bg-fg pr-5 pl-6 font-medium text-ink transition-colors hover:bg-white"
                >
                  View case study
                  <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                </a>
                {project.links.map((l) => (
                  <TextLink key={l.href} href={l.href} className="text-muted hover:text-fg">
                    {l.label}
                  </TextLink>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </article>
  );
}

function Archive() {
  return (
    <div className="mt-10 md:mt-20">
      <Reveal className="label mb-6 flex items-center gap-4 text-faint">
        <span>Index</span>
        <span>{ARCHIVE.length} more projects</span>
        <span aria-hidden className="h-px flex-1 bg-line" />
      </Reveal>
      <Reveal>
        <ul>
          {ARCHIVE.map((p, i) => {
            const link = p.links[0];
            return (
              <li key={p.slug}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid grid-cols-[2.25rem_1fr_auto] items-baseline gap-x-4 border-t border-line py-5 transition-colors duration-200 hover:bg-ink-2 md:grid-cols-[3rem_minmax(0,4fr)_minmax(0,5fr)_minmax(0,2fr)_2rem] md:gap-x-6 md:px-2 md:py-6"
                >
                  <span className="font-mono text-xs text-faint">{String(i + FEATURED.length + 1).padStart(2, '0')}</span>
                  <span className="text-lg font-medium tracking-[-0.02em] transition-transform duration-300 ease-out-expo group-hover:translate-x-1 md:text-xl">
                    {p.title}
                    <span className="mt-1.5 block text-[0.9375rem] leading-snug font-normal tracking-normal text-muted md:hidden">{p.outcome}</span>
                  </span>
                  <span className="hidden text-sm leading-relaxed text-muted md:block">{p.outcome}</span>
                  <span className="label hidden text-faint md:block">{p.category}</span>
                  <span className="flex justify-end text-muted transition-colors group-hover:text-fg">
                    <ArrowUpRight aria-hidden size={18} strokeWidth={1.5} />
                    <span className="sr-only">{link.label} (opens in a new tab)</span>
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </Reveal>
    </div>
  );
}

const Projects: React.FC = () => {
  return (
    <section id="projects" className="bg-ink py-20 md:py-32" aria-label="Projects">
      <div className="shell">
        <SectionHead
          index="03"
          label="Selected work"
          title={'Analysis you can\n*check* the working of.'}
          aside={
            <p className="text-muted">
              Four case studies in depth, then an index of everything else. Every figure here
              comes from the project itself.
            </p>
          }
        />
        {FEATURED.map((p, i) => (
          <FeaturedProject key={p.slug} project={p} index={i} />
        ))}
        <Archive />
      </div>
    </section>
  );
};

export default Projects;
