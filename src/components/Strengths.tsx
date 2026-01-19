import { motion } from 'framer-motion'
import { imageUrls } from '../lib/supabase'
import './Strengths.css'

const Strengths = () => {
  const strengths = [
    {
      id: 1,
      title: '콜드체인 시스템',
      description: (
        <>
          의약품의 품질을 보장하기 위한<br />
          정밀한 온도 관리 시스템을 운영합니다.
        </>
      ),
      icon: '❄️',
      stats: '±2°C 정밀 관리',
    },
    {
      id: 2,
      title: '신속 배송 네트워크',
      description: (
        <>
          전국 유통망을 활용한<br />
          빠르고 안정적인 배송 서비스를 제공합니다.
        </>
      ),
      icon: '🚚',
      stats: '24시간 내 배송',
    },
    {
      id: 3,
      title: '데이터 기반 물류',
      description: (
        <>
          실시간 추적 시스템으로<br />
          물류 프로세스를 최적화합니다.
        </>
      ),
      icon: '📊',
      stats: '실시간 모니터링',
    },
    {
      id: 4,
      title: '품질 보증 시스템',
      description: (
        <>
          엄격한 품질 관리 기준을 통해<br />
          안전한 의약품을 공급합니다.
        </>
      ),
      icon: '✅',
      stats: '100% 품질 검증',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
      },
    },
  }

  return (
    <section 
      id="strengths" 
      className="strengths"
      style={{ '--bg-image': `url(${imageUrls.strengths})` } as React.CSSProperties}
    >
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">핵심 역량</h2>
          <p className="section-subtitle">
            기술과 혁신을 바탕으로 한 차별화된 물류 서비스를 제공합니다.
          </p>
        </motion.div>

        <motion.div
          className="strengths-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {strengths.map((strength, index) => (
            <motion.div
              key={strength.id}
              className="strength-card"
              variants={itemVariants}
              whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 1 : -1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="strength-icon">{strength.icon}</div>
              <h3 className="strength-title">{strength.title}</h3>
              <p className="strength-description">{strength.description}</p>
              <div className="strength-stats">{strength.stats}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="strengths-visual"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '0px' }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="visual-content">
            <div className="visual-item">
              <div className="visual-number">99.9%</div>
              <div className="visual-label">정확도</div>
            </div>
            <div className="visual-item">
              <div className="visual-number">24/7</div>
              <div className="visual-label">운영</div>
            </div>
            <div className="visual-item">
              <div className="visual-number">전국</div>
              <div className="visual-label">유통망</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Strengths

