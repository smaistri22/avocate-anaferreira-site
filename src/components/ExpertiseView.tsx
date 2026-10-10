import React, { useState } from 'react';
import { Language, PracticeArea } from '../types';
import { CONTENT, IMAGES, PRACTICE_AREAS } from '../data/content';
import { Scale, IconMap, CheckCircle2, ArrowRight, Calendar } from './Icons';

interface ExpertiseViewProps {
  language: Language;
  onSelectArea: (area: PracticeArea) => void;
  onOpenBooking: () => void;
}

export const ExpertiseView: React.FC<ExpertiseViewProps> = ({
  language,
  onSelectArea,
  onOpenBooking
}) => {
  const t = CONTENT[language];
  const allAreas = PRACTICE_AREAS[language];
  const mainFour = allAreas.slice(0, 4);
  const otherAreas = allAreas.slice(4);

  const [collaborativeModalOpen, setCollaborativeModalOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-16 space-y-20">
      {/* Header Section with Editorial Line */}
      <section className="max-w-3xl">
        <div className="editorial-line" />
        <h1 className="font-serif text-4xl sm:text-5xl font-normal text-[#06151a] tracking-tight leading-tight">
          {t.expertisePage.title}
        </h1>
        <p className="text-base sm:text-lg text-[#43484a] mt-4 leading-relaxed font-normal">
          {t.expertisePage.desc}
        </p>
      </section>

      {/* Main Grid: 4 Core Practice Areas */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {mainFour.map((area, index) => {
          const IconComp = IconMap[area.icon] || Scale;

          return (
            <div
              key={area.id}
              onClick={() => onSelectArea(area)}
              className="practice-card bg-[#f5f3f3] p-8 sm:p-10 rounded-2xl border border-[#c3c7c9]/50 flex flex-col justify-between cursor-pointer group shadow-2xs"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-[#775a19] shadow-2xs group-hover:bg-[#fed488]/30 transition-colors">
                    <IconComp className="w-7 h-7" />
                  </div>
                  <span className="text-xs uppercase font-bold tracking-widest text-[#775a19] opacity-70 group-hover:opacity-100 transition-opacity">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="font-serif text-2xl font-bold text-[#06151a] mb-3 group-hover:text-[#775a19] transition-colors">
                  {area.title}
                </h3>

                <p className="text-sm text-[#43484a] leading-relaxed">
                  {area.shortDesc}
                </p>
              </div>

              <div className="pt-6 mt-8 border-t border-[#c3c7c9]/40 flex items-center justify-between text-xs font-bold text-[#775a19]">
                <span>
                  {language === 'fr' 
                    ? 'Consulter le détail' 
                    : language === 'pt' 
                    ? 'Ver detalhes da atuação' 
                    : 'View practice details'}
                </span>
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center group-hover:bg-[#06151a] group-hover:text-white transition-all">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Spotlight: Droit Collaboratif */}
      <section className="bg-[#06151a] text-white rounded-3xl p-8 sm:p-12 lg:p-14 relative overflow-hidden shadow-xl border border-[#1b2a2f]">
        <div 
          className="absolute inset-0 opacity-10 bg-cover bg-center pointer-events-none mix-blend-overlay"
          style={{ backgroundImage: `url(${IMAGES.abstractTexture})` }}
        />

        <div className="relative z-10 max-w-4xl space-y-6">
          <div>
            <span className="inline-block text-xs uppercase font-bold tracking-widest text-[#fed488] px-3 py-1 bg-[#1b2a2f] rounded-full border border-[#775a19]/40 mb-3">
              {t.collaborativeSection.badge}
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl text-[#d5e5ec] font-normal tracking-tight">
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

          <div className="pt-4 flex flex-wrap items-center gap-4">
            <button
              onClick={() => setCollaborativeModalOpen(true)}
              className="bg-[#fed488] hover:bg-[#ffdea5] text-[#06151a] px-6 py-3 rounded-full text-sm font-bold transition-all shadow-md inline-flex items-center gap-2"
            >
              <span>{t.collaborativeSection.btnMore}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenBooking}
              className="bg-transparent hover:bg-white/10 text-white border border-[#b9c9d0]/40 px-6 py-3 rounded-full text-sm font-semibold transition-all"
            >
              {t.nav.bookAppointment}
            </button>
          </div>
        </div>
      </section>

      {/* Other Competence Areas */}
      {otherAreas.length > 0 && (
        <section className="space-y-6 pt-4">
          <div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#06151a]">
              {t.expertisePage.otherAreasTitle}
            </h3>
            <p className="text-sm text-[#43484a] mt-1">
              {language === 'fr'
                ? 'Une assistance personnalisée et rigoureuse pour l’ensemble de vos démarches et procédures.'
                : language === 'pt'
                ? 'Acompanhamento qualificado em matérias complementares do direito belga.'
                : 'Dedicated and meticulous representation across complementary areas of law.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {otherAreas.map((area) => {
              const IconItem = IconMap[area.icon] || Scale;

              return (
                <div
                  key={area.id}
                  onClick={() => onSelectArea(area)}
                  className="practice-card bg-[#f5f3f3] p-6 rounded-2xl border border-[#c3c7c9]/40 cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#775a19] mb-4 shadow-2xs group-hover:bg-[#fed488]/40 transition-colors">
                      <IconItem className="w-5 h-5" />
                    </div>
                    <h4 className="font-serif text-lg font-bold text-[#06151a] mb-2 group-hover:text-[#775a19] transition-colors">
                      {area.title}
                    </h4>
                    <p className="text-xs text-[#43484a] leading-relaxed">
                      {area.shortDesc}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#c3c7c9]/30 flex items-center justify-between text-xs font-semibold text-[#775a19]">
                    <span>
                      {language === 'fr' ? 'En savoir plus' : language === 'pt' ? 'Consultar' : 'Learn more'}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Modal for Droit Collaboratif explanation */}
      {collaborativeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#06151a]/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-[#fbf9f8] text-[#1b1c1c] rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#c3c7c9] max-h-[90vh] overflow-y-auto relative animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setCollaborativeModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-[#efeded] hover:bg-[#eae8e7] text-[#43484a]"
            >
              ✕
            </button>

            <span className="text-xs uppercase font-bold tracking-widest text-[#775a19] block mb-1">
              {language === 'fr' 
                ? 'Mode alternatif de résolution des conflits (MARD)' 
                : language === 'pt' 
                ? 'Resolução Alternativa de Litígios' 
                : 'Alternative Dispute Resolution (ADR)'}
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#06151a] mb-4">
              {language === 'fr' 
                ? 'La Méthode du Droit Collaboratif' 
                : language === 'pt' 
                ? 'O Método de Direito Colaborativo' 
                : 'The Collaborative Law Method'}
            </h3>

            <div className="w-12 h-0.5 bg-[#775a19] mb-6" />

            <div className="space-y-4 text-sm text-[#43484a] leading-relaxed">
              <p>
                {language === 'fr'
                  ? "Le droit collaboratif est une approche contractuelle innovante et hautement structurée qui place la négociation raisonnée au cœur du règlement des différends. Contrairement à une procédure judiciaire classique où un juge tranche le litige, les parties élaborent elles-mêmes un accord sur-mesure."
                  : language === 'pt'
                  ? "O direito colaborativo é uma abordagem contratual estruturada que coloca a negociação de base ampla no centro da resolução de conflitos. Em vez de uma decisão imposta por um juiz, as partes constroem a sua própria solução com segurança jurídica."
                  : "Collaborative law is an innovative, structured contractual process centering principled negotiation in dispute resolution. Rather than a court imposing a judgment, parties construct their own tailored and binding agreement."}
              </p>

              <div className="bg-[#f5f3f3] p-5 rounded-xl border border-[#eae8e7] space-y-3">
                <h4 className="font-bold text-xs uppercase text-[#06151a]">
                  {language === 'fr' 
                    ? 'Les 4 Piliers Fondamentaux :' 
                    : language === 'pt' 
                    ? 'Os 4 Pilares Fundamentais :' 
                    : 'The 4 Core Pillars:'}
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#775a19] shrink-0 mt-0.5" />
                    <span>
                      <strong>
                        {language === 'fr' 
                          ? 'Engagement formel de non-recours au juge' 
                          : language === 'pt' 
                          ? 'Compromisso de não litigância' 
                          : 'Commitment not to litigate'}
                      </strong> : {language === 'fr' ? 'sécurité et transparence garanties durant les négociations.' : language === 'pt' ? 'segurança e foco total no diálogo construtivo.' : 'guaranteed safety and focus on settlement during negotiations.'}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#775a19] shrink-0 mt-0.5" />
                    <span>
                      <strong>
                        {language === 'fr' 
                          ? 'Confidentialité renforcée' 
                          : language === 'pt' 
                          ? 'Confidencialidade estrita' 
                          : 'Strict confidentiality'}
                      </strong> : {language === 'fr' ? 'tous les documents et échanges restent strictement secrets.' : language === 'pt' ? 'todas as informações partilhadas permanecem confidenciais.' : 'all discussions and documentation remain strictly confidential.'}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#775a19] shrink-0 mt-0.5" />
                    <span>
                      <strong>
                        {language === 'fr' 
                          ? 'Échange complet des informations' 
                          : language === 'pt' 
                          ? 'Transparência total' 
                          : 'Full and honest disclosure'}
                      </strong> : {language === 'fr' ? 'obligation de loyauté et de partage des éléments financiers et personnels.' : language === 'pt' ? 'partilha aberta de elementos financeiros e fáticos.' : 'duty of transparency and full sharing of relevant factual and financial records.'}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#775a19] shrink-0 mt-0.5" />
                    <span>
                      <strong>
                        {language === 'fr' 
                          ? 'Avocats spécialement formés' 
                          : language === 'pt' 
                          ? 'Advogados certificados' 
                          : 'Trained collaborative attorneys'}
                      </strong> : {language === 'fr' ? 'accompagnement bienveillant et rigoureux par des praticiens agréés.' : language === 'pt' ? 'acompanhamento qualificado por profissionais com formação específica.' : 'skilled guidance by certified collaborative practitioners.'}
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[#c3c7c9]/40 flex justify-end gap-3">
              <button
                onClick={() => {
                  setCollaborativeModalOpen(false);
                  onOpenBooking();
                }}
                className="bg-[#06151a] hover:bg-[#1b2a2f] text-white px-6 py-3 rounded-full text-sm font-semibold transition-colors"
              >
                {language === 'fr' 
                  ? 'Demander une consultation collaborative' 
                  : language === 'pt' 
                  ? 'Agendar consulta colaborativa' 
                  : 'Request collaborative consultation'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
