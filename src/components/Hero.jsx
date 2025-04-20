import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const Hero = () => {
  const { theme } = useTheme();

  const headingWords = ["Hello", "World,", "I'm", "Rithesh."];
  const subheadingWords = ["Engineering", "Tomorrow's", "Web"];

  return (
    <section 
      className={`
        h-screen w-full flex items-center justify-center
        bg-gradient-to-br ${theme.colors.background}
        px-6 md:px-12 lg:px-20
      `}
    >
      <div className="max-w-7xl w-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center h-full py-20">
          
          {/* Left Column - Text Content */}
          <motion.div 
            className="order-2 lg:order-1 text-center lg:text-left space-y-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Main Heading */}
            <div className="space-y-4">
              <motion.h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                {headingWords.map((word, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.8, 
                      delay: 0.5 + index * 0.2,
                      ease: "easeOut"
                    }}
                    className={`inline-block mr-4 text-${theme.colors.text}`}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.h1>
              
              {/* Accent Line 1 */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ 
                  duration: 1, 
                  delay: 1.5,
                  ease: "easeOut"
                }}
                className={`h-1 w-20 bg-${theme.colors.primary}-500 origin-left`}
              />
            </div>

            {/* Subheading */}
            <motion.h2 className="text-xl md:text-2xl lg:text-3xl font-light leading-relaxed">
              {subheadingWords.map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 1.8 + index * 0.2,
                    ease: "easeOut"
                  }}
                  className={`inline-block mr-3 text-${theme.colors.textSecondary}`}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h2>

            {/* Accent Line 2 */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ 
                duration: 1, 
                delay: 2.8,
                ease: "easeOut"
              }}
              className={`h-0.5 w-32 bg-${theme.colors.primary}-300 origin-left`}
            />
          </motion.div>

          {/* Right Column - Profile Image */}
          <motion.div 
            className="order-1 lg:order-2 flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 1, 
              delay: 0.8,
              ease: "easeOut"
            }}
          >
            <img
              src="/src/assets/my_image.png"
              alt="Rithesh"
              className={`
                w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 xl:w-[28rem] xl:h-[28rem]
                object-contain
                shadow-[0_6px_20px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.04)]
                hover:shadow-[0_8px_25px_rgba(0,0,0,0.12),0_3px_10px_rgba(0,0,0,0.06)]
                transition-shadow duration-300
                bg-white/50
                backdrop-blur-sm
              `}
              style={{
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))',
                transform: 'rotate(-0.5deg)'
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
