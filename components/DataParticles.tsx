import React, { useEffect, useRef } from 'react';

const DataParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;
    let mouse = { x: -1000, y: -1000 };

    // Pre-define colors to avoid string parsing in loop
    const COLORS = [
      { r: 16, g: 185, b: 129 }, // Emerald
      { r: 59, g: 130, b: 246 }  // Blue
    ];

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      value: string;
      size: number;
      colorIndex: number;
      baseColor: string;
      
      constructor(canvasWidth: number, canvasHeight: number) {
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.vx = (Math.random() - 0.5) * 0.3; 
        this.vy = (Math.random() - 0.5) * 0.3;
        this.value = Math.random() > 0.5 ? '1' : '0';
        this.size = Math.random() * 12 + 10; 
        this.colorIndex = Math.random() > 0.5 ? 0 : 1;
        const c = COLORS[this.colorIndex];
        this.baseColor = `rgba(${c.r}, ${c.g}, ${c.b}, 0.15)`;
      }

      update(width: number, height: number) {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = width;
        else if (this.x > width) this.x = 0;
        
        if (this.y < 0) this.y = height;
        else if (this.y > height) this.y = 0;
      }

      draw(context: CanvasRenderingContext2D) {
        context.fillStyle = this.baseColor;
        context.fillText(this.value, this.x, this.y);
      }
    }

    const initParticles = () => {
      particles = [];
      const w = canvas.width;
      const h = canvas.height;
      if (w === 0 || h === 0) return;

      const density = 12000; // Increased density divisor (fewer particles) for better performance
      const numberOfParticles = Math.floor((w * h) / density); 
      const safeLimit = Math.min(numberOfParticles, 400); // Lower cap

      for (let i = 0; i < safeLimit; i++) {
        particles.push(new Particle(w, h));
      }
    };

    const handleResize = () => {
      if (!canvas) return;
      // Handle DPI scaling for sharper text if needed, 
      // but strictly for background performance we keep 1:1 or basic scaling.
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const w = canvas.width;
      const h = canvas.height;

      // Set font once if possible, or per particle if size varies significantly
      // Since size varies, we set it in loop.
      
      // Optimization: Batch drawing not strictly necessary for < 500 items but good practice.
      // However, line connections require checking distance.

      ctx.lineWidth = 1;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.update(w, h);

        // Draw text
        ctx.font = `${p.size}px monospace`; // Font string construction is cheap enough
        p.draw(ctx);

        // Connect to mouse
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        
        // Simple bounding box check before sqrt
        if (Math.abs(dx) < 150 && Math.abs(dy) < 150) {
          const distSq = dx * dx + dy * dy;
          if (distSq < 22500) { // 150^2
            const dist = Math.sqrt(distSq);
            const opacity = (1 - dist / 150) * 0.4;
            const c = COLORS[p.colorIndex];
            
            // Avoid string allocation if possible, but strokeStyle requires it.
            // Using rgba is fastest.
            ctx.strokeStyle = `rgba(${c.r}, ${c.g}, ${c.b}, ${opacity})`;
            ctx.beginPath();
            ctx.moveTo(p.x + 5, p.y - 5); // Offset to center of text roughly
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    
    handleResize();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
};

export default DataParticles;