'use client';

import { FaWhatsapp, FaPhone, FaArrowUp } from 'react-icons/fa';
import { useEffect, useState } from 'react';

interface Props {
  phone?: string;
  whatsapp?: string;
}

export default function FloatingActions({ phone, whatsapp }: Props) {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Common button size for consistency
  const buttonSize = "w-14 h-14 sm:w-16 sm:h-16";
  const iconSize = "text-xl sm:text-2xl";

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4 sm:bottom-8 sm:right-8">
      {/* Back to Top */}
      {showTopBtn && (
        <button
          onClick={scrollToTop}
          className={`group ${buttonSize} flex items-center justify-center rounded-2xl bg-[#1a1410] border border-[#d4a853]/30 hover:border-[#d4a853] hover:bg-[#d4a853]/10 transition-all duration-300 transform hover:scale-105 shadow-xl`}
          aria-label="Back to Top"
        >
          <FaArrowUp className={`${iconSize} text-[#d4a853]`} />
        </button>
      )}

      {/* WhatsApp */}
      {whatsapp && (
        <a
          href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`group relative ${buttonSize} flex items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-green-600 text-white shadow-xl hover:shadow-green-500/40 transition-all duration-300 transform hover:scale-105`}
          aria-label="Chat on WhatsApp"
        >
          <FaWhatsapp className={`${iconSize} relative z-10`} />
          {/* Pulse indicator */}
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#d4a853] rounded-full animate-ping"></span>
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#d4a853] rounded-full"></span>
        </a>
      )}

      {/* Phone */}
      {phone && (
        <a
          href={`tel:${phone}`}
          className={`group ${buttonSize} flex items-center justify-center rounded-2xl bg-[#1a1410] border border-[#d4a853]/30 hover:border-[#d4a853] hover:bg-[#d4a853]/10 transition-all duration-300 transform hover:scale-105 shadow-xl`}
          aria-label="Call Us"
        >
          <FaPhone className={`${iconSize} text-[#d4a853]`} />
        </a>
      )}
    </div>
  );
}
