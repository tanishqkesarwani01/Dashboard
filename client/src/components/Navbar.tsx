import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = ['Wander', 'Archive', 'Story', 'Connect'];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="relative z-20 w-full px-6 py-6 md:px-12 md:py-8 flex items-center justify-between md:justify-center">
      {/* Mobile Layout: Brand on Left, Hamburger on Right */}
      <div className="flex md:hidden items-center justify-between w-full">
        <a
          href="#"
          className="text-white uppercase tracking-[0.25em] font-light text-xs sm:text-sm select-none"
        >
          Organic Visions
        </a>
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle mobile menu"
          className="text-white p-1.5 focus:outline-none hover:text-white/80 transition-colors"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Desktop Layout: Centered Flexbox with Brand and Links */}
      <div className="hidden md:flex items-center gap-10 lg:gap-14 text-xs font-light tracking-[0.2em]">
        <a
          href="#wander"
          className="text-white/80 uppercase hover:text-white transition-colors duration-300"
        >
          Wander
        </a>
        <a
          href="#archive"
          className="text-white/80 uppercase hover:text-white transition-colors duration-300"
        >
          Archive
        </a>
        <a
          href="#"
          className="text-white uppercase tracking-[0.3em] font-light text-sm px-2 select-none"
        >
          Organic Visions
        </a>
        <a
          href="#story"
          className="text-white/80 uppercase hover:text-white transition-colors duration-300"
        >
          Story
        </a>
        <a
          href="#connect"
          className="text-white/80 uppercase hover:text-white transition-colors duration-300"
        >
          Connect
        </a>
      </div>

      {/* Mobile Menu Dropdown with Glassmorphism */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed top-16 left-4 right-4 z-50 md:hidden mobile-menu-glass rounded-2xl py-8 gap-5 flex flex-col items-center justify-center"
          >
            {NAV_LINKS.map((link, index) => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => setIsOpen(false)}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  ease: 'easeOut',
                  delay: 0.05 + index * 0.06,
                }}
                className="text-white/90 uppercase tracking-[0.25em] font-light text-sm hover:text-white transition-colors py-1"
              >
                {link}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
