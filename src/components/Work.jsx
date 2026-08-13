import React from "react";

const projects = [
  {
    number: "01",
    title: "Personal Portfolio",
    description:
      "A personal portfolio built with React, Tailwind CSS, GSAP, and modern UI animations.",
    tags: ["React", "Tailwind CSS", "GSAP"],
    status: "Building",
  },
  {
    number: "02",
    title: "Frontend Experiments",
    description:
      "A collection of UI experiments and interactive components built while improving my frontend development skills.",
    tags: ["React", "JavaScript", "CSS"],
    status: "Ongoing",
  },
  {
    number: "03",
    title: "DSA & Competitive Programming",
    description:
      "Regular problem solving focused on data structures, algorithms, and improving problem-solving skills with C++.",
    tags: ["C++", "DSA", "Algorithms"],
    status: "Ongoing",
  },
];

const Work = () => {
  return (
    <section className="min-h-screen bg-black px-6 py-24 text-white sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-20">
          <div className="mb-6 flex items-center gap-4">
            <span className="h-px w-10 bg-white" />

            <span className="text-xs uppercase tracking-[0.25em] text-gray-500">
              What I'm Building
            </span>
          </div>

          <h1 className="max-w-3xl text-5xl font-semibold tracking-tight sm:text-6xl">
            Learning by
            <span className="text-gray-500"> building.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-gray-500">
            I'm still at the beginning of my journey, so this space is less
            about finished client work and more about the things I'm building,
            experimenting with, and learning along the way.
          </p>
        </div>

        {/* Projects */}
        <div className="divide-y divide-white/10 border-y border-white/10">
          {projects.map((project) => (
            <article
              key={project.number}
              className="group grid gap-8 py-10 transition-all duration-300 hover:px-4 sm:grid-cols-[80px_1fr_auto] sm:items-start"
            >
              {/* Number */}
              <span className="text-sm text-gray-600">
                {project.number}
              </span>

              {/* Content */}
              <div>
                <div className="mb-3 flex flex-wrap items-center gap-4">
                  <h2 className="text-2xl font-medium transition-colors duration-300 group-hover:text-gray-300 sm:text-3xl">
                    {project.title}
                  </h2>

                  <span className="border border-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-gray-500">
                    {project.status}
                  </span>
                </div>

                <p className="max-w-2xl text-sm leading-7 text-gray-500">
                  {project.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-white/10 px-3 py-1.5 text-xs text-gray-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Arrow */}
              <div className="hidden text-2xl text-gray-600 transition-all duration-300 group-hover:translate-x-2 group-hover:text-white sm:block">
                →
              </div>
            </article>
          ))}
        </div>

        {/* Bottom note */}
        <div className="mt-16 flex flex-col gap-4 border border-white/10 p-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-white">
              More projects coming soon.
            </p>

            <p className="mt-2 text-sm text-gray-500">
              I'm constantly learning, experimenting, and adding new things.
            </p>
          </div>

          <span className="text-xs uppercase tracking-[0.2em] text-gray-600">
            2026 → 
          </span>
        </div>

      </div>
    </section>
  );
};

export default Work;