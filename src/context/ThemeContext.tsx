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
  const [theme, setTheme] = useState<Theme>("light");
  
  const toggleTheme = () => {
    setTheme((prev) => prev === "light" ? "dark" : "light");
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}