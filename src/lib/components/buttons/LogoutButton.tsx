// src/components/LogoutButton.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUturnRightIcon } from "@heroicons/react/24/solid";

interface LogoutButtonProps {
  accent: "indigo" | "blue" | "green" | "red" | "purple" | "zinc";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  onLogout?: () => void;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({
  accent,
  size = "md",
  onLogout,
}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear tokens from local storage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // Call the onLogout prop if provided
    if (onLogout) {
      onLogout();
    }
    // Redirect to login page
    navigate("/login-form");
  };

  const sizeClasses = {
    xs: "px-2 py-1 text-xs",
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-2.5 text-base",
    xl: "px-6 py-3 text-lg",
  };

  return (
    <button
      onClick={handleLogout}
      className={`${sizeClasses[size]} 
        flex items-center justify-center 
        border border-transparent rounded-md 
        shadow-md font-medium text-white 
        bg-${accent}-600 hover:bg-${accent}-700 
        dark:bg-${accent}-500 dark:hover:bg-${accent}-600 
        focus:outline-none focus:ring-2 focus:ring-offset-2 
        focus:ring-${accent}-500 dark:focus:ring-offset-gray-800 
        dark:focus:ring-${accent}-400 transition-colors duration-200
        transform hover:scale-105`}
    >
      <ArrowUturnRightIcon className="h-5 w-5 mr-2" aria-hidden="true" />
      Logout
    </button>
  );
};
