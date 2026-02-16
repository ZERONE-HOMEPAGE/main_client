export const scrollTo = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

export const scrollDown = () => {
  const element = document.getElementById('event');
  if (element) {
    const start = window.scrollY;
    const headerHeight = 64;
    const target = element.offsetTop - headerHeight;
    const duration = 100;

    const animateScroll = (currentTime: number, startTime: number) => {
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);

      const ease =
        progress < 0.5
          ? 4 * progress * progress * progress
          : (progress - 1) * (2 * progress - 2) * (2 * progress - 2) + 1;

      window.scrollTo(0, start + (target - start) * ease);

      if (progress < 1) {
        requestAnimationFrame((time) => animateScroll(time, startTime));
      }
    };

    requestAnimationFrame((time) => animateScroll(time, time));
  }
};

export const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
