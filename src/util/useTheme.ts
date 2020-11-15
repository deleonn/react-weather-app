import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

export const useTheme = (): { theme: Theme; toggleTheme: () => void } => {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as Theme;
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  const toggleTheme = () => {
    if (theme === 'light') {
      localStorage.setItem('theme', 'dark');
      return setTheme('dark');
    }

    localStorage.setItem('theme', 'light');
    return setTheme('light');
  };

  return { theme, toggleTheme };
};
