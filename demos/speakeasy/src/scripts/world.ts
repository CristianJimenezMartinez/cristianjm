import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initScrollWorld() {
  // 1. Initialize Lenis Smooth Scroll
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
  });

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  // 2. Setup stage transitions and video scrubbing
  const stageItems = document.querySelectorAll<HTMLElement>('[data-stage-item]');
  const sections = document.querySelectorAll<HTMLElement>('[data-tour-section]');

  sections.forEach((section, index) => {
    const stageItem = stageItems[index];
    if (!stageItem) return;
    const video = stageItem.querySelector<HTMLVideoElement>('[data-scroll-video]');

    ScrollTrigger.create({
      trigger: section,
      start: 'top 60%',
      end: 'bottom 40%',
      scrub: true,
      onUpdate: (self) => {
        if (video && video.duration) {
          video.currentTime = self.progress * video.duration;
        }
      },
      onEnter: () => {
        stageItems.forEach((item, i) => {
          if (i === index) {
            item.classList.remove('opacity-0');
            item.classList.add('opacity-100');
          } else {
            item.classList.remove('opacity-100');
            item.classList.add('opacity-0');
          }
        });
      },
      onEnterBack: () => {
        stageItems.forEach((item, i) => {
          if (i === index) {
            item.classList.remove('opacity-0');
            item.classList.add('opacity-100');
          } else {
            item.classList.remove('opacity-100');
            item.classList.add('opacity-0');
          }
        });
      }
    });
  });

  console.log('[ScrollWorld] Initialized with Lenis & GSAP ScrollTrigger');
}
