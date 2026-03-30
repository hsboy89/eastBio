import { HelmetProvider } from 'react-helmet-async'
import { imageUrls } from './lib/supabase'
import { Navigation } from './components/layout'
import {
  Hero,
  CompanyIntro,
  BusinessArea,
  Strengths,
  PartnersNetwork,
  Contact
} from './components/sections'
import { useSmoothScroll, useImagePreload } from './hooks'

function App() {
  // 스무스 스크롤 적용
  useSmoothScroll()

  // 이미지 프리로딩
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
