"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Hydration error se bachne ke liye
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button 
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="
        p-2 
        bg-white 
        dark:bg-neutral-800 
        border 
        border-neutral-200 
        dark:border-transparent
        rounded-full 
        transition 
        hover:opacity-75
      "
    >
      {theme === 'dark' ? (
        <Sun size={20} className="text-white"/> 
      ) : (
        <Moon size={20} className="text-black"/>
      )}
    </button>
  );
}

export default ThemeToggle;