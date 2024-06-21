import React, { useState } from "react";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  current?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({
  href,
  children,
  current = false,
}) => {
  const baseClasses = "block py-2 px-3 rounded md:p-0";
  const activeClasses =
    "text-white bg-blue-700 md:bg-transparent md:text-cyan-700";
  const inactiveClasses =
    "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-cyan-700";

  return (
    <li>
      <a
        href={href}
        className={`${baseClasses} ${
          current ? activeClasses : inactiveClasses
        }`}
        aria-current={current ? "page" : undefined}
      >
        {children}
      </a>
    </li>
  );
};

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white fixed w-full  top-0 start-0 border-b border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="/src/assets/sea-salon-logo.png"
            className="h-10"
            alt="SEA Logo"
          />
        </a>
        <button
          onClick={toggleNavbar}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
          aria-controls="navbar-default"
          aria-expanded={isOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={`${isOpen ? "block" : "hidden"} w-full md:block md:w-auto`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white ">
            <NavLink href="#" current>
              Home
            </NavLink>
            <NavLink href="#">Services</NavLink>
            <NavLink href="#">Locations</NavLink>
            <NavLink href="#">Promo</NavLink>
            <NavLink href="#">Contact</NavLink>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
