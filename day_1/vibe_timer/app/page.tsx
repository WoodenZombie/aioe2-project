"use client"

import { useState, useEffect, useRef } from "react"
import TimerDisplay from "@/components/timer-display"
import Controls from "@/components/controls"
import ThemeSwitcher from "@/components/theme-switcher"
import BackgroundAnimation from "@/components/background-animation"

export type Theme = "focus" | "relax" | "energy"

export default function VibeTimer() {
  const [minutes, setMinutes] = useState(25)
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [theme, setTheme] = useState<Theme>("focus")
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds === 0) {
            if (minutes === 0) {
              setIsRunning(false)
              return 0
            }
            setMinutes((prevMinutes) => prevMinutes - 1)
            return 59
          }
          return prevSeconds - 1
        })
      }, 1000)
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning, minutes])

  const handleStart = () => setIsRunning(true)
  const handlePause = () => setIsRunning(false)
  const handleReset = () => {
    setIsRunning(false)
    setMinutes(25)
    setSeconds(0)
  }

  const handleEditMinutes = (newMinutes: number) => {
    setMinutes(newMinutes)
    setSeconds(0)
    setIsRunning(false)
  }

  return (
    <main
      className={`relative min-h-screen flex flex-col items-center justify-center theme-transition ${
        theme === "focus"
          ? "bg-gradient-to-br from-[#1a2332] to-[#0f1419]"
          : theme === "relax"
            ? "bg-gradient-to-br from-[#e8d5f2] to-[#b8e6e1]"
            : "bg-gradient-to-br from-[#ff6b35] to-[#f7931e]"
      }`}
    >
      <BackgroundAnimation theme={theme} />

      <div className="relative z-10 flex flex-col items-center gap-12 p-8">
        <h1
          className={`text-4xl md:text-5xl font-light tracking-wide transition-colors duration-800 ${
            theme === "focus" ? "text-[#e8f4ff]" : theme === "relax" ? "text-[#2d1b4e]" : "text-white"
          }`}
        >
          Vibe Timer
        </h1>

        <TimerDisplay
          minutes={minutes}
          seconds={seconds}
          theme={theme}
          onEditMinutes={handleEditMinutes}
          isRunning={isRunning}
        />

        <Controls
          isRunning={isRunning}
          onStart={handleStart}
          onPause={handlePause}
          onReset={handleReset}
          theme={theme}
        />

        <ThemeSwitcher currentTheme={theme} onThemeChange={setTheme} />
      </div>
    </main>
  )
}
