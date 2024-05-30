"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export enum EThemeMode {
  LIGHT = "light",
  DARK = "dark",
}

interface IThemeContextValue {
  mode: EThemeMode;
  setMode: (mode: EThemeMode) => void;
}

const ThemeContext = createContext<IThemeContextValue | null>(null);

export interface IThemeProviderProps {
  children?: React.ReactNode;
}

const ThemeProvider: React.FC<IThemeProviderProps> = ({ children }) => {
  const [mode, setMode] = useState<EThemeMode>(EThemeMode.LIGHT);

  useEffect(() => {
    if (mode) {
      document.documentElement.classList.add(mode);
    }
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}

export default ThemeProvider;
