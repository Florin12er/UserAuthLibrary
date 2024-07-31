import React from "react";

interface RememberMeProps {
  accent: string;
}

export const RememberMe: React.FC<RememberMeProps> = ({ accent }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <input
          id="remember-me"
          name="remember-me"
          type="checkbox"
          className={`h-4 w-4 text-${accent}-600 focus:ring-${accent}-500 border-gray-300 dark:border-gray-600 rounded`}
        />
        <label
          htmlFor="remember-me"
          className="ml-2 block text-sm text-gray-900 dark:text-gray-300"
        >
          Remember me
        </label>
      </div>
      <div className="text-sm">
        <a
          href="#"
          className={`font-medium text-${accent}-600 hover:text-${accent}-500 dark:text-${accent}-400 dark:hover:text-${accent}-300`}
        >
          Forgot your password?
        </a>
      </div>
    </div>
  );
};
