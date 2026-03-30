import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import './Navigation.css'

const navData = [
    {
        id: 'company',
        label: '회사소개',
        sub: ['회사소개', '대표인사말', '핵심가치', '연혁'],
    },
    {
        id: 'business',
        label: '사업영역',
        sub: ['전문의약품 유통', '일반의약품 유통', '의료기기 유통'],
    },
    {
        id: 'strengths',
        label: '핵심역량',
        sub: ['콜드체인 시스템', '신속배송 네트워크', '데이터 기반 물류', '품질보증 시스템'],
    },
    {
        id: 'partners',
        label: '파트너 & 네트워크',
        sub: ['협력 제약사', '의료기관 네트워크', '전국 유통망'],
    },
    {
        id: 'contact',
        label: '연락처',
        sub: ['연락처 정보', '오시는 길'],
    },
]

const Navigation = () => {
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

    useEffect(() => {
        return () => {
            if (closeTimer.current) clearTimeout(closeTimer.current)
        }
    }, [])

    const handleMouseEnter = (id: string) => {
        if (closeTimer.current) clearTimeout(closeTimer.current)
        setActiveDropdown(id)
    }

    const handleMouseLeave = () => {
        closeTimer.current = setTimeout(() => setActiveDropdown(null), 120)
    }

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
            setActiveDropdown(null)
            setIsMobileMenuOpen(false)
        }
    }

    return (
        <nav className="navigation">
            {/* Main bar */}
            <div className="nav-bar">
                <div className="nav-container">
                    <div className="logo" onClick={() => scrollToSection('hero')}>
                        <span className="logo-text">(주)이스트바이오</span>
                    </div>

                    <ul className="nav-menu">
                        {navData.map((item) => (
                            <li
                                key={item.id}
                                className={`nav-item ${activeDropdown === item.id ? 'active' : ''}`}
                                onMouseEnter={() => handleMouseEnter(item.id)}
                                onMouseLeave={handleMouseLeave}
                            >
                                <button onClick={() => scrollToSection(item.id)}>
                                    {item.label}
                                </button>
                            </li>
                        ))}
                    </ul>

                    <button
                        className="mobile-menu-toggle"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="메뉴 토글"
                    >
                        <span className={isMobileMenuOpen ? 'open' : ''}></span>
                        <span className={isMobileMenuOpen ? 'open' : ''}></span>
                        <span className={isMobileMenuOpen ? 'open' : ''}></span>
                    </button>
                </div>
            </div>

            {/* Mega dropdown */}
            <AnimatePresence>
                {activeDropdown && (
                    <motion.div
                        className="mega-dropdown"
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.18 }}
                        onMouseEnter={() => {
                            if (closeTimer.current) clearTimeout(closeTimer.current)
                        }}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div className="mega-dropdown-inner">
                            {navData.map((item) => (
                                <div
                                    key={item.id}
                                    className={`mega-col ${activeDropdown === item.id ? 'mega-col--active' : ''}`}
                                >
                                    <p className="mega-col-title">{item.label}</p>
                                    {item.sub.map((sub) => (
                                        <button
                                            key={sub}
                                            className="mega-col-link"
                                            onClick={() => scrollToSection(item.id)}
                                        >
                                            {sub}
                                        </button>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        className="mobile-menu"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                    >
                        {navData.map((item) => (
                            <button
                                key={item.id}
                                className="mobile-menu-item"
                                onClick={() => scrollToSection(item.id)}
                            >
                                {item.label}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}

export default Navigation
