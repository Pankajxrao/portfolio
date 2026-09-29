import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Mail, Code2, ArrowUpRight, Terminal } from "lucide-react";

import TargetCursor from "./components/TargetCursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Work from "./components/Work";
import Contact from "./components/Contact";
import ScrollStack from "./components/ScrollStack";
import CreepyButton from "./components/CreepyButton";
import LogoLoop from "./components/LogoLoop";
import Wcards from "./components/Wcards";

import "./App.css";
import "./bgcmerge-layer.css";

// ─────────────────────────────────────────────
// GitHub Icon
// ─────────────────────────────────────────────

const GithubIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    width={16}
    height={16}
    {...props}
  >
    <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.09 3.29 9.4 7.86 10.93.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.76.12 3.05.74.8 1.18 1.83 1.18 3.09 0 4.41-2.69 5.39-5.25 5.67.41.36.78 1.07.78 2.16 0 1.56-.01 2.82-.01 3.2 0 .32.2.67.8.56A10.52 10.52 0 0 0 23.5 12c0-6.27-5.23-11.5-11.5-11.5Z" />
  </svg>
);

// ─────────────────────────────────────────────
// LinkedIn Icon
// ─────────────────────────────────────────────

const LinkedinIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    width={16}
    height={16}
    {...props}
  >
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.15 1.45-2.15 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.27 2.38 4.27 5.47v6.27ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
  </svg>
);

// ─────────────────────────────────────────────
// Social Links
// ─────────────────────────────────────────────

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/pankajxrao",
    icon: GithubIcon,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/pankaj-yadav-bb1b6b382",
    icon: LinkedinIcon,
  },
  {
    label: "Email",
    href: "mailto:officialpankaj310@gmail.com",
    icon: Mail,
  },
  {
    label: "LeetCode",
    href: "https://leetcode.com/pankajxrao",
    icon: Code2,
  },
];

// ─────────────────────────────────────────────
// Skills
// ─────────────────────────────────────────────

const skills = [
  "C++",
  "C",
  "JavaScript",
  "HTML5",
  "CSS3",
  "React",
  "Node.js",
  "Express.js",
  "MongoDB",
  "Mongoose",
  "JWT",
  "Git",
  "GitHub",
  "OOP",
  "Data Structures",
  "Algorithms",
  "RestApi",
  "PostMan Api",
  "Cloudinary",
  "Typescript"
];

// ─────────────────────────────────────────────
// Page Layout
// ─────────────────────────────────────────────

const PageLayout = ({ children }) => {
  return (
    <main className="min-h-screen overflow-x-hidden bg-black text-white">

      <Navbar />

      {/* Technical background grid */}
      <div
        className="
          pointer-events-none
          fixed
          inset-0
          -z-10
          opacity-[0.025]
          [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)]
          [background-size:70px_70px]
        "
      />

      <div className="relative z-10">
        {children}
      </div>

    </main>
  );
};

// ─────────────────────────────────────────────
// HOME
// ─────────────────────────────────────────────

