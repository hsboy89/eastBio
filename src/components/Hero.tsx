import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import Galaxy from './Galaxy'
import './Hero.css'

const Hero = () => {

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
        <div className="hero-galaxy">
          <Galaxy
            mouseRepulsion={false}
            mouseInteraction={false}
            density={0.6}
            glowIntensity={0.15}
            saturation={0}
            hueShift={140}
            twinkleIntensity={0.15}
            rotationSpeed={0.05}
            repulsionStrength={1}
            autoCenterRepulsion={0}
            starSpeed={0.3}
            speed={0.5}
            transparent={true}
          />
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

