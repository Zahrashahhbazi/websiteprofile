import ScrollReveal from './ScrollReveal';

const skills = [
  {
    name: 'برنامه‌نویسی پایتون',
    category: 'برنامه‌نویسی',
    description: 'طراحی و پیاده‌سازی برنامه‌های کاربردی با پایتون',
  },
  {
    name: 'توسعه وب',
    category: 'وب',
    description: 'طراحی و توسعهٔ وب‌سایت و برنامه‌های تحت وب',
  },
  {
    name: 'ربات تلگرام',
    category: 'پایتون',
    description: 'طراحی و توسعهٔ ربات‌های تلگرامی',
  },
  {
    name: 'توسعه نرم‌افزار',
    category: 'نرم‌افزار',
    description: 'پیاده‌سازی برنامه‌های متناسب با نیاز هر پروژه',
  },
];

export default function Skills() {
  return (
    <section className="section" id="skills">
      <ScrollReveal>
        <h2 className="section-title">مهارت‌ها</h2>
        <p className="section-text">حوزه‌های کاری و مهارت‌های من</p>
      </ScrollReveal>
      <div className="skills-grid">
        {skills.map(skill => (
          <ScrollReveal key={skill.name}>
            <div className="skill-card">
              <div className="skill-header">
                <span className="skill-name">{skill.name}</span>
                <span className="skill-category">{skill.category}</span>
              </div>
              <p className="skill-description">{skill.description}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}