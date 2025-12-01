"use client"

import type React from "react"

import { useState } from "react"
import type { Theme } from "@/app/page"

interface TimerDisplayProps {
  minutes: number
  seconds: number
  theme: Theme
  onEditMinutes: (minutes: number) => void
  isRunning: boolean
}

export default function TimerDisplay({ minutes, seconds, theme, onEditMinutes, isRunning }: TimerDisplayProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [inputValue, setInputValue] = useState(minutes.toString())

  const handleClick = () => {
    if (!isRunning) {
      setIsEditing(true)
      setInputValue(minutes.toString())
    }
  }

  const handleBlur = () => {
    setIsEditing(false)
    const newMinutes = Number.parseInt(inputValue, 10)
    if (!isNaN(newMinutes) && newMinutes > 0 && newMinutes <= 99) {
      onEditMinutes(newMinutes)
    } else {
      setInputValue(minutes.toString())
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleBlur()
    }
  }

  const formattedMinutes = String(minutes).padStart(2, "0")
  const formattedSeconds = String(seconds).padStart(2, "0")

  const textColor = theme === "focus" ? "text-[#e8f4ff]" : theme === "relax" ? "text-[#2d1b4e]" : "text-white"

  return (
    <div
      className={`text-8xl md:text-9xl font-mono font-bold tracking-wider transition-all duration-300 ${
        !isRunning && !isEditing ? "cursor-pointer hover:scale-105" : ""
      } ${textColor}`}
      onClick={handleClick}
    >
      {isEditing ? (
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            autoFocus
            min="1"
            max="99"
            className={`w-32 md:w-40 bg-transparent border-b-4 ${
              theme === "focus" ? "border-[#4a9eff]" : theme === "relax" ? "border-[#8b5cf6]" : "border-[#ff3d00]"
            } text-center outline-none`}
          />
          <span>:00</span>
        </div>
      ) : (
        <span>
          {formattedMinutes}:{formattedSeconds}
        </span>
      )}
    </div>
  )
}
