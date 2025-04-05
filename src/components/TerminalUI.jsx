import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TERMINAL_COMMANDS, ABOUT_DATA, SKILLS, PROJECTS, SITE_CONFIG } from '../constants';

const TerminalUI = ({ isVisible, onClose }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'output', text: `Welcome to ${SITE_CONFIG.name}'s Terminal Portfolio!` },
    { type: 'output', text: 'Type "help" to see available commands.' },
  ]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef(null);
  const outputRef = useRef(null);

  useEffect(() => {
    if (isVisible && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isVisible]);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [history]);

  const processCommand = (command) => {
    const trimmedCommand = command.trim().toLowerCase();
    const [cmd, ...args] = trimmedCommand.split(' ');

    let output = '';

    switch (cmd) {
      case 'help':
        output = TERMINAL_COMMANDS.help.output;
        break;
      case 'ls':
        output = TERMINAL_COMMANDS.ls.output;
        break;
      case 'whoami':
        output = TERMINAL_COMMANDS.whoami.output;
        break;
      case 'clear':
        setHistory([
          { type: 'output', text: `Welcome to ${SITE_CONFIG.name}'s Terminal Portfolio!` },
          { type: 'output', text: 'Type "help" to see available commands.' },
        ]);
        return;
      case 'cd':
        if (args.length === 0) {
          output = 'Usage: cd [section]\nAvailable sections: about, skills, projects, contact';
        } else {
          const section = args[0];
          switch (section) {
            case 'about':
              output = `About ${SITE_CONFIG.name}:\n\n${ABOUT_DATA.description}\n\nEducation:\n${ABOUT_DATA.education.degree} - ${ABOUT_DATA.education.university} (${ABOUT_DATA.education.year})\n\nExperience:\n${ABOUT_DATA.experience.map(exp => `• ${exp.title} at ${exp.company} (${exp.period})`).join('\n')}`;
              break;
            case 'skills':
              const skillsByCategory = SKILLS.reduce((acc, skill) => {
                if (!acc[skill.category]) acc[skill.category] = [];
                acc[skill.category].push(skill);
                return acc;
              }, {});
              output = 'Technical Skills:\n\n' + Object.entries(skillsByCategory)
                .map(([category, skills]) => 
                  `${category}:\n${skills.map(skill => `  • ${skill.name} (${skill.level}%)`).join('\n')}`
                ).join('\n\n');
              break;
            case 'projects':
              output = 'Portfolio Projects:\n\n' + PROJECTS.map((project, index) => 
                `${index + 1}. ${project.title}\n   ${project.description}\n   Tech: ${project.technologies.join(', ')}\n   GitHub: ${project.github}\n   Demo: ${project.demo}`
              ).join('\n\n');
              break;
            case 'contact':
              output = `Contact Information:\n\nEmail: ${SITE_CONFIG.email}\nGitHub: ${SITE_CONFIG.socials.github}\nLinkedIn: ${SITE_CONFIG.socials.linkedin}`;
              break;
            default:
              output = `cd: ${section}: No such directory\nAvailable sections: about, skills, projects, contact`;
          }
        }
        break;
      default:
        output = `Command not found: ${cmd}\nType "help" for available commands.`;
    }

    setHistory(prev => [
      ...prev,
      { type: 'input', text: command },
      { type: 'output', text: output },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      processCommand(input);
      setCommandHistory(prev => [input, ...prev.slice(0, 49)]); // Keep last 50 commands
      setHistoryIndex(-1);
      setInput('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > -1) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(newIndex === -1 ? '' : commandHistory[newIndex] || '');
      }
    }
  };

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-black border border-green-500 rounded-lg w-full max-w-4xl h-full max-h-[80vh] flex flex-col font-mono text-sm"
      >
        {/* Terminal Header */}
        <div className="bg-gray-800 px-4 py-2 rounded-t-lg border-b border-green-500 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="text-green-400 text-sm">Terminal - {SITE_CONFIG.name}</div>
          <button
            onClick={onClose}
            className="text-red-400 hover:text-red-300 font-bold"
          >
            ✕
          </button>
        </div>

        {/* Terminal Output */}
        <div
          ref={outputRef}
          className="flex-1 p-4 overflow-y-auto bg-black text-green-400 space-y-1"
        >
          <AnimatePresence>
            {history.map((entry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={entry.type === 'input' ? 'text-green-300' : 'text-green-400'}
              >
                {entry.type === 'input' ? (
                  <span>
                    <span className="text-green-500">$</span> {entry.text}
                  </span>
                ) : (
                  <pre className="whitespace-pre-wrap font-mono">{entry.text}</pre>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Terminal Input */}
        <form onSubmit={handleSubmit} className="border-t border-green-500 p-4 bg-black">
          <div className="flex items-center space-x-2">
            <span className="text-green-500">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-green-400 outline-none font-mono"
              placeholder="Type a command..."
              autoComplete="off"
            />
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default TerminalUI;
