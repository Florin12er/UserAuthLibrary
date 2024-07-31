// src/index.d.ts
import React from "react";

export interface ThemeSwitchProps {
  currentTheme: string;
  onThemeChange: (theme: string) => void;
}

export interface LoginFormProps {
  onLoginSuccess: (token: string) => void;
  accent: "indigo" | "blue" | "green" | "red" | "purple" | "zinc";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "mid";
}

export interface RegisterFormProps {
  onRegisterSuccess: () => void;
  accent: "indigo" | "blue" | "green" | "red" | "purple" | "zinc";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "mid";
}

export const ThemeSwitch: React.FC<ThemeSwitchProps>;
export const LoginForm: React.FC<LoginFormProps>;
export const RegisterForm: React.FC<RegisterFormProps>;
