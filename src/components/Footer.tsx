export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <span className="footer-logo">زهرا شهبازی</span>
          <p>طراح سایت و برنامه‌نویس پایتون</p>
        </div>
        <div className="footer-links">
          <a href="#home">خانه</a>
          <a href="#about">درباره</a>
          <a href="#skills">مهارت‌ها</a>
          <a href="#portfolio">پروژه‌ها</a>
          <a href="#contact">تماس</a>
        </div>
        <div className="footer-copy">
          © {new Date().getFullYear()} زهرا شهبازی — تمامی حقوق محفوظ است
        </div>
      </div>
    </footer>
  );
}