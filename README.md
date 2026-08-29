# AquaTrack Frontend App

A modern, responsive, and glassmorphism-styled **React application** (powered by **Vite**) for tracking daily water intake, managing hydration goals, and user administration.

---

## 📸 Application Screenshots

### 1. Login Screen
![Login Screen](./images/Screenshot%202026-08-29%20181022.png)

### 2. User Hydration Dashboard
![User Dashboard](./images/Screenshot%202026-08-29%20181040.png)

### 3. Log Intake & History Overview
![Intake History & Logging](./images/Screenshot%202026-08-29%20181059.png)

### 4. Goal Configuration & Validation
![Goal Setting & Edge Cases](./images/Screenshot%202026-08-29%20181114.png)

### 5. Admin Control Panel & User Records
![Admin Panel](./images/Screenshot%202026-08-29%20181136.png)

---

## 🌟 Features & UI Highlights

- **Aesthetic Glassmorphic UI**: Vibrant ocean-tinted theme, gradient text headers, responsive grid layouts, and micro-animations.
- **Interactive Hydration Progress Ring**: Real-time visual progress ring rendering daily percentage, total intake vs goal, and remaining milliliters required.
- **Quick Intake Logging**: One-click preset buttons (+250ml, +500ml, +750ml) and custom volume logging with instant input validation.
- **Historical Records & Logs**: View today's timestamped logs with single-click delete actions, alongside past daily totals.
- **Admin Management Panel**:
  - View all registered users with role indicators (`user` vs `admin`).
  - Inspect any individual user's complete historic water logs.
  - Set or update recommended daily water goals for any user.
  - Delete user accounts with **Self-Deletion Protection** (admin cannot delete their own account).
- **Configurable API Endpoint**: Seamlessly configured via `VITE_API_BASE_URL` environment variable.

---

## 🛠 Tech Stack

- **Framework**: React 18 + Vite
- **HTTP Client**: Axios (with auto token injection interceptors)
- **Icons**: Lucide React
- **Styling**: Vanilla CSS with CSS custom properties (variables) & glassmorphism

---

## ⚙️ Installation & Running Locally

1. **Navigate to the frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the `frontend/` root directory (refer to `.env.example`):
   ```env
   VITE_API_BASE_URL=https://waterintake.onrender.com/api
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:3000`.

5. **Build for Production**:
   ```bash
   npm run build
   ```

---

## 🔑 Quick Demo Credentials

- **Admin Account**: `admin@watertracker.com` / `AdminPassword123!` (or use the one-click auto-fill helper on the Login page).
- **Register New User**: Use the registration form to create custom user accounts.
