import { useRef, useEffect, useState } from 'react';

interface ScrollVideoProps {
  src?: string;
  placeholder?: React.ReactNode;
}

export default function ScrollVideo({ src, placeholder }: ScrollVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hasVideo, setHasVideo] = useState(!!src);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!src || !section) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setShouldLoad(true);
        observer.disconnect();
      }
    }, { rootMargin: '100px' });

    observer.observe(section);
    return () => observer.disconnect();
  }, [src]);

  useEffect(() => {
    if (!src || !shouldLoad || !videoRef.current || !sectionRef.current) return;

    const video = videoRef.current;
    const section = sectionRef.current;
    let animationFrame = 0;

    const updateVideoFrame = () => {
      if (animationFrame) return;

      animationFrame = window.requestAnimationFrame(() => {
        animationFrame = 0;
        if (!Number.isFinite(video.duration) || video.duration <= 0) return;

        const scrollDistance = section.offsetHeight - window.innerHeight;
        if (scrollDistance <= 0) return;

        const scrollProgress = Math.min(1, Math.max(0, -section.getBoundingClientRect().top / scrollDistance));
        video.currentTime = scrollProgress * video.duration;
      });
    };

    window.addEventListener('scroll', updateVideoFrame, { passive: true });
    window.addEventListener('resize', updateVideoFrame);
    video.addEventListener('loadedmetadata', updateVideoFrame);
    updateVideoFrame();

    return () => {
      window.removeEventListener('scroll', updateVideoFrame);
      window.removeEventListener('resize', updateVideoFrame);
      video.removeEventListener('loadedmetadata', updateVideoFrame);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, [src, shouldLoad]);

  if (!hasVideo) {
    return (
      <div className="scroll-video-placeholder">
        {placeholder || (
          <div className="video-placeholder-content">
            <div className="video-icon">💻</div>
            <p>مهندس نرم‌افزار | توسعه‌دهنده فول‌استک</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div ref={sectionRef} className="scroll-video-track">
      <div className="scroll-video">
        <video
          ref={videoRef}
          src={shouldLoad ? src : undefined}
          muted
          playsInline
          preload={shouldLoad ? 'metadata' : 'none'}
        />
      </div>
    </div>
  );
}