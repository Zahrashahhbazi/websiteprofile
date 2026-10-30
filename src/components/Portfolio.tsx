import ScrollReveal from './ScrollReveal';

const projects = [
  {
    title: 'ربات تلگرام رصد بازارهای مالی',
    desc: 'قیمت و تغییرات فارکس، طلا و رمزارزها را در تلگرام دنبال کنید. ربات برای ۲۰ دارایی منتخب، قیمت، حجم معاملات و تغییرات ۲۴ساعته را نمایش می‌دهد و شاخص‌های RSI، MACD، SMA50 و SMA200 را برای مرور روند بازار در اختیار می‌گذارد. داده‌های بازار از TradingView و قیمت طلا از TGJU دریافت می‌شوند. این ابزار اطلاع‌رسانی است و توصیهٔ سرمایه‌گذاری ارائه نمی‌کند.',
    tech: 'Python, Telegram Bot API, REST API, TradingView, TGJU',
    type: 'پروژهٔ اختصاصی',
    github: 'https://github.com/Zahrashahhbazi/deploytelbot',
    demo: 'https://t.me/shahbazirz',
    video: '/videos/bottelfilm.mp4',
  },
  {
    title: 'وب‌سایت خدماتی',
    desc: 'طراحی و پیاده‌سازی سایت معرفی خدمات با تجربه کاربری مینیمال، سئو‌محور و صفحهٔ فرود حرفه‌ای برای جذب مشتری.',
    tech: 'React, Vite, CSS',
    type: 'طراحی و توسعه',
  },
  {
    title: 'اتوماسیون کسب‌وکار',
    desc: 'ساخت ابزارهای اتوماسیون برای کاهش کارهای دستی، پردازش داده‌ها و گزارش‌گیری سریع در محیط‌های عملیاتی.',
    tech: 'Python, Automation',
    type: 'اپلیکیشن داخلی',
  },
];

export default function Portfolio() {
  return (
    <section className="section" id="portfolio">
      <ScrollReveal>
        <h2 className="section-title">پروژه‌ها</h2>
        <p className="section-text">پروژه‌هایی که تا امروز انجام داده‌ام</p>
      </ScrollReveal>
      <div className="portfolio-grid">
        {projects.map(project => (
          <ScrollReveal key={project.title}>
            <div className="project-card">
              {project.video && (
                <video
                  className="project-video"
                  src={project.video}
                  muted
                  controls
                  playsInline
                  preload="none"
                />
              )}
              <div className="project-card-header">
                <span className="project-type">{project.type}</span>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.desc}</p>
                <div className="project-tech">
                  {project.tech.split(', ').map(t => (
                    <span key={t} className="tech-tag">{t}</span>
                  ))}
                </div>
                <div className="project-actions">
                  {project.demo && (
                    <a className="project-link project-link-primary" href={project.demo} target="_blank" rel="noreferrer">
                      مشاهدهٔ ربات در تلگرام
                    </a>
                  )}
                  {project.github && (
                    <a className="project-link" href={project.github} target="_blank" rel="noreferrer">
                      مشاهدهٔ کد منبع
                    </a>
                  )}
                  {!project.demo && !project.github && (
                    <a
                      className="project-link project-link-primary"
                      href={`mailto:zahrashahbazi137078@gmail.com?subject=${encodeURIComponent(`درخواست ${project.title}`)}`}
                    >
                      درخواست این پروژه
                    </a>
                  )}
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}