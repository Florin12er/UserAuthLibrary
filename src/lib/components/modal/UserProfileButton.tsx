import React, { useState, useRef, useEffect } from "react";

interface UserProfileButtonProps {
  username: string;
  email: string; // Add email prop
  onLogout: () => void;
  onManageAccount: () => void;
  accent: string;
}

const UserProfileButton: React.FC<UserProfileButtonProps> = ({
  username,
  email, // Add email prop
  onLogout,
  onManageAccount,
  accent,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 bg-${accent}-500 hover:bg-${accent}-600 text-white px-4 py-2 rounded-full focus:outline-none transition duration-300 ease-in-out`}
      >
        <img
          src="https://via.placeholder.com/40"
          alt="Profile"
          className="w-8 h-8 rounded-full"
        />
        <span>{username}</span>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-md shadow-lg py-4 z-10">
          <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {username}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{email}</p>
          </div>
          <button
            onClick={onManageAccount}
            className={`block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-${accent}-100 dark:hover:bg-${accent}-900 transition duration-300 ease-in-out`}
          >
            Manage Account
          </button>
          <button
            onClick={onLogout}
            className={`block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-${accent}-100 dark:hover:bg-${accent}-900 transition duration-300 ease-in-out`}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfileButton;
