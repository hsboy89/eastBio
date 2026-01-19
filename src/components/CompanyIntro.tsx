import { motion } from 'framer-motion'
import { memo } from 'react'
import { imageUrls } from '../lib/supabase'
import './CompanyIntro.css'

// Card 컴포넌트를 memo로 감싸서 불필요한 리렌더링 방지
const IntroCard = memo(({ icon, title, text }: { icon: string, title: string, text: string }) => (
  <motion.div
    className="intro-card"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '0px' }}
    transition={{ duration: 0.6 }}
  >
    <div className="card-icon">{icon}</div>
    <h3 className="card-title">{title}</h3>
    <p className="card-text">{text}</p>
  </motion.div>
))

IntroCard.displayName = 'IntroCard'

const CompanyIntro = () => {

  return (
    <section 
      id="company" 
      className="company-intro"
      style={{ '--bg-image': `url(${imageUrls.company})` } as React.CSSProperties}
    >
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">회사 소개</h2>
          <p className="section-subtitle">
            (주)이스트바이오는 의약품 도매업의 전문성을 바탕으로 신뢰와 혁신을 추구합니다.
          </p>
        </motion.div>

        <div className="intro-content">
          <IntroCard icon="🏢" title="법인명" text="(주)이스트바이오" />
          <IntroCard icon="💼" title="업태" text="의약품 도매업" />
          <IntroCard icon="🎯" title="핵심 가치" text="신뢰 · 연결 · 혁신" />
        </div>

        <motion.div
          className="ceo-message"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px' }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="message-content">
            <h3 className="message-title">대표자 인사말</h3>
            <p className="message-text">
              (주)이스트바이오는 의약품 유통의 전문성을 바탕으로 제약사와 의료기관을 연결하는
              신뢰할 수 있는 파트너입니다. 정확한 온도 관리와 신속한 배송 시스템을 통해
              환자들에게 안전하고 효과적인 의약품을 전달하는 것이 우리의 사명입니다.
            </p>
            <p className="message-text">
              지속적인 혁신과 투자를 통해 대한민국 의료 생태계의 발전에 기여하겠습니다.
            </p>
            <div className="message-signature">
              <p className="signature-name">(주)이스트바이오 대표이사</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CompanyIntro

