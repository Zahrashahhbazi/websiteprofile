import ScrollReveal from './ScrollReveal';

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-layout">
        <div className="hero-content">
          <ScrollReveal>
            <p className="hero-subtitle">زهرا شهبازی | توسعه‌دهندهٔ وب و پایتون</p>
          </ScrollReveal>
          <ScrollReveal>
            <h1 className="hero-title">
              از ایده تا
              <span className="hero-name">محصول دیجیتال</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal>
            <p className="hero-desc">
              طراحی و توسعهٔ وب‌سایت، برنامه‌های پایتون و ربات‌های تلگرامی؛
              با تمرکز بر تجربه‌ای ساده و کاربردی.
            </p>
          </ScrollReveal>
          <div className="hero-actions">
            <ScrollReveal>
              <a href="#portfolio" className="hero-btn primary">مشاهده نمونه‌کارها</a>
            </ScrollReveal>
            <ScrollReveal>
              <a href="#contact" className="hero-btn">شروع همکاری</a>
            </ScrollReveal>
          </div>
        </div>
        <ScrollReveal className="hero-photo">
          <img src="/videos/profile.jpg" alt="زهرا شهبازی در حال برنامه‌نویسی" fetchPriority="high" />
        </ScrollReveal>
      </div>
      <div className="hero-scroll">
        <div className="scroll-line"></div>
        <span>اسکرول کنید</span>
      </div>
    </section>
  );
}