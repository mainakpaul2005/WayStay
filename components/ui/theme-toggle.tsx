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
      className="shrink-0"
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

export default ThemeToggle;
