import React, { ReactNode } from "react";
import Breadcrumb from "./Breadcrumb";

interface BreadcrumbItem {
  label: string;
  path: string;
}

interface FormLayoutProps {
  title: string;
  breadcrumbItems: BreadcrumbItem[];
  onSubmit: (e: React.FormEvent) => void;
  submitButtonText: string;
  children: ReactNode;
}

const FormLayout: React.FC<FormLayoutProps> = ({
  title,
  breadcrumbItems,
  onSubmit,
  submitButtonText,
  children,
}) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <Breadcrumb items={breadcrumbItems} />
      <div className="w-full">
        <div className="bg-white border border-gray-200 rounded-lg shadow p-6 md:p-8">
          <form onSubmit={onSubmit} className="space-y-6">
            <h5 className="text-2xl font-medium text-gray-900 mb-6">
              {title}
            </h5>
            <div className="space-y-6">
              {children}
            </div>
            <div className="mt-8">
              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                {submitButtonText}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormLayout;