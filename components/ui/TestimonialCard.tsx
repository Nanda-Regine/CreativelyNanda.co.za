'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { cn, getInitials } from '@/lib/utils';

export interface Testimonial {
  author_name: string;
  author_title: string;
  author_avatar?: string;
  content: string;
  rating: number;
  product?: string;
}

export interface TestimonialCardProps {
  testimonial: Testimonial;
  variant?: 'default' | 'featured' | 'compact';
  className?: string;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={cn(
            'w-4 h-4',
            i < rating ? 'text-amber-400' : 'text-navy/20'
          )}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function Avatar({
  src,
  name,
  size = 'md',
}: {
  src?: string;
  name: string;
  size?: 'sm' | 'md' | 'lg';
}) {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-16 h-16 text-base',
  };

  if (src) {
    return (
      <div className={cn('relative rounded-full overflow-hidden', sizes[size])}>
        <Image src={src} alt={name} fill className="object-cover" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-full bg-cherry text-cream font-medium',
        sizes[size]
      )}
    >
      {getInitials(name)}
    </div>
  );
}

export function TestimonialCard({
  testimonial,
  variant = 'default',
  className,
}: TestimonialCardProps) {
  if (variant === 'compact') {
    return (
      <div className={cn('flex gap-3 p-3', className)}>
        <Avatar src={testimonial.author_avatar} name={testimonial.author_name} size="sm" />
        <div className="flex-1 min-w-0">
          <p className="text-sm text-navy/80 line-clamp-2">"{testimonial.content}"</p>
          <p className="text-xs text-navy/60 mt-1">- {testimonial.author_name}</p>
        </div>
      </div>
    );
  }

  if (variant === 'featured') {
    return (
      <motion.div
        whileHover={{ y: -4 }}
        className={cn(
          'relative bg-cream rounded-2xl p-8 shadow-lg',
          className
        )}
      >
        {/* Quote mark */}
        <svg
          className="absolute top-6 left-6 w-12 h-12 text-cherry/10"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>

        <div className="relative">
          <StarRating rating={testimonial.rating} />

          <blockquote className="text-xl text-navy mt-6 leading-relaxed">
            "{testimonial.content}"
          </blockquote>

          {testimonial.product && (
            <p className="text-sm text-cherry mt-4">
              Purchased: {testimonial.product}
            </p>
          )}

          <div className="flex items-center gap-4 mt-6 pt-6 border-t border-navy/10">
            <Avatar
              src={testimonial.author_avatar}
              name={testimonial.author_name}
              size="lg"
            />
            <div>
              <p className="font-semibold text-navy">{testimonial.author_name}</p>
              <p className="text-navy/60">{testimonial.author_title}</p>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Default variant
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className={cn(
        'bg-cream rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow',
        className
      )}
    >
      <StarRating rating={testimonial.rating} />

      <blockquote className="text-navy/80 mt-4 leading-relaxed">
        "{testimonial.content}"
      </blockquote>

      {testimonial.product && (
        <p className="text-xs text-cherry mt-3">
          Purchased: {testimonial.product}
        </p>
      )}

      <div className="flex items-center gap-3 mt-4 pt-4 border-t border-navy/10">
        <Avatar
          src={testimonial.author_avatar}
          name={testimonial.author_name}
          size="md"
        />
        <div>
          <p className="font-medium text-navy">{testimonial.author_name}</p>
          <p className="text-sm text-navy/60">{testimonial.author_title}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default TestimonialCard;
