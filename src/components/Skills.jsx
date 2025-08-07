import { SKILLS } from '../constants';

const Skills = () => {
  return (
    <section id="skills" className="bg-slate-900 py-20">
      <div className="container mx-auto max-w-5xl px-4">
        <h2 className="mb-16 text-center text-4xl font-bold">Skills & Technologies</h2>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {SKILLS.map((skill, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center rounded-lg bg-slate-800 p-4 shadow-lg transition-all hover:-translate-y-1 hover:bg-slate-700 hover:shadow-xl"
            >
              <div className="mb-2 text-4xl">{skill.icon}</div>
              <div className="text-center font-medium">{skill.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
