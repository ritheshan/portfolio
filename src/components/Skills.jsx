import { motion } from 'framer-motion';

const Skills = () => {
  const skills = [
    // Languages
    { name: "TypeScript", icon: "🔷" },
    { name: "JavaScript", icon: "🟨" },
    { name: "Java", icon: "☕" },
    { name: "C++", icon: "➕" },
    { name: "C", icon: "🔵" },
    { name: "HTML", icon: "📄" },
    { name: "CSS", icon: "🎨" },

    // Libraries/Frameworks
    { name: "React", icon: "⚛️" },
    { name: "Next.js", icon: "⚫" },
    { name: "Tailwind CSS", icon: "🌬️" },
    { name: "Material UI", icon: "🧱" },
    { name: "ShadCN UI", icon: "🌑" },
    { name: "Storybook", icon: "📚" },

    // Databases/ORMs
    { name: "PostgreSQL", icon: "🐘" },
    { name: "MongoDB", icon: "🍃" },
    { name: "MySQL", icon: "🐬" },
    { name: "Firebase", icon: "🔥" },
    { name: "Supabase", icon: "🛡️" },
    { name: "Prisma", icon: "📐" },

    // Tools/Platforms
    { name: "Git", icon: "🐙" },
    { name: "GitHub", icon: "🐱" },
    { name: "Vercel", icon: "🚀" },
    { name: "Netlify", icon: "🌐" },
    { name: "Postman", icon: "📮" },
    { name: "UiPath", icon: "🤖" },
    { name: "AI Tools", icon: "🧠" },
    { name: "Docker", icon: "🐳" },
    { name: "AWS", icon: "☁️" },

    // Soft Skills
    { name: "Consistency", icon: "🔄" },
    { name: "Determination", icon: "💪" },
    { name: "Leadership", icon: "👑" },
    { name: "Teamwork", icon: "🤝" },
    { name: "Problem-Solving", icon: "🧩" },
  ];

  return (
    <section id="skills" className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-16 px-4">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold text-gray-900 mb-10"
      >
        Skills & Technologies
      </motion.h2>

      <motion.div
        className="flex flex-wrap justify-center gap-4 max-w-5xl w-full"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {skills.map((skill) => (
          <div
            key={skill.name}
            className="border rounded-lg px-4 py-2 shadow-sm bg-white hover:bg-blue-50 transition cursor-pointer text-sm font-medium text-gray-700 flex items-center space-x-2"
          >
            {skill.icon && <span>{skill.icon}</span>}
            <span>{skill.name}</span>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default Skills;
