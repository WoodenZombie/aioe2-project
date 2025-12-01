"use client"

import { Button } from "@/components/ui/button"
import { Play, Pause, RotateCcw } from "lucide-react"
import type { Theme } from "@/app/page"

interface ControlsProps {
  isRunning: boolean
  onStart: () => void
  onPause: () => void
  onReset: () => void
  theme: Theme
}

export default function Controls({ isRunning, onStart, onPause, onReset, theme }: ControlsProps) {
  const getButtonClasses = () => {
    const baseClasses =
      "h-14 px-8 text-lg font-medium rounded-full transition-all duration-300 hover:scale-105 active:scale-95"

    if (theme === "focus") {
      return `${baseClasses} bg-[#4a9eff] text-white hover:bg-[#3d8fe6]`
    } else if (theme === "relax") {
      return `${baseClasses} bg-[#8b5cf6] text-white hover:bg-[#7c3aed]`
    } else {
      return `${baseClasses} bg-[#ff3d00] text-white hover:bg-[#e63900]`
    }
  }

  const getSecondaryButtonClasses = () => {
    const baseClasses =
      "h-14 px-8 text-lg font-medium rounded-full transition-all duration-300 hover:scale-105 active:scale-95 backdrop-blur-sm"

    if (theme === "focus") {
      return `${baseClasses} bg-white/10 text-[#e8f4ff] hover:bg-white/20`
    } else if (theme === "relax") {
      return `${baseClasses} bg-[#2d1b4e]/20 text-[#2d1b4e] hover:bg-[#2d1b4e]/30`
    } else {
      return `${baseClasses} bg-white/20 text-white hover:bg-white/30`
    }
  }

  return (
    <div className="flex gap-4 flex-wrap justify-center">
      {!isRunning ? (
        <Button className={getButtonClasses()} onClick={onStart}>
          <Play className="mr-2 h-5 w-5" />
          Start
        </Button>
      ) : (
        <Button className={getButtonClasses()} onClick={onPause}>
          <Pause className="mr-2 h-5 w-5" />
          Pause
        </Button>
      )}

      <Button className={getSecondaryButtonClasses()} onClick={onReset}>
        <RotateCcw className="mr-2 h-5 w-5" />
        Reset
      </Button>
    </div>
  )
}
