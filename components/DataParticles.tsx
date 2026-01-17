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
    let mouse = { x: -1000, y: -1000 };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      value: string;
      size: number;
      color: string;
      baseX: number;
      baseY: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.baseX = this.x;
        this.baseY = this.y;
        this.vx = (Math.random() - 0.5) * 0.3; // Very slow drift
        this.vy = (Math.random() - 0.5) * 0.3;
        this.value = Math.random() > 0.5 ? '1' : '0';
        this.size = Math.random() * 12 + 10; 
        // Tech colors: Emerald and Blue
        this.color = Math.random() > 0.5 
          ? 'rgba(16, 185, 129, 0.15)' // Emerald
          : 'rgba(59, 130, 246, 0.15)'; // Blue
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around screen
        if (this.x < 0) this.x = canvas!.width;
        if (this.x > canvas!.width) this.x = 0;
        if (this.y < 0) this.y = canvas!.height;
        if (this.y > canvas!.height) this.y = 0;

        // Mouse interaction
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Connect to mouse if close
        if (distance < 150) {
            // No movement change, just connection handled in draw
        }
      }

      draw() {
        if (!ctx) return;
        ctx.font = `${this.size}px monospace`;
        ctx.fillStyle = this.color;
        ctx.fillText(this.value, this.x, this.y);
      }
    }

    const initParticles = () => {
      particles = [];
      const density = 10000; // Lower is more dense
      const numberOfParticles = Math.floor((window.innerWidth * window.innerHeight) / density); 
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw connections first so they are behind text
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
            ctx.strokeStyle = p.color.replace('0.15)', `${opacity * 0.4})`); 
            ctx.moveTo(p.x + 5, p.y - 5); // Approximate center of text
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        }
      });

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
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