const Home = () => {
  return (
    <PageLayout>

      {/* ═══════════════════════════════════════
          HERO
      ═══════════════════════════════════════ */}

      <section className="relative overflow-hidden bg-black pt-16">

        {/* Status bar */}

        <div className="mx-auto flex max-w-7xl items-center justify-between border-b border-white/10 px-6 py-5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/30 sm:px-10 lg:px-16">

          <div className="flex items-center gap-3">

            <span className="h-2 w-2 animate-pulse rounded-full bg-white" />

            system.online

          </div>

          <span>
            pankaj.dev / 2026
          </span>

        </div>


        {/* Hero */}

        <div className="relative translate-y-6">
          <Hero />
        </div>


        {/* Floating weird labels */}

        <div
          className="
            pointer-events-none
            absolute
            left-[5%]
            top-[30%]
            hidden
            rotate-[-7deg]
            border
            border-white/20
            px-4
            py-2
            font-mono
            text-[9px]
            uppercase
            tracking-[0.2em]
            text-white/40
            lg:block
          "
        >
          coffee.exe running
        </div>

        <div
          className="
            pointer-events-none
            absolute
            right-[5%]
            top-[42%]
            hidden
            rotate-[6deg]
            border
            border-white/20
            px-4
            py-2
            font-mono
            text-[9px]
            uppercase
            tracking-[0.2em]
            text-white/40
            lg:block
          "
        >
          bugs detected: probably
        </div>

        <div
          className="
            pointer-events-none
            absolute
            bottom-[18%]
            left-[8%]
            hidden
            rotate-[4deg]
            border
            border-white/10
            px-4
            py-2
            font-mono
            text-[9px]
            uppercase
            tracking-[0.2em]
            text-white/20
            lg:block
          "
        >
          compiling personality...
        </div>


        {/* Hero footer */}

        <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-4 border-t border-white/10 px-6 py-6 sm:px-10 lg:flex-row lg:items-center lg:justify-between lg:px-16">

          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/30">
            Scroll ↓
          </span>

          <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">

            <span>Code</span>

            <span className="text-white/10">/</span>

            <span>Build</span>

            <span className="text-white/10">/</span>

            <span>Break</span>

            <span className="text-white/10">/</span>

            <span>Repeat</span>

          </div>

        </div>

      </section>


      {/* ═══════════════════════════════════════
          WHAT I DO
      ═══════════════════════════════════════ */}

      <section className="border-t border-white/10 bg-black">

        <div className="mx-auto max-w-7xl px-6 py-24 sm:px-10 lg:px-16">

          <div className="mb-16 grid gap-8 lg:grid-cols-[100px_1fr_auto]">

            <span className="font-mono text-xs text-white/25">
              01
            </span>

            <div>

              <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
                Current State
              </p>

              <h2 className="text-5xl font-semibold leading-[0.9] tracking-[-0.05em] sm:text-7xl lg:text-8xl">

                MAKING
                <br />

                <span className="text-white/25">
                  THINGS MAKE SENSE.
                </span>

              </h2>

            </div>

            <div className="max-w-xs self-end">

              <div className="mb-3 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">

                <Terminal size={12} />

                dev.log

              </div>

             <p className="ml-64 text-sm leading-7 text-white/40">
  I like taking confusing problems, breaking them into smaller
  pieces, and slowly turning them into something that actually
  works.
</p>

            </div>

          </div>


          <Wcards />

        </div>

      </section>


      {/* ═══════════════════════════════════════
          SKILLS
      ═══════════════════════════════════════ */}

      <section className="border-t border-white/10 bg-black">

        <div className="mx-auto max-w-7xl px-6 py-24 sm:px-10 lg:px-16">

          <div className="mb-14 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">

            <div>

              <div className="mb-5 flex items-center gap-4">

                <span className="font-mono text-xs text-white/25">
                  02
                </span>

                <span className="h-px w-12 bg-white/20" />

                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
                  Loadout
                </span>

              </div>

              <h2 className="text-5xl font-semibold tracking-[-0.05em] sm:text-7xl">

                THE
                <br />

                <span className="text-white/25">
                  DAMAGE KIT.
                </span>

              </h2>

            </div>


            <div className="max-w-sm">

              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
                Currently installed
              </p>

              <p className="mt-3 text-sm leading-7 text-white/40">
                The languages, frameworks, tools, and fundamentals I'm using
                while figuring out how to build better software.
              </p>

            </div>

          </div>


          {/* Creepy Buttons — NEVER TOUCHING THESE 😭 */}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {skills.map((skill) => (
              <CreepyButton key={skill}>
                {skill}
              </CreepyButton>
            ))}

          </div>


          <div className="mt-8 flex flex-col justify-between gap-3 border-t border-white/10 pt-5 font-mono text-[9px] uppercase tracking-[0.2em] text-white/25 sm:flex-row">

            <span>
              16 modules loaded
            </span>

            <span>
              status: still installing knowledge
            </span>

          </div>

        </div>

      </section>


      {/* ═══════════════════════════════════════
          PROJECTS
      ═══════════════════════════════════════ */}

      <section className="border-t border-white/10 bg-black">

        <div className="mx-auto max-w-7xl px-6 pt-24 sm:px-10 lg:px-16">

          <div className="grid gap-8 lg:grid-cols-[100px_1fr_auto]">

            <span className="font-mono text-xs text-white/25">
              03
            </span>

            <div>

              <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
                Shipped / Experimenting
              </p>

              <h2 className="text-5xl font-semibold leading-[0.9] tracking-[-0.05em] sm:text-7xl lg:text-8xl">

                EXPERIMENT
                <br />

                <span className="text-white/25">
                  LOG.
                </span>

              </h2>

            </div>

            <div className="max-w-xs self-end">

              <p className="text-sm leading-7 text-white/40">
                Projects built to learn something new. Some became products.
                Some became bugs. All of them taught me something.
              </p>

            </div>

          </div>

        </div>


        <div className="mt-12 h-screen w-full bg-black">
          <ScrollStack />
        </div>

      </section>


      {/* ═══════════════════════════════════════
          SOCIAL
      ═══════════════════════════════════════ */}

      <section className="border-t border-white/10 bg-black">

        <div className="mx-auto max-w-7xl px-6 py-24 sm:px-10 lg:px-16">

          <div className="mb-16 grid gap-8 lg:grid-cols-[100px_1fr_auto]">

            <span className="font-mono text-xs text-white/25">
              04
            </span>

            <div>

              <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
                Signal
              </p>

              <h2 className="text-5xl font-semibold leading-[0.9] tracking-[-0.05em] sm:text-7xl lg:text-8xl">

                YOU FOUND
                <br />

                <span className="text-white/25">
                  THE SIGNAL.
                </span>

              </h2>

            </div>

            <p className="max-w-xs self-end text-sm leading-7 text-white/40">
              GitHub for the code. LeetCode for the suffering. LinkedIn for
              pretending everything is going according to plan.
            </p>

          </div>


          <LogoLoop
            logos={socialLinks.map(({ label, href, icon: Icon }) => ({
              node: (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="
                    cursor-target
                    group
                    flex
                    h-28
                    w-28
                    flex-col
                    items-center
                    justify-center
                    gap-3
                    border
                    border-white/10
                    bg-black
                    text-white
                    no-underline
                    transition-all
                    duration-300
                    hover:border-white
                    hover:bg-white
                    hover:text-black
                    sm:h-32
                    sm:w-32
                  "
                >

                  <Icon
                    size={24}
                    className="transition-transform duration-300 group-hover:scale-110"
                  />

                  <span className="font-mono text-[9px] uppercase tracking-[0.15em] sm:text-xs">
                    {label}
                  </span>

                </a>
              ),

              ariaLabel: label,
            }))}

            speed={80}
            direction="left"
            gap={32}
            pauseOnHover
            fadeOut
            ariaLabel="Social links"
          />

        </div>

      </section>


      {/* ═══════════════════════════════════════
          CONTACT
      ═══════════════════════════════════════ */}

      <section className="border-t border-white/10 bg-black">

        <div className="mx-auto max-w-7xl px-6 py-24 sm:px-10 lg:px-16">

          <div className="relative overflow-hidden border border-white/10 p-8 sm:p-12 lg:p-20">

            {/* Decorative metadata */}

            <div className="absolute right-6 top-6 font-mono text-[9px] uppercase tracking-[0.2em] text-white/20">
              connection.request
            </div>

            <div className="absolute bottom-6 left-6 font-mono text-[9px] uppercase tracking-[0.2em] text-white/20">
              awaiting_input...
            </div>


            <div className="max-w-5xl">

              <p className="mb-8 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
                05 / Next Move
              </p>

              <h2 className="text-5xl font-semibold leading-[0.9] tracking-[-0.05em] sm:text-7xl lg:text-8xl">

                GOT
                <br />

                <span className="text-white/25">
                  SOMETHING?
                </span>

              </h2>


              <p className="mt-8 max-w-xl text-base leading-7 text-white/40">
                A project, an interesting problem, a crazy idea, or just a
                conversation about software — I'm listening.
              </p>


              <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center">

                <a
                  href="/contact"
                  className="
                    cursor-target
                    group
                    inline-flex
                    items-center
                    justify-center
                    gap-3
                    bg-white
                    px-7
                    py-4
                    text-sm
                    font-medium
                    text-black
                    transition-all
                    duration-300
                    hover:gap-5
                  "
                >

                  Start a conversation

                  <ArrowUpRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />

                </a>

                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/25">
                  signal accepted

                </span>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ═══════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════ */}

      <footer className="border-t border-white/10 bg-black">

        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-8 sm:px-10 lg:flex-row lg:items-center lg:justify-between lg:px-16">

          <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/25">

            PANKAJ YADAV / IIIT UNA

          </div>


          <div className="flex flex-wrap gap-5 font-mono text-[9px] uppercase tracking-[0.2em] text-white/25">

            <span>React</span>

            <span>Node.js</span>

            <span>C++</span>

            <span>DSA</span>

            <span>2026</span>

          </div>

        </div>

      </footer>

    </PageLayout>
  );
};


// ─────────────────────────────────────────────
// Router
// ─────────────────────────────────────────────

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },

  {
    path: "/about",
    element: (
      <PageLayout>
        <section className="min-h-screen bg-black pt-24">
          <About />
        </section>
      </PageLayout>
    ),
  },

  {
    path: "/work",
    element: (
      <PageLayout>
        <section className="min-h-screen bg-black pt-24">
          <Work />
        </section>
      </PageLayout>
    ),
  },

  {
    path: "/contact",
    element: (
      <PageLayout>
        <section className="min-h-screen bg-black pt-24">
          <Contact />
        </section>
      </PageLayout>
    ),
  },
]);


// ─────────────────────────────────────────────
// APP
// ─────────────────────────────────────────────

function App() {
  return (
    <>

      <TargetCursor
        targetSelector=".cursor-target"
        spinDuration={2}
        hideDefaultCursor={true}
        hoverDuration={0.2}
        parallaxOn={true}
        cursorColor="#ffffff"
        cursorColorOnTarget="#ffffff"
      />

      <RouterProvider router={router} />

    </>
  );
}

export default App;