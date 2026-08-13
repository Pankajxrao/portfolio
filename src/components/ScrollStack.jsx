import { useLayoutEffect, useRef, useCallback, useEffect } from "react";

export const ScrollStackItem = ({ children, itemClassName = "" }) => (
  <div
    className={`scroll-stack-card relative w-full h-80 my-8 p-12 rounded-[40px] shadow-[0_0_30px_rgba(0,0,0,0.25)] box-border origin-top will-change-transform ${itemClassName}`.trim()}
    style={{
      backfaceVisibility: "hidden",
      transformStyle: "preserve-3d",
    }}
  >
    {children}
  </div>
);

const ScrollStack = ({
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = "20%",
  scaleEndPosition = "10%",
  baseScale = 0.85,
  rotationAmount = 0,
  blurAmount = 0,
  onStackComplete,
}) => {
  const scrollerRef = useRef(null);
  const stackCompletedRef = useRef(false);
  const rafRef = useRef(null);
  const cardsRef = useRef([]);
  const lastTransformsRef = useRef(new Map());
  const isUpdatingRef = useRef(false);

  const calculateProgress = useCallback((scrollTop, start, end) => {
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    return (scrollTop - start) / (end - start);
  }, []);

  const parsePercentage = useCallback((value, containerHeight) => {
    if (typeof value === "string" && value.includes("%")) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value);
  }, []);

  const getScrollData = useCallback(() => {
    const scroller = scrollerRef.current;
    return {
      scrollTop: scroller.scrollTop,
      containerHeight: scroller.clientHeight,
    };
  }, []);

  const getElementOffset = useCallback((element) => element.offsetTop, []);

  const updateCardTransforms = useCallback(() => {
    if (
      !cardsRef.current.length ||
      isUpdatingRef.current ||
      !scrollerRef.current
    )
      return;

    isUpdatingRef.current = true;

    const { scrollTop, containerHeight } = getScrollData();
    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(
      scaleEndPosition,
      containerHeight,
    );

    const endElement = scrollerRef.current.querySelector(".scroll-stack-end");
    const endElementTop = endElement ? getElementOffset(endElement) : 0;

    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      const cardTop = getElementOffset(card);
      const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = cardTop - stackPositionPx - itemStackDistance * i;
      const pinEnd = endElementTop - containerHeight / 2;

      const scaleProgress = calculateProgress(
        scrollTop,
        triggerStart,
        triggerEnd,
      );
      const targetScale = baseScale + i * itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);
      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

      let blur = 0;
      if (blurAmount) {
        let topCardIndex = 0;
        for (let j = 0; j < cardsRef.current.length; j++) {
          const jCardTop = getElementOffset(cardsRef.current[j]);
          const jTriggerStart =
            jCardTop - stackPositionPx - itemStackDistance * j;
          if (scrollTop >= jTriggerStart) topCardIndex = j;
        }
        if (i < topCardIndex) {
          blur = Math.max(0, (topCardIndex - i) * blurAmount);
        }
      }

      let translateY = 0;
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;

      if (isPinned) {
        translateY =
          scrollTop - cardTop + stackPositionPx + itemStackDistance * i;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * i;
      }

      const newTransform = {
        translateY: Math.round(translateY * 100) / 100,
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 100) / 100,
        blur: Math.round(blur * 100) / 100,
      };

      const last = lastTransformsRef.current.get(i);
      const changed =
        !last ||
        Math.abs(last.translateY - newTransform.translateY) > 0.1 ||
        Math.abs(last.scale - newTransform.scale) > 0.001 ||
        Math.abs(last.rotation - newTransform.rotation) > 0.1 ||
        Math.abs(last.blur - newTransform.blur) > 0.1;

      if (changed) {
        card.style.transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`;
        card.style.filter =
          newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : "";
        lastTransformsRef.current.set(i, newTransform);
      }

      if (i === cardsRef.current.length - 1) {
        const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
        if (isInView && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (!isInView && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }
    });

    isUpdatingRef.current = false;
  }, [
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    onStackComplete,
    calculateProgress,
    parsePercentage,
    getScrollData,
    getElementOffset,
  ]);

  // Native scroll + rAF loop — no external smooth-scroll library required
  useEffect(() => {
    const loop = () => {
      updateCardTransforms();
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [updateCardTransforms]);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const cards = Array.from(scroller.querySelectorAll(".scroll-stack-card"));
    cardsRef.current = cards;
    const transformsCache = lastTransformsRef.current;

    cards.forEach((card, i) => {
      if (i < cards.length - 1) card.style.marginBottom = `${itemDistance}px`;
      card.style.willChange = "transform, filter";
      card.style.transformOrigin = "top center";
      card.style.backfaceVisibility = "hidden";
    });

    updateCardTransforms();

    return () => {
      cardsRef.current = [];
      transformsCache.clear();
      isUpdatingRef.current = false;
    };
  }, [itemDistance, updateCardTransforms]);

  return (
    <div
      ref={scrollerRef}
      className="relative w-full h-full overflow-y-auto overflow-x-visible"
      style={{
        overscrollBehavior: "contain",
        WebkitOverflowScrolling: "touch",
        scrollBehavior: "auto",
      }}
    >
      <div className="scroll-stack-inner pt-[20vh] px-6 sm:px-16 pb-[50rem] min-h-screen">
        {/* Card 1 */}
        <ScrollStackItem itemClassName="bg-transparent shadow-none border-none">
          <div
            className="
            group
            relative
            w-full
            h-full
            transition-transform
            duration-300
            hover:rotate-2

            before:absolute
            before:inset-0
            before:-z-10
            before:rounded-[40px]
            before:border-2
            before:border-white
            before:bg-zinc-900
            before:-rotate-3
            before:-translate-y-[2%]
            before:transition-all
            before:duration-300

            after:absolute
            after:inset-0
            after:-z-20
            after:rounded-[40px]
            after:border-2
            after:border-white
            after:bg-zinc-900
            after:rotate-3
            after:translate-y-[2%]
            after:transition-all
            after:duration-300

            hover:before:-rotate-2
            hover:before:-translate-y-[3%]

            hover:after:rotate-2
            hover:after:translate-y-[3%]
          "
          >
            <div className="w-full h-full rounded-[40px] border-2 border-white bg-zinc-900 p-12 text-white shadow-[0_0_30px_rgba(0,0,0,0.25)] flex flex-col justify-between">
              <div>
                <p className="text-sm uppercase tracking-widest text-zinc-400">
                  Featured Project — 01
                </p>

                <h2 className="text-4xl sm:text-5xl font-bold mt-4">
                  Portfolio Website
                </h2>

                <p className="mt-6 text-lg text-zinc-300 max-w-xl">
                  A modern developer portfolio built with React, Tailwind CSS,
                  and scroll-driven animation.
                </p>
              </div>

            <div className="flex gap-4">
                <a
                  href="https://portfolio-jims.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white text-black transition-all duration-300 hover:scale-105"
                >
                  Live Demo
                </a>

         
              </div>
            </div>
          </div>
        </ScrollStackItem>

        {/* Card 2 */}
        <ScrollStackItem itemClassName="bg-transparent shadow-none border-none">
          <div
            className="
            group
            relative
            w-full
            h-full
            transition-transform
            duration-300
            hover:rotate-2

            before:absolute
            before:inset-0
            before:-z-10
            before:rounded-[40px]
            before:border-2
            before:border-white
            before:bg-zinc-900
            before:-rotate-3
            before:-translate-y-[2%]
            before:transition-all
            before:duration-300

            after:absolute
            after:inset-0
            after:-z-20
            after:rounded-[40px]
            after:border-2
            after:border-white
            after:bg-zinc-900
            after:rotate-3
            after:translate-y-[2%]
            after:transition-all
            after:duration-300

            hover:before:-rotate-2
            hover:before:-translate-y-[3%]

            hover:after:rotate-2
            hover:after:translate-y-[3%]
          "
          >
            <div className="w-full h-full rounded-[40px] border-2 border-white bg-zinc-900 p-12 text-white shadow-[0_0_30px_rgba(0,0,0,0.25)] flex flex-col justify-between">
              <div>
                <p className="text-sm uppercase tracking-widest text-zinc-400">
                  Featured Project — 02
                </p>

                <h2 className="text-4xl sm:text-5xl font-bold mt-4">
                  Clipboard app
                </h2>

                <p className="mt-6 text-lg text-zinc-300 max-w-xl">
                  A full-stack shopping platform with authentication, payments,
                  and an admin dashboard.
                </p>
              </div>

              <div className="flex gap-4">
                <a
                  href="https://paste-app-p.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white text-black transition-all duration-300 hover:scale-105"
                >
                  Live Demo
                </a>
              </div>
            </div>
          </div>
        </ScrollStackItem>

        <div className="scroll-stack-end w-full h-px" />
      </div>
    </div>
  );
};

export default ScrollStack;
