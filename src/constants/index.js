export const SITE_CONFIG = {
  name: 'Rithesh',
  title: 'Engineering Tomorrow\'s Web',
  email: 'contact@rithesh.dev',
  profileImage: '/src/assets/my_image.png',
  description: 'Hello World! 🌍 Crafting innovative digital experiences with cutting-edge technologies.',
  socials: {
    github: 'https://github.com/ritheshan',
    linkedin: 'https://linkedin.com/in/ritheshan',
    twitter: 'https://twitter.com/ritheshan',
  },
};

export const ABOUT_DATA = {
  description: `I'm Rithesh, a passionate Full Stack Developer with a strong interest in Machine Learning. 
  I have a background in Computer Science where I specialized in AI systems and web development technologies.`,
  experience: [
    { title: 'Senior Full Stack Developer', company: 'Tech Corp', period: '2022 - Present' },
    { title: 'Machine Learning Engineer', company: 'AI Solutions', period: '2020 - 2022' },
    { title: 'Frontend Developer', company: 'StartupXYZ', period: '2019 - 2020' },
  ],
  education: {
    degree: 'Bachelor of Computer Science',
    university: 'XYZ University',
    year: '2019',
  },
};

export const SKILLS = [
  { name: 'React', category: 'Frontend', level: 90 },
  { name: 'Node.js', category: 'Backend', level: 85 },
  { name: 'Python', category: 'Programming', level: 88 },
  { name: 'TypeScript', category: 'Programming', level: 82 },
  { name: 'MongoDB', category: 'Database', level: 80 },
  { name: 'PostgreSQL', category: 'Database', level: 75 },
  { name: 'AWS', category: 'Cloud', level: 78 },
  { name: 'Docker', category: 'DevOps', level: 85 },
  { name: 'TensorFlow', category: 'ML/AI', level: 75 },
  { name: 'Scikit-learn', category: 'ML/AI', level: 80 },
];

export const PROJECTS = [
  {
    id: 1,
    title: 'FoodLoop',
    description: 'A recipe sharing platform with social features and AI-powered ingredient substitution suggestions.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'TensorFlow'],
    github: 'https://github.com/ritheshan/foodloop',
    demo: 'https://foodloop-demo.netlify.app',
    image: '/api/placeholder/400/300',
  },
  {
    id: 2,
    title: 'DevCollab',
    description: 'Real-time collaborative coding platform with integrated chat and version control features.',
    technologies: ['React', 'Socket.io', 'Express', 'PostgreSQL', 'Redis'],
    github: 'https://github.com/ritheshan/devcollab',
    demo: 'https://devcollab-demo.vercel.app',
    image: '/api/placeholder/400/300',
  },
  {
    id: 3,
    title: 'DataVizPro',
    description: 'Interactive data visualization dashboard with customizable charts and ML insights.',
    technologies: ['React', 'D3.js', 'Python', 'Flask', 'Pandas'],
    github: 'https://github.com/ritheshan/datavizpro',
    demo: 'https://datavizpro-demo.herokuapp.com',
    image: '/api/placeholder/400/300',
  },
  {
    id: 4,
    title: 'EcoTrack',
    description: 'Mobile app for tracking and reducing personal carbon footprint with community challenges.',
    technologies: ['React Native', 'Firebase', 'TensorFlow Lite', 'Node.js'],
    github: 'https://github.com/ritheshan/ecotrack',
    demo: 'https://ecotrack-demo.expo.dev',
    image: '/api/placeholder/400/300',
  },
];

export const NAV_SECTIONS = [
  { id: 'about', label: 'About', icon: '👨‍💻' },
  { id: 'skills', label: 'Skills', icon: '🚀' },
  { id: 'projects', label: 'Projects', icon: '💼' },
  { id: 'contact', label: 'Contact', icon: '📧' },
];

export const TERMINAL_COMMANDS = {
  help: {
    description: 'Show available commands',
    output: `Available commands:
- help: Show this help message
- ls: List available sections
- cd [section]: Navigate to a section (about, skills, projects, contact)
- clear: Clear the terminal screen
- whoami: Display information about me`,
  },
  ls: {
    description: 'List available sections',
    output: `Available sections:
- about/     Personal information and experience
- skills/    Technical skills and expertise
- projects/  Portfolio projects and work
- contact/   Get in touch information`,
  },
  whoami: {
    description: 'Display information about me',
    output: `${SITE_CONFIG.name} - ${SITE_CONFIG.title}
Email: ${SITE_CONFIG.email}
GitHub: ${SITE_CONFIG.socials.github}
LinkedIn: ${SITE_CONFIG.socials.linkedin}`,
  },
};
