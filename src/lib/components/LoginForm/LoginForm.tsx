// src/components/LoginForm.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { InputField } from "../parts/InputField";
import { ErrorMessage } from "../parts/ErrorMessage";
import { SubmitButton } from "../parts/SubmitButton";
import { RememberMe } from "./RememberMe";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import { GitHubLoginButton } from "../buttons/GithubButton";
import { GoogleLoginButton } from "../buttons/GoogleButton";

interface LoginFormProps {
  onLoginSuccess: (token: string) => void;
  accent: "indigo" | "blue" | "green" | "red" | "purple" | "zinc";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "mid";
  registrationSuccess?: boolean;
  onRegistrationSuccessAcknowledged?: () => void;
  showGitHubLogin?: boolean;
  showGoogleLogin?: boolean;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onLoginSuccess,
  accent,
  size = "md",
  registrationSuccess = false,
  onRegistrationSuccessAcknowledged,
  showGitHubLogin = false,
  showGoogleLogin = false,
}) => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailOrUsernameError, setEmailOrUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (registrationSuccess) {
      alert("Registration successful! Please log in.");
      if (onRegistrationSuccessAcknowledged) {
        onRegistrationSuccessAcknowledged();
      }
    }
  }, [registrationSuccess, onRegistrationSuccessAcknowledged]);

  const validateEmailOrUsername = (value: string) => {
    if (value.length === 0) {
      setEmailOrUsernameError("Email or Username is required");
    } else {
      setEmailOrUsernameError("");
    }
  };

  const validatePassword = (value: string) => {
    if (value.length === 0) {
      setPasswordError("Password is required");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate all fields
    validateEmailOrUsername(emailOrUsername);
    validatePassword(password);

    // Check if there are any errors
    if (emailOrUsernameError || passwordError) {
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/login", {
        email_or_username: emailOrUsername,
        password,
      });
      onLoginSuccess(response.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid credentials or account is locked.");
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
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div
        className={`${sizeClasses[size]} w-full bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg space-y-8`}
      >
        <div className="text-center">
          <LockClosedIcon
            className={`mx-auto h-12 w-auto text-${accent}-600 dark:text-${accent}-400`}
          />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            Or{" "}
            <a
              href="/register-form"
              className={`font-medium text-${accent}-600 hover:text-${accent}-500 dark:text-${accent}-400 dark:hover:text-${accent}-300`}
            >
              create a new account
            </a>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <InputField
              id="emailOrUsername"
              label="Email or Username"
              type="text"
              value={emailOrUsername}
              onChange={(value) => {
                setEmailOrUsername(value);
                validateEmailOrUsername(value);
              }}
              icon={
                <EnvelopeIcon
                  className={`h-5 w-5 text-${accent}-500 dark:text-${accent}-400`}
                  aria-hidden="true"
                />
              }
              accent={accent}
              error={emailOrUsernameError}
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
            />
          </div>

          <RememberMe accent={accent} />

          {error && <ErrorMessage message={error} />}

          <SubmitButton accent={accent} text="Sign in" />
        </form>

        {(showGitHubLogin || showGoogleLogin) && (
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                  Or continue with
                </span>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-3">
              {showGoogleLogin && <GoogleLoginButton />}
              {showGitHubLogin && <GitHubLoginButton />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
