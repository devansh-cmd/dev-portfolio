import React from 'react';
import FadeContent from './FadeContent';

const Contact = () => {
  return (
    <section id="contact" className="min-h-screen bg-gray-800 text-white relative z-30">
      <div className="container mx-auto px-6 py-20">
        <FadeContent delay={200}>
          <h2 className="text-4xl md:text-6xl font-bold mb-16 text-center">Get In Touch</h2>
        </FadeContent>
        
        <div className="max-w-2xl mx-auto text-center">
          <FadeContent delay={400}>
            <p className="text-xl mb-8 leading-relaxed">
              I'm always open to discussing new opportunities, interesting projects, 
              or just having a chat about technology and development.
            </p>
          </FadeContent>
          
          <FadeContent delay={600}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:your.email@example.com"
                className="px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-full transition-colors"
              >
                Email Me
              </a>
              <a 
                href="https://linkedin.com/in/yourprofile"
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-full transition-colors"
              >
                LinkedIn
              </a>
              <a 
                href="https://github.com/devansh-cmd"
                className="px-8 py-3 bg-gray-700 hover:bg-gray-600 rounded-full transition-colors"
              >
                GitHub
              </a>
            </div>
          </FadeContent>
        </div>
      </div>
    </section>
  );
};

export default Contact;