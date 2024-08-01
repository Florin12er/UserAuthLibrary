import React, { useState } from "react";
import axios from "axios";
import { InputField } from "../parts/InputField";
import { ErrorMessage } from "../parts/ErrorMessage";
import { SubmitButton } from "../parts/SubmitButton";
import { EnvelopeIcon } from "@heroicons/react/24/solid";

interface ResetRequestFormProps {
  onSwitchToLogin: () => void;
  onSwitchToResetPassword: () => void;
  onClose: () => void;
  accent: "indigo" | "blue" | "green" | "red" | "purple" | "zinc";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "mid";
}

const ResetRequestForm: React.FC<ResetRequestFormProps> = ({
  onSwitchToLogin,
  onSwitchToResetPassword,
  onClose,
  accent,
  size = "md",
}) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    // Validate email
    validateEmail(email);

    // Check if there are any errors
    if (emailError) {
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/reset-request`,
        { email },
      );
      setMessage(response.data.message);
      onSwitchToResetPassword();
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.error || "Failed to send reset email");
      } else {
        setError("An unexpected error occurred");
      }
    }
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
        <EnvelopeIcon
          className={`mx-auto h-12 w-auto text-${accent}-600 dark:text-${accent}-400`}
        />
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
          Reset Password
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          Enter your email to receive a password reset link
        </p>
      </div>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <InputField
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={(value) => {
              setEmail(value);
              validateEmail(value);
            }}
            icon={
              <EnvelopeIcon
                className={`h-5 w-5 text-${accent}-500 dark:text-${accent}-400`}
                aria-hidden="true"
              />
            }
            accent={accent}
            error={emailError}
            autoComplete="email"
          />
        </div>

        {message && (
          <div
            className="flex items-center justify-center bg-green-100 dark:bg-green-200 border border-green-400 dark:border-green-500 text-green-700 dark:text-green-800 px-4 py-3 rounded relative"
            role="alert"
          >
            <svg
              className="fill-current h-5 w-5 text-green-500 dark:text-green-600 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M10 0C4.5 0 0 4.5 0 10s4.5 10 10 10 10-4.5 10-10S15.5 0 10 0zm1 15H9v-2h2v2zm0-4H9V5h2v6z" />
            </svg>
            <span className="block sm:inline">{message}</span>
          </div>
        )}
        {error && <ErrorMessage message={error} />}

        <SubmitButton accent={accent} text="Send Reset Link" />
      </form>
      <p className="text-center">
        Remember your password?{" "}
        <button
          type="button"
          className={`font-medium text-${accent}-600 hover:text-${accent}-500 dark:text-${accent}-400 dark:hover:text-${accent}-300`}
          onClick={onSwitchToLogin}
        >
          Sign in here
        </button>
      </p>
    </div>
  );
};

export default ResetRequestForm;
