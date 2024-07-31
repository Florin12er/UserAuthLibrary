// src/App.tsx
import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { LoginForm } from "./lib/components/LoginForm/LoginForm";
import { RegisterForm } from "./lib/components/RegisterForm/RegisterForm";
import { ResetRequestForm } from "./lib/components/ResetRequestForm/ResetRequestForm";
import { ResetPasswordForm } from "./lib/components/ResetPasswordForm/ResetPasswordForm";
import { LogoutButton } from "./lib/components/buttons/LogoutButton";
import { ThemeSwitch } from "./lib/components/buttons/ThemeSwitch.tsx";
import "./theme.css"; // Import the themes CSS file

type Theme = "light" | "dark" | "system";

function App() {
  const [token, setToken] = useState<string | null>(null);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [theme, setTheme] = useState<Theme>("system");
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }

    // Apply the theme
    applyTheme(theme);

    // Check for token in URL
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get("token");
    const userFromUrl = urlParams.get("user");

    if (tokenFromUrl && userFromUrl) {
      localStorage.setItem("token", tokenFromUrl);
      localStorage.setItem("user", userFromUrl);
      setToken(tokenFromUrl);
      navigate("/dashboard");
    }
  }, [theme, navigate]);

  const applyTheme = (selectedTheme: Theme) => {
    document.body.classList.remove("light", "dark", "system");
    document.body.classList.add(selectedTheme);

    if (selectedTheme === "system") {
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        document.body.classList.add("dark");
      } else {
        document.body.classList.add("light");
      }
    }
  };

  const handleLoginSuccess = (token: string) => {
    setToken(token);
    localStorage.setItem("token", token);
    navigate("/dashboard");
  };

  const handleRegistrationSuccess = () => {
    setRegistrationSuccess(true);
    navigate("/login-form");
  };

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        {token && (
          <LogoutButton
            onLogout={() => setToken(null)}
            accent="zinc"
            size="md"
          />
        )}
        <div className="w-40">
          <ThemeSwitch
            currentTheme={theme}
            onThemeChange={setTheme}
            size="md"
          />
        </div>
      </div>
      <Routes>
        <Route
          path="/login-form"
          element={
            <LoginForm
              onLoginSuccess={handleLoginSuccess}
              accent="purple"
              size="mid"
              registrationSuccess={registrationSuccess}
              onRegistrationSuccessAcknowledged={() =>
                setRegistrationSuccess(false)
              }
              showGitHubLogin={false}
              showGoogleLogin={false}
            />
          }
        />
        <Route
          path="/register-form"
          element={
            <RegisterForm
              onRegisterSuccess={handleRegistrationSuccess}
              accent="zinc"
              size="mid"
            />
          }
        />
        <Route
          path="/reset-request-form"
          element={<ResetRequestForm accent="zinc" size="mid" />}
        />
        <Route
          path="/reset-password-form"
          element={<ResetPasswordForm accent="zinc" size="mid" />}
        />
      </Routes>
    </>
  );
}

export default App;
