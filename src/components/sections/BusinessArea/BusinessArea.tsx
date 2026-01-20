import { motion } from 'framer-motion'
import { memo } from 'react'
import { imageUrls } from '../../../lib/supabase'
import './BusinessArea.css'

// Card 컴포넌트를 memo로 감싸서 불필요한 리렌더링 방지 (회사소개 방식 적용)
const BusinessCard = memo(({
    icon,
    title,
    titleFormatted,
    description,
    features
}: {
    icon: string
    title: string
    titleFormatted?: React.ReactNode
    description: React.ReactNode
    features: string[]
}) => (
    <motion.div
        className="business-card"
        whileHover={{ y: -10, scale: 1.02 }}
        transition={{ duration: 0.3 }}
    >
        <div className="card-header">
            <div className="card-icon">{icon}</div>
            <h3 className="card-title">{titleFormatted || title}</h3>
        </div>
        <p className="card-description">{description}</p>
        <ul className="card-features">
            {features.map((feature, index) => (
                <li key={index}>
                    <span className="feature-check">✓</span>
                    {feature}
                </li>
            ))}
        </ul>
    </motion.div>
))

BusinessCard.displayName = 'BusinessCard'

const BusinessArea = () => {

    return (
        <section
            id="business"
            className="business-area"
            style={{ '--bg-image': `url(${imageUrls.business})` } as React.CSSProperties}
        >
            <div className="section-container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '0px' }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="section-title">사업 영역</h2>
                    <p className="section-subtitle">
                        전문의약품, 일반의약품, 의료기기 유통을 통해 의료 생태계를 연결합니다.
                    </p>
                </motion.div>

                <div className="business-grid">
                    <BusinessCard
                        icon="💊"
                        title="전문의약품 유통"
                        titleFormatted={<>전문의약품 유통</>}
                        description={<>
                            의사 처방이 필요한 전문의약품의<br />
                            안전하고 신속한 유통 서비스를 제공합니다.
                        </>}
                        features={['정확한 온도 관리', '신속한 배송', '품질 보증']}
                    />
                    <BusinessCard
                        icon="📦"
                        title="일반의약품 유통"
                        titleFormatted={<>일반의약품 유통</>}
                        description={<>
                            약국에서 판매되는 일반의약품의<br />
                            효율적인 유통망을 구축하고 운영합니다.
                        </>}
                        features={['광범위한 제품 라인업', '안정적인 공급', '경쟁력 있는 가격']}
                    />
                    <BusinessCard
                        icon="🏥"
                        title="의료기기 유통"
                        titleFormatted={<>
                            의료기기<br />유통
                        </>}
                        description={<>
                            병원과 의료기관에 필요한 의료기기를
                            전문적으로 유통합니다.
                        </>}
                        features={['전문 유통 서비스', 'A/S 지원', '기술 지원']}
                    />
                </div>
            </div>
        </section>
    )
}

export default BusinessArea
