import React from 'react';
import { PracticeArea, Language } from '../types';
import { X, CheckCircle2, Calendar, Scale, Phone } from './Icons';
import { CONTACT_INFO } from '../data/content';

interface PracticeDetailModalProps {
  area: PracticeArea | null;
  onClose: () => void;
  language: Language;
  onOpenBooking: () => void;
}

export const PracticeDetailModal: React.FC<PracticeDetailModalProps> = ({
  area,
  onClose,
  language,
  onOpenBooking
}) => {
  if (!area) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#06151a]/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-[#fbf9f8] text-[#1b1c1c] rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#c3c7c9] max-h-[90vh] overflow-y-auto relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#efeded] hover:bg-[#eae8e7] text-[#43484a] transition-colors"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-[#fed488]/40 border border-[#775a19]/30 flex items-center justify-center text-[#775a19]">
            <Scale className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-[#775a19] block">
              {language === 'fr' 
                ? "Domaine d'intervention" 
                : language === 'pt' 
                ? 'Área de Atuação' 
                : 'Practice Area'}
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#06151a]">
              {area.title}
            </h3>
          </div>
        </div>

        <div className="w-12 h-0.5 bg-[#775a19] mb-6" />

        <p className="text-base text-[#43484a] leading-relaxed mb-6 font-normal">
          {area.fullDesc}
        </p>

        {area.keyPoints && area.keyPoints.length > 0 && (
          <div className="bg-[#f5f3f3] rounded-xl p-5 mb-8 border border-[#eae8e7]">
            <h4 className="text-xs uppercase tracking-wider font-bold text-[#06151a] mb-3">
              {language === 'fr' 
                ? 'Nos prestations et interventions clés :' 
                : language === 'pt' 
                ? 'Principais intervenções :' 
                : 'Key legal services & representation :'}
            </h4>
            <ul className="space-y-2.5">
              {area.keyPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-2.5 text-sm text-[#1b1c1c]">
                  <CheckCircle2 className="w-4 h-4 text-[#775a19] shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#c3c7c9]/40">
          <a
            href={`tel:${CONTACT_INFO.phoneClean}`}
            className="flex items-center gap-2 text-sm text-[#06151a] font-medium hover:text-[#775a19]"
          >
            <Phone className="w-4 h-4 text-[#775a19]" />
            <span>{CONTACT_INFO.phone}</span>
          </a>

          <button
            onClick={() => {
              onClose();
              onOpenBooking();
            }}
            className="w-full sm:w-auto bg-[#06151a] hover:bg-[#1b2a2f] text-white px-6 py-3 rounded-full text-sm font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm"
          >
            <Calendar className="w-4 h-4 text-[#fed488]" />
            <span>
              {language === 'fr' 
                ? 'Consulter sur ce sujet' 
                : language === 'pt' 
                ? 'Agendar consulta' 
                : 'Consult on this matter'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
