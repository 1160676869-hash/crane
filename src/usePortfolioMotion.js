import { useLayoutEffect } from "react";

const easeOutExpo = "cubic-bezier(0.16, 1, 0.3, 1)";
const easeSoft = "cubic-bezier(0.22, 1, 0.36, 1)";

function applyStyles(element, styles) {
  if (!element) return;

  Object.entries(styles).forEach(([key, value]) => {
    element.style[key] = value;
  });
}

function animateElement(element, keyframes, options, animations) {
  if (!element) return null;

  const animation = element.animate(keyframes, {
    easing: easeOutExpo,
    fill: "both",
    ...options
  });

  animations.push(animation);
  return animation;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export default function usePortfolioMotion() {
  useLayoutEffect(() => {
    const animations = [];
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const root = document.documentElement;
    const sections = Array.from(document.querySelectorAll(".motion-section"));
    const parallaxImages = Array.from(
      document.querySelectorAll(".identity-visual img, .project-card img")
    );

    root.classList.add("motion-ready");

    if (prefersReducedMotion) {
      sections.forEach((section) => section.classList.add("is-inview"));
      parallaxImages.forEach((image) => {
        image.style.setProperty("--parallax-y", "0px");
      });
      return () => root.classList.remove("motion-ready");
    }

    const openingTargets = {
      header: document.querySelector(".site-header"),
      heroVideo: document.querySelector(".hero-video"),
      heroMotion: document.querySelector(".hero-motion"),
      heroNoise: document.querySelector(".hero-noise"),
      heroEyebrow: document.querySelector(".hero .eyebrow"),
      heroNav: document.querySelector(".hero-nav-pill"),
      heroTitle: document.querySelector(".hero-title"),
      heroTitleLines: Array.from(document.querySelectorAll(".hero-title-text")),
      heroBottom: document.querySelector(".hero-bottom p"),
      heroTags: Array.from(document.querySelectorAll(".hero-tags span"))
    };

    applyStyles(openingTargets.header, {
      opacity: "0",
      transform: "translate3d(-50%, -36px, 0)",
      filter: "blur(12px)"
    });
    applyStyles(openingTargets.heroVideo, {
      opacity: "0",
      transform: "scale(1.16)",
      filter: "blur(14px)"
    });
    applyStyles(openingTargets.heroMotion, {
      opacity: "0",
      clipPath: "inset(0 0 100% 0)"
    });
    applyStyles(openingTargets.heroNoise, { opacity: "0" });
    applyStyles(openingTargets.heroEyebrow, {
      opacity: "0",
      transform: "translate3d(0, 36px, 0)"
    });
    applyStyles(openingTargets.heroNav, {
      opacity: "0",
      transform: "translate3d(0, 54px, 0) scaleX(0.78)",
      filter: "blur(10px)"
    });
    applyStyles(openingTargets.heroTitle, {
      opacity: "0.18",
      transform: "translate3d(0, 86px, 0) scaleX(0.68)",
      transformOrigin: "50% 55%"
    });
    openingTargets.heroTitleLines.forEach((line) => {
      applyStyles(line, {
        opacity: "0",
        transform: "translate3d(0, 130%, 0) scaleY(0.54) scaleX(0.9)",
        filter: "blur(18px)"
      });
    });
    applyStyles(openingTargets.heroBottom, {
      opacity: "0",
      transform: "translate3d(0, 62px, 0)",
      filter: "blur(10px)"
    });
    openingTargets.heroTags.forEach((tag) => {
      applyStyles(tag, {
        opacity: "0",
        transform: "translate3d(0, 42px, 0)",
        filter: "blur(8px)"
      });
    });

    requestAnimationFrame(() => {
      animateElement(
        openingTargets.heroVideo,
        [
          { opacity: 0, transform: "scale(1.16)", filter: "blur(14px)" },
          { opacity: 0.74, transform: "scale(1)", filter: "blur(0px)" }
        ],
        { duration: 2100, delay: 80 },
        animations
      );
      animateElement(
        openingTargets.heroMotion,
        [
          { opacity: 0, clipPath: "inset(0 0 100% 0)" },
          { opacity: 1, clipPath: "inset(0 0 0% 0)" }
        ],
        { duration: 1800, delay: 160 },
        animations
      );
      animateElement(
        openingTargets.heroNoise,
        [{ opacity: 0 }, { opacity: 0.36 }],
        { duration: 1600, delay: 540, easing: easeSoft },
        animations
      );
      animateElement(
        openingTargets.heroTitle,
        [
          {
            opacity: 0.18,
            transform: "translate3d(0, 86px, 0) scaleX(0.68)"
          },
          {
            opacity: 1,
            transform: "translate3d(0, 0, 0) scaleX(1)"
          }
        ],
        { duration: 1900, delay: 520 },
        animations
      );
      openingTargets.heroTitleLines.forEach((line, index) => {
        animateElement(
          line,
          [
            {
              opacity: 0,
              transform: "translate3d(0, 130%, 0) scaleY(0.54) scaleX(0.9)",
              filter: "blur(18px)"
            },
            {
              opacity: 1,
              transform: "translate3d(0, 0%, 0) scaleY(1) scaleX(1)",
              filter: "blur(0px)"
            }
          ],
          { duration: 1700, delay: 640 + index * 260 },
          animations
        );
      });
      animateElement(
        openingTargets.heroEyebrow,
        [
          { opacity: 0, transform: "translate3d(0, 36px, 0)" },
          { opacity: 1, transform: "translate3d(0, 0, 0)" }
        ],
        { duration: 1200, delay: 860 },
        animations
      );
      animateElement(
        openingTargets.heroNav,
        [
          {
            opacity: 0,
            transform: "translate3d(0, 54px, 0) scaleX(0.78)",
            filter: "blur(10px)"
          },
          {
            opacity: 1,
            transform: "translate3d(0, 0, 0) scaleX(1)",
            filter: "blur(0px)"
          }
        ],
        { duration: 1500, delay: 1120 },
        animations
      );
      animateElement(
        openingTargets.header,
        [
          {
            opacity: 0,
            transform: "translate3d(-50%, -36px, 0)",
            filter: "blur(12px)"
          },
          {
            opacity: 1,
            transform: "translate3d(-50%, 0, 0)",
            filter: "blur(0px)"
          }
        ],
        { duration: 1500, delay: 1240 },
        animations
      );
      animateElement(
        openingTargets.heroBottom,
        [
          {
            opacity: 0,
            transform: "translate3d(0, 62px, 0)",
            filter: "blur(10px)"
          },
          {
            opacity: 1,
            transform: "translate3d(0, 0, 0)",
            filter: "blur(0px)"
          }
        ],
        { duration: 1500, delay: 1520 },
        animations
      );
      openingTargets.heroTags.forEach((tag, index) => {
        animateElement(
          tag,
          [
            {
              opacity: 0,
              transform: "translate3d(0, 42px, 0)",
              filter: "blur(8px)"
            },
            {
              opacity: 1,
              transform: "translate3d(0, 0, 0)",
              filter: "blur(0px)"
            }
          ],
          { duration: 1200, delay: 1700 + index * 120 },
          animations
        );
      });
    });

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const section = entry.target;
          section.classList.add("is-inview");

          const englishTitle = section.querySelector(".eyebrow");
          const title = section.querySelector(
            ".section-heading h2, .profile-copy h2, .contact-end h2"
          );
          const cards = Array.from(
            section.querySelectorAll(
              ".identity-glow, .profile-meta a, .stat-glow, .project-glow, .strength-glow, .contact-glow"
            )
          );
          const copy = Array.from(
            section.querySelectorAll(
              ".profile-copy p:not(.eyebrow), .contact-panel a"
            )
          );
          const images = Array.from(
            section.querySelectorAll(".identity-visual img, .project-card img")
          );

          animateElement(
            englishTitle,
            [
              {
                opacity: 0,
                transform: "translate3d(-180px, 70px, 0) scaleX(1.58)",
                filter: "blur(16px)"
              },
              {
                opacity: 1,
                transform: "translate3d(0, 0, 0) scaleX(1)",
                filter: "blur(0px)"
              }
            ],
            { duration: 1500, delay: 100 },
            animations
          );
          animateElement(
            title,
            [
              {
                opacity: 0,
                clipPath: "inset(0 0 100% 0)",
                transform: "translate3d(0, 110px, 0) scaleY(0.72)",
                filter: "blur(14px)"
              },
              {
                opacity: 1,
                clipPath: "inset(0 0 0% 0)",
                transform: "translate3d(0, 0, 0) scaleY(1)",
                filter: "blur(0px)"
              }
            ],
            { duration: 1550, delay: 340 },
            animations
          );
          copy.forEach((item, index) => {
            animateElement(
              item,
              [
                {
                  opacity: 0,
                  transform: "translate3d(0, 60px, 0)",
                  filter: "blur(10px)"
                },
                {
                  opacity: 1,
                  transform: "translate3d(0, 0, 0)",
                  filter: "blur(0px)"
                }
              ],
              { duration: 1250, delay: 520 + index * 110 },
              animations
            );
          });
          cards.forEach((card, index) => {
            animateElement(
              card,
              [
                {
                  opacity: 0,
                  clipPath: "inset(18% 0 18% 0 round 28px)",
                  transform: "translate3d(0, 120px, 0) scale(0.94)",
                  filter: "blur(16px)"
                },
                {
                  opacity: 1,
                  clipPath: "inset(-60px -60px -60px -60px round 28px)",
                  transform: "translate3d(0, 0, 0) scale(1)",
                  filter: "blur(0px)"
                }
              ],
              { duration: 1450, delay: 720 + index * 140 },
              animations
            );
          });
          images.forEach((image, index) => {
            animateElement(
              image,
              [
                {
                  opacity: 0,
                  clipPath: "inset(0 100% 0 0)",
                  filter: "blur(12px) saturate(80%)"
                },
                {
                  opacity: 0.92,
                  clipPath: "inset(0 0% 0 0)",
                  filter: "blur(0px) saturate(105%)"
                }
              ],
              { duration: 1650, delay: 640 + index * 120 },
              animations
            );
          });

          sectionObserver.unobserve(section);
        });
      },
      {
        threshold: 0.22,
        rootMargin: "0px 0px -12% 0px"
      }
    );

    sections.forEach((section) => sectionObserver.observe(section));

    const activeParallaxImages = new Set();
    const parallaxObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) activeParallaxImages.add(entry.target);
          else activeParallaxImages.delete(entry.target);
        });
      },
      { rootMargin: "25% 0px" }
    );

    parallaxImages.forEach((image) => parallaxObserver.observe(image));

    let ticking = false;
    const updateParallax = () => {
      ticking = false;
      const viewportCenter = window.innerHeight / 2;

      activeParallaxImages.forEach((image) => {
        const rect = image.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) return;

        const imageCenter = rect.top + rect.height / 2;
        const offset = clamp((viewportCenter - imageCenter) * 0.05, -36, 36);
        image.style.setProperty("--parallax-y", `${offset.toFixed(2)}px`);
      });
    };

    const requestParallax = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(updateParallax);
    };

    updateParallax();
    window.addEventListener("scroll", requestParallax, { passive: true });
    window.addEventListener("resize", requestParallax);

    return () => {
      root.classList.remove("motion-ready");
      sectionObserver.disconnect();
      parallaxObserver.disconnect();
      window.removeEventListener("scroll", requestParallax);
      window.removeEventListener("resize", requestParallax);
      animations.forEach((animation) => animation.cancel());
    };
  }, []);
}
