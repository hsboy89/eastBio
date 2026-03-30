import { HelmetProvider } from 'react-helmet-async'
import { imageUrls } from './lib/supabase'
import { Navigation } from './components/layout'
import HorizontalSlider from './components/layout/HorizontalSlider/HorizontalSlider'
import type { SlideInfo } from './components/layout/HorizontalSlider/HorizontalSlider'
import AnimatedBackground from './components/common/AnimatedBackground/AnimatedBackground'
import {
  Hero,
  CompanyIntro,
  BusinessArea,
  Strengths,
  PartnersNetwork,
  Contact
} from './components/sections'
import { useImagePreload } from './hooks'

const SLIDES: SlideInfo[] = [
  { id: 'hero',      label: 'Home' },
  { id: 'company',   label: '회사소개' },
  { id: 'business',  label: '사업영역' },
  { id: 'strengths', label: '핵심역량' },
  { id: 'partners',  label: '파트너 & 네트워크' },
  { id: 'contact',   label: '연락처' },
]

function App() {
  useImagePreload([
    imageUrls.hero,
    imageUrls.company,
    imageUrls.business,
    imageUrls.strengths,
    imageUrls.partners,
    imageUrls.contact,
  ])

  return (
    <HelmetProvider>
      {/* Canvas light-trail background — always behind everything */}
      <AnimatedBackground />

      {/* Navigation floats on top */}
      <Navigation />

      {/* Horizontal slider wraps all sections */}
      <HorizontalSlider slides={SLIDES}>
        {[
          <Hero key="hero" />,
          <CompanyIntro key="company" />,
          <BusinessArea key="business" />,
          <Strengths key="strengths" />,
          <PartnersNetwork key="partners" />,
          <Contact key="contact" />,
        ]}
      </HorizontalSlider>
    </HelmetProvider>
  )
}

export default App
