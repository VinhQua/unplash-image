import { useContext, createContext } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const greeting = "sd";
  return (
    <AppContext.Provider value={{ greeting }}>{children}</AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);
