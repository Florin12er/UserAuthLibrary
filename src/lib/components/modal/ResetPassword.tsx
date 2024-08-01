import React, { useState } from "react";
import axios from "axios";
import { InputField } from "../parts/InputField";
import { ErrorMessage } from "../parts/ErrorMessage";
import { SubmitButton } from "../parts/SubmitButton";
import {
  EnvelopeIcon,
  KeyIcon,
  LockClosedIcon,
} from "@heroicons/react/24/solid";

interface ResetPasswordFormProps {
  onSwitchToLogin: () => void;
  onClose: () => void;
  accent: "indigo" | "blue" | "green" | "red" | "purple" | "zinc";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "mid";
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
  onSwitchToLogin,
  onClose,
  accent,
  size = "md",
}) => {
  const [email, setEmail] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [resetCodeError, setResetCodeError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const validateResetCode = (value: string) => {
    if (value.length === 0) {
      setResetCodeError("Reset code is required");
    } else {
      setResetCodeError("");
    }
  };

  const validateNewPassword = (value: string) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
    if (!passwordRegex.test(value)) {
      setNewPasswordError(
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character",
      );
    } else {
      setNewPasswordError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    // Validate all fields
    validateEmail(email);
    validateResetCode(resetCode);
    validateNewPassword(newPassword);

    // Check if there are any errors
    if (emailError || resetCodeError || newPasswordError) {
      return;
    }

    console.log("Submitting data:", {
      email,
      reset_code: resetCode,
      new_password: newPassword,
    });

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/reset-password`,
        {
          email,
          reset_code: resetCode,
          new_password: newPassword,
        },
      );
      setMessage(response.data.message);
      onSwitchToLogin();
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.error || "Failed to reset password");
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
        <LockClosedIcon
          className={`mx-auto h-12 w-auto text-${accent}-600 dark:text-${accent}-400`}
        />
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
          Reset Your Password
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          Enter your email, reset code, and new password
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
            icon={<EnvelopeIcon className="h-5 w-5" aria-hidden="true" />}
            accent={accent}
            error={emailError}
            autoComplete="email"
          />
          <InputField
            id="resetCode"
            label="Reset Code"
            type="text"
            value={resetCode}
            onChange={(value) => {
              setResetCode(value);
              validateResetCode(value);
            }}
            icon={<KeyIcon className="h-5 w-5" aria-hidden="true" />}
            accent={accent}
            error={resetCodeError}
          />
          <InputField
            id="newPassword"
            label="New Password"
            type={showPassword ? "text" : "password"}
            value={newPassword}
            onChange={(value) => {
              setNewPassword(value);
              validateNewPassword(value);
            }}
            icon={<LockClosedIcon className="h-5 w-5" aria-hidden="true" />}
            accent={accent}
            showPasswordToggle={true}
            showPassword={showPassword}
            onToggleShowPassword={() => setShowPassword(!showPassword)}
            error={newPasswordError}
            autoComplete="new-password"
            minLength={8}
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

        <SubmitButton accent={accent} text="Reset Password" />
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

export default ResetPasswordForm;
