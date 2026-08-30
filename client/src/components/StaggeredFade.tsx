import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface StaggeredFadeProps {
  text: string;
  className?: string;
  delayOffset?: number;
}

export function StaggeredFade({ text, className = '', delayOffset = 0 }: StaggeredFadeProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  const characters = Array.from(text);

  return (
    <span ref={ref} className={`inline-block overflow-hidden ${className}`}>
      {characters.map((char, index) => {
        return (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={
              isInView
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 10 }
            }
            transition={{
              duration: 0.6,
              ease: 'easeOut',
              delay: delayOffset + index * 0.07,
            }}
            className="inline-block"
            style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        );
      })}
    </span>
  );
}
