Certainly! Below is the `README.md` content formatted in Markdown:

```markdown
# User Auth UI Library

A reusable UI library for user authentication built with React and Tailwind CSS.

## Installation

To install the library, run:

```bash
npm install user-auth-ui-library
```

## Components

### 1. ThemeSwitch

A component for toggling between themes.

#### Props

| Prop          | Type     | Description                   |
|---------------|----------|-------------------------------|
| `currentTheme` | `string` | The current theme (e.g., "light" or "dark"). |
| `onThemeChange` | `(theme: string) => void` | Callback function to handle theme changes. |

#### Example

```jsx
import { ThemeSwitch } from "user-auth-ui-library";

function App() {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeSwitch 
      currentTheme={theme} 
      onThemeChange={setTheme} 
    />
  );
}
```

---

### 2. LoginForm

A form component for user login.

#### Props

| Prop              | Type                                     | Description                              |
|-------------------|------------------------------------------|------------------------------------------|
| `onLoginSuccess`  | `(token: string) => void`                | Callback function to handle successful login. |
| `accent`          | `"indigo" \| "blue" \| "green" \| "red" \| "purple" \| "zinc"` | Accent color for the button and styles. |
| `size`            | `"xs" \| "sm" \| "md" \| "lg" \| "xl" \| "mid"` | Size of the form. Default is "md".     |

#### Example

```jsx
import { LoginForm } from "user-auth-ui-library";

function App() {
  const handleLoginSuccess = (token) => {
    console.log('Login successful. Token:', token);
  };

  return (
    <LoginForm
      onLoginSuccess={handleLoginSuccess}
      accent="purple"
      size="mid"
    />
  );
}
```

---

### 3. RegisterForm

A form component for user registration.

#### Props

| Prop              | Type                                     | Description                              |
|-------------------|------------------------------------------|------------------------------------------|
| `onRegisterSuccess` | `() => void`                              | Callback function to handle successful registration. |
| `accent`          | `"indigo" \| "blue" \| "green" \| "red" \| "purple" \| "zinc"` | Accent color for the button and styles. |
| `size`            | `"xs" \| "sm" \| "md" \| "lg" \| "xl" \| "mid"` | Size of the form. Default is "md".     |

#### Example

```jsx
import { RegisterForm } from "user-auth-ui-library";

function App() {
  const handleRegisterSuccess = () => {
    console.log('Registration successful');
  };

  return (
    <RegisterForm
      onRegisterSuccess={handleRegisterSuccess}
      accent="zinc"
      size="mid"
    />
  );
}
```

---

### 4. ResetPasswordForm

A form component for resetting a user's password.

#### Props

| Prop              | Type                                     | Description                              |
|-------------------|------------------------------------------|------------------------------------------|
| `accent`          | `"indigo" \| "blue" \| "green" \| "red" \| "purple" \| "zinc"` | Accent color for the button and styles. |
| `size`            | `"xs" \| "sm" \| "md" \| "lg" \| "xl" \| "mid"` | Size of the form. Default is "md".     |

#### Example

```jsx
import { ResetPasswordForm } from "user-auth-ui-library";

function App() {
  return (
    <ResetPasswordForm
      accent="purple"
      size="mid"
    />
  );
}
```

---

### 5. ResetRequestForm

A form component for requesting a password reset.

#### Props

| Prop              | Type                                     | Description                              |
|-------------------|------------------------------------------|------------------------------------------|
| `accent`          | `"indigo" \| "blue" \| "green" \| "red" \| "purple" \| "zinc"` | Accent color for the button and styles. |
| `size`            | `"xs" \| "sm" \| "md" \| "lg" \| "xl" \| "mid"` | Size of the form. Default is "md".     |

#### Example

```jsx
import { ResetRequestForm } from "user-auth-ui-library";

function App() {
  return (
    <ResetRequestForm
      accent="zinc"
      size="mid"
    />
  );
}
```

---

### 6. LogoutButton

A button component for logging out the user.

#### Props

| Prop              | Type                                     | Description                              |
|-------------------|------------------------------------------|------------------------------------------|
| `onLogout`        | `() => void`                             | Callback function to handle logout action. |
| `accent`          | `"indigo" \| "blue" \| "green" \| "red" \| "purple" \| "zinc"` | Accent color for the button.            |
| `size`            | `"xs" \| "sm" \| "md" \| "lg" \| "xl" \| "mid"` | Size of the button. Default is "md".   |

#### Example

```jsx
import { LogoutButton } from "user-auth-ui-library";

function App() {
  const handleLogout = () => {
    console.log('User logged out');
  };

  return (
    <LogoutButton
      onLogout={handleLogout}
      accent="red"
      size="mid"
    />
  );
}
```

---

## Tailwind CSS Integration

This library is built with Tailwind CSS. Ensure that you have Tailwind CSS set up in your project. You can follow the [Tailwind CSS installation guide](https://tailwindcss.com/docs/installation) to get started.

### Example Tailwind Setup

1. Install Tailwind CSS:

   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```

2. Configure `tailwind.config.js`:

   ```javascript
   module.exports = {
     content: [
       "./src/**/*.{js,jsx,ts,tsx}",
       "./node_modules/user-auth-ui-library/**/*.{js,jsx,ts,tsx}"
     ],
     theme: {
       extend: {},
     },
     plugins: [],
   };
   ```

3. Add Tailwind directives to your CSS:

   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```


## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.
