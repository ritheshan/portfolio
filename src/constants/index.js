export const SITE_CONFIG = {
  name: 'Rithesh N',
  title: "Engineering Tomorrow's Web",
  email: 'ritheshanbgl@gmail.com',
  profileImage: '/src/assets/my_image.png',
  description: 'Full Stack Developer | AI & ML Enthusiast | Problem Solver 🚀 Passionate about building scalable products, integrating AI solutions, and contributing to impactful digital experiences.',
  socials: {
    github: 'https://github.com/ritheshan',
    linkedin: 'https://linkedin.com/in/ritheshan',
    leetcode: 'https://leetcode.com/rithesh_n',
  },
};

export const ABOUT_DATA = {
  description: `I'm Rithesh, a Computer Science Engineering student at JSS STU, Mysore (CGPA: 9.0), with a strong foundation in full-stack web development, AI/ML, and problem solving. I thrive on creating real-world solutions using cutting-edge technologies. From building AI-powered assistants to blockchain-integrated donation platforms, I aim to engineer tomorrow's web with innovation and scalability.`,
  experience: [
    { title: 'Product Engineer Intern', company: 'Deloitte, Bengaluru', period: 'May 2025 – Jul 2025' },
  ],
  education: {
    degree: 'Bachelor of Engineering in Computer Science',
    university: 'JSS Science and Technology University (Formerly SJCE), Mysore',
    year: 'Nov 2022 – Present',
    details: 'CGPA: 9.0',
  },
};

export const SKILLS = [
  { name: 'React.js', category: 'Frontend', level: 90 },
  { name: 'Next.js', category: 'Frontend', level: 85 },
  { name: 'Node.js', category: 'Backend', level: 88 },
  { name: 'Express.js', category: 'Backend', level: 85 },
  { name: 'TypeScript', category: 'Programming', level: 85 },
  { name: 'Python', category: 'Programming', level: 90 },
  { name: 'C++', category: 'Programming', level: 85 },
  { name: 'MongoDB', category: 'Database', level: 82 },
  { name: 'PostgreSQL', category: 'Database', level: 80 },
  { name: 'Docker', category: 'DevOps', level: 85 },
  { name: 'AWS', category: 'Cloud', level: 78 },
  { name: 'Git & GitHub', category: 'Tools', level: 90 },
  { name: 'LangChain', category: 'ML/AI', level: 75 },
  { name: 'TensorFlow', category: 'ML/AI', level: 75 },
  { name: 'Scikit-learn', category: 'ML/AI', level: 80 },
];

export const PROJECTS = [
  {
    id: 1,
    title: 'VoxBiz',
    description: 'A Gen-AI-driven business intelligence platform enabling natural language queries that are converted into SQL and visualized as charts/tables in real time. Built with React, NLP, and PostgreSQL.',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'NLP', 'LangChain'],
    github: 'https://github.com/ritheshan/VoxBiz',
    demo: '',
    image: '/api/placeholder/400/300',
  },
  {
    id: 2,
    title: 'FoodLoop',
    description: 'Blockchain-integrated food donation app connecting donors with NGOs. Includes donation tracking, NFT certificate minting, geolocation, spoilage detection (Google Vision), and dashboards.',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Hardhat', 'IPFS'],
    github: 'https://github.com/ritheshan/FoodLoop',
    demo: '',
    image: '/api/placeholder/400/300',
  },
  {
    id: 3,
    title: 'CilliBlog',
    description: 'A MERN stack blog platform with role-based access. Admins manage CRUD operations on posts, while users browse categorized posts (trending, sports, devotion).',
    technologies: ['React', 'MongoDB', 'Express', 'Node.js'],
    github: 'https://github.com/ritheshan/blog-app',
    demo: '',
    image: '/api/placeholder/400/300',
  },
  {
    id: 4,
    title: 'Journey Quest',
    description: 'A country-tracking travel app with interactive SVG maps and PostgreSQL backend, allowing users to log visited countries and visualize their journeys.',
    technologies: ['Node.js', 'Express', 'PostgreSQL', 'SVG'],
    github: '',
    demo: '',
    image: '/api/placeholder/400/300',
  },
  {
    id: 5,
    title: 'Password Manager',
    description: 'A secure CLI-based password manager built in Python using the Cryptography library to encrypt and safely store credentials.',
    technologies: ['Python', 'Cryptography'],
    github: '',
    demo: '',
    image: '/api/placeholder/400/300',
  },
];

export const NAV_SECTIONS = [
  { id: 'about', label: 'About', icon: '👨‍💻' },
  { id: 'skills', label: 'Skills', icon: '🚀' },
  { id: 'projects', label: 'Projects', icon: '💼' },
];

export const TERMINAL_COMMANDS = {
  help: {
    description: 'Show available commands',
    output: `Available commands:
- help: Show this help message
- ls: List available sections
- cd [section]: Navigate to a section (about, skills, projects, achievements, contact)
- clear: Clear the terminal screen
- whoami: Display information about me`,
  },
  ls: {
    description: 'List available sections',
    output: `Available sections:
- about/        Personal information and experience
- skills/       Technical skills and expertise
- projects/     Portfolio projects and work
- achievements/ Hackathons, volunteering, highlights
- contact/      Get in touch information`,
  },
  whoami: {
    description: 'Display information about me',
    output: `${SITE_CONFIG.name} - ${SITE_CONFIG.title}
Email: ${SITE_CONFIG.email}
GitHub: ${SITE_CONFIG.socials.github}
LinkedIn: ${SITE_CONFIG.socials.linkedin}
LeetCode: ${SITE_CONFIG.socials.leetcode}`,
  },
};

export const ACHIEVEMENTS = [
  {
    title: 'HackToFuture 3.0 Finalist',
    description: 'Selected among the top 30 teams nationally (700+ teams). Built VoxBiz – an AI-powered platform that converts natural language to SQL with real-time visualizations.',
    year: 'Apr 2025',
  },
  {
    title: 'HackXelerate’25 – KPRIET, Coimbatore',
    description: 'Developed FoodLoop during a 24-hour hackathon with blockchain, NFT delivery proofs, spoilage detection, and volunteer navigation.',
    year: 'Apr 2025',
  },
  {
    title: 'DiPASL Tech Exhibition',
    description: 'Showcased a real-time hand gesture recognition system for ASL translation at a public expo.',
    year: 'Feb 2024',
  },
  {
    title: 'Community Volunteer',
    description: 'Contributed at Project ReachOut NGO events supporting community outreach initiatives.',
    year: '2024 – 2025',
  },
  {
    title: 'KCET Rank 944',
    description: 'Secured a top 1000 engineering entrance exam rank in Karnataka.',
    year: '2022',
  },
];