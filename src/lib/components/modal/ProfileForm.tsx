import React, { useState } from "react";
import {
  PlusIcon,
  EllipsisVerticalIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/solid";
interface ProfileFormProps {
  onSave: (profile: {
    firstName: string;
    lastName: string;
    username: string;
  }) => void;
  onRemoveEmail: () => void;
  onAddEmail: () => void;
  accent: "indigo" | "blue" | "green" | "red" | "purple" | "zinc";
  email: string;
}
const ProfileForm: React.FC<ProfileFormProps> = ({
  onSave,
  onRemoveEmail,
  onAddEmail,
  accent,
  email,
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [showFullName, setShowFullName] = useState(false);
  const [showUsername, setShowUsername] = useState(false);
  const [showEmailMenu, setShowEmailMenu] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ firstName, lastName, username });
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl max-w-2xl mx-auto overflow-hidden">
      <div className="p-8 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Profile
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <ProfileSection
            title="Full name"
            isOpen={showFullName}
            toggleOpen={() => setShowFullName(!showFullName)}
          >
            <div className="grid grid-cols-2 gap-4">
              <InputField
                label="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                accent={accent}
              />
              <InputField
                label="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                accent={accent}
              />
            </div>
          </ProfileSection>

          <ProfileSection
            title="Username"
            isOpen={showUsername}
            toggleOpen={() => setShowUsername(!showUsername)}
          >
            <InputField
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              accent={accent}
            />
          </ProfileSection>

          <ProfileSection title="Email address" alwaysOpen>
            <div className="flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-300">{email}</span>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  className={`p-2 rounded-full bg-${accent}-100 text-${accent}-600 hover:bg-${accent}-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-${accent}-500 focus:ring-offset-2`}
                  onClick={onAddEmail}
                >
                  <PlusIcon className="w-5 h-5" />
                </button>
                <div className="relative">
                  <button
                    type="button"
                    className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    onClick={() => setShowEmailMenu(!showEmailMenu)}
                  >
                    <EllipsisVerticalIcon className="w-5 h-5" />
                  </button>
                  {showEmailMenu && (
                    <div className="absolute bottom-[20px] right-12 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700">
                      <button
                        type="button"
                        className="block w-full z-[9999] text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                        onClick={() => {
                          onRemoveEmail();
                          setShowEmailMenu(false);
                        }}
                      >
                        Remove email
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </ProfileSection>
        </form>
      </div>
      <div className="px-8 py-6 bg-gray-50 dark:bg-gray-800">
        <button
          type="submit"
          onClick={handleSubmit}
          className={`w-full px-6 py-3 bg-${accent}-600 text-white rounded-md hover:bg-${accent}-700 focus:outline-none focus:ring-2 focus:ring-${accent}-500 focus:ring-offset-2 dark:bg-${accent}-500 dark:hover:bg-${accent}-600 transition-all duration-200 text-lg font-semibold transform hover:scale-105`}
        >
          Save changes
        </button>
      </div>
    </div>
  );
};

const ProfileSection: React.FC<{
  title: string;
  children: React.ReactNode;
  isOpen?: boolean;
  toggleOpen?: () => void;
  alwaysOpen?: boolean;
}> = ({ title, children, isOpen, toggleOpen, alwaysOpen }) => (
  <div className="border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden transition-all duration-300 ease-in-out shadow-sm hover:shadow-md">
    <button
      type="button"
      className="w-full px-6 py-4 text-left flex justify-between items-center bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
      onClick={toggleOpen}
      disabled={alwaysOpen}
    >
      <span className="font-medium text-gray-900 dark:text-white">{title}</span>
      {!alwaysOpen &&
        (isOpen ? (
          <ChevronUpIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        ) : (
          <ChevronDownIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        ))}
    </button>
    <div
      className={`transition-all duration-300 ease-in-out ${
        isOpen || alwaysOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
      } overflow-hidden`}
    >
      <div className="p-6">{children}</div>
    </div>
  </div>
);

const InputField: React.FC<{
  label?: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  accent: string;
}> = ({ label, type = "text", value, onChange, accent }) => (
  <div>
    {label && (
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label}
      </label>
    )}
    <input
      type={type}
      className={`w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-${accent}-500 focus:border-${accent}-500 dark:bg-gray-800 dark:text-white transition-all duration-200 hover:border-${accent}-300`}
      value={value}
      onChange={onChange}
    />
  </div>
);

export default ProfileForm;
