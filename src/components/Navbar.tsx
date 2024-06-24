import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

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
  const baseClasses = "block py-2 px-3 md:p-0";
  const activeClasses =
    "text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700";
  const inactiveClasses =
    "text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700";

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
  const { user, logout } = useAuth();
  const [showAuthForm,setShowAuthForm] = useState<'login' | 'register' | null>(null);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };


  const handleAuthClick = () => {
    setShowAuthForm('login');
  }
 
  const handleCloseAuthForm = () => {
    setShowAuthForm(null);
  };

  return (
    <>
      <nav className="bg-white border-gray-200">
        <div className="flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="/src/assets/sea-salon-logo.png"
              className="h-8"
              alt="SEA Salon Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap">
              SEA Salon
            </span>
          </a>
          <div className="flex md:order-2 items-center">
            {user ? (
              <button
                onClick={logout}
                className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center w-full md:w-auto"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={handleAuthClick}
                className="text-white bg-cyan-700 hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center w-full md:w-auto"
              >
                Login
              </button>
            )}
            <button
              onClick={toggleNavbar}
              type="button"
              className="inline-flex items-center p-2 ml-3 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              aria-controls="navbar-cta"
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
          </div>
          <div
            className={`items-center justify-between ${
              isOpen ? "block" : "hidden"
            } w-full md:flex md:w-auto md:order-1`}
            id="navbar-cta"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
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
      {showAuthForm === 'login' && <LoginForm onClose={handleCloseAuthForm} />}
      {showAuthForm === 'register' && <RegisterForm onClose={handleCloseAuthForm} switchToLogin={()=> setShowAuthForm('login')} />}
    </>
  );
};

export default Navbar;
