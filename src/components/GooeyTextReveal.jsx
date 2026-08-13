import React, {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
} from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const LINE_EDGE_BLUR = 0.4;

function getRevealTargets(container) {
  const explicitTargets = Array.from(
    container.querySelectorAll("[data-gooey-reveal-item]")
  );

  if (explicitTargets.length > 0) {
    return explicitTargets;
  }

  const directChildren = Array.from(container.children).filter(
    (child) => child instanceof HTMLElement
  );

  return directChildren.length > 0 ? directChildren : [container];
}

function wrapLine(line) {
  const inner = document.createElement("span");

  inner.dataset.gooeyRevealInner = "";

  inner.style.display = "inline-block";
  inner.style.willChange = "filter, transform, opacity";

  while (line.firstChild) {
    inner.appendChild(line.firstChild);
  }

  line.appendChild(inner);

  return inner;
}

const GooeyTextReveal = forwardRef(function GooeyTextReveal(
  {
    children,
    mode = "scroll",
    delay = 0,
    duration = 1.2,
    stagger = 0.08,
    blurAmount = 0.35,
    ease = "power3.out",
    start = "top 80%",
    end = "bottom 65%",
    scroller,
    once = true,
    disabled = false,
    onComplete,
    ...props
  },
  forwardedRef
) {
  const containerRef = useRef(null);

  const reactId = useId();

  const filterId = useMemo(
    () => `gooey-text-${reactId.replace(/:/g, "")}`,
    [reactId]
  );

  const setContainerRef = useCallback(
    (node) => {
      containerRef.current = node;

      if (typeof forwardedRef === "function") {
        forwardedRef(node);
      } else if (forwardedRef) {
        forwardedRef.current = node;
      }
    },
    [forwardedRef]
  );

  useEffect(() => {
    const container = containerRef.current;

    if (!container || disabled) {
      return;
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) {
      return;
    }

    let splits = [];
    let tween = null;
    let resizeFrame = null;
    let disposed = false;

    const resolveScroller = () => {
      if (
        typeof scroller === "string" ||
        scroller instanceof HTMLElement
      ) {
        return scroller;
      }

      return scroller?.current || undefined;
    };

    const cleanup = () => {
      if (tween) {
        tween.scrollTrigger?.kill();
        tween.kill();
        tween = null;
      }

      splits.forEach((split) => {
        split.revert();
      });

      splits = [];
    };

    const build = () => {
      if (disposed) {
        return;
      }

      cleanup();

      const layers = [];

      const targets = getRevealTargets(container);

      targets.forEach((target) => {
        const split = SplitText.create(target, {
          type: "lines",
          linesClass: "gooey-text-reveal-line",
          aria: "auto",
        });

        split.lines.forEach((line) => {
          const lineElement = line;

          lineElement.style.display = "block";
          lineElement.style.overflow = "visible";
          lineElement.style.willChange =
            "filter, transform, opacity";

          /*
           * SVG gooey filter stays on the line.
           */
          lineElement.style.filter =
            `url(#${filterId}) blur(${LINE_EDGE_BLUR}px)`;

          /*
           * GSAP animates this wrapper.
           */
          const inner = wrapLine(lineElement);

          layers.push(inner);
        });

        splits.push(split);
      });

      if (!layers.length) {
        return;
      }

      /*
       * Starting state.
       */
      gsap.set(layers, {
        opacity: 0,
        y: 30,
        filter: `blur(${blurAmount}em)`,
      });

      const animation = {
        opacity: 1,
        y: 0,
        filter: "blur(0em)",
        duration,
        stagger,
        ease,
        overwrite: "auto",
        onComplete,
      };

      /*
       * Immediate
       */
      if (mode === "immediate") {
        animation.delay = delay;
      }

      /*
       * Scroll-triggered
       */
      if (mode === "scroll") {
        animation.delay = delay;

        animation.scrollTrigger = {
          trigger: container,
          start,
          once,
          toggleActions: once
            ? "play none none none"
            : "play none none reverse",
          invalidateOnRefresh: true,
          scroller: resolveScroller(),
        };
      }

      /*
       * Scroll scrub.
       */
      if (mode === "scrub") {
        animation.scrollTrigger = {
          trigger: container,
          start,
          end,
          scrub: true,
          invalidateOnRefresh: true,
          scroller: resolveScroller(),
        };
      }

      tween = gsap.to(layers, animation);

      if (mode !== "immediate") {
        ScrollTrigger.refresh();
      }
    };

    build();

    /*
     * Wait until fonts have loaded.
     */
    if (
      document.fonts &&
      document.fonts.status !== "loaded"
    ) {
      document.fonts.ready.then(() => {
        if (!disposed) {
          build();
          ScrollTrigger.refresh();
        }
      });
    }

    /*
     * Rebuild when width changes.
     */
    const resizeObserver = new ResizeObserver(
      (entries) => {
        if (disposed) {
          return;
        }

        if (!entries[0]) {
          return;
        }

        cancelAnimationFrame(resizeFrame);

        resizeFrame = requestAnimationFrame(() => {
          build();

          if (mode !== "immediate") {
            ScrollTrigger.refresh();
          }
        });
      }
    );

    resizeObserver.observe(container);

    return () => {
      disposed = true;

      resizeObserver.disconnect();

      cancelAnimationFrame(resizeFrame);

      cleanup();

      ScrollTrigger.refresh();
    };
  }, [
    mode,
    delay,
    duration,
    stagger,
    blurAmount,
    ease,
    start,
    end,
    scroller,
    once,
    disabled,
    onComplete,
    filterId,
    children,
  ]);

  return (
    <>
      <div
        ref={setContainerRef}
        {...props}
      >
        {children}
      </div>

      <svg
        aria-hidden="true"
        focusable="false"
        width="0"
        height="0"
        style={{
          position: "absolute",
          pointerEvents: "none",
        }}
      >
        <defs>
          <filter
            id={filterId}
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="
                1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 255 -140
              "
            />
          </filter>
        </defs>
      </svg>
    </>
  );
});

GooeyTextReveal.displayName = "GooeyTextReveal";

export default GooeyTextReveal;