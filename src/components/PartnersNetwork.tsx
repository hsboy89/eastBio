import { motion } from 'framer-motion'
import { memo, useState, useRef, useEffect } from 'react'
import { imageUrls } from '../lib/supabase'
import './PartnersNetwork.css'

// 90개 샘플 파트너 데이터 생성
const generatePartnerData = () => {
  const partners: Array<{ id: number; name: string; category: string }> = []
  
  // 제약사 30개
  for (let i = 1; i <= 30; i++) {
    partners.push({
      id: i,
      name: `제약사 ${String.fromCharCode(65 + ((i - 1) % 26))}${i > 26 ? Math.ceil(i / 26) : ''}`,
      category: '제약사'
    })
  }
  
  // 의료기관 25개
  for (let i = 31; i <= 55; i++) {
    partners.push({
      id: i,
      name: `의료기관 ${String.fromCharCode(65 + ((i - 31) % 26))}${i - 30 > 26 ? Math.ceil((i - 30) / 26) : ''}`,
      category: '의료기관'
    })
  }
  
  // 병원 20개
  for (let i = 56; i <= 75; i++) {
    partners.push({
      id: i,
      name: `병원 ${String.fromCharCode(65 + ((i - 56) % 26))}${i - 55 > 26 ? Math.ceil((i - 55) / 26) : ''}`,
      category: '병원'
    })
  }
  
  // 유통업체 10개
  for (let i = 76; i <= 85; i++) {
    partners.push({
      id: i,
      name: `유통업체 ${String.fromCharCode(65 + ((i - 76) % 26))}`,
      category: '유통업체'
    })
  }
  
  // 연구소 5개
  for (let i = 86; i <= 90; i++) {
    partners.push({
      id: i,
      name: `연구소 ${String.fromCharCode(65 + ((i - 86) % 26))}`,
      category: '연구소'
    })
  }
  
  return partners
}

const PARTNERS_DATA = generatePartnerData()

// Card 컴포넌트를 memo로 감싸서 불필요한 리렌더링 방지
const PartnerCard = memo(({ name, category }: { name: string, category: string }) => (
  <div className="partner-card">
    <div className="partner-category">{category}</div>
    <div className="partner-name">{name}</div>
  </div>
))

PartnerCard.displayName = 'PartnerCard'

const PartnersNetwork = () => {
  const [isPaused, setIsPaused] = useState(false)
  const [currentTranslate, setCurrentTranslate] = useState(0)
  const sliderRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>()
  const cardWidth = 200
  const cardGap = 24
  
  const networkPoints = [
    { id: 1, city: '서울', x: 50, y: 30 },
    { id: 2, city: '부산', x: 75, y: 80 },
    { id: 3, city: '대구', x: 65, y: 55 },
    { id: 4, city: '인천', x: 45, y: 35 },
    { id: 5, city: '광주', x: 40, y: 70 },
    { id: 6, city: '대전', x: 50, y: 50 },
  ]

  // 자동 슬라이드 애니메이션
  useEffect(() => {
    if (isPaused) return

    const animate = () => {
      setCurrentTranslate((prev) => {
        const maxTranslate = -((PARTNERS_DATA.length * (cardWidth + cardGap)) / 2)
        const newTranslate = prev - 0.8 // 약간 빠른 속도
        return newTranslate <= maxTranslate ? 0 : newTranslate
      })
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isPaused])

  const handlePrev = () => {
    setCurrentTranslate((prev) => {
      const newTranslate = prev + (cardWidth + cardGap) * 3 // 3개 카드씩 이동
      return newTranslate > 0 ? 0 : newTranslate
    })
  }

  const handleNext = () => {
    setCurrentTranslate((prev) => {
      const maxTranslate = -((PARTNERS_DATA.length * (cardWidth + cardGap)) / 2)
      const newTranslate = prev - (cardWidth + cardGap) * 3 // 3개 카드씩 이동
      return newTranslate < maxTranslate ? maxTranslate : newTranslate
    })
  }

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
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="partners-title">주요 파트너사</h3>
          <div 
            className="partners-slider-container"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <button 
              className="slider-arrow slider-arrow-left"
              onClick={handlePrev}
              aria-label="이전"
            >
              ‹
            </button>
            <div 
              ref={sliderRef}
              className="partners-slider"
              style={{ transform: `translateX(${currentTranslate}px)` }}
            >
              {/* 첫 번째 세트 */}
              {PARTNERS_DATA.map((partner) => (
                <PartnerCard key={partner.id} name={partner.name} category={partner.category} />
              ))}
              {/* 두 번째 세트 (무한 슬라이드를 위해) */}
              {PARTNERS_DATA.map((partner) => (
                <PartnerCard key={`duplicate-${partner.id}`} name={partner.name} category={partner.category} />
              ))}
            </div>
            <button 
              className="slider-arrow slider-arrow-right"
              onClick={handleNext}
              aria-label="다음"
            >
              ›
            </button>
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
                  />
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

