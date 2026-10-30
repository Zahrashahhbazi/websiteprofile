import { useState, type KeyboardEvent } from 'react';
import ScrollReveal from './ScrollReveal';

type AboutTab = 'bio' | 'resume';

export default function About() {
  const [activeTab, setActiveTab] = useState<AboutTab>('bio');

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const tabs: AboutTab[] = ['bio', 'resume'];
    const currentIndex = tabs.indexOf(activeTab);
    let nextIndex = currentIndex;

    if (event.key === 'ArrowLeft') nextIndex = (currentIndex + 1) % tabs.length;
    else if (event.key === 'ArrowRight') nextIndex = (currentIndex + tabs.length - 1) % tabs.length;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = tabs.length - 1;
    else return;

    event.preventDefault();
    setActiveTab(tabs[nextIndex]);
    document.getElementById(`about-tab-${tabs[nextIndex]}`)?.focus();
  };

  return (
    <section className="section about-section" id="about">
      <ScrollReveal>
        <h2 className="section-title">درباره من</h2>
        <p className="section-text">
          ترکیبی از نگاه فنی و توجه به تجربه‌ای که هر محصول برای کاربر می‌سازد
        </p>
      </ScrollReveal>
      <div className="about-grid">
        <ScrollReveal>
          <div className="about-photo">
            <img src="/videos/pic3.jpg" alt="فضای کار زهرا شهبازی" loading="lazy" decoding="async" />
            <p>از ایده تا اجرا، با تمرکز بر جزئیات</p>
          </div>
        </ScrollReveal>
        <ScrollReveal>
          <div className="about-content">
            <div className="about-tabs" role="tablist" aria-label="درباره زهرا">
              <button
                id="about-tab-bio"
                type="button"
                role="tab"
                aria-selected={activeTab === 'bio'}
                aria-controls="about-panel"
                tabIndex={activeTab === 'bio' ? 0 : -1}
                className={activeTab === 'bio' ? 'active' : ''}
                onClick={() => setActiveTab('bio')}
                onKeyDown={handleTabKeyDown}
              >
                معرفی
              </button>
              <button
                id="about-tab-resume"
                type="button"
                role="tab"
                aria-selected={activeTab === 'resume'}
                aria-controls="about-panel"
                tabIndex={activeTab === 'resume' ? 0 : -1}
                className={activeTab === 'resume' ? 'active' : ''}
                onClick={() => setActiveTab('resume')}
                onKeyDown={handleTabKeyDown}
              >
                رزومه
              </button>
            </div>
            <div
              className="about-text"
              id="about-panel"
              role="tabpanel"
              aria-labelledby={`about-tab-${activeTab}`}
              tabIndex={0}
            >
              {activeTab === 'bio' ? (
                <div className="about-bio">
                  <p>
                    سلام، من <strong>زهرا شهبازی</strong> هستم؛ کارشناس نرم‌افزار و
                    توسعه‌دهندهٔ وب و پایتون.
                  </p>
                  <p>
                    در طراحی و پیاده‌سازی وب‌سایت، اپلیکیشن‌های وب و ابزارهای
                    نرم‌افزاری فعالیت می‌کنم. تلاش می‌کنم هر راهکار علاوه بر اجرای
                    درست، استفاده‌ای روشن و خوشایند داشته باشد.
                  </p>
                  <div className="about-highlights">
                    <div className="highlight">
                      <div>
                        <h4>طراحی سایت</h4>
                        <p>وب‌سایت‌های واکنش‌گرا و کاربردی</p>
                      </div>
                    </div>
                    <div className="highlight">
                      <div>
                        <h4>برنامه‌نویسی پایتون</h4>
                        <p>ابزارهای نرم‌افزاری، ربات و اتوماسیون</p>
                      </div>
                    </div>
                    <div className="highlight">
                      <div>
                        <h4>تجربهٔ کاربری</h4>
                        <p>توجه به وضوح، دسترس‌پذیری و جزئیات رابط</p>
                      </div>
                    </div>
                  </div>
                  <a className="about-cta" href="#portfolio">دیدن نمونه‌کارها</a>
                </div>
              ) : (
                <div className="resume-content">
                  <p className="resume-intro">
                    حوزه‌های تحصیلی و کاری، همراه با ابزارهایی که در پروژه‌ها به‌کار می‌برم.
                  </p>
                  <div className="resume-section">
                    <h3>تحصیلات</h3>
                    <p>کارشناس نرم‌افزار</p>
                  </div>
                  <div className="resume-section">
                    <h3>حوزه‌های فعالیت</h3>
                    <ul className="resume-list">
                      <li>طراحی و توسعهٔ وب‌سایت و اپلیکیشن وب</li>
                      <li>ساخت ابزارهای پایتون و ربات‌های تلگرام</li>
                      <li>پیاده‌سازی پنل‌های مدیریتی و اتوماسیون</li>
                    </ul>
                  </div>
                  <div className="resume-section">
                    <h3>فناوری‌ها</h3>
                    <div className="resume-tags">
                      <span>HTML</span><span>CSS</span><span>JavaScript</span>
                      <span>React</span><span>Vue</span><span>Python</span>
                      <span>Django</span><span>Flask</span><span>WordPress</span>
                    </div>
                  </div>
                  <a className="about-cta" href="#contact">گفت‌وگو دربارهٔ همکاری</a>
                </div>
              )}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}