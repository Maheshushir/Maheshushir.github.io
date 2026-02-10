import React, { useEffect, useRef } from 'react';

const DataParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;
    // Initialize mouse off-screen
    let mouse = { x: -1000, y: -1000 };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      value: string;
      size: number;
      color: string;
      
      constructor(canvasWidth: number, canvasHeight: number) {
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.vx = (Math.random() - 0.5) * 0.3; // Very slow drift
        this.vy = (Math.random() - 0.5) * 0.3;
        this.value = Math.random() > 0.5 ? '1' : '0';
        this.size = Math.random() * 12 + 10; 
        // Tech colors: Emerald and Blue with low opacity
        this.color = Math.random() > 0.5 
          ? 'rgba(16, 185, 129, 0.15)' 
          : 'rgba(59, 130, 246, 0.15)';
      }

      update(width: number, height: number, mouseX: number, mouseY: number) {
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around screen
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      draw(context: CanvasRenderingContext2D) {
        context.font = `${this.size}px monospace`;
        context.fillStyle = this.color;
        context.fillText(this.value, this.x, this.y);
      }
    }

    const initParticles = () => {
      particles = [];
      const w = canvas.width;
      const h = canvas.height;
      if (w === 0 || h === 0) return;

      const density = 10000; 
      const numberOfParticles = Math.floor((w * h) / density); 
      
      // Safety cap to prevent too many particles on huge screens
      const safeLimit = Math.min(numberOfParticles, 500);

      for (let i = 0; i < safeLimit; i++) {
        particles.push(new Particle(w, h));
      }
    };

    const handleResize = () => {
      if (!canvas) return;
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

      // Draw connections
      ctx.lineWidth = 1;
      particles.forEach(p => {
        // Connect to mouse
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        
        if (dist < 150) {
            ctx.beginPath();
            // Gradient line fading out
            const opacity = 1 - (dist / 150);
            // Replace opacity in rgba string
            const colorBase = p.color.substring(0, p.color.lastIndexOf(','));
            ctx.strokeStyle = `${colorBase}, ${opacity * 0.4})`; 
            ctx.moveTo(p.x + 5, p.y - 5); 
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        }

        p.update(w, h, mouse.x, mouse.y);
        p.draw(ctx);
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    
    // Initial setup
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