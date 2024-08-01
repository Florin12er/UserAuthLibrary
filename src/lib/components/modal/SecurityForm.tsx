import React, { useState } from "react";
import {
  EyeIcon,
  EyeSlashIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/solid";

interface SecurityFormProps {
  onChangePassword: (passwords: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => void;
  onDeleteAccount: () => void;
  accent: "indigo" | "blue" | "green" | "red" | "purple" | "zinc";
}

const SecurityForm: React.FC<SecurityFormProps> = ({
  onChangePassword,
  onDeleteAccount,
  accent,
}) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showChangePassword, setShowChangePassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onChangePassword({ currentPassword, newPassword, confirmPassword });
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg max-w-2xl mx-auto overflow-hidden">
      <div className="p-8 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Security
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <SecuritySection
            title="Change password"
            isOpen={showChangePassword}
            toggleOpen={() => setShowChangePassword(!showChangePassword)}
          >
            <div className="space-y-4">
              <PasswordField
                label="Current password"
                value={currentPassword}
                onChange={setCurrentPassword}
                accent={accent}
              />
              <PasswordField
                label="New password"
                value={newPassword}
                onChange={setNewPassword}
                accent={accent}
              />
              <PasswordField
                label="Confirm new password"
                value={confirmPassword}
                onChange={setConfirmPassword}
                accent={accent}
              />
            </div>
          </SecuritySection>
        </form>
      </div>
      <div className="px-8 py-6 bg-gray-50 dark:bg-gray-800 flex justify-between items-center">
        <button
          type="submit"
          onClick={handleSubmit}
          className={`px-6 py-3 bg-${accent}-600 text-white rounded-md hover:bg-${accent}-700 focus:outline-none focus:ring-2 focus:ring-${accent}-500 focus:ring-offset-2 dark:bg-${accent}-500 dark:hover:bg-${accent}-600 transition-colors duration-200 text-lg font-semibold`}
        >
          Save changes
        </button>
        <button
          type="button"
          onClick={onDeleteAccount}
          className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-200 text-sm font-semibold"
        >
          Delete account
        </button>
      </div>
    </div>
  );
};

const SecuritySection: React.FC<{
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  toggleOpen: () => void;
}> = ({ title, children, isOpen, toggleOpen }) => (
  <div className="border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden transition-all duration-300 ease-in-out">
    <button
      type="button"
      className="w-full px-6 py-4 text-left flex justify-between items-center bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
      onClick={toggleOpen}
    >
      <span className="font-medium text-gray-900 dark:text-white">{title}</span>
      {isOpen ? (
        <ChevronUpIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
      ) : (
        <ChevronDownIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
      )}
    </button>
    <div
      className={`transition-all duration-300 ease-in-out ${
        isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
      } overflow-hidden`}
    >
      <div className="p-6">{children}</div>
    </div>
  </div>
);

const PasswordField: React.FC<{
  label: string;
  value: string;
  onChange: (value: string) => void;
  accent: string;
}> = ({ label, value, onChange, accent }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label}
      </label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          className={`w-full px-4 py-3 pr-10 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-${accent}-500 focus:border-${accent}-500 dark:bg-gray-800 dark:text-white transition-colors duration-200`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <EyeSlashIcon className="h-5 w-5 text-gray-400" />
          ) : (
            <EyeIcon className="h-5 w-5 text-gray-400" />
          )}
        </button>
      </div>
    </div>
  );
};

export default SecurityForm;
