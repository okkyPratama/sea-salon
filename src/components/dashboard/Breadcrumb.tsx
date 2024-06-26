import React from "react";
import { Link } from "react-router-dom";

interface BreadcrumbItem {
    label: string;
    path: string;
  }
  
  interface BreadcrumbProps {
    items: BreadcrumbItem[];
  }


  const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
    return (
    <div>
      <ol className="flex items-center whitespace-nowrap mb-2">
      {items.map((item, index) => (
          <li key={index} className="inline-flex items-center">
            {index < items.length - 1 ? (
              <>
                <Link
                  className="flex items-center text-sm text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600"
                  to={item.path}
                >
                  {item.label}
                </Link>
                <svg
                  className="flex-shrink-0 mx-2 overflow-visible size-4 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6"></path>
                </svg>
              </>
            ) : (
              <span className="text-sm font-semibold text-gray-800 truncate">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Breadcrumb;
