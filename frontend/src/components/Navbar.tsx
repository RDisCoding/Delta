'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';

interface NavbarProps {
  companyName?: string;
  logo?: string;
}

export default function Navbar({ companyName = 'AgroPure', logo }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [selectedLang, setSelectedLang] = useState('English');

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
        setIsOpen(false);
        setIsLangMenuOpen(false);
        setShowLangMenu(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (showLangMenu && !target.closest('.language-dropdown')) {
        setShowLangMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showLangMenu]);

  const languages = [
    { code: 'en', name: 'English', display: 'English' },
    { code: 'hi', name: 'हिन्दी (Hindi)', display: 'हिन्दी' },
    { code: 'gu', name: 'ગુજરાતી (Gujarati)', display: 'ગુજરાતી' },
    { code: 'mr', name: 'मराठी (Marathi)', display: 'मराठी' },
    { code: 'pa', name: 'ਪੰਜਾਬੀ (Punjabi)', display: 'ਪੰਜਾਬੀ' },
    { code: 'bn', name: 'বাংলা (Bengali)', display: 'বাংলা' },
    { code: 'ta', name: 'தமிழ் (Tamil)', display: 'தமிழ்' },
    { code: 'te', name: 'తెలుగు (Telugu)', display: 'తెలుగు' },
  ];

  const changeLanguage = (langCode: string, displayName: string) => {
    if (typeof window !== 'undefined') {
      // @ts-ignore
      const googleTranslate = window.google?.translate?.TranslateElement;
      if (googleTranslate) {
        const selectElement = document.querySelector('.goog-te-combo') as HTMLSelectElement;
        if (selectElement) {
          selectElement.value = langCode;
          selectElement.dispatchEvent(new Event('change'));
          setSelectedLang(displayName);
          setShowLangMenu(false);

          setTimeout(() => {
            const frames = document.querySelectorAll('iframe.skiptranslate, .goog-te-banner-frame');
            frames.forEach(frame => {
              (frame as HTMLElement).style.display = 'none';
              (frame as HTMLElement).style.visibility = 'hidden';
            });
            document.body.style.top = '0';
            document.body.style.position = 'static';
          }, 100);
        }
      }
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const timeout = setTimeout(() => {
        // @ts-ignore
        if (window.google?.translate && !document.querySelector('.goog-te-combo')) {
          const hiddenDiv = document.createElement('div');
          hiddenDiv.id = 'google_translate_element_hidden';
          hiddenDiv.style.display = 'none';
          document.body.appendChild(hiddenDiv);

          // @ts-ignore
          new window.google.translate.TranslateElement(
            {
              pageLanguage: 'en',
              includedLanguages: 'en,hi,gu,mr,pa,bn,ta,te',
              autoDisplay: false,
            },
            'google_translate_element_hidden'
          );
        }
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, []);

  useEffect(() => {
    const hideGoogleUI = () => {
      const frames = document.querySelectorAll('iframe.skiptranslate, iframe[id^="goog-gt-"], .goog-te-banner-frame');
      frames.forEach(frame => {
        (frame as HTMLElement).style.display = 'none';
        (frame as HTMLElement).style.visibility = 'hidden';
        (frame as HTMLElement).style.opacity = '0';
      });

      if (document.body.style.top !== '0px') {
        document.body.style.top = '0';
      }
      if (document.body.style.position !== 'static') {
        document.body.style.position = 'static';
      }
    };

    hideGoogleUI();
    const interval = setInterval(hideGoogleUI, 100);
    const observer = new MutationObserver(hideGoogleUI);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setIsLangMenuOpen(false);
    }
  };

  const toggleLangMenu = () => {
    setIsLangMenuOpen(!isLangMenuOpen);
    if (!isLangMenuOpen) {
      setIsOpen(false);
    }
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Products', href: '/products' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav
      className={`fixed w-full z-50 bg-gradient-to-r from-green-700 via-green-800 to-green-700 text-white shadow-2xl backdrop-blur-sm transition-transform duration-300 border-b border-green-600/30 ${isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo / Company Name */}
          <Link href="/" className="flex items-center gap-3 group">
            {logo ? (
              <div className="relative w-10 h-10 sm:w-12 sm:h-12">
                <Image
                  src={logo}
                  alt={companyName}
                  fill
                  className="object-contain rounded-lg"
                />
              </div>
            ) : (
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <span className="text-green-800 font-bold text-lg sm:text-xl">🌾</span>
              </div>
            )}
            <span className="text-lg sm:text-xl font-bold tracking-wide group-hover:text-yellow-300 transition-colors">
              {companyName}
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-2">
            <div className="flex items-baseline space-x-4 lg:space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="relative px-3 lg:px-4 py-2.5 rounded-lg text-sm lg:text-base font-semibold transition-all duration-300 hover:bg-white/20 hover:text-yellow-300 group whitespace-nowrap"
                >
                  <span className="relative z-10">{link.name}</span>
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-yellow-400 group-hover:w-3/4 transition-all duration-300"></span>
                </Link>
              ))}
            </div>

            {/* Language Selector - Desktop */}
            <div className="relative ml-4 language-dropdown">
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="flex items-center gap-2 px-3 lg:px-4 py-2.5 rounded-lg text-sm lg:text-base font-semibold transition-all duration-300 hover:bg-white/20 hover:text-yellow-300 whitespace-nowrap border border-white/20"
              >
                <span>🌐</span>
                <span className="hidden lg:inline">{selectedLang}</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 flex-shrink-0 ${showLangMenu ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {showLangMenu && (
                <div className="notranslate absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-green-200 overflow-hidden z-60 max-h-80 overflow-y-auto">
                  <div className="p-2">
                    <div className="text-xs font-semibold text-gray-500 px-3 py-2 uppercase tracking-wide">Select Language</div>
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code, lang.display)}
                        className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-green-50 transition-colors duration-200 text-gray-800 font-medium text-sm hover:text-green-700 flex items-center gap-2"
                      >
                        <span className="text-lg flex-shrink-0">{lang.code === 'en' ? '🇬🇧' : '🇮🇳'}</span>
                        <span className="whitespace-nowrap">{lang.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Buttons */}
          <div className="flex md:hidden items-center gap-2">
            {/* Language Menu Button */}
            <button
              onClick={toggleLangMenu}
              className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300 focus:outline-none active:scale-95 border border-white/30"
              aria-label="Open language menu"
            >
              {isLangMenuOpen ? (
                <HiX className="h-5 w-5" />
              ) : (
                <span className="text-lg">🌐</span>
              )}
            </button>

            {/* Navigation Menu Button */}
            <button
              onClick={toggleMenu}
              type="button"
              className="bg-white/20 backdrop-blur-sm inline-flex items-center justify-center p-2.5 rounded-xl hover:bg-white/30 focus:outline-none transition-all duration-300"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <HiX className="block h-6 w-6 transition-transform duration-300 rotate-90" aria-hidden="true" />
              ) : (
                <HiMenu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden bg-gradient-to-br from-green-800 to-green-900 backdrop-blur-lg border-t border-white/20 animate-fade-in shadow-2xl">
          <div className="px-3 pt-2 pb-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block hover:bg-white/20 px-4 py-3.5 rounded-lg text-base font-semibold backdrop-blur-sm transition-all duration-300 border border-transparent hover:border-yellow-300/30 hover:text-yellow-300 active:scale-95 whitespace-nowrap"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Mobile Language Menu */}
      {isLangMenuOpen && (
        <div className="md:hidden bg-gradient-to-br from-green-800 to-green-900 backdrop-blur-lg border-t border-white/20 animate-fade-in shadow-2xl">
          <div className="notranslate px-3 pt-2 pb-4 language-dropdown">
            <div className="px-4 py-2 text-sm font-semibold text-yellow-300 flex items-center gap-2">
              <span className="text-lg">🌐</span>
              <span>Select Language</span>
            </div>
            <div className="grid grid-cols-2 gap-2 px-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => { changeLanguage(lang.code, lang.display); setIsLangMenuOpen(false); }}
                  className="text-left px-3 py-2 rounded-lg hover:bg-white/20 transition-colors duration-200 text-white font-medium text-sm flex items-center gap-2"
                >
                  <span className="text-base flex-shrink-0">{lang.code === 'en' ? '🇬🇧' : '🇮🇳'}</span>
                  <span className="whitespace-nowrap text-xs">{lang.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}