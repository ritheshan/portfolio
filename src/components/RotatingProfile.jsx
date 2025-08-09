import { motion } from 'framer-motion';

const RotatingProfile = ({ name, title }) => {
  const icons = [
    { icon: "💻", delay: 0 },
    { icon: "⚡", delay: 0.5 },
    { icon: "🚀", delay: 1 },
    { icon: "🎯", delay: 1.5 },
    { icon: "⚙️", delay: 2 },
    { icon: "💡", delay: 2.5 },
    { icon: "🔥", delay: 3 },
    { icon: "✨", delay: 3.5 }
  ];

  return (
    <div className="relative w-80 h-80 mx-auto">
      {/* Central Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="absolute inset-0 flex flex-col items-center justify-center bg-white rounded-full shadow-2xl border-4 border-blue-100 z-10"
        style={{ width: '200px', height: '200px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
      >
        <motion.h1 
          className="text-2xl font-bold text-gray-900 text-center mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          {name}
        </motion.h1>
        <motion.p 
          className="text-lg text-blue-600 font-medium text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          {title}
        </motion.p>
      </motion.div>

      {/* Rotating Icons */}
      {icons.map((item, index) => {
        const angle = (index * 360) / icons.length;
        const radius = 140;
        
        return (
          <motion.div
            key={index}
            className="absolute w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              rotate: 360
            }}
            transition={{
              opacity: { duration: 0.5, delay: item.delay },
              scale: { duration: 0.5, delay: item.delay },
              rotate: { 
                duration: 20, 
                repeat: Infinity, 
                ease: "linear",
                delay: item.delay 
              }
            }}
            style={{
              left: '50%',
              top: '50%',
              transformOrigin: `${radius}px center`,
              transform: `translate(-50%, -50%) rotate(${angle}deg) translateX(${radius}px) rotate(-${angle}deg)`
            }}
            whileHover={{ 
              scale: 1.2,
              transition: { duration: 0.2 }
            }}
          >
            <motion.div
              animate={{ rotate: -360 }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              className="text-2xl"
            >
              {item.icon}
            </motion.div>
          </motion.div>
        );
      })}

      {/* Rotating Orbit Ring */}
      <motion.div
        className="absolute inset-0 border-2 border-dashed border-blue-200 rounded-full"
        animate={{ rotate: 360 }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{ width: '100%', height: '100%' }}
      />

      {/* Background Glow Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};

export default RotatingProfile;
