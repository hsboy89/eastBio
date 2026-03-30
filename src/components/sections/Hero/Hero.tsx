import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { useEffect, useState } from 'react'
import { imageUrls } from '../../../lib/supabase'
import OrbitImages from '../../common/OrbitImages/OrbitImages'
import './Hero.css'

const categories = [
    { icon: '🏢', label: '회사 소개',       target: 'company'   },
    { icon: '💊', label: '사업 영역',       target: 'business'  },
    { icon: '⚡', label: '핵심 역량',       target: 'strengths' },
    { icon: '🤝', label: '파트너 네트워크', target: 'partners'  },
    { icon: '📞', label: '연락처',          target: 'contact'   },
]

const OrbitCategoryItem = ({ icon, label, target }: { icon: string; label: string; target: string }) => {
    const handleClick = () => {
        const el = document.getElementById(target)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
    return (
        <div className="orbit-cat-item" onClick={handleClick}>
            <div className="orbit-cat-circle">
                <span className="orbit-cat-icon">{icon}</span>
            </div>
            <span className="orbit-cat-label">{label}</span>
        </div>
    )
}

const Hero = () => {
    const [imageLoaded, setImageLoaded] = useState(false)

    useEffect(() => {
        const img = new Image()
        if (img.complete || img.naturalWidth > 0) {
            setImageLoaded(true)
            return
        }
        img.src = imageUrls.hero
        img.loading = 'eager'
        img.fetchPriority = 'high'
        img.onload = () => setImageLoaded(true)
        img.onerror = () => setImageLoaded(true)
    }, [])

    const scrollToNext = () => {
        const element = document.getElementById('company')
        if (element) element.scrollIntoView({ behavior: 'smooth' })
    }

    const customOrbitItems = categories.map((cat) => (
        <OrbitCategoryItem key={cat.target} icon={cat.icon} label={cat.label} target={cat.target} />
    ))

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
                <div className="hero-background">
                    <div
                        className={`hero-background-image ${imageLoaded ? 'loaded' : 'loading'}`}
                        style={{ backgroundImage: imageLoaded ? `url(${imageUrls.hero})` : 'none' }}
                    ></div>
                    {!imageLoaded && <div className="hero-background-placeholder"></div>}
                    <div className="hero-background-overlay"></div>
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
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                더 알아보기
                            </motion.button>
                            <motion.button
                                className="btn-secondary"
                                onClick={() => {
                                    const element = document.getElementById('contact')
                                    if (element) element.scrollIntoView({ behavior: 'smooth' })
                                }}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                문의하기
                            </motion.button>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="hero-orbit-wrapper"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.2, delay: 0.6 }}
                    >
                        <OrbitImages
                            customItems={customOrbitItems}
                            shape="ellipse"
                            radiusX={340}
                            radiusY={90}
                            rotation={-8}
                            duration={28}
                            itemSize={90}
                            responsive={true}
                            baseWidth={900}
                            direction="normal"
                            fill
                            showPath
                            pathColor="rgba(110,231,183,0.12)"
                            pathWidth={1}
                            paused={false}
                        />
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
