import { ReactNode, createContext, useState } from 'react';

type Theme = "light" | "dark";

export const ThemeContext = createContext({
  theme: "light" as Theme,
  toggleTheme: () => { }
});

interface ThemeContextProps {
  children: ReactNode;
}

export default function ThemeContextProvider({ children }: ThemeContextProps) {
  const [theme, setTheme] = useState<Theme>(localStorage.getItem('theme') as Theme ?? "light");
  
  const toggleTheme = () => {
    setTheme((prev) => {
      const result = prev === "light" ? "dark" : "light";
      localStorage.setItem('theme', result);
      return result;
    });
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}