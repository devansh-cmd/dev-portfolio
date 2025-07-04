import SplitText from "./SplitText";
import FadeContent from "./FadeContent";
import React from 'react';
import FlowingMouseTrail from './FlowingMouseTrail';

export default function Hero() {
  return (
    
    <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-purple-700 to-blue-900">
      <FlowingMouseTrail/>
      <SplitText
        text="Devansh Dev"
        splitType="chars"
        className="text-5xl font-bold text-white leading-tight pb-2"
        duration={1}
        delay={30}
        ease="power2.out"
        from={{ opacity: 0, y: 30 }}
        to={{ opacity: 1, y: 0 }}
    />

      <SplitText
        text="Creative developer exploring the modern web, one elegant solution at a time."
        splitType="words"
        className="mt-4 text-lg text-gray-300 max-w-2xl"
        duration={0.8}
        delay={40}
        ease="power2.out"
        from={{ opacity: 0, y: 10 }}
        to={{ opacity: 1, y: 0 }}
      />

      
      <FadeContent duration={800} delay={800}>
        <a
          href="#projects"
          className="mt-8 inline-block px-6 py-3 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition transform hover:scale-105"
        >
          View My Work
        </a>
      </FadeContent>
    </section>
    
  );
}
