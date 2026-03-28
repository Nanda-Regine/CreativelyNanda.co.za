'use client';

import { forwardRef, InputHTMLAttributes, ReactNode, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  hint?: string;
  size?: 'sm' | 'md' | 'lg';
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2.5 text-base',
  lg: 'px-5 py-3.5 text-lg',
};

const iconSizes = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      hint,
      size = 'md',
      leftIcon,
      rightIcon,
      fullWidth = false,
      className,
      id,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className={cn('relative', fullWidth && 'w-full')}>
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-navy mb-1.5"
          >
            {label}
          </label>
        )}

        {/* Input wrapper */}
        <div className="relative">
          {/* Left icon */}
          {leftIcon && (
            <span
              className={cn(
                'absolute left-3 top-1/2 -translate-y-1/2 text-navy/50',
                iconSizes[size]
              )}
            >
              {leftIcon}
            </span>
          )}

          {/* Input field */}
          <input
            ref={ref}
            id={inputId}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={cn(
              'w-full rounded-lg border bg-white text-navy placeholder:text-navy/40',
              'transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-cherry/30',
              error
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/30'
                : 'border-navy/20 focus:border-cherry',
              sizes[size],
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              props.disabled && 'bg-navy/5 cursor-not-allowed opacity-60',
              className
            )}
            {...props}
          />

          {/* Right icon */}
          {rightIcon && (
            <span
              className={cn(
                'absolute right-3 top-1/2 -translate-y-1/2 text-navy/50',
                iconSizes[size]
              )}
            >
              {rightIcon}
            </span>
          )}

          {/* Focus indicator */}
          <motion.div
            className="absolute bottom-0 left-0 h-0.5 bg-cherry rounded-full"
            initial={{ width: 0 }}
            animate={{ width: isFocused && !error ? '100%' : 0 }}
            transition={{ duration: 0.2 }}
          />
        </div>

        {/* Error or hint message */}
        <AnimatePresence mode="wait">
          {error ? (
            <motion.p
              key="error"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="text-sm text-red-500 mt-1.5"
            >
              {error}
            </motion.p>
          ) : hint ? (
            <motion.p
              key="hint"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="text-sm text-navy/50 mt-1.5"
            >
              {hint}
            </motion.p>
          ) : null}
        </AnimatePresence>
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
