import React from "react";

const Wcards = () => {
  const cards = [
    {
      number: "01",
      title: "Frontend Development",
      text: "Building responsive and modern web applications with React.",
      tech: "React · Tailwind · JavaScript",
    },
    {
      number: "02",
      title: "Problem Solving",
      text: "300+ DSA problems solved across competitive programming platforms.",
      tech: "C++ · DSA · Algorithms",
    },
    {
      number: "03",
      title: "Continuous Learning",
      text: "Exploring full-stack development, system design, and new technologies.",
      tech: "Full Stack · Systems · Learning",
    },
  ];

  return (
    <div className="flex h-[320px] w-full max-w-4xl gap-2 bg-black p-2">
      {cards.map((card) => (
        <div
          key={card.number}
          className="
            group
            relative
            flex
            h-full
            flex-1
            cursor-pointer
            overflow-hidden
            border
            border-white/20
            bg-zinc-950
            transition-all
            duration-500
            ease-in-out
            hover:flex-[4]
          "
        >
          {/* Collapsed content */}
          <div
            className="
              absolute
              inset-0
              flex
              items-center
              justify-center
              transition-all
              duration-500
              group-hover:opacity-0
            "
          >
            <span
              className="
                whitespace-nowrap
                text-xs
                uppercase
                tracking-[0.3em]
                text-gray-500
                [writing-mode:vertical-rl]
                rotate-180
              "
            >
             here, look here!!!
            </span>
          </div>

          {/* Expanded content */}
          <div
            className="
              flex
              h-full
              min-w-[320px]
              flex-col
              justify-between
              p-8
              opacity-0
              transition-all
              duration-500
              group-hover:opacity-100
            "
          >
            <div>
              <div className="mb-8 flex items-center justify-between">
                <span className="text-xs font-medium tracking-[0.25em] text-gray-500">
                  {card.number}
                </span>

                <span className="text-xs uppercase tracking-[0.2em] text-gray-600">
                  Hovered
                </span>
              </div>

              <h3 className="max-w-md text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                {card.title}
              </h3>

              <p className="mt-6 max-w-md text-sm leading-7 text-gray-400 sm:text-base">
                {card.text}
              </p>
            </div>

            <div className="border-t border-white/10 pt-5">
              <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
                {card.tech}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Wcards;