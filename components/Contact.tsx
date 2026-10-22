import React, { useState } from 'react';
import { ArrowUp, ArrowUpRight, Check, Copy } from 'lucide-react';
import { Reveal, SplitWords } from '@/components/primitives';
import { CONTACT, PROFILE } from '@/lib/content';
import { scrollToId } from '@/lib/router';
import { cn } from '@/lib/utils';

function useCopy() {
  const [copied, setCopied] = useState<string | null>(null);
  const copy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(value);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      // Clipboard blocked (insecure context or permissions): the value stays visible to copy by hand.
    }
  };
  return { copied, copy };
}

const CHANNELS = [
  { label: 'LinkedIn', value: 'mahesh-ushir', href: CONTACT.linkedin },
  { label: 'GitHub', value: 'maheshushir', href: CONTACT.github },
  { label: 'Resume', value: 'View / download', href: PROFILE.resume },
  { label: 'Telegram', value: CONTACT.telegramHandle, href: CONTACT.telegram },
];

const Contact: React.FC = () => {
  const { copied, copy } = useCopy();

  return (
    <section id="contact" className="bg-ink pt-20 md:pt-32" aria-labelledby="contact-title">
      <div className="shell">
        <Reveal className="label flex items-center gap-4 text-muted">
          <span>(05)</span>
          <span>Contact</span>
          <span aria-hidden className="h-px flex-1 bg-line" />
        </Reveal>

        <h2 id="contact-title" className="mt-12 text-display font-medium md:mt-20">
          <SplitWords text={'Let’s make data\n*mean* something.'} />
        </h2>

        <div className="mt-14 grid gap-12 md:mt-20 md:grid-cols-12 md:gap-8">
          <Reveal className="md:col-span-5">
            <p className="max-w-[40ch] text-lead text-muted">
              Have an opportunity, collaboration or interesting problem in mind? Let’s connect.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="md:col-span-7">
            <p className="label mb-4 text-faint">Email</p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-4">
              <a
                href={`mailto:${CONTACT.email}`}
                className="link-draw py-2 text-[clamp(1.375rem,3.2vw,2.75rem)] leading-tight lg:py-1 font-medium tracking-[-0.035em] break-all"
              >
                {CONTACT.email}
              </a>
              <button
                type="button"
                onClick={() => copy(CONTACT.email)}
                className="inline-flex h-11 items-center gap-2 rounded-full border border-line px-4 text-sm text-muted transition-colors duration-200 hover:border-fg hover:text-fg"
              >
                {copied === CONTACT.email ? <Check size={15} aria-hidden /> : <Copy size={15} aria-hidden />}
                <span aria-live="polite">{copied === CONTACT.email ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <ul className="mt-12 grid sm:grid-cols-2">
              {CHANNELS.map((c, i) => (
                <li key={c.label} className={cn('border-t border-line', i % 2 === 1 && 'sm:border-l sm:pl-6')}>
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between py-5 sm:pr-6"
                  >
                    <span>
                      <span className="label block text-faint">{c.label}</span>
                      <span className="mt-2 block text-lg transition-colors group-hover:text-fg">{c.value}</span>
                    </span>
                    <ArrowUpRight
                      aria-hidden
                      size={20}
                      strokeWidth={1.5}
                      className="text-muted transition-[transform,color] duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg"
                    />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ))}
              <li className="border-t border-line sm:col-span-2">
                <button
                  type="button"
                  onClick={() => copy(CONTACT.phone)}
                  className="group flex w-full items-center justify-between py-5 text-left"
                >
                  <span>
                    <span className="label block text-faint">Phone</span>
                    <span className="mt-2 block text-lg tabular-nums">{CONTACT.phone}</span>
                  </span>
                  <span className="flex items-center gap-2 text-sm text-muted transition-colors group-hover:text-fg">
                    {copied === CONTACT.phone ? <Check size={15} aria-hidden /> : <Copy size={15} aria-hidden />}
                    <span aria-live="polite">{copied === CONTACT.phone ? 'Copied' : 'Copy number'}</span>
                  </span>
                </button>
              </li>
            </ul>
          </Reveal>
        </div>
      </div>

      <Footer />
    </section>
  );
};

export function Footer() {
  return (
    <footer className="shell mt-24 md:mt-36">
      <div className="label flex flex-col gap-4 border-t border-line py-6 text-faint md:flex-row md:items-center md:justify-between md:py-5">
        <p>© {new Date().getFullYear()} {PROFILE.name}. {PROFILE.location}.</p>
        <p>
          Motion components by{' '}
          <a href="https://rareui.com" target="_blank" rel="noopener noreferrer" className="link-draw text-muted hover:text-fg">
            Rare UI
          </a>
        </p>
        <div className="flex items-center gap-6">
          <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center hover:text-fg">LinkedIn</a>
          <a href={CONTACT.github} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center hover:text-fg">GitHub</a>
          <button
            type="button"
            onClick={() => (window.location.pathname === '/' ? scrollToId('home') : window.scrollTo({ top: 0 }))}
            className="inline-flex min-h-11 items-center gap-2 uppercase hover:text-fg"
          >
            Top <ArrowUp size={13} aria-hidden />
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Contact;
