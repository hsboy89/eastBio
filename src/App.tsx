import { useEffect } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import Lenis from 'lenis'
import { imageUrls } from './lib/supabase'
import Hero from './components/Hero'
import CompanyIntro from './components/CompanyIntro'
import BusinessArea from './components/BusinessArea'
import Strengths from './components/Strengths'
import PartnersNetwork from './components/PartnersNetwork'
import Contact from './components/Contact'
import Navigation from './components/Navigation'
import './App.css'

function App() {
  // 모든 이미지 프리로딩
  useEffect(() => {
    const preloadImages = [
      imageUrls.hero,
      imageUrls.company,
      imageUrls.business,
      imageUrls.strengths,
      imageUrls.partners,
      imageUrls.contact,
    ]

    preloadImages.forEach((url) => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = url
      document.head.appendChild(link)

      // 실제 이미지도 미리 로드
      const img = new Image()
      img.src = url
    })
  }, [])
  useEffect(() => {
    // Lenis 스무스 스크롤 초기화 (성능 최적화)
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

  return (
    <HelmetProvider>
      <div className="app">
        <Navigation />
        <Hero />
        <CompanyIntro />
        <BusinessArea />
        <Strengths />
        <PartnersNetwork />
        <Contact />
      </div>
    </HelmetProvider>
  )
}

export default App

