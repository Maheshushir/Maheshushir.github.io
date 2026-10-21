import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { EASE, VIEWPORT, fadeUp, reveal } from '@/lib/motion';
import { onInternalLink } from '@/lib/router';

/* Fades and lifts its children once, when they scroll into view. */
export function Reveal({
  children,
  className,
  delay = 0,
  as = 'div',
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: 'div' | 'li' | 'p' | 'figure';
}) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={fadeUp}
      transition={reveal(delay)}
    >
      {children}
    </Tag>
  );
}

/*
 * Masked word-by-word reveal. Each word rises out of its own line box, so
 * nothing shifts layout. Pass a string; wrap a word in *asterisks* to set it
 * in the italic serif.
 */
export function SplitWords({
  text,
  className,
  delay = 0,
  stagger = 0.06,
  immediate = false,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  immediate?: boolean;
}) {
  const reduce = useReducedMotion();
  const lines = text.split('\n');
  let index = 0;

  return (
    <span className={className}>
      {lines.map((line, li) => (
        <span key={li} className="md:block">
          {line.split(' ').map((raw, wi) => {
            const serif = raw.startsWith('*') && raw.replace(/[.,]$/, '').endsWith('*');
            const word = raw.replace(/\*/g, '');
            const i = index++;
            return (
              <span
                key={wi}
                className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-top"
              >
                <motion.span
                  className={cn('inline-block', serif && 'serif pr-[0.06em]')}
                  initial={reduce ? false : { y: '105%' }}
                  {...(immediate
                    ? { animate: { y: '0%' } }
                    : { whileInView: { y: '0%' }, viewport: VIEWPORT })}
                  transition={{ duration: 0.9, ease: EASE, delay: delay + i * stagger }}
                >
                  {word}
                  {wi < line.split(' ').length - 1 ? ' ' : ''}
                </motion.span>
              </span>
            );
          })}
          {li < lines.length - 1 && <span className="md:hidden"> </span>}
        </span>
      ))}
    </span>
  );
}

/* Section opener: numbered label row with a hairline, then a large heading. */
export function SectionHead({
  index,
  label,
  title,
  aside,
  className,
}: {
  index: string;
  label: string;
  title: string;
  aside?: React.ReactNode;
  className?: string;
}) {
  return (
    <header className={cn('mb-14 md:mb-24', className)}>
      <Reveal className="label flex items-center gap-4 opacity-70">
        <span>({index})</span>
        <span>{label}</span>
        <span aria-hidden className="h-px flex-1 bg-current opacity-25" />
      </Reveal>
      <div className="mt-8 grid gap-8 md:mt-12 md:grid-cols-12 md:items-end">
        <h2 className="text-headline font-medium md:col-span-8">
          <SplitWords text={title} />
        </h2>
        {aside && <Reveal className="md:col-span-4 md:pb-2" delay={0.2}>{aside}</Reveal>}
      </div>
    </header>
  );
}

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: 'solid' | 'outline';
  tone?: 'dark' | 'light';
  external?: boolean;
  download?: boolean;
  className?: string;
};

/* Pill button. Internal hrefs route without a reload; external ones open a new tab. */
export function Button({
  href,
  children,
  variant = 'solid',
  tone = 'dark',
  external,
  className,
}: ButtonProps) {
  const isExternal = external ?? href.startsWith('http');
  const solid =
    tone === 'dark' ? 'bg-fg text-ink hover:bg-white' : 'bg-paper-fg text-paper hover:bg-black';
  const outline =
    tone === 'dark'
      ? 'border border-line text-fg hover:border-fg'
      : 'border border-paper-line text-paper-fg hover:border-paper-fg';
  const Icon = isExternal ? ArrowUpRight : ArrowRight;
  return (
    <a
      href={href}
      onClick={isExternal ? undefined : onInternalLink}
      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={cn(
        'group inline-flex h-12 items-center gap-3 rounded-full pl-6 pr-5 text-[0.9375rem] font-medium transition-colors duration-200',
        variant === 'solid' ? solid : outline,
        className,
      )}
    >
      {children}
      <Icon
        aria-hidden
        size={17}
        strokeWidth={1.75}
        className={cn(
          'transition-transform duration-200 ease-out-expo',
          isExternal ? 'group-hover:-translate-y-0.5 group-hover:translate-x-0.5' : 'group-hover:translate-x-1',
        )}
      />
      {isExternal && <span className="sr-only">(opens in a new tab)</span>}
    </a>
  );
}

/* Quiet text link with a drawn underline. */
export function TextLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const isExternal = href.startsWith('http');
  return (
    <a
      href={href}
      onClick={isExternal ? undefined : onInternalLink}
      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={cn('group inline-flex items-center gap-1.5', className)}
    >
      <span className="link-draw pb-0.5">{children}</span>
      {isExternal ? (
        <ArrowUpRight aria-hidden size={15} strokeWidth={1.75} className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      ) : (
        <ArrowRight aria-hidden size={15} strokeWidth={1.75} className="transition-transform duration-200 group-hover:translate-x-1" />
      )}
      {isExternal && <span className="sr-only">(opens in a new tab)</span>}
    </a>
  );
}
