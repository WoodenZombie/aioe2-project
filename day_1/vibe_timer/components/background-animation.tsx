"use client"

import { useEffect, useState } from "react"
import type { Theme } from "@/app/page"

interface BackgroundAnimationProps {
  theme: Theme
}

interface Particle {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
}

export default function BackgroundAnimation({ theme }: BackgroundAnimationProps) {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    // Generate random particles
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 60 + 40,
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 5,
    }))
    setParticles(newParticles)
  }, [])

  const getParticleColor = () => {
    if (theme === "focus") {
      return "rgba(74, 158, 255, 0.15)"
    } else if (theme === "relax") {
      return "rgba(139, 92, 246, 0.2)"
    } else {
      return "rgba(255, 61, 0, 0.15)"
    }
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle absolute rounded-full blur-2xl transition-colors duration-800"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: getParticleColor(),
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}

      {/* Pulsing circles */}
      <div
        className="pulse-circle absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl transition-colors duration-800"
        style={{ backgroundColor: getParticleColor() }}
      />
      <div
        className="pulse-circle absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl transition-colors duration-800"
        style={{
          backgroundColor: getParticleColor(),
          animationDelay: "2s",
        }}
      />
    </div>
  )
}
