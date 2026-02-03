'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';
import { FaWhatsapp, FaPhone } from 'react-icons/fa';

interface NavbarProps {
  companyName?: string;
  logo?: string;
  whatsapp?: string;
  phone?: string;
}

export default function Navbar({ companyName = 'AgroPure', logo, whatsapp = '919876543210', phone = '+91 98765 43210' }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show/hide based on scroll direction
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
        setIsOpen(false);
      }

      // Add glass effect when scrolled
      setIsScrolled(currentScrollY > 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Products', href: '/products' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-all duration-500 ${isVisible ? 'translate-y-0' : '-translate-y-full'
          } ${isScrolled || isOpen
            ? 'py-3 bg-[#1a1410]/95 backdrop-blur-xl border-b border-[#d4a853]/20 shadow-2xl'
            : 'py-5 bg-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#d4a853] to-[#c68b2c] rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                <span className="text-[#1a1410] text-xl sm:text-2xl">🌾</span>
              </div>
              <span className="text-xl sm:text-2xl font-bold text-[#fef5e7] tracking-tight group-hover:text-[#d4a853] transition-colors">
                {companyName}
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="relative px-5 py-2 text-[#fef5e7]/80 font-medium hover:text-[#fef5e7] transition-colors group"
                >
                  <span>{link.name}</span>
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#d4a853] group-hover:w-1/2 transition-all duration-300"></span>
                </Link>
              ))}

              {/* CTA Button */}
              <Link
                href="/contact"
                className="ml-6 px-6 py-2.5 bg-gradient-to-r from-[#d4a853] to-[#c68b2c] text-[#1a1410] font-bold rounded-full hover:shadow-lg hover:shadow-[#d4a853]/30 transition-all transform hover:scale-105"
              >
                Get Quote
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden relative w-12 h-12 flex items-center justify-center rounded-xl border border-[#d4a853]/30 bg-[#1a1410]/50"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <HiX className="w-6 h-6 text-[#fef5e7]" />
              ) : (
                <HiMenu className="w-6 h-6 text-[#fef5e7]" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Menu Panel - Full screen overlay style */}
      <div
        className={`md:hidden fixed inset-0 z-50 flex items-center justify-center transition-all duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
      >
        <div
          className={`relative w-[90%] max-w-md bg-gradient-to-br from-[#1a1410] to-[#0d0a08] border border-[#d4a853]/20 rounded-3xl shadow-2xl transform transition-all duration-500 ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'
            }`}
        >
          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-[#d4a853]/10 border border-[#d4a853]/20 hover:bg-[#d4a853]/20 transition-colors"
            aria-label="Close menu"
          >
            <HiX className="w-5 h-5 text-[#d4a853]" />
          </button>

          {/* Logo Header */}
          <div className="pt-8 pb-6 px-8 border-b border-[#d4a853]/10">
            <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[#d4a853] to-[#c68b2c] rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-[#1a1410] text-2xl">🌾</span>
              </div>
              <div>
                <span className="text-xl font-bold text-[#fef5e7] block">{companyName}</span>
                <span className="text-xs text-[#d4a853]/70 uppercase tracking-wider">Premium Agricultural Products</span>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="py-6 px-4">
            {navLinks.map((link, i) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-4 px-4 py-4 text-lg text-[#fef5e7] font-medium rounded-xl hover:bg-[#d4a853]/10 transition-all group"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <span className="w-2 h-2 rounded-full bg-[#d4a853]/30 group-hover:bg-[#d4a853] transition-colors"></span>
                <span className="group-hover:text-[#d4a853] transition-colors">{link.name}</span>
              </Link>
            ))}
          </div>

          {/* Quick Contact Section */}
          <div className="px-6 py-6 border-t border-[#d4a853]/10 space-y-3">
            <p className="text-xs text-[#fef5e7]/40 uppercase tracking-wider mb-3 px-2">Quick Contact</p>
            <a
              href={`https://wa.me/${whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 bg-green-600/20 border border-green-500/30 rounded-xl text-green-400 hover:bg-green-600/30 transition-colors"
            >
              <FaWhatsapp className="text-xl" />
              <span className="font-medium">Chat on WhatsApp</span>
            </a>
            <a
              href={`tel:${phone}`}
              className="flex items-center gap-3 px-4 py-3 bg-[#d4a853]/10 border border-[#d4a853]/20 rounded-xl text-[#d4a853] hover:bg-[#d4a853]/20 transition-colors"
            >
              <FaPhone className="text-lg" />
              <span className="font-medium">{phone}</span>
            </a>
          </div>

          {/* CTA Button */}
          <div className="p-6 pt-0">
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="block w-full py-4 bg-gradient-to-r from-[#d4a853] to-[#c68b2c] text-[#1a1410] font-bold rounded-xl text-center text-lg shadow-lg hover:shadow-[#d4a853]/30 transition-all"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}