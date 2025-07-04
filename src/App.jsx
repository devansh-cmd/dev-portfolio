import React from 'react';
import FlowingMouseTrail from './components/FlowingMouseTrail';
import ScrollHero from './components/ScrollHero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import './index.css'; 

function App() {
  return (
    <div className="App relative">
      {/* Fixed background hero that stays in place */}
      <ScrollHero />
      
      {/* Mouse trail should be on top of everything */}
      <FlowingMouseTrail/>
      
      {/* Spacer to allow initial scroll space */}
      <div className="h-screen" id="hero"></div>
      
      {/* Scrolling content sections */}
      <div className="relative z-30">
        <About />
        <Projects />
        <Skills />
        <Contact />
      </div>
    </div>
  );
}

export default App;