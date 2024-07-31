// src/components/ErrorMessage.tsx
import React from "react";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div
      className="flex items-center justify-center bg-red-100 dark:bg-red-200 border border-red-400 text-red-700 dark:text-red-800 px-4 py-3 rounded relative"
      role="alert"
    >
      <ExclamationCircleIcon
        className="h-5 w-5 text-red-500 dark:text-red-600 mr-2"
        aria-hidden="true"
      />
      <span className="block sm:inline">{message}</span>
    </div>
  );
};
