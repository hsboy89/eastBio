import { memo } from 'react'
import './Section.css'

export interface SectionProps {
    id: string
    title?: string
    subtitle?: string
    backgroundImage?: string
    className?: string
    children: React.ReactNode
}

export const Section = memo(({
    id,
    title,
    subtitle,
    backgroundImage,
    className = '',
    children
}: SectionProps) => {
    const style = backgroundImage
        ? { '--bg-image': `url(${backgroundImage})` } as React.CSSProperties
        : undefined

    return (
        <section
            id={id}
            className={`section ${className}`}
            style={style}
        >
            <div className="section-container">
                {(title || subtitle) && (
                    <div className="section-header">
                        {title && <h2 className="section-title">{title}</h2>}
                        {subtitle && <p className="section-subtitle">{subtitle}</p>}
                    </div>
                )}
                {children}
            </div>
        </section>
    )
})

Section.displayName = 'Section'

export default Section
