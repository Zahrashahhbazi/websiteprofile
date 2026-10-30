import { useState } from 'react';
import ScrollReveal from './ScrollReveal';

type SubmissionState = 'idle' | 'sending' | 'success' | 'error';

export default function Contact() {
  const [submissionState, setSubmissionState] = useState<SubmissionState>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submissionState === 'sending') return;

    const form = e.currentTarget;
    const formData = new FormData(form);
    setSubmissionState('sending');

    try {
      const response = await fetch('https://formsubmit.co/ajax/zahrashahbazi137078@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          service: formData.get('service'),
          budget: formData.get('budget'),
          message: formData.get('message'),
          _subject: `درخواست ${formData.get('service')} از وب‌سایت`,
          _template: 'table',
        }),
      });

      const result: unknown = await response.json();
      const succeeded = response.ok
        && typeof result === 'object'
        && result !== null
        && 'success' in result
        && (result.success === 'true' || result.success === true);

      if (!succeeded) {
        throw new Error('سرویس ارسال ایمیل درخواست را نپذیرفت.');
      }

      form.reset();
      setSubmissionState('success');
    } catch (error) {
      console.error('Order form submission failed:', error);
      setSubmissionState('error');
    }
  };

  return (
    <section className="section contact-section" id="contact">
      <ScrollReveal>
        <h2 className="section-title">سفارش بدهید</h2>
        <p className="section-text">
          برای سفارش طراحی وب‌سایت، برنامهٔ پایتون یا ربات تلگرام، جزئیات پروژه را در فرم زیر بنویسید. درخواست شما از طریق ایمیل ارسال می‌شود.
        </p>
      </ScrollReveal>
      <div className="contact-grid">
        <ScrollReveal>
          <div className="contact-info">
            <h3>اطلاعات تماس</h3>
            <div className="contact-item">
              <span className="contact-label">نام</span>
              <span className="contact-value">زهرا شهبازی</span>
            </div>
            <div className="contact-item">
              <span className="contact-label">تخصص</span>
              <span className="contact-value">طراح سایت / برنامه‌نویس پایتون</span>
            </div>
            <div className="contact-item">
              <span className="contact-label">ایمیل</span>
              <a className="contact-value" href="mailto:zahrashahbazi137078@gmail.com">
                zahrashahbazi137078@gmail.com
              </a>
            </div>
            <div className="contact-item">
              <span className="contact-label">شماره</span>
              <a className="contact-value" href="tel:+989102851462">0910 285 1462</a>
            </div>
          </div>
        </ScrollReveal>
        <ScrollReveal>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-form-heading">
              <div>
                <span className="contact-form-kicker">شروع یک همکاری</span>
                <h3>دربارهٔ پروژه‌تان بنویسید</h3>
              </div>
              <span className="contact-form-step">پاسخ‌گویی در اولین فرصت</span>
            </div>
            <div className="form-group">
              <label htmlFor="order-name">نام و نام خانوادگی</label>
              <input
                id="order-name"
                name="name"
                type="text"
                required
                autoComplete="name"
                placeholder="نام و نام خانوادگی"
              />
            </div>
            <div className="form-group">
              <label htmlFor="order-email">ایمیل</label>
              <input
                id="order-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="name@example.com"
                dir="ltr"
              />
            </div>
            <div className="form-group">
              <label htmlFor="order-phone">شماره تماس</label>
              <input
                id="order-phone"
                name="phone"
                type="tel"
                required
                autoComplete="tel"
                placeholder="0912 123 4567"
                dir="ltr"
              />
            </div>
            <div className="form-group">
              <label htmlFor="order-service">نوع سفارش</label>
              <select
                id="order-service"
                name="service"
                defaultValue="طراحی وب‌سایت"
              >
                <option>طراحی وب‌سایت</option>
                <option>برنامه‌نویسی پایتون</option>
                <option>ربات تلگرام</option>
                <option>طراحی UI/UX</option>
                <option>سایر موارد</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="order-budget">بودجهٔ تقریبی <span>(اختیاری)</span></label>
              <select id="order-budget" name="budget" defaultValue="هنوز مشخص نیست">
                <option>هنوز مشخص نیست</option>
                <option>کمتر از ۱۰ میلیون تومان</option>
                <option>۱۰ تا ۳۰ میلیون تومان</option>
                <option>۳۰ تا ۶۰ میلیون تومان</option>
                <option>بیشتر از ۶۰ میلیون تومان</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="order-message">چند خط دربارهٔ پروژه</label>
              <textarea
                id="order-message"
                name="message"
                rows={5}
                required
                minLength={10}
                placeholder="هدف پروژه و چیزی که در ذهن دارید را بنویسید..."
              />
            </div>
            <button type="submit" className="submit-btn" disabled={submissionState === 'sending'}>
              {submissionState === 'sending' ? 'در حال ارسال…' : 'ارسال درخواست'}
            </button>
            {submissionState === 'success' && (
              <p className="form-status success" role="status">
                درخواست شما ثبت شد. اگر اولین ارسال است، ایمیل فعال‌سازی FormSubmit را در صندوق ورودی باز کنید.
              </p>
            )}
            {submissionState === 'error' && (
              <p className="form-status error" role="alert">
                ارسال درخواست انجام نشد. لطفاً دوباره تلاش کنید یا مستقیم ایمیل بزنید.
              </p>
            )}
            <p className="form-privacy">
              با ارسال فرم، اطلاعات برای تحویل ایمیل از طریق سرویس FormSubmit پردازش می‌شود.
            </p>
          </form>
        </ScrollReveal>
      </div>
    </section>
  );
}