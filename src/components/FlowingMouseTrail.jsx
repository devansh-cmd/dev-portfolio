import React, { useEffect, useRef } from 'react';

const FlowingMouseTrail = () => {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const mouse = useRef({ x: 0, y: 0, prevX: 0, prevY: 0 });
  const animationId = useRef(null);

  class FlowParticle {
    constructor(x, y, velX, velY) {
      this.x = x;
      this.y = y;
      this.vx = velX + (Math.random() - 0.5) * 1;
      this.vy = velY + (Math.random() - 0.5) * 1;
      this.life = 1;
      this.decay = Math.random() * 0.02 + 0.005;
      this.size = Math.random() * 12 + 3;
      this.originalSize = this.size;
      
      // Color based on velocity for flow effect
      const speed = Math.sqrt(velX * velX + velY * velY);
      this.hue = (Date.now() * 0.01 + speed * 10) % 360;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.life -= this.decay;
      
      // Slight gravity and drag
      this.vx *= 0.98;
      this.vy *= 0.98;
      this.vy += 0.02;
      
      // Size animation
      this.size = this.originalSize * this.life;
    }

    draw(ctx) {
      if (this.life <= 0) return;
      
      ctx.save();
      ctx.globalAlpha = this.life * 0.8;
      
      // Multi-layer glow effect
      const gradient = ctx.createRadialGradient(
        this.x, this.y, 0,
        this.x, this.y, this.size * 2
      );
      
      gradient.addColorStop(0, `hsla(${this.hue}, 100%, 70%, 0.9)`);
      gradient.addColorStop(0.3, `hsla(${this.hue + 30}, 100%, 60%, 0.6)`);
      gradient.addColorStop(0.7, `hsla(${this.hue + 60}, 100%, 50%, 0.3)`);
      gradient.addColorStop(1, `hsla(${this.hue + 90}, 100%, 40%, 0)`);
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
      ctx.fill();
      
      // Inner bright core
      ctx.globalAlpha = this.life;
      ctx.fillStyle = `hsla(${this.hue}, 100%, 90%, 0.8)`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size * 0.5, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.restore();
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const handleMouseMove = (e) => {
      const currentMouse = { x: e.clientX, y: e.clientY };
      
      // Calculate velocity
      const velX = (currentMouse.x - mouse.current.x) * 0.1;
      const velY = (currentMouse.y - mouse.current.y) * 0.1;
      
      // Create flowing particles based on movement
      const speed = Math.sqrt(velX * velX + velY * velY);
      const particleCount = Math.min(Math.floor(speed * 0.5) + 1, 8);
      
      for (let i = 0; i < particleCount; i++) {
        const offsetX = (Math.random() - 0.5) * 30;
        const offsetY = (Math.random() - 0.5) * 30;
        
        particles.current.push(
          new FlowParticle(
            currentMouse.x + offsetX,
            currentMouse.y + offsetY,
            velX,
            velY
          )
        );
      }
      
      mouse.current = currentMouse;
    };

    const animate = () => {
      // Fade effect instead of clearing
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particles.current = particles.current.filter(particle => {
        particle.update();
        particle.draw(ctx);
        return particle.life > 0;
      });

      // Performance limit
      if (particles.current.length > 200) {
        particles.current = particles.current.slice(-200);
      }

      animationId.current = requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resizeCanvas);
      if (animationId.current) {
        cancelAnimationFrame(animationId.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-10"
      style={{ 
        mixBlendMode: 'screen',
        background: 'transparent'
      }}
    />
  );
};

export default FlowingMouseTrail;