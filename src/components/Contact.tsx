import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { memo } from 'react'
import { imageUrls } from '../lib/supabase'
import './Contact.css'

// Card 컴포넌트를 memo로 감싸서 불필요한 리렌더링 방지 (회사소개 방식 적용)
const ContactInfoItem = memo(({ icon, label, value }: { icon: string, label: string, value: string }) => (
  <div className="info-item">
    <div className="info-icon">{icon}</div>
    <div className="info-content">
      <div className="info-label">{label}</div>
      <div className="info-value">{value}</div>
    </div>
  </div>
))

ContactInfoItem.displayName = 'ContactInfoItem'

const Contact = () => {

  return (
    <>
      <Helmet>
        <meta name="contact" content="(주)이스트바이오 연락처 정보" />
      </Helmet>

      <section
        id="contact"
        className="contact"
        style={{ '--bg-image': `url(${imageUrls.contact})` } as React.CSSProperties}
      >
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px' }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">연락처</h2>
            <p className="section-subtitle">
              문의사항이 있으시면 언제든지 연락주시기 바랍니다.
            </p>
          </motion.div>

          <motion.div
            className="contact-content"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="info-title">연락처 정보</h3>
            <div className="info-list">
              <ContactInfoItem icon="📍" label="주소" value="서울특별시 강남구 테헤란로 123" />
              <ContactInfoItem icon="📞" label="전화" value="02-1234-5678" />
              <ContactInfoItem icon="📠" label="팩스" value="02-1234-5679" />
              <ContactInfoItem icon="✉️" label="이메일" value="contact@eastbio.co.kr" />
            </div>
          </motion.div>

          <motion.div
            className="contact-footer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px' }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p className="footer-text">
              © 2024 (주)이스트바이오. All rights reserved.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default Contact

