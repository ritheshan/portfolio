const About = () => {
  return (
    <section id="about" className="bg-slate-800 py-20">
      <div className="container mx-auto max-w-5xl px-4">
        <h2 className="mb-16 text-center text-4xl font-bold">About Me</h2>
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-3">
          <div className="col-span-1 flex justify-center">
            <div className="flex h-64 w-64 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-purple-600">
              {/* Replace with actual image when available */}
              <span className="text-6xl">👨‍💻</span>
            </div>
          </div>
          <div className="space-y-4 md:col-span-2">
            <p className="text-lg text-gray-300">
              I'm Rithesh, a passionate Full Stack Developer with a strong interest in Machine
              Learning. I have a background in Computer Science from XYZ University where I
              specialized in AI systems and web development technologies.
            </p>
            <p className="text-lg text-gray-300">
              As a fast learner and team player, I enjoy tackling complex problems and building
              solutions that make a real difference. My experience spans across multiple domains
              including web application development, data analysis, and cloud infrastructure.
            </p>
            <div className="pt-4">
              <div className="mb-2 mr-2 inline-block rounded-full border border-blue-500/50 bg-blue-500/20 px-4 py-1">
                <span className="text-blue-400">👨‍💻 Fast Learner</span>
              </div>
              <div className="mb-2 mr-2 inline-block rounded-full border border-purple-500/50 bg-purple-500/20 px-4 py-1">
                <span className="text-purple-400">🤝 Team Player</span>
              </div>
              <div className="mb-2 mr-2 inline-block rounded-full border border-green-500/50 bg-green-500/20 px-4 py-1">
                <span className="text-green-400">💡 Problem Solver</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
