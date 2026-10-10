import React, { useState } from 'react';
import { Language, PageId } from '../types';
import { CONTENT, IMAGES, FAQ_ITEMS } from '../data/content';
import { ChevronDown, Sparkles, Phone, Mail, ArrowRight } from './Icons';

interface FaqViewProps {
  language: Language;
  setCurrentPage: (page: PageId) => void;
  onOpenBooking: () => void;
}

export const FaqView: React.FC<FaqViewProps> = ({
  language,
  setCurrentPage,
  onOpenBooking
}) => {
  const t = CONTENT[language];
  const items = FAQ_ITEMS[language];

  const [openIds, setOpenIds] = useState<string[]>(['faq-1', 'faq-3']);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const toggleItem = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-16 space-y-16">
      {/* Top Hero Layout: Portrait + Caslon Typography */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Left portrait with frame */}
        <div className="lg:col-span-4">
          <div className="relative max-w-sm mx-auto lg:max-w-none">
            <div className="absolute -inset-2.5 bg-[#eae8e7] rounded-2xl -rotate-1" />
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-[#c3c7c9] bg-[#06151a] aspect-4/5 sm:aspect-3/4">
              <img
                src={IMAGES.portraitFaq}
                alt="Me. Ana Ferreira"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top hover:scale-102 transition-transform duration-700"
              />
            </div>
          </div>
        </div>

        {/* Right Headline & Description */}
        <div className="lg:col-span-8 space-y-6">
          <div className="editorial-line" />
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#06151a] tracking-tight leading-tight">
            {t.faqPage.title}
          </h1>

          <p className="text-base sm:text-lg text-[#43484a] leading-relaxed max-w-2xl font-normal">
            {t.faqPage.desc}
          </p>

          {/* Search bar */}
          <div className="pt-2 max-w-xl">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={t.faqPage.searchPlaceholder}
                className="w-full pl-4 pr-10 py-3 bg-[#f5f3f3] border border-[#c3c7c9] rounded-xl text-sm focus:outline-none focus:border-[#775a19] focus:bg-white transition-all shadow-2xs"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-3 text-xs text-[#73787a] hover:text-[#06151a]"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 pt-1">
            {[
              { id: 'all', label: language === 'fr' ? 'Toutes les questions' : language === 'pt' ? 'Todas' : 'All questions' },
              { id: 'procedure', label: language === 'fr' ? 'Consultation & Déroulement' : language === 'pt' ? 'Consulta & Processo' : 'Consultation & Process' },
              { id: 'fees', label: language === 'fr' ? 'Honoraires & Pro Deo' : language === 'pt' ? 'Honorários' : 'Fees & Legal Aid' },
              { id: 'areas', label: language === 'fr' ? 'Compétences' : language === 'pt' ? 'Competências' : 'Practice Areas' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-[#06151a] text-white shadow-2xs'
                    : 'bg-[#efeded] text-[#43484a] hover:bg-[#eae8e7]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Accordion Questions List */}
      <section className="space-y-4 max-w-4xl mx-auto pt-6">
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#06151a] mb-6">
          {t.faqPage.commonInquiries}
        </h3>

        {filteredItems.length === 0 ? (
          <div className="p-8 text-center bg-[#f5f3f3] rounded-2xl text-[#43484a]">
            <p className="text-sm">
              {language === 'fr' 
                ? 'Aucune réponse ne correspond à votre recherche. N’hésitez pas à nous contacter directement.' 
                : language === 'pt' 
                ? 'Nenhum resultado encontrado. Entre em contacto connosco para obter esclarecimentos.'
                : 'No results found matching your search. Please feel free to contact us directly.'}
            </p>
          </div>
        ) : (
          filteredItems.map((item) => {
            const isOpen = openIds.includes(item.id);
            return (
              <div
                key={item.id}
                className="bg-[#f5f3f3] border border-[#c3c7c9]/50 rounded-2xl overflow-hidden transition-all duration-300 shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  className="w-full px-6 sm:px-8 py-5 text-left flex items-center justify-between gap-4 focus:outline-none group"
                >
                  <span className="font-serif text-lg sm:text-xl font-bold text-[#06151a] group-hover:text-[#775a19] transition-colors">
                    {item.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#775a19] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-[#fed488]/30' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 sm:px-8 pb-6 text-sm sm:text-base text-[#43484a] leading-relaxed border-t border-[#c3c7c9]/30 pt-4 animate-in fade-in duration-200">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })
        )}
      </section>

      {/* Still Have Questions CTA Card */}
      <section className="max-w-4xl mx-auto">
        <div className="bg-[#06151a] text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl border border-[#1b2a2f]">
          <div 
            className="absolute inset-0 opacity-10 bg-cover bg-center pointer-events-none"
            style={{ backgroundImage: `url(${IMAGES.abstractTexture})` }}
          />

          <div className="relative z-10 text-center max-w-2xl mx-auto space-y-4">
            <span className="text-xs uppercase font-bold tracking-widest text-[#fed488]">
              {t.faqPage.stillQuestionsTitle}
            </span>

            <h3 className="font-serif text-3xl sm:text-4xl text-[#d5e5ec] font-normal">
              {language === 'fr' 
                ? 'Chaque situation est unique' 
                : language === 'pt' 
                ? 'Cada situação jurídica é única' 
                : 'Every legal situation is unique'}
            </h3>

            <p className="text-sm text-[#b9c9d0] leading-relaxed">
              {t.faqPage.stillQuestionsDesc}
            </p>

            <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
              <button
                onClick={() => {
                  setCurrentPage('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-[#fed488] hover:bg-[#ffdea5] text-[#06151a] px-8 py-3.5 rounded-full text-sm font-bold transition-all inline-flex items-center justify-center gap-2 shadow-sm"
              >
                <span>{t.faqPage.ctaButton}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenBooking}
                className="bg-[#1b2a2f] hover:bg-[#283b42] text-white border border-[#43484a] px-8 py-3.5 rounded-full text-sm font-semibold transition-all"
              >
                {t.nav.bookAppointment}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
