import React from "react";

const Contact = () => {
  return (
    <section className="min-h-screen bg-black text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center px-6 py-24 sm:px-10 lg:px-16">

        {/* ─────────────────────────────────────
            HEADER
        ───────────────────────────────────── */}

        <div className="mb-16 flex items-center gap-4">
          <span className="h-px w-10 bg-white" />

          <span className="text-xs font-medium uppercase tracking-[0.3em] text-gray-500">
            Get In Touch
          </span>
        </div>

        {/* ─────────────────────────────────────
            MAIN CONTENT
        ───────────────────────────────────── */}

        <div className="border-y border-white/10 py-16 sm:py-20">

          <p className="mb-8 text-xs uppercase tracking-[0.25em] text-gray-600">
            Let's Talk
          </p>

          <h1 className="max-w-5xl text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-8xl">
            Have something
            <br />
            <span className="text-gray-600">
              in mind?
            </span>
          </h1>

          <p className="mt-10 max-w-2xl text-base leading-8 text-gray-400 sm:text-lg">
            Whether you want to discuss a project, collaboration,
            an opportunity, or simply say hello, feel free to reach
            out. I'm always open to interesting conversations.
          </p>

        </div>

        {/* ─────────────────────────────────────
            EMAIL
        ───────────────────────────────────── */}

        <div className="mt-16">

          <p className="mb-5 text-xs uppercase tracking-[0.25em] text-gray-600">
            Email
          </p>

          <a
            href="mailto:officialpankaj310@gmail.com"
            className="
              group
              inline-block
              border-b
              border-white/20
              pb-3
              text-2xl
              font-medium
              tracking-tight
              text-white
              transition-all
              duration-300
              hover:border-white
              hover:text-gray-400
              sm:text-3xl
              lg:text-5xl
            "
          >
            officialpankaj310@gmail.com
          </a>

        </div>

        {/* ─────────────────────────────────────
            BOTTOM INFO
        ───────────────────────────────────── */}

        <div className="mt-24 flex flex-col justify-between gap-6 border-t border-white/10 pt-8 text-xs uppercase tracking-[0.2em] text-gray-600 sm:flex-row">

          <span>
            Open to opportunities
          </span>

          <span>
            React · C++ · DSA
          </span>

        </div>

      </div>
    </section>
  );
};

export default Contact;