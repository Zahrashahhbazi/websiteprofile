import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollVideo from './components/ScrollVideo';
import './index.css';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      anchors: {
        duration: 3,
        easing: (progress) => -(Math.cos(Math.PI * progress) - 1) / 2,
      },
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    const update = (time: number) => lenis.raf(time * 1000);
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="app">
      <Navbar />
      <Hero />
      <ScrollVideo src="/videos/33.mp4" />
      <About />
      <Skills />
      <Portfolio />
      <Contact />
      <Footer />
    </div>
  );
}