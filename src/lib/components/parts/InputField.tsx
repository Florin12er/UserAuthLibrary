import React, { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

interface InputFieldProps {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  icon: React.ReactNode;
  accent: string;
  showPasswordToggle?: boolean;
  showPassword?: boolean;
  onToggleShowPassword?: () => void;
  error?: string;
  autoComplete?: string;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  type,
  value,
  onChange,
  icon,
  accent,
  showPasswordToggle = false,
  showPassword,
  onToggleShowPassword,
  error,
  autoComplete,
  minLength,
  maxLength,
  pattern,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative mb-4">
      <label
        htmlFor={id}
        className={`absolute left-2 -top-2.5 bg-white dark:bg-gray-800 px-1 text-sm transition-all duration-200 ${
          isFocused
            ? `text-${accent}-600 dark:text-${accent}-400 transform -translate-y-4 scale-75`
            : "hidden"
        }`}
      >
        {label}
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <div
          className={`z-[9999] absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${
            isFocused
              ? `text-${accent}-500 dark:text-${accent}-400`
              : "text-gray-400 dark:text-gray-500"
          }`}
        >
          {icon}
        </div>
        <input
          id={id}
          name={id}
          type={type}
          required
          className={`appearance-none rounded-md relative block w-full pl-10 pr-10 px-3 py-2 border ${
            isFocused
              ? `border-${accent}-500 dark:border-${accent}-400 ring-1 ring-${accent}-500 dark:ring-${accent}-400`
              : error
                ? "border-red-500 dark:border-red-400"
                : "border-gray-300 dark:border-gray-600"
          } placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-${accent}-500 dark:focus:ring-${accent}-400 focus:border-${accent}-500 dark:focus:border-${accent}-400 sm:text-sm transition-all duration-200`}
          placeholder={!isFocused ? label : ""}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          autoComplete={autoComplete}
          minLength={minLength}
          maxLength={maxLength}
          pattern={pattern}
        />
        {showPasswordToggle && (
          <button
            type="button"
            className={`absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 dark:text-gray-500 hover:text-${accent}-500 dark:hover:text-${accent}-400 focus:outline-none`}
            onClick={onToggleShowPassword}
          >
            {showPassword ? (
              <EyeSlashIcon className="h-5 w-5" aria-hidden="true" />
            ) : (
              <EyeIcon className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        )}
      </div>
      {error && (
        <p
          className="mt-1 text-sm text-red-600 dark:text-red-400"
          id={`${id}-error`}
        >
          {error}
        </p>
      )}
    </div>
  );
};
