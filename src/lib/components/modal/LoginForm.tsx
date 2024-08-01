import React, { useState, useEffect } from "react";
import axios from "axios";
import { InputField } from "../parts/InputField";
import { ErrorMessage } from "../parts/ErrorMessage";
import { SubmitButton } from "../parts/SubmitButton";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import { GoogleLoginButton } from "../buttons/GoogleButton";
import { GitHubLoginButton } from "../buttons/GithubButton";

interface LoginFormProps {
  onLoginSuccess: (token: string) => void;
  onSwitchToRegister: () => void;
  onSwitchToResetRequest: () => void;
  onClose: () => void;
  accent: "indigo" | "blue" | "green" | "red" | "purple" | "zinc";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "mid";
  registrationSuccess?: boolean;
  onRegistrationSuccessAcknowledged?: () => void;
  showGitHubLogin?: boolean;
  showGoogleLogin?: boolean;
  apiUrl?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onLoginSuccess,
  onSwitchToRegister,
  onSwitchToResetRequest,
  onClose,
  accent,
  size = "md",
  registrationSuccess = false,
  onRegistrationSuccessAcknowledged,
  showGitHubLogin = false,
  showGoogleLogin = false,
  apiUrl = "http://localhost:8080/login",
}) => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailOrUsernameError, setEmailOrUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);

    // Validate all fields
    validateEmailOrUsername(emailOrUsername);
    validatePassword(password);

    // Check if there are any errors
    if (emailOrUsernameError || passwordError) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(apiUrl, {
        email_or_username: emailOrUsername,
        password,
      });
      onLoginSuccess(response.data.token);
    } catch (err) {
      setError("Invalid credentials or account is locked.");
    } finally {
      setIsLoading(false);
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
          Sign in to your account
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          Or{" "}
          <button
            type="button"
            className={`font-medium text-${accent}-600 hover:text-${accent}-500 dark:text-${accent}-400 dark:hover:text-${accent}-300`}
            onClick={onSwitchToRegister}
          >
            create a new account
          </button>
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
        {error && <ErrorMessage message={error} />}

        <SubmitButton accent={accent} text="Sign in" isLoading={isLoading} />

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
      </form>
      <p className="text-center">
        Forgot your password?{" "}
        <button
          type="button"
          className={`text-${accent}-600 hover:text-${accent}-500 dark:text-${accent}-400 dark:hover:text-${accent}-300`}
          onClick={onSwitchToResetRequest}
        >
          Reset here
        </button>
      </p>
    </div>
  );
};

export default LoginForm;
