import React from 'react';
import { Language, PageId, PracticeArea } from '../types';
import { CONTENT, IMAGES, PRACTICE_AREAS } from '../data/content';
import { 
  ArrowRight, 
  CheckCircle2, 
  Calendar, 
  Scale, 
  IconMap, 
  Sparkles,
  GraduationCap,
  Award,
  BookOpen,
  Briefcase,
  FileText,
  Building2,
  Landmark,
  MapPin,
  Clock
} from './Icons';

interface HomeViewProps {
  language: Language;
  setCurrentPage: (page: PageId) => void;
  onOpenBooking: () => void;
  onSelectArea: (area: PracticeArea) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  language,
  setCurrentPage,
  onOpenBooking,
  onSelectArea
}) => {
  const t = CONTENT[language];
  const areas = PRACTICE_AREAS[language].slice(0, 4);

  const scrollToParcours = () => {
    const el = document.getElementById('parcours-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-24 sm:space-y-32 pb-24">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 sm:pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-7 space-y-8">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f5f3f3] border border-[#775a19]/30 text-xs font-semibold text-[#775a19] tracking-wide shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#775a19]" />
              <span>{t.hero.badge}</span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#06151a] tracking-tight leading-[1.15] font-normal">
              {t.hero.titlePart1} <br className="hidden sm:inline" />
              {t.hero.titlePart2} <span className="italic font-normal text-[#775a19]">{t.hero.titleItalic}</span>
            </h1>

            {/* Editorial Line Accent */}
            <div className="w-16 h-0.5 bg-[#775a19]" />

            {/* Body Copy */}
            <p className="text-base sm:text-lg text-[#43484a] leading-relaxed max-w-xl font-normal">
              {t.hero.desc}
            </p>

            {/* Call to Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onOpenBooking}
                className="bg-[#06151a] hover:bg-[#1b2a2f] text-white px-7 py-3.5 rounded-full text-sm font-semibold flex items-center justify-center gap-3 transition-all duration-300 shadow-md hover:shadow-lg active:scale-98 group"
              >
                <Calendar className="w-4 h-4 text-[#fed488] group-hover:scale-110 transition-transform" />
                <span>{t.hero.btnCta}</span>
              </button>

              <button
                onClick={scrollToParcours}
                className="px-6 py-3.5 rounded-full text-sm font-semibold text-[#06151a] hover:text-[#775a19] hover:bg-[#eae8e7] border border-[#c3c7c9]/80 transition-all text-center flex items-center justify-center gap-2"
              >
                <span>{t.hero.btnBio}</span>
                <ArrowRight className="w-4 h-4 text-[#775a19]" />
              </button>
            </div>

            {/* Trust points */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-[#c3c7c9]/50 text-xs sm:text-sm">
              <div>
                <div className="font-serif text-xl sm:text-2xl font-bold text-[#06151a]">10+</div>
                <div className="text-[#43484a]">
                  {language === 'fr' ? "Années d'expérience" : language === 'pt' ? 'Anos de experiência' : language === 'es' ? 'Años de experiencia' : 'Years of experience'}
                </div>
              </div>
              <div>
                <div className="font-serif text-xl sm:text-2xl font-bold text-[#06151a]">100%</div>
                <div className="text-[#43484a]">
                  {language === 'fr' ? 'Écoute & Transparence' : language === 'pt' ? 'Transparência total' : language === 'es' ? 'Escucha & Transparencia' : 'Dedication & Transparency'}
                </div>
              </div>
              <div>
                <div className="font-serif text-xl sm:text-2xl font-bold text-[#06151a]">Bruxelles</div>
                <div className="text-[#43484a]">
                  {language === 'fr' ? 'Barreau francophone' : language === 'pt' ? 'Bélgica & Internacional' : language === 'es' ? 'Colegio de Bruselas' : 'Brussels Bar'}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Portrait with quote badge */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Background Frame Accent */}
              <div className="absolute -inset-3 bg-[#eae8e7] rounded-2xl transform rotate-1 transition-transform group-hover:rotate-0" />
              
              {/* Main Image Container */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-[#c3c7c9] bg-[#06151a] aspect-4/5 sm:aspect-3/4">
                <img
                  src={IMAGES.portraitStanding}
                  alt="Maître Ana Ferreira - Avocate"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top hover:scale-102 transition-transform duration-700"
                />

                {/* Floating Quote Card */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#06151a]/90 backdrop-blur-md text-[#d5e5ec] p-4 rounded-xl border border-[#775a19]/40 shadow-lg">
                  <p className="font-serif italic text-sm text-center text-[#fed488]">
                    {t.hero.quote}
                  </p>
                  <span className="block text-[11px] text-center text-[#b9c9d0] mt-1 font-medium">
                    {language === 'fr' ? 'Me. Ana Ferreira — Avocate au Barreau de Bruxelles' : language === 'pt' ? 'Dra. Ana Ferreira — Advogada em Bruxelas' : language === 'es' ? 'Letrada Ana Ferreira — Abogada en Bruselas' : 'Ana Ferreira — Attorney at Law (Brussels)'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid: Domaines d'Expertise */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="w-10 h-0.5 bg-[#775a19] mb-4" />
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#06151a] tracking-tight">
              {t.bentoHome.title}
            </h2>
            <p className="text-sm sm:text-base text-[#43484a] mt-2 max-w-xl">
              {t.bentoHome.desc}
            </p>
          </div>

          <button
            onClick={() => {
              setCurrentPage('expertise');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#775a19] hover:text-[#06151a] transition-colors group self-start md:self-auto"
          >
            <span>{t.bentoHome.viewAll}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 4 Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {areas.map((area) => {
            const AreaIcon = IconMap[area.icon] || Scale;

            return (
              <div
                key={area.id}
                onClick={() => onSelectArea(area)}
                className="practice-card bg-[#f5f3f3] p-7 rounded-2xl border border-[#c3c7c9]/40 flex flex-col justify-between cursor-pointer group shadow-2xs"
              >
                <div>
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#775a19] mb-6 shadow-2xs group-hover:bg-[#fed488]/30 transition-colors">
                    <AreaIcon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#06151a] mb-3 group-hover:text-[#775a19] transition-colors">
                    {area.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#43484a] leading-relaxed">
                    {area.shortDesc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#c3c7c9]/30 flex items-center justify-between text-xs font-semibold text-[#775a19]">
                  <span>
                    {language === 'fr' 
                      ? 'Détails de l’intervention' 
                      : language === 'pt' 
                      ? 'Ver detalhes' 
                      : 'View details'}
                  </span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION: Découvrir mon parcours */}
      <section id="parcours-section" className="max-w-7xl mx-auto px-4 sm:px-8 scroll-mt-24">
        <div className="bg-[#f5f3f3] rounded-3xl p-8 sm:p-12 lg:p-14 border border-[#c3c7c9]/60 shadow-sm space-y-12">
          {/* Section Header */}
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#775a19]/30 text-xs font-semibold text-[#775a19] tracking-wide shadow-2xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.bioSection.badge}</span>
            </div>

            <div className="w-12 h-0.5 bg-[#775a19]" />

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#06151a] tracking-tight">
              {t.bioSection.title}
            </h2>

            <p className="text-base sm:text-lg text-[#43484a] leading-relaxed font-normal">
              {t.bioSection.subtitle}
            </p>
          </div>

          {/* Editorial Synthesis Box */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#c3c7c9]/50 shadow-2xs relative">
            <div className="absolute top-0 left-8 transform -translate-y-1/2 w-8 h-1 bg-[#775a19] rounded-full" />
            <p className="text-sm sm:text-base text-[#1b1c1c] leading-relaxed italic font-serif">
              « {t.bioSection.intro} »
            </p>
          </div>

          {/* Two-Column Grid: Experiences & Education */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            {/* Left: Experiences & Internships (3 cards) */}
            <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center gap-3 pb-2 border-b border-[#c3c7c9]/40">
                <Briefcase className="w-5 h-5 text-[#775a19]" />
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#06151a]">
                  {t.bioSection.experiencesTitle}
                </h3>
              </div>

              <div className="space-y-5">
                {t.bioSection.experiences.map((exp, idx) => {
                  return (
                    <div 
                      key={exp.id}
                      className="bg-white p-6 sm:p-7 rounded-2xl border border-[#c3c7c9]/40 shadow-2xs hover:border-[#775a19]/50 transition-colors space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-start gap-3.5">
                          <div className="w-10 h-10 rounded-xl bg-[#f5f3f3] text-[#775a19] flex items-center justify-center shrink-0 border border-[#c3c7c9]/30">
                            {idx === 0 ? <Scale className="w-5 h-5" /> : idx === 1 ? <FileText className="w-5 h-5" /> : <Award className="w-5 h-5" />}
                          </div>
                          <div>
                            <h4 className="font-serif text-lg font-bold text-[#06151a]">
                              {exp.institution}
                            </h4>
                            <div className="text-xs font-semibold text-[#775a19]">
                              {exp.role} · <span className="text-[#43484a] font-normal">{exp.type}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-[11px] text-[#5e6366] bg-[#fbf9f8] px-3 py-1 rounded-full border border-[#eae8e7] self-start sm:self-auto shrink-0">
                          <Clock className="w-3 h-3 text-[#775a19]" />
                          <span>{exp.period}</span>
                        </div>
                      </div>

                      {/* User's Original Insight Quote */}
                      <div className="p-4 bg-[#fbf9f8] rounded-xl border-l-3 border-[#775a19] text-xs sm:text-sm text-[#06151a] leading-relaxed">
                        <p className="italic font-serif">
                          {exp.quote}
                        </p>
                      </div>

                      {/* Strategic Takeaway / Added Value */}
                      <div className="text-xs text-[#43484a] leading-relaxed flex items-start gap-2 pt-1">
                        <CheckCircle2 className="w-4 h-4 text-[#775a19] shrink-0 mt-0.5" />
                        <span>{exp.takeaway}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Academic Education & Bar Membership */}
            <div className="lg:col-span-4 space-y-6">
              <div className="flex items-center gap-3 pb-2 border-b border-[#c3c7c9]/40">
                <GraduationCap className="w-5 h-5 text-[#775a19]" />
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#06151a]">
                  {t.bioSection.educationTitle}
                </h3>
              </div>

              {/* Education Card */}
              {t.bioSection.education.map((edu) => (
                <div 
                  key={edu.id}
                  className="bg-white p-6 rounded-2xl border border-[#c3c7c9]/40 shadow-2xs space-y-4"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-[#fed488]/30 text-[#775a19] flex items-center justify-center shrink-0 border border-[#775a19]/30">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-serif text-base font-bold text-[#06151a]">
                        {edu.institution}
                      </h4>
                      <div className="text-xs font-semibold text-[#775a19]">
                        {edu.degree}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-[#5e6366] bg-[#fbf9f8] px-3 py-1 rounded-full border border-[#eae8e7]">
                    <Clock className="w-3 h-3 text-[#775a19]" />
                    <span>{edu.period} · {edu.location}</span>
                  </div>

                  <p className="text-xs text-[#43484a] leading-relaxed pt-1">
                    {edu.description}
                  </p>
                </div>
              ))}

              {/* Bar Membership & Ethics Card */}
              <div className="bg-[#06151a] text-white p-6 rounded-2xl border border-[#1b2a2f] shadow-sm space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#fed488]/20 text-[#fed488] flex items-center justify-center shrink-0 border border-[#fed488]/30">
                    <Landmark className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-bold text-[#fed488]">
                      {language === 'fr' ? 'Barreau de Bruxelles' : language === 'pt' ? 'Ordem dos Advogados' : 'Brussels Bar'}
                    </h4>
                    <span className="text-[11px] text-[#b9c9d0] block">
                      {language === 'fr' ? 'Ordre français des avocats' : language === 'pt' ? 'Advogada inscrita' : 'Registered Attorney'}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-[#b9c9d0] leading-relaxed">
                  {language === 'fr' 
                    ? 'Adhérente aux règles déontologiques les plus strictes de secret professionnel, de loyauté et de dévouement total à la cause de ses clients.' 
                    : language === 'pt'
                    ? 'Cumprimento rigoroso das normas deontológicas de segredo profissional, lealdade e dedicação absoluta à defesa do cliente.'
                    : 'Strict adherence to professional secrecy, ethical legal standards, and total loyalty to each client’s defense.'}
                </p>

                <button
                  onClick={onOpenBooking}
                  className="w-full bg-[#fed488] hover:bg-[#ffdea5] text-[#06151a] py-2.5 px-4 rounded-xl text-xs font-bold transition-all text-center flex items-center justify-center gap-2"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{t.nav.bookAppointment}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section: Le Droit Collaboratif */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-[#06151a] text-white rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl border border-[#1b2a2f]">
          {/* Abstract Texture Overlay */}
          <div 
            className="absolute inset-0 opacity-10 bg-cover bg-center pointer-events-none mix-blend-overlay"
            style={{ backgroundImage: `url(${IMAGES.abstractTexture})` }}
          />

          <div className="relative z-10 max-w-4xl space-y-6">
            <div>
              <span className="inline-block text-xs uppercase font-bold tracking-widest text-[#fed488] px-3 py-1 bg-[#1b2a2f] rounded-full border border-[#775a19]/40 mb-3">
                {t.collaborativeSection.badge}
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#d5e5ec]">
                {t.collaborativeSection.title}
              </h2>
            </div>

            <div className="w-12 h-0.5 bg-[#fed488]" />

            <p className="text-base sm:text-lg text-[#b9c9d0] leading-relaxed">
              {t.collaborativeSection.desc}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="bg-[#1b2a2f] p-5 rounded-2xl border border-[#775a19]/30 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#fed488] shrink-0 mt-0.5" />
                <span className="text-sm text-[#d5e5ec] font-medium">{t.collaborativeSection.bullet1}</span>
              </div>
              <div className="bg-[#1b2a2f] p-5 rounded-2xl border border-[#775a19]/30 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#fed488] shrink-0 mt-0.5" />
                <span className="text-sm text-[#d5e5ec] font-medium">{t.collaborativeSection.bullet2}</span>
              </div>
              <div className="bg-[#1b2a2f] p-5 rounded-2xl border border-[#775a19]/30 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#fed488] shrink-0 mt-0.5" />
                <span className="text-sm text-[#d5e5ec] font-medium">{t.collaborativeSection.bullet3}</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => {
                  setCurrentPage('expertise');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-[#fed488] hover:bg-[#ffdea5] text-[#06151a] px-7 py-3.5 rounded-full text-sm font-bold transition-all duration-300 shadow-md inline-flex items-center gap-2.5"
              >
                <span>{t.collaborativeSection.btnMore}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Consultation CTA banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-[#f5f3f3] border border-[#c3c7c9]/60 rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="max-w-xl text-center md:text-left">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#06151a]">
              {language === 'fr' 
                ? 'Besoin d’un conseil juridique immédiat ?' 
                : language === 'pt' 
                ? 'Precisa de orientação jurídica imediata?' 
                : 'Need immediate legal guidance?'}
            </h3>
            <p className="text-sm text-[#43484a] mt-2">
              {language === 'fr' 
                ? 'Contactez Maître Ana Ferreira pour un premier échange confidentiel ou prenez rendez-vous en ligne.'
                : language === 'pt' 
                ? 'Contacte a Dra. Ana Ferreira para uma conversa inicial confidencial ou marque a sua consulta online.'
                : 'Contact Attorney Ana Ferreira for an initial confidential consultation or book your appointment online.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button
              onClick={onOpenBooking}
              className="bg-[#06151a] hover:bg-[#1b2a2f] text-white px-7 py-3.5 rounded-full text-sm font-semibold transition-all text-center shadow-sm"
            >
              {t.nav.bookAppointment}
            </button>
            <button
              onClick={() => {
                setCurrentPage('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-white hover:bg-[#eae8e7] text-[#06151a] border border-[#c3c7c9] px-6 py-3.5 rounded-full text-sm font-semibold transition-all text-center"
            >
              {t.nav.contact}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
