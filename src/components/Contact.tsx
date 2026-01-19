import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { useRef } from 'react'
import { imageUrls } from '../lib/supabase'
import './Contact.css'

const Contact = () => {
  const hasAnimatedRef = useRef(false)
  const contactInfo = [
    { icon: '📍', label: '주소', value: '서울특별시 강남구 테헤란로 123' },
    { icon: '📞', label: '전화', value: '02-1234-5678' },
    { icon: '📠', label: '팩스', value: '02-1234-5679' },
    { icon: '✉️', label: '이메일', value: 'contact@eastbio.co.kr' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

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

          <div className="contact-content">
            <motion.div
              className="contact-info"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="info-title">연락처 정보</h3>
              <motion.div
                className="info-list"
                variants={containerVariants}
                initial="hidden"
                animate={hasAnimatedRef.current ? "visible" : "hidden"}
                whileInView={!hasAnimatedRef.current ? "visible" : undefined}
                viewport={{ once: true, amount: 0.2 }}
                onViewportEnter={() => {
                  if (!hasAnimatedRef.current) {
                    hasAnimatedRef.current = true
                  }
                }}
              >
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    className="info-item"
                    variants={itemVariants}
                  >
                    <div className="info-icon">{info.icon}</div>
                    <div className="info-content">
                      <div className="info-label">{info.label}</div>
                      <div className="info-value">{info.value}</div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              className="contact-map"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '0px' }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="map-title">오시는 길</h3>
              <div className="map-container">
                {/* 실제 지도는 카카오맵이나 구글맵 API를 사용할 수 있습니다 */}
                <div className="map-placeholder">
                  <div className="map-marker">📍</div>
                  <p>지도가 여기에 표시됩니다</p>
                  <p className="map-note">
                    카카오맵 또는 구글맵 API를 연동하여 실제 지도를 표시할 수 있습니다.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

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

