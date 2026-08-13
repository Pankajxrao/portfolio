import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ScrollReveal = ({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,

  containerClassName = "",
  textClassName = "",
  style = {},

  rotationEnd = "bottom bottom",
  wordAnimationEnd = "bottom bottom",
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller =
      scrollContainerRef?.current || window;

    gsap.fromTo(
      el,
      {
        transformOrigin: "0% 50%",
        rotate: baseRotation,
      },
      {
        rotate: 0,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          scroller,
          start: "top bottom",
          end: rotationEnd,
          scrub: true,
        },
      }
    );

    const words = el.querySelectorAll(".word");

    gsap.fromTo(
      words,
      {
        opacity: baseOpacity,
        willChange: "opacity",
      },
      {
        opacity: 1,
        ease: "none",
        stagger: 0.05,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: "top bottom-=20%",
          end: wordAnimationEnd,
          scrub: true,
        },
      }
    );

    if (enableBlur) {
      gsap.fromTo(
        words,
        {
          filter: `blur(${blurStrength}px)`,
        },
        {
          filter: "blur(0px)",
          ease: "none",
          stagger: 0.05,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: "top bottom-=20%",
            end: wordAnimationEnd,
            scrub: true,
          },
        }
      );
    }

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, [
    scrollContainerRef,
    enableBlur,
    baseRotation,
    baseOpacity,
    blurStrength,
    rotationEnd,
    wordAnimationEnd,
  ]);

  // Split only plain text
  const content =
    typeof children === "string"
      ? children.split(/(\s+)/).map((word, i) =>
          /^\s+$/.test(word) ? (
            word
          ) : (
            <span key={i} className="word inline-block">
              {word}
            </span>
          )
        )
      : children;

  return (
    <div ref={containerRef} className={containerClassName}>
      <div
        className={textClassName}
        style={style}
      >
        {content}
      </div>
    </div>
  );
};

export default ScrollReveal;