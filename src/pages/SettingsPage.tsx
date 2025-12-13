import { useState, useEffect } from "react";
import { setTheme } from "../theme";
import { Link } from "react-router-dom";

function SettingsPage() {
  const [theme, setThemeState] = useState<"light" | "dark">("light");

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      setThemeState("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    setThemeState(newTheme);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 px-6 py-10">
      
      {/* Header */}
      <div className="max-w-4xl mx-auto flex items-center justify-between mb-10">
        <h1 className="text-2xl font-semibold">Settings</h1>

        <Link
          to="/dashboard"
          className="px-4 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        >
          ← Back to Dashboard
        </Link>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 shadow-lg space-y-8">
        
        {/* THEME TOGGLE */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-sm">Appearance</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Switch between light and dark mode.
            </p>
          </div>

          <button
            onClick={toggleTheme}
            className="px-4 py-2 text-xs rounded-lg bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 hover:bg-slate-200 dark:hover:bg-slate-600 transition"
          >
            {theme === "light" ? "Enable Dark Mode" : "Enable Light Mode"}
          </button>
        </div>

        <hr className="border-slate-200 dark:border-slate-700" />

        {/* ACCOUNT SETTINGS */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-sm">Account</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Update your shop and vendor details.
            </p>
          </div>

          <button className="px-4 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 transition">
            Edit Profile
          </button>
        </div>

        <hr className="border-slate-200 dark:border-slate-700" />

        {/* NOTIFICATIONS */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-sm">Notifications</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Manage alerts and updates for catalog activity.
            </p>
          </div>

          <button className="px-4 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 transition">
            Configure
          </button>
        </div>

        <hr className="border-slate-200 dark:border-slate-700" />

        {/* LOGOUT */}
        <div className="flex items-center justify-between">
          <p className="font-semibold text-sm text-red-500">Logout</p>

          <button
            className="px-4 py-2 text-xs rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
            onClick={() => alert("Logging out… (backend soon)")}
          >
            Sign Out
          </button>
        </div>

      </div>
    </div>
  );
}

export default SettingsPage;
