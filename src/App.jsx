import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Mail, Code2 } from "lucide-react";

import TargetCursor from "./components/TargetCursor";
import Navbar from "./components/Navbar";
import Hero from "./components/hero";
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
// Page Layout
// ─────────────────────────────────────────────

const PageLayout = ({ children }) => {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      {children}
    </main>
  );
};

// ─────────────────────────────────────────────
// Router
// ─────────────────────────────────────────────

const router = createBrowserRouter([
  // ─────────────────────────────────────────────
  // HOME
  // ─────────────────────────────────────────────

  {
    path: "/",
    element: (
      <PageLayout>
        {/* HERO */}

        <section className="relative bg-black">
          <Hero />
        </section>

        {/* WHAT I DO */}

        <section className="border-t border-white/10 bg-black">
          <div className="mx-auto flex min-h-[80vh] w-full max-w-7xl items-center px-6 py-24 sm:px-10 lg:px-16">
            <div className="w-full">
              <div className="mb-12 flex items-center gap-4">
                <span className="h-px w-10 bg-white" />

                <span className="text-xs font-medium uppercase tracking-[0.25em] text-gray-500">
                  What I Do
                </span>
              </div>

              <Wcards />
            </div>
          </div>
        </section>

        {/* SKILLS */}

        <section className="border-t border-white/10 bg-black">
          <div className="mx-auto w-full max-w-7xl px-6 py-20 sm:px-10 sm:py-24 lg:px-16">
            <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-gray-500">
                  Technologies
                </p>

                <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  Skill Set
                </h2>
              </div>

              <p className="max-w-md text-sm leading-6 text-gray-500">
                Technologies I use to build interfaces, solve problems, and
                develop modern web applications.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <CreepyButton>JavaScript</CreepyButton>
              <CreepyButton>HTML</CreepyButton>
              <CreepyButton>Tailwind CSS</CreepyButton>
              <CreepyButton>CSS3</CreepyButton>
              <CreepyButton>React</CreepyButton>
              <CreepyButton>Git</CreepyButton>
              <CreepyButton>GitHub</CreepyButton>
            </div>
          </div>
        </section>

        {/* FEATURED PROJECTS */}

        <section className="border-t border-white/10 bg-black">
          <div className="mx-auto w-full max-w-7xl px-6 pt-20 sm:px-10 lg:px-16">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-gray-500">
                  Selected Work
                </p>

                <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  Featured Projects
                </h2>
              </div>

              <p className="max-w-md text-sm leading-6 text-gray-500">
                A selection of projects focused on problem solving, frontend
                development, and building useful products.
              </p>
            </div>
          </div>

          <div className="mt-10 h-screen w-full bg-black">
            <ScrollStack />
          </div>
        </section>

        {/* SOCIAL LINKS */}

        <section className="border-t border-white/10 bg-black">
          <div className="mx-auto w-full max-w-7xl px-6 py-20 sm:px-10 sm:py-24 lg:px-16">
            <div className="mb-12">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-gray-500">
                Find Me Online
              </p>

              <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Connect
              </h2>
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
                      flex
                      h-24
                      w-24
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
                      sm:h-28
                      sm:w-28
                    "
                  >
                    <Icon size={24} />

                    <span className="text-xs font-medium tracking-wide sm:text-sm">
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

        {/* FOOTER */}

        <footer className="border-t border-white/10 bg-black">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-16">
            <p>
              © {new Date().getFullYear()} Pankaj. All rights reserved.
            </p>

            <p className="uppercase tracking-[0.2em]">
              Built with React
            </p>
          </div>
        </footer>
      </PageLayout>
    ),
  },

  // ─────────────────────────────────────────────
  // ABOUT
  // ─────────────────────────────────────────────

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

  // ─────────────────────────────────────────────
  // WORK
  // ─────────────────────────────────────────────

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

  // ─────────────────────────────────────────────
  // CONTACT
  // ─────────────────────────────────────────────

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
      {/* Target cursor animation */}
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