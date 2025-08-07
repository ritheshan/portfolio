const Projects = () => {
  const projects = [
    {
      title: 'FoodLoop',
      description:
        'A recipe sharing platform with social features and AI-powered ingredient substitution suggestions.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
      github: '#',
      demo: '#',
    },
    {
      title: 'DevCollab',
      description:
        'Real-time collaborative coding platform with integrated chat and version control features.',
      technologies: ['React', 'Socket.io', 'Express', 'PostgreSQL'],
      github: '#',
      demo: '#',
    },
    {
      title: 'DataVizPro',
      description:
        'Interactive data visualization dashboard with customizable charts and ML insights.',
      technologies: ['React', 'D3.js', 'Python', 'Flask'],
      github: '#',
      demo: '#',
    },
    {
      title: 'EcoTrack',
      description:
        'Mobile app for tracking and reducing personal carbon footprint with community challenges.',
      technologies: ['React Native', 'Firebase', 'TensorFlow Lite'],
      github: '#',
      demo: '#',
    },
  ];

  return (
    <section id="projects" className="bg-slate-800 py-20">
      <div className="container mx-auto max-w-5xl px-4">
        <h2 className="mb-16 text-center text-4xl font-bold">Projects</h2>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          {projects.map((project, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-xl bg-slate-900 shadow-lg transition-shadow hover:shadow-2xl"
            >
              {/* Project thumbnail area - Replace with actual images later */}
              <div className="flex h-48 items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
                <h3 className="text-2xl font-bold text-white">{project.title}</h3>
              </div>

              <div className="p-6">
                <p className="mb-4 text-gray-300">{project.description}</p>

                <div className="mb-4 flex flex-wrap">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="mb-2 mr-2 rounded-full bg-slate-700 px-3 py-1 text-xs text-blue-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex space-x-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center rounded-lg bg-slate-700 px-4 py-2 text-sm font-medium transition-colors hover:bg-slate-600"
                  >
                    <svg
                      className="mr-2 h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.48 0-.237-.009-.866-.014-1.7-2.782.605-3.369-1.343-3.369-1.343-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.839c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.934.359.31.678.92.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.165 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                    </svg>
                    GitHub
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium transition-colors hover:bg-blue-700"
                  >
                    <svg
                      className="mr-2 h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    Live Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
