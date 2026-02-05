'use client';

import { ReactNode, Children, cloneElement, isValidElement } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';

interface StaggerChildrenProps {
  children: ReactNode;
  staggerDelay?: number;
  initialDelay?: number;
  animation?: 'fadeUp' | 'fadeDown' | 'fadeLeft' | 'fadeRight' | 'scale' | 'custom';
  customVariants?: {
    container?: Variants;
    item?: Variants;
  };
  className?: string;
  itemClassName?: string;
  once?: boolean;
  triggerOnView?: boolean;
  viewMargin?: string;
  duration?: number;
}

const containerVariants = (staggerDelay: number, initialDelay: number): Variants => ({
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: initialDelay,
      staggerChildren: staggerDelay,
    },
  },
});

const itemAnimations: Record<string, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        ease: [0.22, 1, 0.36, 1],
      },
    },
  },
  fadeDown: {
    hidden: { opacity: 0, y: -40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        ease: [0.22, 1, 0.36, 1],
      },
    },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        ease: [0.22, 1, 0.36, 1],
      },
    },
  },
  fadeRight: {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        ease: [0.22, 1, 0.36, 1],
      },
    },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20,
      },
    },
  },
};

export function StaggerChildren({
  children,
  staggerDelay = 0.1,
  initialDelay = 0,
  animation = 'fadeUp',
  customVariants,
  className = '',
  itemClassName = '',
  once = true,
  triggerOnView = true,
  viewMargin = '-100px',
  duration = 0.5,
}: StaggerChildrenProps) {
  const container = customVariants?.container ?? containerVariants(staggerDelay, initialDelay);
  const item = customVariants?.item ?? {
    ...itemAnimations[animation],
    visible: {
      ...itemAnimations[animation].visible,
      transition: {
        ...((itemAnimations[animation].visible as any)?.transition || {}),
        duration,
      },
    },
  };

  const viewportConfig = triggerOnView
    ? { once, margin: viewMargin, amount: 0.1 as const }
    : undefined;

  return (
    <motion.div
      initial="hidden"
      {...(triggerOnView ? { whileInView: 'visible' } : { animate: 'visible' })}
      viewport={viewportConfig}
      variants={container}
      className={className}
    >
      {Children.map(children, (child, index) => {
        if (!isValidElement(child)) return child;

        return (
          <motion.div
            key={index}
            variants={item}
            className={itemClassName}
          >
            {child}
          </motion.div>
        );
      })}
    </motion.div>
  );
}

// Grid variant for card layouts
interface StaggerGridProps extends Omit<StaggerChildrenProps, 'className'> {
  columns?: { sm?: number; md?: number; lg?: number; xl?: number };
  gap?: string;
  className?: string;
}

export function StaggerGrid({
  columns = { sm: 1, md: 2, lg: 3 },
  gap = 'gap-6',
  className = '',
  ...props
}: StaggerGridProps) {
  const gridCols = [
    columns.sm && `grid-cols-${columns.sm}`,
    columns.md && `md:grid-cols-${columns.md}`,
    columns.lg && `lg:grid-cols-${columns.lg}`,
    columns.xl && `xl:grid-cols-${columns.xl}`,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <StaggerChildren
      {...props}
      className={`grid ${gridCols} ${gap} ${className}`}
    />
  );
}

// List variant for sequential items
export function StaggerList({
  children,
  ordered = false,
  className = '',
  ...props
}: StaggerChildrenProps & { ordered?: boolean }) {
  const Tag = ordered ? 'ol' : 'ul';

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: props.once ?? true, margin: props.viewMargin ?? '-100px' }}
      variants={containerVariants(props.staggerDelay ?? 0.1, props.initialDelay ?? 0)}
      className={className}
    >
      <Tag className="space-y-2">
        {Children.map(children, (child, index) => {
          if (!isValidElement(child)) return child;

          return (
            <motion.li
              key={index}
              variants={itemAnimations[props.animation ?? 'fadeUp']}
              className={props.itemClassName}
            >
              {child}
            </motion.li>
          );
        })}
      </Tag>
    </motion.div>
  );
}

// Animate presence wrapper for dynamic lists
interface AnimatedListProps {
  children: ReactNode;
  className?: string;
}

export function AnimatedList({ children, className = '' }: AnimatedListProps) {
  return (
    <div className={className}>
      <AnimatePresence mode="popLayout">
        {Children.map(children, (child, index) => {
          if (!isValidElement(child)) return child;

          return (
            <motion.div
              key={(child as any).key ?? index}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{
                duration: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {child}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

export default StaggerChildren;
