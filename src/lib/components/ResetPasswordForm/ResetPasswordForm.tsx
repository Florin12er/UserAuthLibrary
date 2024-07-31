// src/components/ResetPasswordForm.tsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { InputField } from "../parts/InputField";
import { ErrorMessage } from "../parts/ErrorMessage";
import { SubmitButton } from "../parts/SubmitButton";
import {
  EnvelopeIcon,
  KeyIcon,
  LockClosedIcon,
} from "@heroicons/react/24/solid";

interface ResetPasswordFormProps {
  accent: "indigo" | "blue" | "green" | "red" | "purple" | "zinc";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "mid";
}

export const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
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
  const navigate = useNavigate();

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
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
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

    try {
      const response = await axios.post(
        `${process.env.VITE_API_URL}/reset-password`,
        {
          email,
          reset_code: resetCode,
          new_password: newPassword,
        },
      );
      setMessage(response.data.message);
      navigate("/login-form"); // Redirect to login page after successful password reset
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div
        className={`${sizeClasses[size]} w-full bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg space-y-8`}
      >
        <div className="text-center">
          <LockClosedIcon
            className={`mx-auto h-12 w-auto text-${accent}-600 dark:text-${accent}-400`}
          />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
            Reset your password
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            Enter your email address, reset code, and new password.
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
            <InputField
              id="resetCode"
              label="Reset Code"
              type="text"
              value={resetCode}
              onChange={(value) => {
                setResetCode(value);
                validateResetCode(value);
              }}
              icon={
                <KeyIcon
                  className={`h-5 w-5 text-${accent}-500 dark:text-${accent}-400`}
                  aria-hidden="true"
                />
              }
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
              icon={
                <LockClosedIcon
                  className={`h-5 w-5 text-${accent}-500 dark:text-${accent}-400`}
                  aria-hidden="true"
                />
              }
              accent={accent}
              showPasswordToggle
              showPassword={showPassword}
              onToggleShowPassword={() => setShowPassword(!showPassword)}
              error={newPasswordError}
              autoComplete="new-password"
              minLength={8}
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
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
      </div>
    </div>
  );
};
