import React, { useState } from "react";

interface RegisterFormProps {
  onRegisterSuccess: () => void;
  onSwitchToLogin: () => void;
  onClose: () => void;
  accent: "indigo" | "blue" | "green" | "red" | "purple" | "zinc";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "mid";
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  onRegisterSuccess,
  onSwitchToLogin,
  onClose,
  accent,
  size = "md",
}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add validation logic here
    onRegisterSuccess();
  };

  const sizeClasses = {
    mid: "max-w-[27rem]",
    xs: "max-w-xs",
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
  };

  return (
    <div
      className={`relative ${sizeClasses[size]} w-full bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg space-y-8`}
    >
      <button
        className="absolute top-2 right-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
        onClick={onClose}
      >
        &times;
      </button>
      <div className="text-center">
        <h2
          className={`mt-6 text-3xl font-extrabold text-gray-900 dark:text-white`}
        >
          Create your account
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          Already have an account?{" "}
          <button
            type="button"
            className={`font-medium text-${accent}-600 hover:text-${accent}-500 dark:text-${accent}-400 dark:hover:text-${accent}-300`}
            onClick={onSwitchToLogin}
          >
            Sign in here
          </button>
        </p>
      </div>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-300">
              Username
            </label>
            <input
              type="text"
              className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-300`}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-300`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-300`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300">
              Confirm Password
            </label>
            <input
              type="password"
              className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-300`}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className={`w-full bg-${accent}-500 text-white py-2 rounded hover:bg-${accent}-600 dark:bg-${accent}-400 dark:hover:bg-${accent}-500`}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
