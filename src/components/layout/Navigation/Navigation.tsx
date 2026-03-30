import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Navigation.css'

const Navigation = () => {
    const hasAnimatedRef = useRef(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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
        hidden: { opacity: 0, y: -10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.3,
            },
        },
    }

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        // Navigation은 페이지 로드 시 바로 보이므로 한 번만 실행
        if (!hasAnimatedRef.current) {
            hasAnimatedRef.current = true
        }
    }, [])

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
            setIsMobileMenuOpen(false)
        }
    }

    const navItems = [
        { id: 'hero', label: '홈' },
        { id: 'company', label: '회사소개' },
        { id: 'business', label: '사업영역' },
        { id: 'strengths', label: '핵심역량' },
        { id: 'partners', label: '파트너' },
        { id: 'contact', label: '연락처' },
    ]

    return (
        <motion.nav
            className={`navigation ${isScrolled ? 'scrolled' : ''}`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <div className="nav-container">
                <motion.div
                    className="logo"
                    onClick={() => scrollToSection('hero')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <span className="logo-text">(주)이스트바이오</span>
                </motion.div>

                <motion.ul
                    className="nav-menu"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {navItems.map((item) => (
                        <motion.li key={item.id} variants={itemVariants}>
                            <motion.button
                                onClick={() => scrollToSection(item.id)}
                                whileHover={{ y: -2 }}
                                whileTap={{ y: 0 }}
                            >
                                {item.label}
                            </motion.button>
                        </motion.li>
                    ))}
                </motion.ul>

                <button
                    className="mobile-menu-toggle"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="메뉴 토글"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        className="mobile-menu"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                    >
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className="mobile-menu-item"
                            >
                                {item.label}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    )
}

export default Navigation
