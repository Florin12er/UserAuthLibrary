// src/components/RegisterForm.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { InputField } from "../parts/InputField";
import { ErrorMessage } from "../parts/ErrorMessage";
import { SubmitButton } from "../parts/SubmitButton";
import {
  EnvelopeIcon,
  LockClosedIcon,
  UserIcon,
} from "@heroicons/react/24/solid";

interface RegisterFormProps {
  onRegisterSuccess: () => void;
  accent: "indigo" | "blue" | "green" | "red" | "purple" | "zinc";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "mid";
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  onRegisterSuccess,
  accent,
  size = "md",
}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validateUsername = (value: string) => {
    if (value.length < 3) {
      setUsernameError("Username must be at least 3 characters long");
    } else if (value.length > 20) {
      setUsernameError("Username must be no more than 20 characters long");
    } else {
      setUsernameError("");
    }
  };

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = (value: string) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(value)) {
      setPasswordError(
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character",
      );
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate all fields
    validateUsername(username);
    validateEmail(email);
    validatePassword(password);

    // Check if there are any errors
    if (usernameError || emailError || passwordError) {
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await axios.post("http://localhost:8080/register", {
        username,
        email,
        password,
      });
      onRegisterSuccess();
      navigate("/login-form");
    } catch (err) {
      setError("Registration failed. Please try again.");
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
          <UserIcon
            className={`mx-auto h-12 w-auto text-${accent}-600 dark:text-${accent}-400`}
          />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            Or{" "}
            <a
              href="/login-form"
              className={`font-medium text-${accent}-600 hover:text-${accent}-500 dark:text-${accent}-400 dark:hover:text-${accent}-300`}
            >
              sign in to your account
            </a>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <InputField
              id="username"
              label="Username"
              type="text"
              value={username}
              onChange={(value) => {
                setUsername(value);
                validateUsername(value);
              }}
              icon={
                <UserIcon
                  className={`h-5 w-5 text-${accent}-500 dark:text-${accent}-400`}
                  aria-hidden="true"
                />
              }
              accent={accent}
              error={usernameError}
              autoComplete="username"
              minLength={3}
              maxLength={20}
            />

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
              id="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(value) => {
                setPassword(value);
                validatePassword(value);
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
              error={passwordError}
              autoComplete="new-password"
              minLength={8}
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
            />

            <InputField
              id="confirmPassword"
              label="Confirm Password"
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={setConfirmPassword}
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
              autoComplete="new-password"
            />
          </div>

          {error && <ErrorMessage message={error} />}

          <SubmitButton accent={accent} text="Create Account" />
        </form>
      </div>
    </div>
  );
};
