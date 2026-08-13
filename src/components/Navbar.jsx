import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed left-0 top-0 z-[100] w-full bg-black/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:px-10 lg:px-16">

        {/* Logo */}
        <NavLink
          to="/"
          className="cursor-target text-lg font-semibold tracking-tight text-white"
        >
          Pankaj
        </NavLink>

        {/* Navigation - CENTER */}
        <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-8">
          
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `cursor-target text-sm transition-colors duration-300 ${
                isActive
                  ? "text-white"
                  : "text-gray-500 hover:text-white"
              }`
            }
          >
            About
          </NavLink>

          <NavLink
            to="/work"
            className={({ isActive }) =>
              `cursor-target text-sm transition-colors duration-300 ${
                isActive
                  ? "text-white"
                  : "text-gray-500 hover:text-white"
              }`
            }
          >
            Work
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `cursor-target text-sm transition-colors duration-300 ${
                isActive
                  ? "text-white"
                  : "text-gray-500 hover:text-white"
              }`
            }
          >
            Contact
          </NavLink>

        </div>

      </div>
    </nav>
  );
};

export default Navbar;