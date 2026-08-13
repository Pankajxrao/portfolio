import React from "react";

const About = () => {
  return (
    <section className="min-h-screen bg-black text-white">
      <div className="mx-auto w-full max-w-7xl px-6 py-24 sm:px-10 sm:py-32 lg:px-16">

        {/* ─────────────────────────────────────
            HEADER
        ───────────────────────────────────── */}

        <div className="mb-20">

          <div className="mb-6 flex items-center gap-4">
            <span className="h-px w-10 bg-white" />

            <span className="text-xs font-medium uppercase tracking-[0.3em] text-gray-500">
              About Me
            </span>
          </div>

          <h1 className="max-w-4xl text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-8xl">
            I build.
            <br />
            I solve.
            <br />
            <span className="text-gray-600">I learn.</span>
          </h1>

        </div>

        {/* ─────────────────────────────────────
            INTRO
        ───────────────────────────────────── */}

        <div className="grid grid-cols-1 gap-12 border-t border-white/10 pt-12 lg:grid-cols-[180px_1fr]">

          {/* Number */}

          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-gray-600">
              01 / Profile
            </p>
          </div>

          {/* Main Text */}

          <div className="max-w-4xl">

            <p className="text-2xl font-normal leading-relaxed tracking-tight text-white sm:text-3xl lg:text-4xl">
              I believe the best engineers aren't just coders —
              they're{" "}
              <span className="text-gray-500">
                problem solvers
              </span>{" "}
              who think in systems.
            </p>

          </div>

        </div>

        {/* ─────────────────────────────────────
            STORY
        ───────────────────────────────────── */}

        <div className="mt-24 grid grid-cols-1 gap-12 border-t border-white/10 pt-12 lg:grid-cols-[180px_1fr]">

          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-gray-600">
              02 / Story
            </p>
          </div>

          <div className="max-w-3xl space-y-8">

            <p className="text-base leading-8 text-gray-400 sm:text-lg">
              I'm{" "}
              <span className="text-white">
                Pankaj
              </span>
              , a Computer Science student at IIIT Una,
              passionate about competitive programming, data
              structures, and building software that actually
              works under pressure.
            </p>

            <p className="text-base leading-8 text-gray-400 sm:text-lg">
              I've spent the last year sharpening my{" "}
              <span className="text-white">
                C++ skills
              </span>{" "}
              through competitive programming while also
              developing my frontend skills with{" "}
              <span className="text-white">
                React
              </span>{" "}
              and modern web technologies.
            </p>

          </div>

        </div>

        {/* ─────────────────────────────────────
            SKILLS
        ───────────────────────────────────── */}

        <div className="mt-24 border-t border-white/10 pt-12">

          <div className="mb-10 flex items-center justify-between">

            <div>
              <p className="mb-2 text-xs uppercase tracking-[0.25em] text-gray-600">
                03 / Expertise
              </p>

              <h2 className="text-2xl font-medium tracking-tight sm:text-3xl">
                Things I work with
              </h2>
            </div>

            <span className="hidden text-xs uppercase tracking-[0.25em] text-gray-600 sm:block">
              Stack
            </span>

          </div>

          {/* Skill Grid */}

          <div className="grid grid-cols-1 border-l border-t border-white/10 sm:grid-cols-2 lg:grid-cols-4">

            {[
              "C++",
              "Data Structures",
              "Algorithms",
              "Competitive Programming",
              "React",
              "JavaScript",
              "HTML",
              "CSS",
            ].map((skill, index) => (
              <div
                key={skill}
                className="
                  group
                  relative
                  flex
                  min-h-[120px]
                  items-end
                  border-b
                  border-r
                  border-white/10
                  p-6
                  transition-colors
                  duration-300
                  hover:bg-white
                  hover:text-black
                "
              >

                <span className="absolute right-5 top-5 text-[10px] tracking-[0.2em] text-gray-700 group-hover:text-gray-400">
                  0{index + 1}
                </span>

                <span className="text-lg font-medium tracking-tight">
                  {skill}
                </span>

              </div>
            ))}

          </div>

        </div>

        {/* ─────────────────────────────────────
            PHILOSOPHY
        ───────────────────────────────────── */}

        <div className="mt-24 border-y border-white/10 py-16">

          <p className="mb-8 text-xs uppercase tracking-[0.25em] text-gray-600">
            04 / Philosophy
          </p>

          <p className="max-w-5xl text-3xl font-medium leading-tight tracking-tight sm:text-4xl lg:text-6xl">
            "Don't just make it work.
            <span className="text-gray-600">
              {" "}understand why it works.
            </span>
            "
          </p>

        </div>

        {/* ─────────────────────────────────────
            BOTTOM META
        ───────────────────────────────────── */}

        <div className="mt-12 flex flex-col justify-between gap-6 text-xs uppercase tracking-[0.2em] text-gray-600 sm:flex-row">

          <span>
            Computer Science · IIIT Una
          </span>

          <span>
            C++ · React · DSA
          </span>

        </div>

      </div>
    </section>
  );
};

export default About;