// components/ui/ThemeButton/ThemeButton.jsx (correct file)
import { useTheme } from "@/context/ThemeContext/ThemeContext";

const ThemeButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      // className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700
      //            bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100
      //            hover:bg-gray-200 dark:hover:bg-gray-700
      //            transition-all duration-300 ease-in-out
      //            shadow-sm hover:shadow-md"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <div className="flex items-center gap-2">
        {theme === "light" ? (
          <>
            <span className="text-xl">🌙</span>
            {/* <span>Dark Mode</span> */}
          </>
        ) : (
          <>
            <span className="text-xl">☀️</span>
            {/* <span>Light Mode</span> */}
          </>
        )}
      </div>
    </button>
  );
};

export default ThemeButton;