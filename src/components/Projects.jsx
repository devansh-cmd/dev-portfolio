import React from 'react';
import FadeContent from './FadeContent';

const Projects = () => {
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with React, Node.js, and MongoDB",
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      image: "https://via.placeholder.com/400x250",
      link: "#"
    },
    {
      title: "Task Management App",
      description: "Collaborative task management with real-time updates",
      tech: ["Vue.js", "Socket.io", "Express"],
      image: "https://via.placeholder.com/400x250",
      link: "#"
    },
    {
      title: "Weather Dashboard",
      description: "Beautiful weather dashboard with interactive charts",
      tech: ["React", "D3.js", "Weather API"],
      image: "https://via.placeholder.com/400x250",
      link: "#"
    }
  ];

  return (
    <section id="projects" className="min-h-screen bg-gray-800 text-white relative z-30">
      <div className="container mx-auto px-6 py-20">
        <FadeContent delay={200}>
          <h2 className="text-4xl md:text-6xl font-bold mb-16 text-center">My Projects</h2>
        </FadeContent>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <FadeContent key={index} delay={300 + index * 100}>
              <div className="bg-gray-900 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, i) => (
                      <span 
                        key={i}
                        className="px-3 py-1 bg-purple-600 text-sm rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a 
                    href={project.link}
                    className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors"
                  >
                    View Project
                  </a>
                </div>
              </div>
            </FadeContent>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;