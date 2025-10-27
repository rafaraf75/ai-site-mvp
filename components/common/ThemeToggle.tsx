"use client";

import {useTheme} from "next-themes";
import {Button} from "@/components/ui/button";
import {useEffect, useState} from "react";

export default function ThemeToggle() {
  const {theme, setTheme, resolvedTheme} = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const isDark = (resolvedTheme ?? theme) === "dark";

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle dark mode"
    >
      {isDark ? "Jasny" : "Ciemny"}
    </Button>
  );
}

