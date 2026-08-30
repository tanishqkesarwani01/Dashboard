import React from 'react';
import { motion } from 'framer-motion';
import { Navbar } from './Navbar';
import { StaggeredFade } from './StaggeredFade';

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260619_191346_9d19d66e-86a4-47f7-8dc6-712c1788c3b2.mp4';

export function HeroSection() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#010101] flex flex-col justify-between select-none">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none z-0"
      >
        <source src={VIDEO_URL} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Subtle Ambient Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none z-[1]" />

      {/* Navigation Bar */}
      <Navbar />

      {/* Hero Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-5 sm:px-8 pt-12 sm:pt-16 md:pt-24 max-w-6xl mx-auto w-full">
        {/* Responsive Garamond Heading */}
        <h1 className="font-garamond font-normal text-white text-4xl sm:text-6xl md:text-8xl lg:text-9xl leading-[1.08] tracking-tight mb-6 sm:mb-8 flex flex-col items-center">
          <StaggeredFade text="WITNESS THE" delayOffset={0.1} />
          <StaggeredFade text="HIDDEN REALM" delayOffset={0.9} />
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6, ease: 'easeOut' }}
          className="text-white/70 font-light leading-relaxed max-w-xs sm:max-w-md mb-8 sm:mb-10 text-sm sm:text-base md:text-lg"
        >
          An odyssey through delicate living forms,{' '}
          <br className="hidden sm:inline" />
          revealed by lens and curiosity.
        </motion.p>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.0, ease: 'easeOut' }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="liquid-glass rounded-full px-7 sm:px-10 py-3.5 sm:py-4 text-white/90 uppercase tracking-[0.18em] sm:tracking-[0.2em] text-xs sm:text-sm font-medium transition-all cursor-pointer"
        >
          Begin the Experience
        </motion.button>
      </main>

      {/* Bottom Spacer for balanced viewport layout */}
      <div className="relative z-10 pb-8 sm:pb-12 text-center pointer-events-none opacity-0">
        <span className="text-xs text-white/40 tracking-[0.2em]">Scroll</span>
      </div>
    </div>
  );
}
