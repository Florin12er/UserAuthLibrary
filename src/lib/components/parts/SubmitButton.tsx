import React from "react";

interface SubmitButtonProps {
  accent: string;
  text: string;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({ accent, text }) => {
  return (
    <button
      type="submit"
      className={`
        group relative w-full flex justify-center py-2 px-4 border border-transparent 
        text-sm font-medium rounded-md text-white 
        bg-${accent}-600 hover:bg-${accent}-700 
        dark:bg-${accent}-500 dark:hover:bg-${accent}-600
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${accent}-500
        dark:focus:ring-offset-gray-800 dark:focus:ring-${accent}-400
        transition-colors duration-200
      `}
    >
      {text}
    </button>
  );
};
