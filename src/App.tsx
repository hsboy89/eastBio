import { useEffect } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import Lenis from 'lenis'
import Hero from './components/Hero'
import CompanyIntro from './components/CompanyIntro'
import BusinessArea from './components/BusinessArea'
import Strengths from './components/Strengths'
import PartnersNetwork from './components/PartnersNetwork'
import Contact from './components/Contact'
import Navigation from './components/Navigation'
import './App.css'

function App() {
  useEffect(() => {
    // Lenis 스무스 스크롤 초기화
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
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

