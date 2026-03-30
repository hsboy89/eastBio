import { useEffect, useRef } from 'react'
import './AnimatedBackground.css'

interface Streak {
  startX: number
  startY: number
  ctrlX: number
  ctrlY: number
  endX: number
  endY: number
  progress: number
  speed: number
  trailLength: number
  color: string
  width: number
  opacity: number
}

const COLORS = [
  '#1a6bff',
  '#00c4ff',
  '#4fc3a1',
  '#38bdf8',
  '#6ee7b7',
  '#93c5fd',
]

function createStreak(w: number, h: number, randomStart = false): Streak {
  const fromLeft = Math.random() > 0.5

  const startX = fromLeft
    ? w * (-0.15 + Math.random() * 0.2)
    : w * (0.95 + Math.random() * 0.2)
  const startY = h * (0.1 + Math.random() * 0.85)

  // Convergence zone: center-right of screen (like the reference image)
  const endX = w * (0.45 + Math.random() * 0.25)
  const endY = h * (0.25 + Math.random() * 0.5)

  // Control point creates the elegant curve
  const ctrlX = fromLeft
    ? w * (0.05 + Math.random() * 0.45)
    : w * (0.5 + Math.random() * 0.45)
  const ctrlY = h * (Math.random() * 0.55)

  return {
    startX,
    startY,
    ctrlX,
    ctrlY,
    endX,
    endY,
    progress: randomStart ? -Math.random() * 0.8 : 0,
    speed: 0.0018 + Math.random() * 0.0035,
    trailLength: 0.1 + Math.random() * 0.22,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    width: 0.3 + Math.random() * 1.6,
    opacity: 0.15 + Math.random() * 0.55,
  }
}

function getBezierPoint(t: number, s: Streak): [number, number] {
  const tc = Math.max(0, Math.min(1, t))
  const x =
    (1 - tc) * (1 - tc) * s.startX +
    2 * (1 - tc) * tc * s.ctrlX +
    tc * tc * s.endX
  const y =
    (1 - tc) * (1 - tc) * s.startY +
    2 * (1 - tc) * tc * s.ctrlY +
    tc * tc * s.endY
  return [x, y]
}

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')!
    let rafId: number
    const streaks: Streak[] = []
    let w = 0
    let h = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      ctx.scale(dpr, dpr)
    }

    resize()
    window.addEventListener('resize', resize)

    // Initialize with spread start positions
    const NUM_STREAKS = 90
    for (let i = 0; i < NUM_STREAKS; i++) {
      streaks.push(createStreak(w, h, true))
    }

    function drawFrame() {
      // Dark background with subtle trail fade
      ctx.fillStyle = 'rgba(3, 5, 18, 0.88)'
      ctx.fillRect(0, 0, w, h)

      // Subtle radial glow at convergence area (center-right)
      const grd = ctx.createRadialGradient(
        w * 0.62, h * 0.48, 0,
        w * 0.62, h * 0.48, w * 0.45
      )
      grd.addColorStop(0, 'rgba(0, 80, 200, 0.06)')
      grd.addColorStop(0.5, 'rgba(0, 40, 120, 0.03)')
      grd.addColorStop(1, 'rgba(0, 0, 0, 0)')
      ctx.fillStyle = grd
      ctx.fillRect(0, 0, w, h)

      for (let i = 0; i < streaks.length; i++) {
        const streak = streaks[i]
        streak.progress += streak.speed

        // Reset when done
        if (streak.progress > 1 + streak.trailLength) {
          streaks[i] = createStreak(w, h, false)
          continue
        }

        if (streak.progress < 0) continue

        const headT = Math.min(streak.progress, 1.0)
        const tailT = Math.max(0, streak.progress - streak.trailLength)

        if (headT <= tailT + 0.001) continue

        const SEGMENTS = 32

        ctx.save()
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'

        for (let s = 0; s < SEGMENTS; s++) {
          const t0 = tailT + (s / SEGMENTS) * (headT - tailT)
          const t1 = tailT + ((s + 1) / SEGMENTS) * (headT - tailT)
          const pos = s / SEGMENTS

          // Fade: tail → bright middle → fade at head
          const alpha = streak.opacity * Math.pow(Math.sin(pos * Math.PI), 0.6)
          if (alpha < 0.01) continue

          const [x0, y0] = getBezierPoint(t0, streak)
          const [x1, y1] = getBezierPoint(t1, streak)

          ctx.beginPath()
          ctx.moveTo(x0, y0)
          ctx.lineTo(x1, y1)
          ctx.strokeStyle = streak.color
          ctx.globalAlpha = alpha
          ctx.lineWidth = streak.width * (0.2 + pos * 0.8)
          ctx.shadowColor = streak.color
          ctx.shadowBlur = 4 + pos * 6
          ctx.stroke()
        }

        // Bright glowing head
        if (streak.progress <= 1.02) {
          const [hx, hy] = getBezierPoint(headT, streak)
          ctx.beginPath()
          ctx.arc(hx, hy, streak.width * 1.8, 0, Math.PI * 2)
          ctx.fillStyle = '#ffffff'
          ctx.globalAlpha = streak.opacity * 0.85
          ctx.shadowColor = streak.color
          ctx.shadowBlur = 16
          ctx.fill()
        }

        ctx.restore()
      }

      rafId = requestAnimationFrame(drawFrame)
    }

    rafId = requestAnimationFrame(drawFrame)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="animated-bg" aria-hidden="true" />
}

export default AnimatedBackground
