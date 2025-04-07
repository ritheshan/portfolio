import { motion } from 'framer-motion';
import { ABOUT_DATA } from '../constants';
import { fadeInUp, fadeInLeft, fadeInRight, useScrollAnimation } from '../utils/animations';

const About = () => {
  const scrollAnimation = useScrollAnimation();

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.h2
          {...scrollAnimation}
          variants={fadeInUp}
          className="text-4xl font-bold text-center mb-16 text-gray-900"
        >
          About Me
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Description */}
          <motion.div {...scrollAnimation} variants={fadeInLeft} className="space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed">{ABOUT_DATA.description}</p>

            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-gray-900">Education</h3>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <h4 className="font-semibold text-gray-900">{ABOUT_DATA.education.degree}</h4>
                <p className="text-gray-600">{ABOUT_DATA.education.university}</p>
                <p className="text-sm text-gray-500">{ABOUT_DATA.education.year}</p>
              </div>
            </div>
          </motion.div>

          {/* Experience */}
          <motion.div {...scrollAnimation} variants={fadeInRight} className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-900">Experience</h3>
            <div className="space-y-4">
              {ABOUT_DATA.experience.map((exp, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <h4 className="font-semibold text-gray-900 text-lg">{exp.title}</h4>
                  <p className="text-blue-600 font-medium">{exp.company}</p>
                  <p className="text-sm text-gray-500">{exp.period}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
