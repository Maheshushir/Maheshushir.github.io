import React from 'react';
import { BrandMark, TOOLKIT, brandTitle } from '@/components/Logo';

// The toolkit behind the headline numbers, as a slow marquee.

const Proof: React.FC = () => {
  return (
    <section id="proof" aria-label="Toolkit" className="border-t border-line bg-ink py-10 md:py-14">
      <div className="shell">
        <p className="label mb-4 text-faint">Toolkit</p>
        <div className="marquee overflow-hidden">
          <ul className="marquee-track flex w-max">
            {[...TOOLKIT, ...TOOLKIT].map((t, i) => (
              <li
                key={i}
                aria-hidden={i >= TOOLKIT.length}
                className="mr-3 flex items-center gap-2.5 rounded-full border border-line bg-ink-2/80 py-2 pr-4 pl-3 text-sm whitespace-nowrap text-muted"
              >
                <BrandMark name={t} size={18} />
                {brandTitle(t)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Proof;
