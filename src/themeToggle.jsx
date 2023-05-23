import React from "react";
import { useGlobalContext } from "./context";

const ThemeToggle = () => {
  const { greeting } = useGlobalContext();
  return <div>{greeting}</div>;
};

export default ThemeToggle;
