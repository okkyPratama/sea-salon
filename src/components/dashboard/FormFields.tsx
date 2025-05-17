import React, { ReactNode } from 'react';

interface FormFieldProps {
  label: string;
  id: string;
  children: ReactNode;
}

const FormField: React.FC<FormFieldProps> = ({ label, id, children }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
      <label htmlFor={id} className="block text-sm font-medium text-gray-900 md:col-span-2">
        {label}
      </label>
      <div className="md:col-span-10">
        {children}
      </div>
    </div>
  );
};

export default FormField;