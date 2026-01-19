import { motion } from 'framer-motion'
import { useState } from 'react'
import { imageUrls } from '../lib/supabase'
import './PartnersNetwork.css'

const PartnersNetwork = () => {
  const [hasAnimated, setHasAnimated] = useState(false)
  const partners = [
    { id: 1, name: '제약사 A', category: '제약사' },
    { id: 2, name: '제약사 B', category: '제약사' },
    { id: 3, name: '제약사 C', category: '제약사' },
    { id: 4, name: '의료기관 A', category: '의료기관' },
    { id: 5, name: '의료기관 B', category: '의료기관' },
    { id: 6, name: '의료기관 C', category: '의료기관' },
  ]

  const networkPoints = [
    { id: 1, city: '서울', x: 50, y: 30 },
    { id: 2, city: '부산', x: 75, y: 80 },
    { id: 3, city: '대구', x: 65, y: 55 },
    { id: 4, city: '인천', x: 45, y: 35 },
    { id: 5, city: '광주', x: 40, y: 70 },
    { id: 6, city: '대전', x: 50, y: 50 },
  ]

  return (
    <section 
      id="partners" 
      className="partners-network"
      style={{ '--bg-image': `url(${imageUrls.partners})` } as React.CSSProperties}
    >
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">파트너 & 네트워크</h2>
          <p className="section-subtitle">
            신뢰할 수 있는 파트너사들과 함께 전국 유통망을 구축하고 있습니다.
          </p>
        </motion.div>

        <motion.div
          className="partners-section"
          initial={{ opacity: 0, y: 50 }}
          animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          whileInView={!hasAnimated ? { opacity: 1, y: 0 } : undefined}
          viewport={{ once: true, amount: 0.3 }}
          onViewportEnter={() => {
            if (!hasAnimated) {
              setHasAnimated(true)
            }
          }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="partners-title">주요 파트너사</h3>
          <div className="partners-grid">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.id}
                className="partner-card"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.05 }}
              >
                <div className="partner-category">{partner.category}</div>
                <div className="partner-name">{partner.name}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="network-section"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h3 className="network-title">전국 유통망</h3>
          <div className="network-map">
            <svg viewBox="0 0 100 100" className="map-svg">
              {/* 한국 지도 형태의 간단한 표현 */}
              <path
                d="M 20 30 L 50 20 L 80 30 L 85 50 L 80 70 L 50 80 L 20 70 L 15 50 Z"
                fill="rgba(26, 95, 63, 0.1)"
                stroke="var(--primary-color)"
                strokeWidth="0.5"
              />
              {networkPoints.map((point, index) => (
                <motion.g
                  key={point.id}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r="2"
                    fill="var(--secondary-color)"
                    className="network-point"
                  >
                    <motion.animate
                      attributeName="r"
                      values="2;3;2"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <text
                    x={point.x}
                    y={point.y - 3}
                    fontSize="2"
                    fill="var(--primary-color)"
                    textAnchor="middle"
                    fontWeight="600"
                  >
                    {point.city}
                  </text>
                </motion.g>
              ))}
            </svg>
          </div>
          <div className="network-stats">
            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="stat-label">협력 제약사</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">200+</div>
              <div className="stat-label">의료기관</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">전국</div>
              <div className="stat-label">유통망</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default PartnersNetwork

