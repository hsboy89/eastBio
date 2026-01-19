import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { useEffect, useState } from 'react'
import { imageUrls } from '../lib/supabase'
import './Hero.css'

const Hero = () => {
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    // 이미지가 이미 캐시되어 있을 수 있으므로 먼저 확인
    const img = new Image()
    
    // 이미지가 이미 로드되어 있는지 확인
    if (img.complete || img.naturalWidth > 0) {
      setImageLoaded(true)
      return
    }

    // 이미지 프리로딩 (우선순위 높음)
    img.src = imageUrls.hero
    img.loading = 'eager' // 즉시 로드
    img.fetchPriority = 'high' // 높은 우선순위
    
    img.onload = () => {
      setImageLoaded(true)
    }
    img.onerror = () => {
      setImageLoaded(true) // 에러가 나도 계속 진행
    }
  }, [])

  const scrollToNext = () => {
    const element = document.getElementById('company')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <Helmet>
        <title>(주)이스트바이오 | 의약품 도매업의 선도기업</title>
        <meta
          name="description"
          content="(주)이스트바이오는 전문의약품, 일반의약품, 의료기기 유통을 전문으로 하는 의약품 도매업체입니다."
        />
        <meta name="keywords" content="이스트바이오, 의약품도매, 제약유통, 콜드체인" />
      </Helmet>

      <section id="hero" className="hero">
        <div className="hero-background">
          <div 
            className={`hero-background-image ${imageLoaded ? 'loaded' : 'loading'}`}
            style={{ backgroundImage: imageLoaded ? `url(${imageUrls.hero})` : 'none' }}
          ></div>
          {!imageLoaded && (
            <div className="hero-background-placeholder"></div>
          )}
          <div className="hero-background-overlay"></div>
        </div>
        <div className="hero-content">
          <motion.div
            className="hero-text"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h1
              className="hero-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              신뢰와 혁신으로
              <br />
              <span className="gradient-text">의료를 연결합니다</span>
            </motion.h1>
            <motion.p
              className="hero-subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              (주)이스트바이오는 의약품 도매업의 전문성을 바탕으로
              <br />
              정확한 온도 관리와 신속한 배송으로 건강한 미래를 만들어갑니다.
            </motion.p>
            <motion.div
              className="hero-buttons"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.button
                className="btn-primary"
                onClick={scrollToNext}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                더 알아보기
              </motion.button>
              <motion.button
                className="btn-secondary"
                onClick={() => {
                  const element = document.getElementById('contact')
                  if (element) element.scrollIntoView({ behavior: 'smooth' })
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                문의하기
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2, repeat: Infinity, repeatType: 'reverse' }}
          onClick={scrollToNext}
        >
          <span>스크롤</span>
          <div className="scroll-arrow"></div>
        </motion.div>
      </section>
    </>
  )
}

export default Hero

