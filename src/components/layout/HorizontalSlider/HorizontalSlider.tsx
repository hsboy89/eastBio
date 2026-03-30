import { useState, useCallback, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SliderContext } from '../../../context/SliderContext'
import './HorizontalSlider.css'

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: '0%',
    opacity: 1,
  },
  exit: (dir: number) => ({
    x: dir > 0 ? '-30%' : '30%',
    opacity: 0,
    scale: 0.96,
  }),
}

const transition = {
  duration: 0.7,
  ease: [0.43, 0.13, 0.23, 0.96] as [number, number, number, number],
}

export interface SlideInfo {
  id: string
  label: string
}

interface HorizontalSliderProps {
  slides: SlideInfo[]
  children: React.ReactNode[]
}

const HorizontalSlider = ({ slides, children }: HorizontalSliderProps) => {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const touchStartX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning) return
      const clamped = Math.max(0, Math.min(slides.length - 1, index))
      if (clamped === current) return
      setDirection(clamped > current ? 1 : -1)
      setCurrent(clamped)
      setIsTransitioning(true)
    },
    [current, slides.length, isTransitioning]
  )

  const prev = useCallback(() => goTo(current - 1), [current, goTo])
  const next = useCallback(() => goTo(current + 1), [current, goTo])

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev()
      else if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [prev, next])

  // Touch / swipe
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
  }

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return
    const dx = touchStartX.current - e.changedTouches[0].clientX
    const dy = Math.abs(touchStartY.current - e.changedTouches[0].clientY)
    // Only horizontal swipe (not scroll)
    if (Math.abs(dx) > 60 && dy < 80) {
      dx > 0 ? next() : prev()
    }
    touchStartX.current = null
    touchStartY.current = null
  }

  return (
    <SliderContext.Provider
      value={{ currentSlide: current, goToSlide: goTo, totalSlides: slides.length }}
    >
      <div
        className="hslider"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Slide viewport */}
        <div className="hslider-viewport">
          <AnimatePresence
            mode="wait"
            custom={direction}
            onExitComplete={() => setIsTransitioning(false)}
          >
            <motion.div
              key={current}
              className="hslider-slide"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={transition}
            >
              {children[current]}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Prev arrow */}
        <AnimatePresence>
          {current > 0 && (
            <motion.button
              className="hslider-arrow hslider-arrow--prev"
              onClick={prev}
              aria-label="이전 슬라이드"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.25 }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>

        {/* Next arrow */}
        <AnimatePresence>
          {current < slides.length - 1 && (
            <motion.button
              className="hslider-arrow hslider-arrow--next"
              onClick={next}
              aria-label="다음 슬라이드"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 12 }}
              transition={{ duration: 0.25 }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>

        {/* Dot indicators */}
        <div className="hslider-dots">
          {slides.map((slide, i) => (
            <button
              key={slide.id}
              className={`hslider-dot ${i === current ? 'active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={slide.label}
            />
          ))}
        </div>

        {/* Slide counter */}
        <div className="hslider-counter">
          <span className="counter-current">{String(current + 1).padStart(2, '0')}</span>
          <span className="counter-sep"> / </span>
          <span className="counter-total">{String(slides.length).padStart(2, '0')}</span>
        </div>

        {/* Section label */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            className="hslider-label"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35 }}
          >
            {slides[current].label}
          </motion.div>
        </AnimatePresence>
      </div>
    </SliderContext.Provider>
  )
}

export default HorizontalSlider
