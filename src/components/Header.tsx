import React, { useState } from 'react';
import { Language, PageId } from '../types';
import { CONTENT, CONTACT_INFO } from '../data/content';
import { Scale, Phone, Menu, X, Calendar, Globe2 } from './Icons';

interface HeaderProps {
  currentPage: PageId;
  setCurrentPage: (page: PageId) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  onOpenBooking: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  setCurrentPage,
  language,
  setLanguage,
  onOpenBooking
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = CONTENT[language];

  const navItems: { id: PageId; label: string }[] = [
    { id: 'accueil', label: t.nav.home },
    { id: 'expertise', label: t.nav.expertise },
    { id: 'honoraires', label: t.nav.honoraires },
    { id: 'faq', label: t.nav.faq },
    { id: 'contact', label: t.nav.contact }
  ];

  const handleNavClick = (id: PageId) => {
    setCurrentPage(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#fbf9f8]/95 backdrop-blur-md border-b border-[#c3c7c9]/40 transition-all duration-300">
      {/* Top micro banner with direct phone & barreau badge */}
      <div className="bg-[#06151a] text-[#d5e5ec] text-xs py-1.5 px-4 sm:px-8 border-b border-[#1b2a2f]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#fed488] animate-pulse"></span>
            <span className="font-medium tracking-wide">
              {language === 'fr' ? 'Barreau de Bruxelles' : language === 'pt' ? 'Ordem dos Advogados de Bruxelas' : 'Brussels Bar'}
            </span>
            <span className="hidden sm:inline text-[#829198]">•</span>
            <span className="hidden sm:inline text-[#829198]">
              {language === 'fr' ? 'Cabinet multilingue FR • PT • EN' : language === 'pt' ? 'Atendimento FR • PT • EN' : 'Multilingual practice FR • PT • EN'}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={`tel:${CONTACT_INFO.phoneClean}`}
              className="flex items-center gap-1.5 text-xs text-[#d5e5ec] hover:text-[#fed488] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#fed488]" />
              <span className="font-medium">{CONTACT_INFO.phone}</span>
            </a>

            {/* Language Switcher */}
            <div className="flex items-center bg-[#1b2a2f] rounded-full p-0.5 border border-[#43484a]/50">
              {(['fr', 'pt', 'en'] as const).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setLanguage(lang)}
                  className={`px-2 py-0.5 text-[11px] rounded-full font-semibold transition-all ${
                    language === lang
                      ? 'bg-[#fed488] text-[#06151a]'
                      : 'text-[#d5e5ec] hover:text-white'
                  }`}
                  aria-label={`Changer de langue vers ${lang.toUpperCase()}`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 sm:py-4 flex items-center justify-between">
        {/* Brand */}
        <button
          onClick={() => handleNavClick('accueil')}
          className="flex items-center gap-3 text-left group focus:outline-none"
        >
          <div className="w-10 h-10 rounded-full bg-[#06151a] flex items-center justify-center text-[#fed488] group-hover:scale-105 transition-transform duration-300 shadow-xs">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#06151a] block leading-tight">
              Ana Ferreira
            </span>
            <span className="text-[11px] sm:text-xs text-[#775a19] uppercase tracking-wider font-semibold block">
              {language === 'fr' ? "Cabinet d'Avocat" : language === 'pt' ? 'Advogada' : 'Law Firm'}
            </span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-sm tracking-wide font-medium py-2 transition-all relative ${
                  isActive
                    ? 'text-[#775a19] font-bold'
                    : 'text-[#1b1c1c]/80 hover:text-[#06151a]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#775a19] rounded-full transition-all" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Button */}
        <div className="hidden lg:flex items-center gap-4">
          <button
            onClick={onOpenBooking}
            className="flex items-center gap-2 bg-[#06151a] hover:bg-[#1b2a2f] text-white px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 shadow-sm hover:shadow-md active:scale-98"
          >
            <Calendar className="w-4 h-4 text-[#fed488]" />
            <span>{t.nav.bookAppointment}</span>
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={onOpenBooking}
            className="bg-[#06151a] text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5"
          >
            <Calendar className="w-3.5 h-3.5 text-[#fed488]" />
            <span>RDV</span>
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#06151a] hover:bg-[#efeded] rounded-lg transition-colors focus:outline-none"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#f5f3f3] border-t border-[#c3c7c9]/40 px-6 py-5 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left text-base font-medium py-2.5 px-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-[#eae8e7] text-[#775a19] font-bold pl-4 border-l-4 border-[#775a19]'
                      : 'text-[#1b1c1c] hover:bg-[#eae8e7]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}

            <div className="pt-4 mt-2 border-t border-[#c3c7c9]/30 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full bg-[#06151a] text-white py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 shadow-sm"
              >
                <Calendar className="w-4 h-4 text-[#fed488]" />
                <span>{t.nav.bookAppointment}</span>
              </button>

              <div className="flex items-center justify-between text-xs text-[#43484a] px-1">
                <span>{language === 'fr' ? 'Langue :' : language === 'pt' ? 'Idioma :' : 'Language :'}</span>
                <div className="flex gap-1.5">
                  {(['fr', 'pt', 'en'] as const).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setLanguage(lang)}
                      className={`px-2.5 py-1 rounded-md text-xs font-semibold uppercase transition-colors ${
                        language === lang ? 'bg-[#06151a] text-white' : 'bg-[#efeded] text-[#1b1c1c] hover:bg-[#eae8e7]'
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
