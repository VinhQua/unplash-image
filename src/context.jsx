import { useContext, createContext, useState, useEffect } from "react";

const AppContext = createContext();
const getInitialDarkMode = () => {
  const prefersDarkMode = window.matchMedia(
    `(prefers-color-scheme:dark)`
  ).matches;
  const storedDarkMode = JSON.parse(localStorage.getItem("darkTheme"));
  return storedDarkMode || prefersDarkMode;
};

export const AppProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(getInitialDarkMode());
  const [searchValue, setSearchValue] = useState("cat");

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    const body = document.querySelector("body");
    body.classList.toggle("dark-theme", newDarkTheme);
    localStorage.setItem("darkTheme", JSON.stringify(newDarkTheme));
  };

  useEffect(() => {
    document.body.classList.toggle("dark-theme", isDarkTheme);
  }, [isDarkTheme]);
  return (
    <AppContext.Provider
      value={{ isDarkTheme, toggleDarkTheme, searchValue, setSearchValue }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);
