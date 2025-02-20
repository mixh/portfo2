'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import { navigation } from '@/data/navigation';
import { personalInfo } from '@/data/personalInfo';

function DropdownMenu({ items, isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scaleY: 0, y: -20 }}
          animate={{ opacity: 1, scaleY: 1, y: 0 }}
          exit={{ opacity: 0, scaleY: 0, y: -20 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          style={{ transformOrigin: 'top' }}
          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 rounded-md overflow-hidden"
        >
          <div className="bg-background border border-foreground/10 rounded-md shadow-lg divide-y divide-foreground/5">
            {items.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-4 py-2.5 text-sm hover:bg-accent1/5 transition-colors"
                onClick={onClose}
              >
                <motion.div
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-2"
                >
                  <span className="font-mono text-accent1">{`</>`}</span>
                  {item.name}
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function NavMenu() {
  const [openMenu, setOpenMenu] = useState(null);

  const handleNavClick = (e, href) => {
    // Close mobile menu when clicking a link
    setOpenMenu(null);
    
    // If it's a hash link, handle smooth scroll
    if (href.startsWith('/#')) {
      e.preventDefault();
      const element = document.querySelector(href.replace('/', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-foreground/10">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-background/80 backdrop-blur-sm">
        <div className="relative flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link 
              href="/" 
              className="flex items-center gap-2"
              onClick={(e) => handleNavClick(e, '/')}
            >
              <span className="font-mono text-lg">
                <span className="text-accent1">{'<'}</span>
                <span className="font-display font-bold">{personalInfo.name.split(' ')[0]}</span>
                <span className="text-accent1">{'/>'}</span>
              </span>
            </Link>
          </div>

          {/* Center Navigation */}
          <div className="hidden md:flex items-center justify-center flex-1 mx-8">
            <div className="flex items-center gap-8">
              {navigation.main.map((menu) => (
                <div
                  key={menu.title}
                  className="relative"
                  onMouseEnter={() => setOpenMenu(menu.title)}
                  onMouseLeave={() => setOpenMenu(null)}
                >
                  <motion.button
                    className="py-2 px-3 text-sm font-mono rounded-md hover:bg-foreground/5 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-accent1">./</span>
                    {menu.title}
                  </motion.button>
                  <DropdownMenu
                    items={menu.items}
                    isOpen={openMenu === menu.title}
                    onClose={() => setOpenMenu(null)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <ThemeToggle />
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-2">
              <ThemeToggle />
              <motion.button
                className="rounded-md p-2 hover:bg-foreground/5"
                whileTap={{ scale: 0.9 }}
                onClick={() => setOpenMenu(openMenu ? null : 'mobile')}
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={openMenu ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                  />
                </svg>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {openMenu === 'mobile' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden border-t border-foreground/10"
            >
              <div className="py-2 space-y-1">
                {navigation.main.map((menu) => (
                  <div key={menu.title} className="px-3">
                    <div className="px-3 py-2 text-sm font-mono text-foreground/60">
                      <span className="text-accent1"># </span>
                      {menu.title}
                    </div>
                    {menu.items.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block px-3 py-2 rounded-md text-sm hover:bg-foreground/5"
                        onClick={(e) => handleNavClick(e, item.href)}
                      >
                        <motion.div
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          className="flex items-center gap-2"
                        >
                          <span className="font-mono text-accent1">{'>'}</span>
                          {item.name}
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
} 