import React, { useEffect, useRef } from 'react';

/*
 * The hero experiment: the visitor's own pointer becomes a dataset.
 * Moving the mouse drops points, a tap drops a small cluster, and an
 * ordinary least-squares line refits through them on every new point.
 * If nobody touches it for a moment, a "ghost" visitor draws a sample so
 * the idea still reads. Nothing is stored or sent anywhere.
 */

export type Fit = {
  n: number;
  slope: number; // in chart units: +1 means the line climbs the full height across the full width
  r2: number;
  ms: number; // time the fit took
  ghost: boolean; // true while the sample data is showing
};

type Pt = { x: number; y: number; born: number }; // x, y in 0..1, y up

const MAX_POINTS = 500;
const ACCENT = '#c8f03c';
const INK_DOT = 'rgba(247,247,245,0.55)';

function fit(points: Pt[]) {
  const t0 = performance.now();
  const n = points.length;
  let sx = 0, sy = 0, sxx = 0, sxy = 0;
  for (const p of points) {
    sx += p.x; sy += p.y; sxx += p.x * p.x; sxy += p.x * p.y;
  }
  const den = n * sxx - sx * sx;
  const slope = n > 1 && Math.abs(den) > 1e-9 ? (n * sxy - sx * sy) / den : 0;
  const intercept = n ? (sy - slope * sx) / n : 0.5;
  const mean = n ? sy / n : 0;
  let ssr = 0, sst = 0;
  for (const p of points) {
    const e = p.y - (slope * p.x + intercept);
    ssr += e * e;
    sst += (p.y - mean) ** 2;
  }
  const r2 = sst > 1e-9 ? Math.max(0, 1 - ssr / sst) : 0;
  return { slope, intercept, r2, ms: performance.now() - t0 };
}

// A drifting, rising wander: what a curious visitor's cursor might look like.
function ghostPoint(t: number): { x: number; y: number } {
  const x = 0.08 + ((t * 0.11) % 0.84);
  const y = 0.18 + x * 0.55 + Math.sin(t * 2.3) * 0.09 + Math.sin(t * 0.7 + 1) * 0.06;
  return { x: x + (Math.random() - 0.5) * 0.02, y: y + (Math.random() - 0.5) * 0.08 };
}

