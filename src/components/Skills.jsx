import React from 'react';
import FadeContent from './FadeContent';

const Skills = () => {
  const skillCategories = [
    {
      category: "Frontend",
      skills: ["React", "Vue.js", "TypeScript", "Tailwind CSS", "GSAP"]
    },
    {
      category: "Backend", 
      skills: ["Node.js", "Express", "Python", "PostgreSQL", "MongoDB"]
    },
    {
      category: "Tools",
      skills: ["Git", "Docker", "AWS", "Figma", "VS Code"]
    }
  ];

  return (
    <section id="skills" className="min-h-screen bg-gray-900 text-white relative z-30">
      <div className="container mx-auto px-6 py-20">
        <FadeContent delay={200}>
          <h2 className="text-4xl md:text-6xl font-bold mb-16 text-center">Skills & Tech</h2>
        </FadeContent>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {skillCategories.map((category, index) => (
            <FadeContent key={index} delay={300 + index * 150}>
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-6 text-center text-purple-400">
                  {category.category}
                </h3>
                <ul className="space-y-3">
                  {category.skills.map((skill, i) => (
                    <li 
                      key={i}
                      className="bg-gray-700 rounded-lg p-3 text-center hover:bg-purple-600 transition-colors cursor-default"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeContent>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;