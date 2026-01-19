import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { useState, useEffect, useRef, memo } from 'react'
import { imageUrls } from '../lib/supabase'
import './Contact.css'

// 데이터를 컴포넌트 외부로 이동하여 재생성 방지
const CONTACT_INFO_DATA = [
  { icon: '📍', label: '주소', value: '서울특별시 강남구 테헤란로 123' },
  { icon: '📞', label: '전화', value: '02-1234-5678' },
  { icon: '📠', label: '팩스', value: '02-1234-5679' },
  { icon: '✉️', label: '이메일', value: 'contact@eastbio.co.kr' },
] as const

// Card 컴포넌트를 memo로 감싸서 불필요한 리렌더링 방지
const ContactInfoItem = memo(({ info }: { info: typeof CONTACT_INFO_DATA[number] }) => (
  <motion.div
    className="info-item"
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 },
      },
    }}
  >
    <div className="info-icon">{info.icon}</div>
    <div className="info-content">
      <div className="info-label">{info.label}</div>
      <div className="info-value">{info.value}</div>
    </div>
  </motion.div>
))

ContactInfoItem.displayName = 'ContactInfoItem'

const Contact = () => {
  const [hasAnimated, setHasAnimated] = useState(false)
  const gridRef = useRef<HTMLDivElement>(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  useEffect(() => {
    if (!gridRef.current || hasAnimated) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2, rootMargin: '0px' }
    )

    observer.observe(gridRef.current)

    return () => {
      observer.disconnect()
    }
  }, []) // 빈 배열로 한 번만 실행

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
                ref={gridRef}
                className="info-list"
                variants={containerVariants}
                initial="hidden"
                animate={hasAnimated ? "visible" : "hidden"}
              >
                {CONTACT_INFO_DATA.map((info, index) => (
                  <ContactInfoItem key={index} info={info} />
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

