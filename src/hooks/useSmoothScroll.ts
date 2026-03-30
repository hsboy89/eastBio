import { useEffect } from 'react'
import Lenis from 'lenis'

export const useSmoothScroll = () => {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 0.8,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 0.8,
            touchMultiplier: 1.5,
            infinite: false,
        })

        let rafId: number
        function raf(time: number) {
            lenis.raf(time)
            rafId = requestAnimationFrame(raf)
        }
        rafId = requestAnimationFrame(raf)

        return () => {
            if (rafId) {
                cancelAnimationFrame(rafId)
            }
            lenis.destroy()
        }
    }, [])
}
