/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import {useTheme} from "next-themes";
import {Button} from "@/components/ui/button";
import {useEffect, useState} from "react";
import {Moon, Sun} from "lucide-react";

type ThemeToggleLabels = {
  toDark: string;
  toLight: string;
};

export default function ThemeToggle({
  labels,
  className = "",
}: {
  labels: ThemeToggleLabels;
  className?: string;
}) {
  const {theme, setTheme, resolvedTheme} = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const isDark = (resolvedTheme ?? theme) === "dark";
  const nextLabel = isDark ? labels.toLight : labels.toDark;

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={nextLabel}
      title={nextLabel}
      className={`h-9 w-9 rounded-full p-0 ${className}`.trim()}
    >
      {isDark ? <Sun aria-hidden="true" size={16} /> : <Moon aria-hidden="true" size={16} />}
    </Button>
  );
}


