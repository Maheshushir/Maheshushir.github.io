import React, { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button, Reveal, SplitWords, TextLink } from '@/components/primitives';
import { DatasetPanel, Shot } from '@/components/Projects';
import { Footer } from '@/components/Contact';
import { FEATURED, SITE_URL, type Project } from '@/lib/content';
import { onInternalLink } from '@/lib/router';

function Block({ index, label, children }: { index: string; label: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-6 border-t border-line py-14 md:grid-cols-12 md:gap-8 md:py-20">
      <Reveal className="label flex gap-3 text-muted md:col-span-3">
        <span>({index})</span>
        <span>{label}</span>
      </Reveal>
      <div className="md:col-span-9">{children}</div>
    </section>
  );
}

function useDocumentMeta(project: Project) {
  useEffect(() => {
    const prevTitle = document.title;
    const desc = document.querySelector('meta[name="description"]');
    const canonical = document.querySelector('link[rel="canonical"]');
    const prevDesc = desc?.getAttribute('content') ?? '';
    const prevCanonical = canonical?.getAttribute('href') ?? '';
    document.title = `${project.title} Case Study | Mahesh Ushir`;
    desc?.setAttribute('content', project.problem);
    canonical?.setAttribute('href', `${SITE_URL}/work/${project.slug}`);
    return () => {
      document.title = prevTitle;
      desc?.setAttribute('content', prevDesc);
      canonical?.setAttribute('href', prevCanonical);
    };
  }, [project]);
}

const CaseStudy: React.FC<{ project: Project }> = ({ project }) => {
  useDocumentMeta(project);
  const cs = project.caseStudy!;
  const i = FEATURED.findIndex((p) => p.slug === project.slug);
  const next = FEATURED[(i + 1) % FEATURED.length];
  let n = 0;
  const num = () => String(++n).padStart(2, '0');

  return (
    <>
      <main id="main">
        <article className="shell pt-28 md:pt-36" aria-labelledby="cs-title">
          <a
            href="/#projects"
            onClick={onInternalLink}
            className="label group inline-flex items-center gap-2 text-muted hover:text-fg"
          >
            <ArrowLeft aria-hidden size={14} className="transition-transform duration-200 group-hover:-translate-x-1" />
            All work
          </a>

          <header className="mt-12 md:mt-20">
            <p className="label text-muted">
              Case study {String(i + 1).padStart(2, '0')} · {project.category}
            </p>
            <h1 id="cs-title" className="mt-6 text-display font-medium">
              <SplitWords immediate delay={0.1} text={project.title} />
            </h1>
            <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-12 md:gap-8">
              <Reveal className="md:col-span-7">
                <p className="text-[clamp(1.25rem,2vw,1.75rem)] leading-[1.35] tracking-[-0.015em] text-muted">
                  {project.problem}
                </p>
              </Reveal>
              <Reveal delay={0.1} className="md:col-span-4 md:col-start-9">
                <dl className="grid gap-5 text-sm">
                  <div>
                    <dt className="label text-faint">Tools</dt>
                    <dd className="mt-2">{project.stack.join(', ')}</dd>
                  </div>
                  <div>
                    <dt className="label text-faint">Links</dt>
                    <dd className="mt-2 flex flex-wrap gap-x-5 gap-y-2">
                      {project.links.map((l) => (
                        <TextLink key={l.href} href={l.href}>
                          {l.label}
                        </TextLink>
                      ))}
                    </dd>
                  </div>
                </dl>
              </Reveal>
            </div>
          </header>

          <div className="mt-14 md:mt-20">
            {project.cover ? <Shot image={project.cover} eager className="group" /> : <DatasetPanel />}
          </div>

          {project.facts && (
            <dl className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
              {project.facts.map((f) => (
                <Reveal key={f.label} className="flex flex-col border-t border-line pt-4">
                  <dt className="label order-2 mt-2 text-faint">{f.label}</dt>
                  <dd className="text-[clamp(1.5rem,3vw,2.5rem)] font-medium tracking-[-0.04em] tabular-nums">{f.value}</dd>
                </Reveal>
              ))}
            </dl>
          )}

          <div className="mt-20 md:mt-28">
            <Block index={num()} label="Context & data">
              <Reveal>
                <p className="max-w-[60ch] text-lead">{cs.context}</p>
              </Reveal>
            </Block>

            <Block index={num()} label="Approach">
              <ol className="grid gap-x-10 sm:grid-cols-2">
                {cs.approach.map((s, k) => (
                  <Reveal as="li" key={s.title} delay={0.05 * k} className="border-t border-line py-6 first:border-t-0 sm:[&:nth-child(2)]:border-t-0">
                    <p className="font-mono text-xs text-faint">Step {k + 1}</p>
                    <h3 className="mt-3 text-xl font-medium tracking-[-0.02em]">{s.title}</h3>
                    <p className="mt-2 leading-relaxed text-muted">{s.text}</p>
                  </Reveal>
                ))}
              </ol>
            </Block>

            {cs.findings.length > 0 && (
              <Block index={num()} label="Key findings">
                <ol>
                  {cs.findings.map((f, k) => (
                    <Reveal
                      as="li"
                      key={f.figure}
                      delay={0.05 * k}
                      className="grid gap-3 border-t border-line py-7 first:border-t-0 first:pt-0 md:grid-cols-9 md:gap-8"
                    >
                      <p className="text-[clamp(1.75rem,3.4vw,3rem)] leading-none font-medium tracking-[-0.04em] tabular-nums md:col-span-4">
                        {f.figure}
                      </p>
                      <p className="leading-relaxed text-muted md:col-span-5">{f.text}</p>
                    </Reveal>
                  ))}
                </ol>
              </Block>
            )}

            <Block index={num()} label="Outcome">
              <Reveal>
                <p className="max-w-[48ch] text-[clamp(1.375rem,2.4vw,2rem)] leading-[1.3] tracking-[-0.02em]">{cs.outcome}</p>
              </Reveal>
            </Block>

            {cs.gallery.length > 0 && (
              <Block index={num()} label="Visuals">
                <div className="grid gap-12">
                  {cs.gallery.map((img) => (
                    <figure key={img.src} className="group">
                      <Shot image={img} color />
                      {img.caption && <figcaption className="mt-4 max-w-[60ch] text-sm text-muted">{img.caption}</figcaption>}
                    </figure>
                  ))}
                </div>
              </Block>
            )}
          </div>

          <div className="flex flex-wrap gap-3 border-t border-line py-14">
            {project.links.map((l, k) => (
              <Button key={l.href} href={l.href} variant={k === 0 ? 'solid' : 'outline'}>
                {l.label}
              </Button>
            ))}
          </div>
        </article>

        <a
          href={`/work/${next.slug}`}
          onClick={onInternalLink}
          className="group block border-t border-line bg-ink-2 transition-colors duration-300 hover:bg-ink-3"
        >
          <div className="shell py-16 md:py-24">
            <p className="label text-muted">Next case study</p>
            <p className="mt-6 flex items-end justify-between gap-6 text-headline font-medium">
              <span>{next.title}</span>
              <span aria-hidden className="text-muted transition-transform duration-300 ease-out-expo group-hover:translate-x-2 group-hover:text-fg">
                →
              </span>
            </p>
          </div>
        </a>
      </main>
      <Footer />
    </>
  );
};

export default CaseStudy;
