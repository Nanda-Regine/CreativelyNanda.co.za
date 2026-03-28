'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface BadgeProps {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'cherry' | 'navy' | 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  pill?: boolean;
  pulse?: boolean;
  children: ReactNode;
  className?: string;
}

const variants = {
  default: 'bg-navy/10 text-navy',
  success: 'bg-green-100 text-green-700',
  warning: 'bg-amber-100 text-amber-700',
  danger: 'bg-red-100 text-red-700',
  info: 'bg-blue-100 text-blue-700',
  cherry: 'bg-cherry/10 text-cherry',
  navy: 'bg-navy text-cream',
  primary: 'bg-cherry text-white',
  secondary: 'bg-beige text-navy',
  outline: 'bg-transparent border border-navy/30 text-navy',
};

const sizes = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
  lg: 'px-3 py-1.5 text-base',
};

export function Badge({
  variant = 'default',
  size = 'md',
  pill = false,
  pulse = false,
  children,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center font-medium',
        pill ? 'rounded-full' : 'rounded-md',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {pulse && (
        <motion.span
          className={cn(
            'w-2 h-2 rounded-full mr-1.5',
            variant === 'success' && 'bg-green-500',
            variant === 'warning' && 'bg-amber-500',
            variant === 'danger' && 'bg-red-500',
            variant === 'info' && 'bg-blue-500',
            variant === 'cherry' && 'bg-cherry',
            variant === 'navy' && 'bg-cream',
            variant === 'default' && 'bg-navy'
          )}
          animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}
      {children}
    </span>
  );
}

// Preset badges for common use cases
export function NewBadge({ className }: { className?: string }) {
  return (
    <Badge variant="cherry" size="sm" pill className={className}>
      NEW
    </Badge>
  );
}

export function BestsellerBadge({ className }: { className?: string }) {
  return (
    <Badge variant="success" size="sm" pill className={className}>
      BESTSELLER
    </Badge>
  );
}

export function PopularBadge({ className }: { className?: string }) {
  return (
    <Badge variant="warning" size="sm" pill className={className}>
      POPULAR
    </Badge>
  );
}

export function LaunchingBadge({ className }: { className?: string }) {
  return (
    <Badge variant="info" size="sm" pill pulse className={className}>
      LAUNCHING
    </Badge>
  );
}

export function ComingSoonBadge({ className }: { className?: string }) {
  return (
    <Badge variant="navy" size="sm" pill className={className}>
      COMING SOON
    </Badge>
  );
}

export function BetaBadge({ className }: { className?: string }) {
  return (
    <Badge variant="warning" size="sm" pill className={className}>
      BETA
    </Badge>
  );
}

export function LiveBadge({ className }: { className?: string }) {
  return (
    <Badge variant="success" size="sm" pill pulse className={className}>
      LIVE
    </Badge>
  );
}

export default Badge;
