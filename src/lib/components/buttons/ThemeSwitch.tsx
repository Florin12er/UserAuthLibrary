// src/components/ThemeSwitch.tsx
import React, { useState } from "react";
import {
  SunIcon,
  MoonIcon,
  ComputerDesktopIcon,
} from "@heroicons/react/24/solid";

type Theme = "light" | "dark" | "system";

interface ThemeSwitchProps {
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

export const ThemeSwitch: React.FC<ThemeSwitchProps> = ({
  currentTheme,
  onThemeChange,
  size = "md",
}) => {
  const sizeClasses = {
    xs: "h-6 w-6",
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
    xl: "h-14 w-14",
  };

  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (theme: Theme) => {
    onThemeChange(theme);
    setIsOpen(false);
  };

  const getIconForTheme = (theme: Theme) => {
    switch (theme) {
      case "light":
        return <SunIcon className="h-5 w-5 text-yellow-500" />;
      case "dark":
        return <MoonIcon className="h-5 w-5 text-blue-300" />;
      case "system":
        return <ComputerDesktopIcon className="h-5 w-5 text-gray-400" />;
    }
  };

  return (
    <div className={`relative ${sizeClasses[size]}`}>
      <div
        className="flex items-center justify-center bg-gray-200 dark:bg-gray-600 rounded-full cursor-pointer p-2 transition-colors duration-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        {getIconForTheme(currentTheme)}
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg right-0">
          {(["light", "dark", "system"] as Theme[]).map((theme) => (
            <div
              key={theme}
              className="flex items-center p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => handleSelect(theme)}
            >
              {getIconForTheme(theme)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
