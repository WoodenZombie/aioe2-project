"use client"

import type { Theme } from "@/app/page"

interface ThemeSwitcherProps {
  currentTheme: Theme
  onThemeChange: (theme: Theme) => void
}

export default function ThemeSwitcher({ currentTheme, onThemeChange }: ThemeSwitcherProps) {
  const themes: { name: Theme; label: string; color: string }[] = [
    { name: "focus", label: "Focus", color: "#4a9eff" },
    { name: "relax", label: "Relax", color: "#8b5cf6" },
    { name: "energy", label: "Energy", color: "#ff3d00" },
  ]

  return (
    <div className="flex gap-3">
      {themes.map((theme) => (
        <button
          key={theme.name}
          onClick={() => onThemeChange(theme.name)}
          className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
            currentTheme === theme.name
              ? "scale-110 shadow-lg"
              : "scale-100 hover:scale-105 opacity-70 hover:opacity-100"
          }`}
          style={{
            backgroundColor: theme.color,
            color: theme.name === "relax" && currentTheme !== "relax" ? "#2d1b4e" : "white",
          }}
        >
          {theme.label}
        </button>
      ))}
    </div>
  )
}
