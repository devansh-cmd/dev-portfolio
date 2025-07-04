import React, { useState, useEffect } from 'react';
import SplitText from "./SplitText";

const ScrollHero = () => {
  const [scrollY, setScrollY] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Determine which section is in view
      const sections = ['hero', 'about', 'projects', 'skills', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      sections.forEach((section, index) => {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setCurrentSection(index);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate opacity and transform based on scroll
  const heroOpacity = Math.max(1 - scrollY / 800, 0.15);
  const nameScale = Math.max(1 - scrollY / 2000, 0.6);
  const nameY = -(scrollY * 0.3);

  return (
    <div className="fixed inset-0 z-10 pointer-events-none overflow-hidden">
      {/* Animated background with floating particles */}
      <div 
        className="absolute inset-0 transition-all duration-1000 ease-out"
        style={{
          background: `
            radial-gradient(circle at 20% 80%, hsla(${280 + currentSection * 30}, 70%, 60%, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, hsla(${240 + currentSection * 25}, 80%, 50%, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, hsla(${320 + currentSection * 20}, 90%, 70%, 0.1) 0%, transparent 50%),
            linear-gradient(${135 + scrollY * 0.05}deg, 
              hsla(${280 + currentSection * 20}, 70%, ${40 + Math.min(scrollY * 0.01, 20)}%, 0.95), 
              hsla(${240 + currentSection * 15}, 80%, ${30 + Math.min(scrollY * 0.005, 15)}%, 0.9))`,
          opacity: heroOpacity
        }}
      />

      {/* Floating geometric shapes */}
      <div className="absolute inset-0" style={{ opacity: heroOpacity * 0.6 }}>
        <div 
          className="absolute w-64 h-64 border border-white/20 rounded-full"
          style={{
            top: '10%',
            left: '10%',
            transform: `rotate(${scrollY * 0.1}deg) scale(${1 + scrollY * 0.0002})`,
            animation: 'float 6s ease-in-out infinite'
          }}
        />
        <div 
          className="absolute w-32 h-32 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-lg"
          style={{
            top: '60%',
            right: '15%',
            transform: `rotate(${-scrollY * 0.15}deg) scale(${1 - scrollY * 0.0001})`,
            animation: 'float 4s ease-in-out infinite reverse'
          }}
        />
        <div 
          className="absolute w-48 h-48 border-2 border-cyan-400/30"
          style={{
            bottom: '20%',
            left: '20%',
            transform: `rotate(${scrollY * 0.08}deg)`,
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
            animation: 'float 8s ease-in-out infinite'
          }}
        />
      </div>
      
      {/* Fixed name with enhanced styling */}
      <div 
        className="absolute inset-0 flex flex-col items-center justify-center transition-transform duration-100 ease-out"
        style={{
          transform: `translateY(${nameY}px) scale(${nameScale})`,
          opacity: Math.max(heroOpacity, 0.3)
        }}
      >
        <div className="relative">
          {/* Glowing backdrop for name */}
          <div 
            className="absolute inset-0 blur-xl"
            style={{
              background: `linear-gradient(45deg, 
                hsla(${280 + currentSection * 30}, 100%, 70%, 0.4),
                hsla(${240 + currentSection * 25}, 100%, 60%, 0.3))`,
              transform: 'scale(1.2)'
            }}
          />
          
          <SplitText
            text="Devansh Dev"
            splitType="chars"
            className="relative text-6xl md:text-8xl font-bold text-white leading-tight pb-2 text-center"
            style={{
              textShadow: '0 0 30px rgba(255,255,255,0.5), 0 0 60px rgba(147,51,234,0.3)',
              background: `linear-gradient(45deg, #ffffff, hsla(${280 + currentSection * 20}, 100%, 80%, 1))`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
            duration={1}
            delay={30}
            ease="power2.out"
            from={{ opacity: 0, y: 30 }}
            to={{ opacity: 1, y: 0 }}
          />
        </div>
        
        {/* Enhanced subtitle */}
        <div 
          style={{ opacity: Math.max(1 - scrollY / 300, 0) }}
          className="transition-all duration-500 mt-6"
        >
          <SplitText
            text="Creative developer exploring the modern web"
            splitType="words"
            className="text-lg md:text-xl text-gray-300 max-w-2xl text-center px-4"
            style={{
              textShadow: '0 0 20px rgba(255,255,255,0.3)',
              background: 'linear-gradient(45deg, #e5e7eb, #a855f7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
            duration={0.8}
            delay={40}
            ease="power2.out"
            from={{ opacity: 0, y: 10 }}
            to={{ opacity: 1, y: 0 }}
          />
        </div>
      </div>

      {/* Enhanced scroll indicator */}
      <div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
        style={{ opacity: Math.max(1 - scrollY / 200, 0) }}
      >
        <div className="flex flex-col items-center animate-bounce">
          <span className="text-sm mb-2 font-medium tracking-wide">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-white/70 rounded-full flex justify-center relative">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
            <div className="absolute inset-0 rounded-full bg-white/10 animate-ping"></div>
          </div>
        </div>
      </div>

      {/* CSS for floating animation */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
      `}</style>
    </div>
  );
};

export default ScrollHero;