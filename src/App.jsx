import React from 'react';
import FlowingMouseTrail from './components/FlowingMouseTrail';
import ProfileCard from './components/ProfileCard';
import Beams from './components/Beams'; // Add this import
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import './index.css';

function App() {
  return (
    <div className="App relative">
      <FlowingMouseTrail />
      {/* ProfileCard section with Beams background */}
      <section className="min-h-screen flex flex-col items-center justify-center relative z-20">
        {/* Beams background */}
        <div className="absolute inset-0 z-0">
          <Beams
            beamWidth={2}
            beamHeight={15}
            beamNumber={12}
            lightColor="#ffffff"
            speed={2}
            noiseIntensity={1.75}
            scale={0.2}
            rotation={0}
          />
        </div>
        
        {/* ProfileCard on top of beams */}
        <div className="relative z-10">
          <ProfileCard
            name="Devansh Dev"
            title="Software and AI/ML Engineer"
            handle="devanshdev"
            status="Online"
            contactText="Contact Me"
            avatarUrl="/path/to/your-image.jpg"
            showUserInfo={true}
            enableTilt={true}
            onContactClick={() => console.log('Contact clicked')}
          />
        </div>
      </section>
      
      <About />
      <Projects />
      <Skills />
      <Contact />
    </div>
  );
}

export default App;