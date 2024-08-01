import { useEffect, useState } from "react";
import Modal from "./Modal";
import ResetPasswordForm from "./ResetPassword";
import ProfileForm from "./ProfileForm";
import SecurityForm from "./SecurityForm";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import ResetRequestForm from "./ResetRequestForm";
import UserProfileButton from "./UserProfileButton";

interface AuthModalProps {
  accent: "indigo" | "blue" | "green" | "red" | "purple" | "zinc";
  size: "xs" | "sm" | "md" | "lg" | "xl" | "mid";
  buttonLabel: string;
  showGitHubLogin?: boolean;
  showGoogleLogin?: boolean;
  apiUrl?: string;
}

interface Passwords {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  accent,
  size,
  buttonLabel,
  showGitHubLogin = false,
  showGoogleLogin = false,
  apiUrl = "http://localhost:8080/login",
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentForm, setCurrentForm] = useState<string>("login");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [activeTab, setActiveTab] = useState<"profile" | "security">("profile");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      setUsername("User");
      setEmail("user@example.com");
    }
  }, []);

  const handleLoginSuccess = (token: string) => {
    console.log("Login successful. Token:", token);
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
    setUsername("User");
    setEmail("user@example.com");
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUsername("");
    setEmail("");
  };

  const handleManageAccount = () => {
    setCurrentForm("manageAccount");
    setIsModalOpen(true);
  };

  const handleRegisterSuccess = () => {
    console.log("Registration successful");
    setRegistrationSuccess(true);
    setCurrentForm("login");
  };

  const handleSwitchForm = (form: string) => {
    setCurrentForm(form);
  };

  const handleSaveProfile = (profile: {
    firstName: string;
    lastName: string;
    username: string;
  }) => {
    console.log("Profile saved:", profile);
    // Implement save logic here
    // If you need to update the email, you can do it separately
    // setEmail(newEmail); // Uncomment and implement if needed
  };

  const handleRemoveEmail = () => {
    console.log("Email removed");
    // Implement remove email logic here
  };

  const handleAddEmail = () => {
    console.log("Add email");
    // Implement add email logic here
  };

  const handleChangePassword = (passwords: Passwords) => {
    console.log("Password changed:", passwords);
    // Implement change password logic here
  };

  const handleDeleteAccount = () => {
    console.log("Account deleted");
    // Implement delete account logic here
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setCurrentForm("login"), 300); // Delay resetting the form
  };

  const handleRegistrationSuccessAcknowledged = () => {
    setRegistrationSuccess(false);
  };

  return (
    <div className="relative">
      <div className="absolute top-4 right-4">
        {isLoggedIn ? (
          <UserProfileButton
            username={username}
            email={email}
            onLogout={handleLogout}
            onManageAccount={handleManageAccount}
            accent={accent}
          />
        ) : (
          <button
            className={`bg-${accent}-500 hover:bg-${accent}-600 text-white py-2 px-4 rounded transition duration-300 ease-in-out`}
            onClick={() => setIsModalOpen(true)}
          >
            {buttonLabel}
          </button>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {currentForm === "login" && (
          <LoginForm
            onLoginSuccess={handleLoginSuccess}
            onSwitchToRegister={() => handleSwitchForm("register")}
            onSwitchToResetRequest={() => handleSwitchForm("resetRequest")}
            onClose={handleCloseModal}
            showGitHubLogin={showGitHubLogin}
            showGoogleLogin={showGoogleLogin}
            accent={accent}
            size={size}
            registrationSuccess={registrationSuccess}
            onRegistrationSuccessAcknowledged={
              handleRegistrationSuccessAcknowledged
            }
            apiUrl={apiUrl}
          />
        )}
        {currentForm === "register" && (
          <RegisterForm
            onRegisterSuccess={handleRegisterSuccess}
            onSwitchToLogin={() => handleSwitchForm("login")}
            onClose={handleCloseModal}
            accent={accent}
            size={size}
          />
        )}
        {currentForm === "resetRequest" && (
          <ResetRequestForm
            onSwitchToLogin={() => handleSwitchForm("login")}
            onSwitchToResetPassword={() => handleSwitchForm("resetPassword")}
            onClose={handleCloseModal}
            accent={accent}
            size={size}
          />
        )}
        {currentForm === "resetPassword" && (
          <ResetPasswordForm
            onSwitchToLogin={() => handleSwitchForm("login")}
            onClose={handleCloseModal}
            accent={accent}
            size={size}
          />
        )}
        {currentForm === "manageAccount" && (
          <div className="bg-gray-100 dark:bg-gray-900 p-6 rounded-lg">
            <div className="flex justify-between items-center mb-6">
              <div className="flex space-x-4">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`px-4 py-2 rounded-md ${
                    activeTab === "profile"
                      ? `bg-${accent}-100 text-${accent}-700 dark:bg-${accent}-900 dark:text-${accent}-100`
                      : "bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                  }`}
                >
                  Profile
                </button>
                <button
                  onClick={() => setActiveTab("security")}
                  className={`px-4 py-2 rounded-md ${
                    activeTab === "security"
                      ? `bg-${accent}-100 text-${accent}-700 dark:bg-${accent}-900 dark:text-${accent}-100`
                      : "bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                  }`}
                >
                  Security
                </button>
              </div>
              <button
                onClick={handleCloseModal}
                className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
              >
                &times;
              </button>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              {activeTab === "profile" && (
                <ProfileForm
                  onSave={handleSaveProfile}
                  onRemoveEmail={handleRemoveEmail}
                  onAddEmail={handleAddEmail}
                  email={email}
                  accent={accent}
                />
              )}
              {activeTab === "security" && (
                <SecurityForm
                  onChangePassword={handleChangePassword}
                  onDeleteAccount={handleDeleteAccount}
                  accent={accent}
                />
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
