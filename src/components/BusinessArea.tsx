import { motion } from 'framer-motion'
import { imageUrls } from '../lib/supabase'
import './BusinessArea.css'

const BusinessArea = () => {
  const businessAreas = [
    {
      id: 1,
      title: '전문의약품 유통',
      titleFormatted: (
        <>
          전문의약품 유통
        </>
      ),
      description: (
        <>
          의사 처방이 필요한 전문의약품의<br />
          안전하고 신속한 유통 서비스를 제공합니다.
        </>
      ),
      icon: '💊',
      features: ['정확한 온도 관리', '신속한 배송', '품질 보증'],
    },
    {
      id: 2,
      title: '일반의약품 유통',
      titleFormatted: (
        <>
          일반의약품 유통
        </>
      ),
      description: (
        <>
          약국에서 판매되는 일반의약품의<br />
          효율적인 유통망을 구축하고 운영합니다.
        </>
      ),
      icon: '📦',
      features: ['광범위한 제품 라인업', '안정적인 공급', '경쟁력 있는 가격'],
    },
    {
      id: 3,
      title: '의료기기 유통',
      titleFormatted: (
        <>
          의료기기<br />유통
        </>
      ),
      description: (
        <>
          병원과 의료기관에 필요한 의료기기를
          전문적으로 유통합니다.
        </>
      ),
      icon: '🏥',
      features: ['전문 유통 서비스', 'A/S 지원', '기술 지원'],
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  }

  return (
    <section 
      id="business" 
      className="business-area"
      style={{ '--bg-image': `url(${imageUrls.business})` } as React.CSSProperties}
    >
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">사업 영역</h2>
          <p className="section-subtitle">
            전문의약품, 일반의약품, 의료기기 유통을 통해 의료 생태계를 연결합니다.
          </p>
        </motion.div>

        <motion.div
          className="business-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '0px' }}
        >
          {businessAreas.map((area) => (
            <motion.div
              key={area.id}
              className="business-card"
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="card-header">
                <div className="card-icon">{area.icon}</div>
                <h3 className="card-title">{area.titleFormatted || area.title}</h3>
              </div>
              <p className="card-description">{area.description}</p>
              <ul className="card-features">
                {area.features.map((feature, index) => (
                  <li key={index}>
                    <span className="feature-check">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default BusinessArea

