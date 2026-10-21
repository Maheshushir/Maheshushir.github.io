import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { NAV, PROFILE } from '@/lib/content';
import { EASE } from '@/lib/motion';
import { onInternalLink, usePathname } from '@/lib/router';
import { cn } from '@/lib/utils';

function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState('home');
  useEffect(() => {
    if (!enabled) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    NAV.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [enabled]);
  return active;
}

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const onHome = pathname === '/';
  const active = useActiveSection(onHome);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const go = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setOpen(false);
    onInternalLink(e);
  };

  return (
    <>
      <a
        href="#main"
        className="label fixed top-3 left-3 z-[70] -translate-y-20 rounded-full bg-fg px-4 py-3 text-ink focus:translate-y-0"
      >
        Skip to content
      </a>

      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300',
          scrolled || open ? 'border-b border-line bg-ink/90 backdrop-blur-md' : 'border-b border-transparent',
        )}
      >
        <nav aria-label="Primary" className="shell flex h-16 items-center justify-between md:h-[4.5rem]">
          <a href="/#home" onClick={go} className="group flex items-baseline gap-3">
            <span className="text-[1.0625rem] font-semibold tracking-[-0.03em]">MU</span>
            <span className="hidden text-sm text-muted transition-colors group-hover:text-fg sm:inline">
              {PROFILE.name}
            </span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV.map(({ label, id }) => {
              const isActive = onHome && active === id;
              return (
                <li key={id}>
                  <a
                    href={`/#${id}`}
                    onClick={go}
                    aria-current={isActive ? 'location' : undefined}
                    className={cn(
                      'relative px-3 py-2 text-sm transition-colors duration-200',
                      isActive ? 'text-fg' : 'text-muted hover:text-fg',
                    )}
                  >
                    {label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-x-3 -bottom-0.5 h-px bg-fg"
                        transition={{ duration: 0.4, ease: EASE }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={PROFILE.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="group hidden h-10 items-center gap-2 rounded-full border border-line px-4 text-sm transition-colors hover:border-fg sm:inline-flex"
            >
              Resume
              <ArrowUpRight aria-hidden size={15} strokeWidth={1.75} className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="relative flex h-11 w-11 items-center justify-center lg:hidden"
            >
              <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
              <span aria-hidden className={cn('absolute h-px w-5 bg-fg transition-transform duration-300 ease-out-expo', open ? 'rotate-45' : '-translate-y-[3.5px]')} />
              <span aria-hidden className={cn('absolute h-px w-5 bg-fg transition-transform duration-300 ease-out-expo', open ? '-rotate-45' : 'translate-y-[3.5px]')} />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-40 flex flex-col bg-ink pt-16 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
          >
            <ul className="shell flex flex-1 flex-col justify-center gap-1">
              {NAV.map(({ label, id }, i) => (
                <li key={id} className="overflow-hidden">
                  <motion.a
                    href={`/#${id}`}
                    onClick={go}
                    className="flex items-baseline gap-4 py-2 text-[clamp(2.5rem,11vw,4rem)] leading-none font-medium tracking-[-0.04em]"
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.6, ease: EASE, delay: 0.05 + i * 0.05 }}
                  >
                    <span className="label text-faint">0{i + 1}</span>
                    {label}
                  </motion.a>
                </li>
              ))}
            </ul>
            <div className="shell label flex justify-between border-t border-line py-6 text-muted">
              <a href={PROFILE.resume} target="_blank" rel="noopener noreferrer" className="hover:text-fg">
                Resume ↗
              </a>
              <span>{PROFILE.location}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
