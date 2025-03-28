import { useState, useEffect } from 'react';

const Hero = () => {
  const [text, setText] = useState('');
  const fullText = 'Full Stack Developer & ML Enthusiast';

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      setText(fullText.substring(0, index));
      index++;

      if (index > fullText.length) {
        clearInterval(typingInterval);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, []);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800"
    >
      <div className="max-w-3xl px-4 text-center">
        <h1 className="mb-4 text-5xl font-bold md:text-7xl">
          Hi, I'm{' '}
          <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Rithesh
          </span>{' '}
          👋
        </h1>
        <h2 className="mb-8 min-h-[2rem] text-xl text-gray-300 md:text-2xl">
          {text}
          <span className="animate-pulse">|</span>
        </h2>
        <button
          onClick={scrollToProjects}
          className="rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-3 font-semibold text-white transition-opacity hover:opacity-90"
        >
          View My Work
        </button>
      </div>
    </section>
  );
};

export default Hero;
