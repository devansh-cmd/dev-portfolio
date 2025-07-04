import React from 'react';
import FlowingMouseTrail from './components/FlowingMouseTrail';
import ProfileCard from './components/ProfileCard';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import './index.css';

function App() {
  return (
    <div className="App relative">
      <FlowingMouseTrail />
      {/* ProfileCard replaces your hero/name section */}
      <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-purple-700 to-blue-900 relative z-20">
        <ProfileCard
          name="Javi A. Torres"
          title="Software Engineer"
          handle="javicodes"
          status="Online"
          contactText="Contact Me"
          avatarUrl="/path/to/avatar.jpg"
          showUserInfo={true}
          enableTilt={true}
          onContactClick={() => console.log('Contact clicked')}
        />
      </section>
      <About />
      <Projects />
      <Skills />
      <Contact />
    </div>
  );
}

export default App;