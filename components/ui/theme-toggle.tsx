"use client";

import * as React from "react";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

function getSystemPrefersDark(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function applyTheme(isDark: boolean) {
  const root = document.documentElement;
  root.classList.toggle("dark", isDark);
  try {
    localStorage.setItem("theme", isDark ? "dark" : "light");
  } catch {}
  // Update color-scheme meta for better native UI rendering
  const meta = document.querySelector<HTMLMetaElement>('meta[name="color-scheme"]');
  if (meta) meta.content = isDark ? "dark light" : "light dark";
}

export function ThemeToggle() {
  const [isDark, setIsDark] = React.useState<boolean>(false);

  React.useEffect(() => {
    try {
      const stored = localStorage.getItem("theme");
      const initial = stored ? stored === "dark" : getSystemPrefersDark();
      setIsDark(initial);
    } catch {
      setIsDark(getSystemPrefersDark());
    }
  }, []);

  React.useEffect(() => {
    // apply whenever state changes
    if (typeof document !== "undefined") {
      applyTheme(isDark);
    }
  }, [isDark]);

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setIsDark((v) => !v)}
      className="shrink-0 h-8 w-8 rounded-lg hover:bg-sidebar-accent/50 transition-all"
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0 text-[#F2C572]" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100 text-[#0AC4CC]" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

export default ThemeToggle;
