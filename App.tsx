import React, { useEffect } from 'react';
import { MotionConfig } from 'motion/react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Proof from '@/components/Proof';
import About from '@/components/About';
import Expertise from '@/components/Expertise';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Contact, { Footer } from '@/components/Contact';
import CaseStudy from '@/components/CaseStudy';
import { Button } from '@/components/primitives';
import { FEATURED } from '@/lib/content';
import { scrollToId, usePathname } from '@/lib/router';

function Home() {
  // Arriving at /#section from another page or a shared link.
  useEffect(() => {
    if (window.location.hash) requestAnimationFrame(() => scrollToId(window.location.hash.slice(1), false));
  }, []);

  return (
    <main id="main">
      <Hero />
      <Proof />
      <About />
      <Expertise />
      <Projects />
      <Experience />
      <Contact />
    </main>
  );
}

function NotFound() {
  useEffect(() => {
    document.title = 'Page not found | Mahesh Ushir';
  }, []);
  return (
    <>
      <main id="main" className="shell flex min-h-[80svh] flex-col justify-center pt-28">
        <p className="label text-muted">404</p>
        <h1 className="mt-6 text-headline font-medium">
          This page isn’t in the <span className="serif">dataset.</span>
        </h1>
        <div className="mt-10">
          <Button href="/">Back to home</Button>
        </div>
      </main>
      <Footer />
    </>
  );
}

const App: React.FC = () => {
  const pathname = usePathname().replace(/\/+$/, '') || '/';
  const match = pathname.match(/^\/work\/([\w-]+)$/);
  const project = match && FEATURED.find((p) => p.slug === match[1]);

  // reducedMotion="user": with the OS setting on, reveals keep their fade but drop all movement.
  return (
    <MotionConfig reducedMotion="user">
      <Navbar />
      {pathname === '/' ? <Home /> : project ? <CaseStudy key={project.slug} project={project} /> : <NotFound />}
    </MotionConfig>
  );
};

export default App;
