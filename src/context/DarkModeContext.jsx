import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "./../hooks/useLocalStorageState";
import PropTypes from "prop-types";

const DarkModeContext = createContext();

DarkModeProvider.propTypes = {
  children: PropTypes.any,
};

export default function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    window.matchMedia("(prefers-color-scheme: dark)").matches,
    "isDarkMode"
  );

  function toggleDarkMode() {
    setIsDarkMode((mode) => !mode);
  }

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark-mode");
      document.documentElement.classList.remove("light-mode");
    } else {
      document.documentElement.classList.add("light-mode");
      document.documentElement.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  return <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>{children}</DarkModeContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined) throw new Error("DarkModeContext was used outside of its provider");
  return context;
}
