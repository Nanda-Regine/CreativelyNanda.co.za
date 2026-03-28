'use client';

import { ReactNode, forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface CardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  variant?: 'default' | 'elevated' | 'outlined' | 'glass';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
  grain?: boolean;
  children: ReactNode;
}

const variants = {
  default: 'bg-cream',
  elevated: 'bg-cream shadow-lg',
  outlined: 'bg-transparent border-2 border-navy/20',
  glass: 'bg-cream/80 backdrop-blur-md border border-white/20',
};

const paddings = {
  none: 'p-0',
  sm: 'p-3',
  md: 'p-5',
  lg: 'p-8',
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'default',
      padding = 'md',
      hover = false,
      grain = false,
      children,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <motion.div
        ref={ref}
        whileHover={
          hover
            ? {
                y: -4,
                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.12)',
              }
            : undefined
        }
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className={cn(
          'relative rounded-xl overflow-hidden',
          variants[variant],
          paddings[padding],
          hover && 'cursor-pointer transition-shadow duration-300',
          className
        )}
        {...props}
      >
        {/* Grain texture overlay */}
        {grain && (
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-multiply"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />
        )}
        {children}
      </motion.div>
    );
  }
);

Card.displayName = 'Card';

// Card subcomponents
export const CardHeader = forwardRef<HTMLDivElement, { children: ReactNode; className?: string }>(
  ({ children, className }, ref) => (
    <div ref={ref} className={cn('mb-4', className)}>
      {children}
    </div>
  )
);
CardHeader.displayName = 'CardHeader';

export const CardTitle = forwardRef<HTMLHeadingElement, { children: ReactNode; className?: string }>(
  ({ children, className }, ref) => (
    <h3 ref={ref} className={cn('text-xl font-display font-semibold text-navy', className)}>
      {children}
    </h3>
  )
);
CardTitle.displayName = 'CardTitle';

export const CardDescription = forwardRef<HTMLParagraphElement, { children: ReactNode; className?: string }>(
  ({ children, className }, ref) => (
    <p ref={ref} className={cn('text-navy/70 mt-1', className)}>
      {children}
    </p>
  )
);
CardDescription.displayName = 'CardDescription';

export const CardContent = forwardRef<HTMLDivElement, { children: ReactNode; className?: string }>(
  ({ children, className }, ref) => (
    <div ref={ref} className={cn('', className)}>
      {children}
    </div>
  )
);
CardContent.displayName = 'CardContent';

export const CardFooter = forwardRef<HTMLDivElement, { children: ReactNode; className?: string }>(
  ({ children, className }, ref) => (
    <div ref={ref} className={cn('mt-4 pt-4 border-t border-navy/10', className)}>
      {children}
    </div>
  )
);
CardFooter.displayName = 'CardFooter';

export default Card;
