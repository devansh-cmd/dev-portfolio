import React from 'react';
import FadeContent from './FadeContent';

const About = () => {
  return (
    <section id="about" className="min-h-screen bg-gray-900 text-white relative z-30">
      <div className="container mx-auto px-6 py-20">
        <FadeContent delay={200}>
          <h2 className="text-4xl md:text-6xl font-bold mb-8 text-center">About Me</h2>
        </FadeContent>
        
        <div className="max-w-4xl mx-auto">
          <FadeContent delay={400}>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-lg mb-6 leading-relaxed">
                  I'm a passionate full-stack developer with a love for creating 
                  beautiful, functional web experiences. My journey in tech started 
                  with curiosity and has evolved into a dedication to crafting 
                  digital solutions that make a difference.
                </p>
                <p className="text-lg leading-relaxed">
                  When I'm not coding, you'll find me exploring new technologies, 
                  contributing to open source projects, or sharing knowledge with 
                  the developer community.
                </p>
              </div>
              <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg p-8">
                <h3 className="text-2xl font-bold mb-4">Quick Facts</h3>
                <ul className="space-y-2">
                  <li>🎓 Computer Science Graduate</li>
                  <li>💼 Full-Stack Developer</li>
                  <li>🌱 Always Learning</li>
                  <li>☕ Coffee Enthusiast</li>
                </ul>
              </div>
            </div>
          </FadeContent>
        </div>
      </div>
    </section>
  );
};

export default About;