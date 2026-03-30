import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { useEffect, useState } from 'react'
import { imageUrls } from '../../../lib/supabase'
import './Hero.css'

const quickLinks = [
    { icon: '💊', title: '전문의약품 유통', target: 'business' },
    { icon: '📦', title: '일반의약품 유통', target: 'business' },
    { icon: '🏥', title: '의료기기 유통',   target: 'business' },
    { icon: '🤝', title: '파트너 네트워크', target: 'partners' },
]

const Hero = () => {
    const [imageLoaded, setImageLoaded] = useState(false)

    useEffect(() => {
        const img = new Image()
        img.src = imageUrls.hero
        img.loading = 'eager'
        img.fetchPriority = 'high'
        img.onload = () => setImageLoaded(true)
        img.onerror = () => setImageLoaded(true)
    }, [])

    const scrollTo = (id: string) => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <>
            <Helmet>
                <title>(주)이스트바이오 | 의약품 도매업의 선도기업</title>
                <meta name="description" content="(주)이스트바이오는 전문의약품, 일반의약품, 의료기기 유통을 전문으로 하는 의약품 도매업체입니다." />
                <meta name="keywords" content="이스트바이오, 의약품도매, 제약유통, 콜드체인" />
            </Helmet>

            <section id="hero" className="hero">
                {/* Background */}
                <div className="hero-bg">
                    <div
                        className={`hero-bg-img ${imageLoaded ? 'loaded' : ''}`}
                        style={{ backgroundImage: imageLoaded ? `url(${imageUrls.hero})` : 'none' }}
                    />
                    <div className="hero-bg-overlay" />
                </div>

                {/* Center content */}
                <div className="hero-body">
                    <motion.div
                        className="hero-text"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.2 }}
                    >
                        <motion.p
                            className="hero-eyebrow"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.7, delay: 0.3 }}
                        >
                            신뢰와 혁신으로 의료를 연결합니다
                        </motion.p>
                        <motion.h1
                            className="hero-title"
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.9, delay: 0.45 }}
                        >
                            대한민국 의약품 유통의<br />
                            <span className="hero-title-accent">선도 기업</span>
                        </motion.h1>
                        <motion.p
                            className="hero-subtitle"
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.65 }}
                        >
                            정확한 온도 관리와 신속한 배송 시스템을 통해<br />
                            안전하고 효과적인 의약품을 전달합니다.
                        </motion.p>
                        <motion.div
                            className="hero-actions"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.85 }}
                        >
                            <button className="hero-btn-primary" onClick={() => scrollTo('company')}>
                                회사 소개
                            </button>
                            <button className="hero-btn-secondary" onClick={() => scrollTo('contact')}>
                                문의하기
                            </button>
                        </motion.div>
                    </motion.div>

                </div>

                {/* Quick access bar — 동국시스템즈 하단 바 */}
                <motion.div
                    className="hero-quickbar"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.0 }}
                >
                    {quickLinks.map((link) => (
                        <button
                            key={link.title}
                            className="quickbar-item"
                            onClick={() => scrollTo(link.target)}
                        >
                            <span className="quickbar-icon">{link.icon}</span>
                            <div className="quickbar-text">
                                <span className="quickbar-title">{link.title}</span>
                                <span className="quickbar-sub">자세히 보기</span>
                            </div>
                            <span className="quickbar-arrow">›</span>
                        </button>
                    ))}
                </motion.div>
            </section>
        </>
    )
}

export default Hero
