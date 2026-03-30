import { memo } from 'react'
import './Card.css'

export interface CardProps {
    variant?: 'default' | 'intro' | 'business' | 'strength' | 'info'
    icon?: string | React.ReactNode
    title?: string
    description?: React.ReactNode
    features?: string[]
    stats?: string
    hoverable?: boolean
    className?: string
    children?: React.ReactNode
}

export const Card = memo(({
    variant = 'default',
    icon,
    title,
    description,
    features,
    stats,
    hoverable = true,
    className = '',
    children
}: CardProps) => {
    const classes = [
        'card',
        `card-${variant}`,
        hoverable && 'card-hoverable',
        className
    ].filter(Boolean).join(' ')

    return (
        <div className={classes}>
            {icon && <div className="card-icon">{icon}</div>}
            {title && <h3 className="card-title">{title}</h3>}
            {description && <p className="card-description">{description}</p>}
            {features && features.length > 0 && (
                <ul className="card-features">
                    {features.map((feature, index) => (
                        <li key={index}>
                            <span className="feature-check">✓</span>
                            {feature}
                        </li>
                    ))}
                </ul>
            )}
            {stats && <div className="card-stats">{stats}</div>}
            {children}
        </div>
    )
})

Card.displayName = 'Card'

export default Card
