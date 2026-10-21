import type { Transition, Variants } from 'motion/react';

// One curve for the whole site: fast start, long soft settle.
export const EASE = [0.16, 1, 0.3, 1] as const;

export const DURATION = {
  micro: 0.2, // hovers, toggles
  reveal: 0.7, // content entering the viewport
} as const;

export const reveal = (delay = 0): Transition => ({
  duration: DURATION.reveal,
  ease: EASE,
  delay,
});

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: reveal() },
};

// Viewport settings shared by every scroll reveal.
export const VIEWPORT = { once: true, margin: '0px 0px -12% 0px' } as const;
