import React, { useState, useRef } from "react";
import axios from "axios";
import { InputField } from "../parts/InputField";
import { ErrorMessage } from "../parts/ErrorMessage";
import { SubmitButton } from "../parts/SubmitButton";
import {
  EnvelopeIcon,
  LockClosedIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import Turnstile from "react-turnstile";

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
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const turnstileRef = useRef<Turnstile>(null);

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
    const hasMinLen = value.length >= 8;
    const hasUpper = /[A-Z]/.test(value);
    const hasLower = /[a-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSpecial = /[!@#~$%^&*(),.?":{}|<>]/.test(value);

    if (!(hasMinLen && hasUpper && hasLower && hasNumber && hasSpecial)) {
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

    if (!captchaToken) {
      setError("Please complete the CAPTCHA.");
      return;
    }

    try {
      await axios.post("http://localhost:8080/register", {
        username,
        email,
        password,
        "cf-turnstile-response": captchaToken,
      });
      onRegisterSuccess();
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError("Registration failed. Please try again.");
      }
      // Reset the CAPTCHA
      if (turnstileRef.current) {
        turnstileRef.current.reset();
      }
    }
  };

  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
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
        <UserIcon
          className={`mx-auto h-12 w-auto text-${accent}-600 dark:text-${accent}-400`}
        />
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
          Create your account
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          Or{" "}
          <button
            type="button"
            className={`font-medium text-${accent}-600 hover:text-${accent}-500 dark:text-${accent}-400 dark:hover:text-${accent}-300`}
            onClick={onSwitchToLogin}
          >
            sign in to your account
          </button>
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

        <div className="mt-6">
          <Turnstile
            ref={turnstileRef}
            sitekey={import.meta.env.VITE_CLOUDFLARE_TURNSTILE_SITE_KEY || ""}
            onVerify={handleCaptchaChange}
          />
        </div>

        {error && <ErrorMessage message={error} />}

        <SubmitButton accent={accent} text="Create Account" />
      </form>
    </div>
  );
};

export default RegisterForm;
