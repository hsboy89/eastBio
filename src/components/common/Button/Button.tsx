import { motion } from 'framer-motion'
import { memo, forwardRef } from 'react'
import './Button.css'

export interface ButtonProps extends React.ComponentProps<typeof motion.button> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
    size?: 'sm' | 'md' | 'lg'
    fullWidth?: boolean
    loading?: boolean
    children: React.ReactNode
}

export const Button = memo(forwardRef<HTMLButtonElement, ButtonProps>(({
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    loading = false,
    disabled,
    children,
    className = '',
    ...props
}, ref) => {
    const classes = [
        'btn',
        `btn-${variant}`,
        `btn-${size}`,
        fullWidth && 'btn-full',
        loading && 'btn-loading',
        className
    ].filter(Boolean).join(' ')

    return (
        <motion.button
            ref={ref}
            className={classes}
            disabled={disabled || loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            {...props}
        >
            {loading ? <span className="btn-spinner" /> : children}
        </motion.button>
    )
}))

Button.displayName = 'Button'

export default Button
