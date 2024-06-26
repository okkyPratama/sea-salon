import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, toggleSidebar }) => {
  const { user } = useAuth();
  return (
    <>
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } bg-gray-800 sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-800">
          <button
            onClick={toggleSidebar}
            className="absolute top-4 right-4 p-2 text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <span className="sr-only">Close sidebar</span>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
          <div className="flex items-center mb-5 flex-col">
            <img
              src="/src/assets/sea-salon-logo-bgremove.png"
              className="h-28 sm:h-24"
              alt="Logo"
            />
            <p className="text-white"> {user?.fullname} </p>
            <p className="text-white font-bold">{user?.role}</p>
          </div>
          <ul className="space-y-2 font-medium">
            {user?.role === "Customer" && (
              <li>
                <NavLink
                  to="/dashboard/reservations"
                  className={({ isActive }) =>
                    `flex items-center p-2 text-white rounded-lg hover:bg-gray-700 group ${
                      isActive ? 'bg-gray-700' : ''
                    }`
                  }
                >
                  <svg
                    className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M17 2h-1V1a1 1 0 00-2 0v1H6V1a1 1 0 00-2 0v1H3a3 3 0 00-3 3v12a3 3 0 003 3h14a3 3 0 003-3V5a3 3 0 00-3-3zm1 15a1 1 0 01-1 1H3a1 1 0 01-1-1v-7h16v7zm0-9H2V5a1 1 0 011-1h1v1a1 1 0 002 0V4h8v1a1 1 0 002 0V4h1a1 1 0 011 1v3z" />
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    Reservations
                  </span>
                </NavLink>
              </li>
            )}

            {user?.role === "Admin" && (
              <>
                <li>
                <NavLink
                  to="/dashboard/services"
                  className={({ isActive }) =>
                    `flex items-center p-2 text-white rounded-lg hover:bg-gray-700 group ${
                      isActive ? 'bg-gray-700' : ''
                    }`
                  }
                >
                  <svg
                      className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 group-hover:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M6 20L18 6M6 6l12 14" />
                      <circle cx="6" cy="6" r="2" />
                      <circle cx="18" cy="18" r="2" />
                      <path d="M20 4v6h-6" />
                    </svg>
                    <span className="flex-1 ms-3 whitespace-nowrap">
                      Services
                    </span>

                </NavLink>
                </li>
                <li>
                <NavLink
                  to="/dashboard/branch"
                  className={({ isActive }) =>
                    `flex items-center p-2 text-white rounded-lg hover:bg-gray-700 group ${
                      isActive ? 'bg-gray-700' : ''
                    }`
                  }
                >
                    <svg
                      className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 group-hover:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17 2H7C5.9 2 5 2.9 5 4V22H19V4C19 2.9 18.1 2 17 2ZM10 20H8V18H10V20ZM10 16H8V14H10V16ZM10 12H8V10H10V12ZM10 8H8V6H10V8ZM16 20H14V18H16V20ZM16 16H14V14H16V16ZM16 12H14V10H16V12ZM16 8H14V6H16V8ZM7 4H17V2L7 2V4Z" />
                    </svg>
                    <span className="flex-1 ms-3 whitespace-nowrap">
                      Branch
                    </span>
                </NavLink>

                </li>
              </>
            )}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
