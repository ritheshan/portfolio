import { motion } from 'framer-motion';
import { 
  Code2, 
  Database, 
  Globe, 
  Palette, 
  Smartphone,
  Server,
  GitBranch,
  Github,
  Rocket,
  Mail,
  Bot,
  Brain,
  Container,
  Cloud,
  RotateCcw,
  Zap,
  Crown,
  Users,
  Puzzle,
  FileText,
  Layers,
  Book,
  Shield,
  Triangle,
  Flame,
  Fish,
  Leaf,
  Wind,
  Building2,
  Moon
} from 'lucide-react';

const Skills = () => {
  const skills = [
    // Languages
    { name: "TypeScript", icon: Code2, color: "text-blue-600" },
    { name: "JavaScript", icon: Code2, color: "text-yellow-500" },
    { name: "Java", icon: Code2, color: "text-orange-600" },
    { name: "C++", icon: Code2, color: "text-blue-700" },
    { name: "C", icon: Code2, color: "text-blue-800" },
    { name: "HTML", icon: FileText, color: "text-orange-500" },
    { name: "CSS", icon: Palette, color: "text-blue-500" },
    
    // Libraries/Frameworks
    { name: "React", icon: Code2, color: "text-cyan-500" },
    { name: "Next.js", icon: Triangle, color: "text-black" },
    { name: "Tailwind CSS", icon: Wind, color: "text-cyan-400" },
    { name: "Material UI", icon: Building2, color: "text-blue-600" },
    { name: "ShadCN UI", icon: Moon, color: "text-gray-700" },
    { name: "Storybook", icon: Book, color: "text-pink-500" },
    
    // Databases/ORMs
    { name: "PostgreSQL", icon: Database, color: "text-blue-700" },
    { name: "MongoDB", icon: Leaf, color: "text-green-600" },
    { name: "MySQL", icon: Fish, color: "text-blue-600" },
    { name: "Firebase", icon: Flame, color: "text-orange-500" },
    { name: "Supabase", icon: Shield, color: "text-green-500" },
    { name: "Prisma", icon: Triangle, color: "text-gray-700" },
    
    // Tools/Platforms
    { name: "Git", icon: GitBranch, color: "text-orange-600" },
    { name: "GitHub", icon: Github, color: "text-gray-900" },
    { name: "Vercel", icon: Rocket, color: "text-black" },
    { name: "Netlify", icon: Globe, color: "text-teal-500" },
    { name: "Postman", icon: Mail, color: "text-orange-500" },
    { name: "UiPath", icon: Bot, color: "text-orange-600" },
    { name: "AI Tools", icon: Brain, color: "text-purple-600" },
    { name: "Docker", icon: Container, color: "text-blue-600" },
    { name: "AWS", icon: Cloud, color: "text-orange-500" },
    
    // Soft Skills
    { name: "Consistency", icon: RotateCcw, color: "text-green-600" },
    { name: "Determination", icon: Zap, color: "text-yellow-600" },
    { name: "Leadership", icon: Crown, color: "text-yellow-500" },
    { name: "Teamwork", icon: Users, color: "text-blue-600" },
    { name: "Problem-Solving", icon: Puzzle, color: "text-purple-600" },
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
        {skills.map((skill) => {
          const IconComponent = skill.icon;
          return (
            <motion.div
              key={skill.name}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="border rounded-lg px-4 py-3 shadow-sm bg-white hover:bg-blue-50 hover:shadow-md transition-all duration-200 cursor-pointer text-sm font-medium text-gray-700 flex items-center space-x-3"
            >
              <IconComponent size={18} className={skill.color} />
              <span>{skill.name}</span>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};

export default Skills;