export default function TrendCanvas({
  target,
  onFit,
  reduced,
}: {
  target: React.RefObject<HTMLElement | null>;
  onFit: (f: Fit) => void;
  reduced: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const area = target.current;
    if (!canvas || !area) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let points: Pt[] = [];
    let ghost = true;
    let line = { slope: 0, intercept: 0.5 }; // drawn line eases toward the fitted one
    let goal = { slope: 0, intercept: 0.5 };
    let w = 0, h = 0, dpr = 1;
    let raf = 0, visible = true, dirtyUntil = 0;
    let last = { x: -1e3, y: -1e3, t: 0 };
    let ghostT = 0, ghostTimer = 0;
    let lastEmit = 0, emitTimer = 0;

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width; h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      kick(0);
    };

    // The line refits on every point; the readout updates at a readable pace
    // (slower for the sample, so its numbers don't churn).
    const refit = () => {
      const f = fit(points);
      goal = { slope: f.slope, intercept: f.intercept };
      const report = () => {
        lastEmit = performance.now();
        onFit({ n: points.length, slope: f.slope, r2: f.r2, ms: f.ms, ghost });
      };
      const gap = ghost ? 900 : 160;
      window.clearTimeout(emitTimer);
      if (performance.now() - lastEmit >= gap) report();
      else emitTimer = window.setTimeout(report, gap);
    };

    const add = (x: number, y: number) => {
      points.push({ x, y, born: performance.now() });
      if (points.length > MAX_POINTS) points.shift();
    };

    // Pointer position in chart units, or null outside the drawable band.
    const toChart = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = 1 - (e.clientY - r.top) / r.height;
      return x >= 0 && x <= 1 && y >= 0 && y <= 1 ? { x, y } : null;
    };

    const takeOver = () => {
      if (!ghost) return;
      ghost = false;
      window.clearInterval(ghostTimer);
      points = [];
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return; // touch moves scroll the page; taps add data instead
      const now = performance.now();
      const dx = e.clientX - last.x, dy = e.clientY - last.y;
      if (dx * dx + dy * dy < 196 || now - last.t < 28) return;
      const p = toChart(e);
      if (!p) return;
      last = { x: e.clientX, y: e.clientY, t: now };
      takeOver();
      add(p.x, p.y);
      refit();
      kick(700);
    };

    const onDown = (e: PointerEvent) => {
      if ((e.target as HTMLElement).closest('a, button')) return;
      const p = toChart(e);
      if (!p) return;
      takeOver();
      const spread = 26 / Math.max(w, 1);
      for (let i = 0; i < 6; i++) {
        add(p.x + (Math.random() - 0.5) * spread * 2, p.y + (Math.random() - 0.5) * spread * 2 * (w / h));
      }
      refit();
      kick(700);
    };

    const startGhost = () => {
      if (reduced) {
        // A finished sample, drawn once.
        for (let t = 0; t < 7.5; t += 0.06) { const g = ghostPoint(t); add(g.x, g.y); }
        refit();
        const f = fit(points);
        line = { slope: f.slope, intercept: f.intercept };
        kick(0);
        return;
      }
      ghostTimer = window.setInterval(() => {
        if (!ghost || !visible) return;
        ghostT += 0.06;
        const g = ghostPoint(ghostT);
        add(g.x, g.y);
        if (points.length > 140) points.shift();
        refit();
        kick(700);
      }, 45);
    };

    function draw(now: number) {
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx!.clearRect(0, 0, w, h);
      const k = reduced ? 1 : 0.12;
      line = {
        slope: line.slope + (goal.slope - line.slope) * k,
        intercept: line.intercept + (goal.intercept - line.intercept) * k,
      };
      const X = (x: number) => x * w;
      const Y = (y: number) => (1 - y) * h;
      const recent = points.length - 40;

      // Residuals for the newest points: the distance the model has to explain.
      if (points.length > 2) {
        ctx!.strokeStyle = 'rgba(200,240,60,0.18)';
        ctx!.lineWidth = 1;
        ctx!.beginPath();
        for (let i = Math.max(0, recent); i < points.length; i++) {
          const p = points[i];
          ctx!.moveTo(X(p.x), Y(p.y));
          ctx!.lineTo(X(p.x), Y(line.slope * p.x + line.intercept));
        }
        ctx!.stroke();
      }

      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        const age = Math.min(1, (now - p.born) / 350);
        const fresh = i >= points.length - 3;
        ctx!.fillStyle = fresh ? ACCENT : INK_DOT;
        ctx!.globalAlpha = ghost ? 0.7 : 1;
        ctx!.beginPath();
        ctx!.arc(X(p.x), Y(p.y), (fresh ? 3.2 : 2.2) * (reduced ? 1 : 0.4 + 0.6 * age), 0, Math.PI * 2);
        ctx!.fill();
      }
      ctx!.globalAlpha = 1;

      if (points.length > 1) {
        ctx!.strokeStyle = ACCENT;
        ctx!.lineWidth = 2;
        ctx!.setLineDash(ghost ? [6, 6] : []);
        ctx!.beginPath();
        ctx!.moveTo(0, Y(line.intercept));
        ctx!.lineTo(w, Y(line.slope + line.intercept));
        ctx!.stroke();
        ctx!.setLineDash([]);
      }
    }

    // Draw only while something is moving, and only while on screen.
    function loop(now: number) {
      draw(now);
      raf = now < dirtyUntil && visible ? requestAnimationFrame(loop) : 0;
    }
    function kick(ms: number) {
      dirtyUntil = Math.max(dirtyUntil, performance.now() + ms);
      if (!raf) raf = requestAnimationFrame(loop);
    }

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) kick(0);
    });
    io.observe(canvas);
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    area.addEventListener('pointermove', onMove);
    area.addEventListener('pointerdown', onDown);
    const startId = window.setTimeout(startGhost, reduced ? 0 : 900);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(startId);
      window.clearInterval(ghostTimer);
      window.clearTimeout(emitTimer);
      io.disconnect();
      ro.disconnect();
      area.removeEventListener('pointermove', onMove);
      area.removeEventListener('pointerdown', onDown);
    };
    // onFit is a stable state setter wrapper; the effect is set up once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, reduced]);

  return <canvas ref={canvasRef} aria-hidden className="absolute inset-0 size-full" />;
}
