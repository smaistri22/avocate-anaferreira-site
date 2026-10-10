import React from 'react';
import { Language, PageId } from '../types';
import { CONTENT, CONTACT_INFO, PARTNERS } from '../data/content';
import { Scale, Phone, Mail, MapPin, ExternalLink } from './Icons';

interface FooterProps {
  language: Language;
  setCurrentPage: (page: PageId) => void;
  onOpenLegalNotices: () => void;
}

export const Footer: React.FC<FooterProps> = ({ language, setCurrentPage, onOpenLegalNotices }) => {
  const t = CONTENT[language];

  return (
    <footer className="bg-[#06151a] text-[#d5e5ec] pt-16 pb-12 border-t border-[#1b2a2f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-[#1b2a2f]">
          {/* Col 1: Brand & Bio */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#1b2a2f] flex items-center justify-center text-[#fed488] border border-[#775a19]/30">
                <Scale className="w-5 h-5" />
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-tight text-white block">
                  Ana Ferreira
                </span>
                <span className="text-xs text-[#fed488] uppercase tracking-wider font-semibold">
                  {t.hero.badge}
                </span>
              </div>
            </div>
            <p className="text-sm text-[#b9c9d0] leading-relaxed max-w-md pt-2">
              {t.footer.about}
            </p>

            <div className="pt-2 flex flex-col gap-2 text-xs text-[#d5e5ec]">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#fed488] shrink-0" />
                <span>{CONTACT_INFO.address}, {CONTACT_INFO.postalCode}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#fed488] shrink-0" />
                <a href={`tel:${CONTACT_INFO.phoneClean}`} className="hover:text-[#fed488] transition-colors">
                  {CONTACT_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#fed488] shrink-0" />
                <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-[#fed488] transition-colors">
                  {CONTACT_INFO.email}
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-widest text-[#fed488]">
              {t.footer.navTitle}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => { setCurrentPage('accueil'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-[#b9c9d0] hover:text-white transition-colors"
                >
                  {t.nav.home}
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setCurrentPage('expertise'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-[#b9c9d0] hover:text-white transition-colors"
                >
                  {t.nav.expertise}
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setCurrentPage('honoraires'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-[#b9c9d0] hover:text-white transition-colors"
                >
                  {t.nav.honoraires}
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setCurrentPage('faq'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-[#b9c9d0] hover:text-white transition-colors"
                >
                  {t.nav.faq}
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setCurrentPage('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-[#b9c9d0] hover:text-white transition-colors"
                >
                  {t.nav.contact}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Partners & Réseau */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-widest text-[#fed488]">
              {t.footer.partnersTitle}
            </h4>
            <div className="space-y-3 text-sm">
              {PARTNERS.map((partner, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-[#1b2a2f]/60 border border-[#43484a]/30">
                  <div className="font-semibold text-white flex items-center justify-between">
                    <span>{partner.name}</span>
                  </div>
                  <div className="text-xs text-[#b9c9d0] mt-0.5">
                    {language === 'fr' ? partner.roleFr : language === 'pt' ? partner.rolePt : partner.roleEn}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-[#829198] gap-4">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-4 text-center sm:text-left">
            <p>{t.footer.copyright}</p>
            <span className="hidden sm:inline text-[#43484a]">•</span>
            <button
              onClick={onOpenLegalNotices}
              className="text-[#b9c9d0] hover:text-[#fed488] transition-colors underline font-medium cursor-pointer"
            >
              {t.footer.legalNotices}
            </button>
          </div>
          <div className="flex items-center gap-4 text-[#829198]">
            <span>Barreau de Bruxelles</span>
            <span>•</span>
            <span>Ordre des Barreaux Francophones & Germanophone</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
