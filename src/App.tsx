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
  // Hero 이미지를 최우선으로 프리로딩
  useEffect(() => {
    // Hero 이미지를 가장 먼저 로드 (우선순위 높음)
    const heroImg = new Image()
    heroImg.src = imageUrls.hero
    heroImg.loading = 'eager'
    heroImg.fetchPriority = 'high'
    
    // 나머지 이미지들은 순차적으로 로드
    const otherImages = [
      imageUrls.company,
      imageUrls.business,
      imageUrls.strengths,
      imageUrls.partners,
      imageUrls.contact,
    ]

    // Hero 이미지 로드 후 나머지 이미지 로드
    heroImg.onload = () => {
      otherImages.forEach((url) => {
        const img = new Image()
        img.src = url
        img.loading = 'lazy'
      })
    }
    
    heroImg.onerror = () => {
      // 에러가 나도 나머지 이미지는 로드
      otherImages.forEach((url) => {
        const img = new Image()
        img.src = url
        img.loading = 'lazy'
      })
    }
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

