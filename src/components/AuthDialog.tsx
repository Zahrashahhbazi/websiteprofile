import { useEffect, useRef, useState, type FormEvent } from 'react';

type AuthMode = 'login' | 'register';

type AuthDialogProps = {
  open: boolean;
  onClose: () => void;
};

export default function AuthDialog({ open, onClose }: AuthDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [mode, setMode] = useState<AuthMode>('login');
  const [notice, setNotice] = useState('');

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if (mode === 'register' && formData.get('password') !== formData.get('password-confirm')) {
      setNotice('گذرواژه و تکرار آن یکسان نیستند.');
      return;
    }

    setNotice('ورود و ثبت‌نام هنوز به سامانهٔ حساب کاربری متصل نشده است.');
  };

  return (
    <dialog
      ref={dialogRef}
      className="auth-dialog"
      aria-labelledby="auth-title"
      onClose={onClose}
      onClick={event => {
        if (event.target === dialogRef.current) onClose();
      }}
    >
      <div className="auth-layout">
        <aside className="auth-aside">
          <button type="button" className="auth-close" onClick={onClose} aria-label="بستن">
            ×
          </button>
          <a className="auth-brand" href="#home" onClick={onClose}>
            <img src="/videos/logo.jpg" alt="لوگوی زهرا شهبازی" className="auth-logo-img" />
            <span className="auth-brand-text">
              <span>ZAHRA</span>
              <span>SHAHHBAZI</span>
            </span>
          </a>
          <div className="auth-aside-copy">
            <span className="auth-eyebrow">حساب کاربری</span>
            <h2>همراه مسیر پروژه‌ات باش.</h2>
            <p>برای ثبت سفارش، فرم تماس را پر کنید. پاسخ‌گویی از طریق ایمیل انجام می‌شود.</p>
          </div>
          <span className="auth-aside-foot">طراحی و توسعه با دقت به جزئیات</span>
        </aside>

        <div className="auth-main">
          <button type="button" className="auth-close auth-close-mobile" onClick={onClose} aria-label="بستن">
            ×
          </button>
          <span className="auth-eyebrow">خوش آمدی</span>
          <h2 id="auth-title">{mode === 'login' ? 'ورود به حساب' : 'ساخت حساب جدید'}</h2>
          <p className="auth-intro">
            {mode === 'login'
              ? 'ورود به حساب هنوز فعال نیست. برای ثبت سفارش، از فرم سفارش استفاده کنید.'
              : 'ثبت‌نام هنوز فعال نیست و اطلاعات حساب در این سایت ذخیره نمی‌شود.'}
          </p>
          <a className="auth-order-link" href="#contact" onClick={onClose}>
            رفتن به فرم ثبت سفارش
          </a>

          <div className="auth-tabs" role="group" aria-label="ورود یا ثبت‌نام">
            <button
              type="button"
              aria-pressed={mode === 'login'}
              className={mode === 'login' ? 'active' : ''}
              onClick={() => {
                setMode('login');
                setNotice('');
              }}
            >
              ورود
            </button>
            <button
              type="button"
              aria-pressed={mode === 'register'}
              className={mode === 'register' ? 'active' : ''}
              onClick={() => {
                setMode('register');
                setNotice('');
              }}
            >
              ثبت‌نام
            </button>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {mode === 'register' && (
              <div className="form-group">
                <label htmlFor="auth-name">نام و نام خانوادگی</label>
                <input id="auth-name" name="name" type="text" autoComplete="name" required disabled />
              </div>
            )}
            <div className="form-group">
              <label htmlFor="auth-email">ایمیل</label>
              <input id="auth-email" name="email" type="email" autoComplete="email" required dir="ltr" disabled />
            </div>
            <div className="form-group">
              <label htmlFor="auth-password">گذرواژه</label>
              <input
                id="auth-password"
                name="password"
                type="password"
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                minLength={8}
                required
                disabled
              />
            </div>
            {mode === 'register' && (
              <div className="form-group">
                <label htmlFor="auth-password-confirm">تکرار گذرواژه</label>
                <input
                  id="auth-password-confirm"
                  name="password-confirm"
                  type="password"
                  autoComplete="new-password"
                  minLength={8}
                  required
                  disabled
                />
              </div>
            )}
            {mode === 'login' && (
              <button
                type="button"
                className="auth-forgot"
                onClick={() => setNotice('بازیابی گذرواژه پس از اتصال سامانه فعال می‌شود.')}
              >
                گذرواژه را فراموش کرده‌ام
              </button>
            )}
            <button type="submit" className="auth-submit" disabled>
              {mode === 'login' ? 'ورود به حساب' : 'ساخت حساب'}
            </button>
            {notice && <p className="auth-notice" role="status">{notice}</p>}
          </form>

          <p className="auth-disclaimer">
            حساب کاربری هنوز فعال نیست و اطلاعات این فرم ذخیره نمی‌شود.
          </p>
        </div>
      </div>
    </dialog>
  );
}
