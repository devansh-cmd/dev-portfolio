import React, { useRef, useEffect } from 'react';

// Color palette that cycles based on distance - using unified theme colors
const COLOR_PALETTE = [
  { h: 280, s: 90, l: 65 },  // theme-primary-1 (Deep purple)
  { h: 240, s: 85, l: 70 },  // theme-tertiary-3 (Light blue)
  { h: 185, s: 80, l: 65 },  // theme-secondary-2 (Medium cyan)
  { h: 220, s: 85, l: 60 },  // theme-tertiary-1 (Deep blue)
  { h: 285, s: 85, l: 70 },  // theme-primary-2 (Medium purple)
  { h: 195, s: 80, l: 68 },  // theme-secondary-4 (Teal)
];

const FlowingMouseTrail = () => {
  const canvasRef = useRef(null);
  const animationId = useRef(null);
  const trailPoints = useRef([]);
  const mousePos = useRef({ x: 0, y: 0 });
  const targetPos = useRef({ x: 0, y: 0 });
  const lastMouseTime = useRef(Date.now());
  const isMouseMoving = useRef(false);
  const totalDistance = useRef(0);
  const lastPos = useRef({ x: 0, y: 0 });
  const currentColorIndex = useRef(0);

  // Shorter trail length
  const TRAIL_LENGTH = 12;
  
  // Distance threshold for color change (pixels)
  const COLOR_CHANGE_DISTANCE = 150;
  
  // Initialize trail points
  const initTrail = () => {
    trailPoints.current = Array.from({ length: TRAIL_LENGTH }, () => ({
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      life: 1,
      baseOpacity: 1,
      colorIndex: 0
    }));
  };

  // Calculate distance between two points
  const distance = (p1, p2) => {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    initTrail();
    
    window.addEventListener('resize', resizeCanvas);

    // Mouse move handler
    const handleMouseMove = (e) => {
      const newPos = { x: e.clientX, y: e.clientY };
      
      // Calculate distance traveled
      if (lastPos.current.x !== 0 || lastPos.current.y !== 0) {
        const dist = distance(lastPos.current, newPos);
        totalDistance.current += dist;
        
        // Check if we should change color
        if (totalDistance.current >= COLOR_CHANGE_DISTANCE) {
          currentColorIndex.current++;
          totalDistance.current = 0; // Reset distance counter
        }
      }
      
      lastPos.current = newPos;
      targetPos.current = newPos;
      lastMouseTime.current = Date.now();
      isMouseMoving.current = true;
    };

    // Smooth interpolation function
    const lerp = (start, end, factor) => {
      return start + (end - start) * factor;
    };

    // Interpolate between colors
    const lerpColor = (color1, color2, factor) => {
      return {
        h: lerp(color1.h, color2.h, factor),
        s: lerp(color1.s, color2.s, factor),
        l: lerp(color1.l, color2.l, factor)
      };
    };

    // Animation loop
    const animate = () => {
      // Semi-transparent overlay for residual fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const currentTime = Date.now();
      const timeSinceLastMove = currentTime - lastMouseTime.current;
      
      // Check if mouse is still moving
      if (timeSinceLastMove > 50) {
        isMouseMoving.current = false;
      }
      
      // Smooth mouse position interpolation
      mousePos.current.x = lerp(mousePos.current.x, targetPos.current.x, 0.2);
      mousePos.current.y = lerp(mousePos.current.y, targetPos.current.y, 0.2);
      
      // Update trail points
      if (trailPoints.current.length > 0) {
        // First point follows the mouse
        trailPoints.current[0].targetX = mousePos.current.x;
        trailPoints.current[0].targetY = mousePos.current.y;
        trailPoints.current[0].colorIndex = currentColorIndex.current;
        
        // Each subsequent point follows the previous one with delay
        for (let i = 1; i < trailPoints.current.length; i++) {
          const prev = trailPoints.current[i - 1];
          const current = trailPoints.current[i];
          
          current.targetX = prev.x;
          current.targetY = prev.y;
          // Gradually transition color indices for smooth color changes
          current.colorIndex = lerp(current.colorIndex, prev.colorIndex, 0.1);
        }
        
        // Smooth interpolation for all points
        trailPoints.current.forEach((point, index) => {
          const factor = 0.25 - (index * 0.01); // Faster response for shorter trail
          point.x = lerp(point.x, point.targetX, Math.max(factor, 0.05));
          point.y = lerp(point.y, point.targetY, Math.max(factor, 0.05));
          
          // Update life/opacity based on mouse movement
          if (isMouseMoving.current) {
            point.life = Math.min(point.life + 0.1, 1);
            point.baseOpacity = 1 - (index / trailPoints.current.length);
          } else {
            // Gradual fade when mouse stops
            point.life = Math.max(point.life - 0.03, 0);
          }
        });
        
        // Draw trail with multi-color effect
        trailPoints.current.forEach((point, index) => {
          if ((point.x === 0 && point.y === 0) || point.life <= 0) return;
          
          const opacity = point.baseOpacity * point.life;
          const size = (6 - (index * 0.3)) * point.life; // Smaller max size
          
          if (opacity <= 0.01 || size <= 0.3) return;
          
          // Get colors for smooth transition
          const colorIndex1 = Math.floor(point.colorIndex) % COLOR_PALETTE.length;
          const colorIndex2 = Math.ceil(point.colorIndex) % COLOR_PALETTE.length;
          const colorFactor = point.colorIndex - Math.floor(point.colorIndex);
          
          const color = lerpColor(COLOR_PALETTE[colorIndex1], COLOR_PALETTE[colorIndex2], colorFactor);
          
          ctx.save();
          
          // Outer glow with dynamic color
          ctx.globalAlpha = opacity * 0.4;
          const glowGradient = ctx.createRadialGradient(
            point.x, point.y, 0,
            point.x, point.y, size * 3.5
          );
          
          glowGradient.addColorStop(0, `hsla(${color.h}, ${color.s}%, ${color.l + 10}%, 0.8)`);
          glowGradient.addColorStop(0.4, `hsla(${color.h + 20}, ${color.s - 10}%, ${color.l}%, 0.4)`);
          glowGradient.addColorStop(1, `hsla(${color.h + 40}, ${color.s - 20}%, ${color.l - 10}%, 0)`);
          
          ctx.fillStyle = glowGradient;
          ctx.beginPath();
          ctx.arc(point.x, point.y, size * 3.5, 0, Math.PI * 2);
          ctx.fill();
          
          // Inner glow
          ctx.globalAlpha = opacity * 0.6;
          const innerGlowGradient = ctx.createRadialGradient(
            point.x, point.y, 0,
            point.x, point.y, size * 1.8
          );
          innerGlowGradient.addColorStop(0, `hsla(${color.h}, ${color.s + 10}%, ${color.l + 15}%, 0.9)`);
          innerGlowGradient.addColorStop(0.6, `hsla(${color.h + 10}, ${color.s}%, ${color.l + 5}%, 0.5)`);
          innerGlowGradient.addColorStop(1, `hsla(${color.h + 20}, ${color.s - 10}%, ${color.l}%, 0)`);
          
          ctx.fillStyle = innerGlowGradient;
          ctx.beginPath();
          ctx.arc(point.x, point.y, size * 1.8, 0, Math.PI * 2);
          ctx.fill();
          
          // Main dot with dynamic color
          ctx.globalAlpha = opacity;
          const mainGradient = ctx.createRadialGradient(
            point.x, point.y, 0,
            point.x, point.y, size
          );
          
          if (index === 0) {
            // Main cursor point - brightest with white core
            mainGradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
            mainGradient.addColorStop(0.3, `hsla(${color.h}, ${color.s}%, ${Math.min(color.l + 20, 90)}%, 0.9)`);
            mainGradient.addColorStop(1, `hsla(${color.h + 15}, ${color.s - 5}%, ${color.l + 10}%, 0.7)`);
          } else {
            // Trail points with current color
            mainGradient.addColorStop(0, `hsla(${color.h}, ${color.s}%, ${color.l + 10}%, 0.9)`);
            mainGradient.addColorStop(0.5, `hsla(${color.h + 10}, ${color.s - 5}%, ${color.l}%, 0.6)`);
            mainGradient.addColorStop(1, `hsla(${color.h + 20}, ${color.s - 10}%, ${color.l - 5}%, 0.3)`);
          }
          
          ctx.fillStyle = mainGradient;
          ctx.beginPath();
          ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
          ctx.fill();
          
          ctx.restore();
        });
      }

      animationId.current = requestAnimationFrame(animate);
    };

    // Start animation
    animate();
    
    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup
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
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-50"
      style={{ 
        mixBlendMode: 'screen',
        background: 'transparent'
      }}
    />
  );
};

export default FlowingMouseTrail;