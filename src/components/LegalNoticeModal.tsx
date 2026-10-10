import React from 'react';
import { Language } from '../types';
import { CONTACT_INFO, PARTNERS } from '../data/content';
import { X, Scale, ShieldCheck, Mail, MapPin, Phone, Building2 } from './Icons';

interface LegalNoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const LegalNoticeModal: React.FC<LegalNoticeModalProps> = ({
  isOpen,
  onClose,
  language
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#06151a]/70 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-[#fbf9f8] text-[#1b1c1c] rounded-3xl max-w-2xl w-full p-6 sm:p-10 shadow-2xl border border-[#c3c7c9] max-h-[85vh] overflow-y-auto relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-[#efeded] hover:bg-[#eae8e7] text-[#43484a] transition-colors"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-[#06151a] text-[#fed488] flex items-center justify-center">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#06151a]">
              {language === 'fr' ? 'Mentions Légales' : language === 'pt' ? 'Avisos Legais' : 'Legal Notices'}
            </h2>
            <p className="text-xs text-[#775a19] font-bold uppercase tracking-wider">
              {language === 'fr' 
                ? 'Informations réglementaires & Déontologie' 
                : language === 'pt' 
                ? 'Informações regulamentares & Deontologia' 
                : 'Regulatory Information & Professional Ethics'}
            </p>
          </div>
        </div>

        <div className="space-y-6 text-sm text-[#43484a] leading-relaxed">
          {/* 1. Éditeur & Identification */}
          <div className="bg-white p-5 rounded-2xl border border-[#c3c7c9]/60 shadow-2xs space-y-2.5">
            <h3 className="font-serif font-bold text-[#06151a] flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#775a19]" />
              <span>
                {language === 'fr' 
                  ? '1. Éditeur responsable du site' 
                  : language === 'pt' 
                  ? '1. Editor responsável pelo site' 
                  : '1. Website Publisher & Identification'}
              </span>
            </h3>
            <p className="font-medium text-[#06151a]">
              Maître Ana Ferreira — {language === 'fr' ? CONTACT_INFO.titleFr : language === 'pt' ? CONTACT_INFO.titlePt : CONTACT_INFO.titleEn}
            </p>
            <div className="text-xs space-y-1 text-[#43484a]">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#775a19]" />
                <span>{CONTACT_INFO.address}, {CONTACT_INFO.postalCode}, {CONTACT_INFO.country}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#775a19]" />
                <a href={`mailto:${CONTACT_INFO.email}`} className="hover:underline text-[#775a19] font-medium">
                  {CONTACT_INFO.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#775a19]" />
                <span>{CONTACT_INFO.phone}</span>
              </div>
            </div>
          </div>

          {/* 2. Ordre professionnel & Déontologie */}
          <div className="bg-white p-5 rounded-2xl border border-[#c3c7c9]/60 shadow-2xs space-y-2">
            <h3 className="font-serif font-bold text-[#06151a] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#775a19]" />
              <span>
                {language === 'fr' 
                  ? '2. Ordre professionnel & Déontologie' 
                  : language === 'pt' 
                  ? '2. Ordem profissional & Deontologia' 
                  : '2. Professional Bar & Code of Conduct'}
              </span>
            </h3>
            <p className="text-xs">
              {language === 'fr'
                ? 'Maître Ana Ferreira est inscrite à l’Ordre Français des Avocats du Barreau de Bruxelles. L’exercice de la profession est soumis aux règles déontologiques édictées par l’Ordre des Barreaux Francophones et Germanophone de Belgique (OBFG), consultables en ligne sur le site officiel www.avocats.be.'
                : language === 'pt'
                ? 'A Dra. Ana Ferreira está inscrita na Ordem dos Advogados de Bruxelas (Barreau de Bruxelles). O exercício da advocacia rege-se pelas normas deontológicas da Ordem dos Advogados Francófonos e Germanófonos da Bélgica (OBFG), disponíveis em www.avocats.be.'
                : 'Attorney Ana Ferreira is a registered member of the French-speaking Brussels Bar. The practice of law is subject to the professional code of ethics established by the Ordre des Barreaux Francophones et Germanophone de Belgique (OBFG), accessible at www.avocats.be.'}
            </p>
          </div>

          {/* 3. Secret professionnel & RGPD */}
          <div className="bg-white p-5 rounded-2xl border border-[#c3c7c9]/60 shadow-2xs space-y-2">
            <h3 className="font-serif font-bold text-[#06151a]">
              {language === 'fr' 
                ? '3. Secret professionnel & Protection des données (RGPD)' 
                : language === 'pt' 
                ? '3. Segredo profissional & Proteção de Dados (RGPD)' 
                : '3. Legal Privilege & Data Protection (GDPR)'}
            </h3>
            <p className="text-xs">
              {language === 'fr'
                ? 'Toutes les communications, consultations et documents échangés avec le cabinet sont strictement couverts par le secret professionnel absolu de l’avocat (art. 458 du Code pénal belge). Les données à caractère personnel collectées via ce site font l’objet d’un traitement confidentiel conformément au Règlement Général sur la Protection des Données (RGPD - UE 2016/679).'
                : language === 'pt'
                ? 'Todas as comunicações e documentos tratados pelo escritório estão estritamente abrangidos pelo segredo profissional da advocacia (art. 458 do Código Penal belga). Os dados pessoais recolhidos são tratados com total confidencialidade nos termos do RGPD (UE 2016/679).'
                : 'All communications, legal advice, and documents exchanged with the firm are strictly protected under absolute attorney-client privilege (Art. 458 of the Belgian Penal Code). Personal data collected via this website is processed confidentially in full compliance with GDPR (EU 2016/679).'}
            </p>
          </div>

          {/* 4. Honoraires & Tarification */}
          <div className="bg-white p-5 rounded-2xl border border-[#c3c7c9]/60 shadow-2xs space-y-2">
            <h3 className="font-serif font-bold text-[#06151a]">
              {language === 'fr' 
                ? '4. Tarification & Convention d’honoraires' 
                : language === 'pt' 
                ? '4. Honorários & Condições' 
                : '4. Fees & Billing Terms'}
            </h3>
            <p className="text-xs">
              {language === 'fr'
                ? 'La première consultation juridique est fixée à 125 € TVAC (TVA 21% comprise). Le suivi du dossier et les prestations ultérieures sont facturés au taux horaire unique et transparent de 150 € HTVA. Tout rendez-vous annulé à moins de 24 heures de l’horaire convenu fait l’objet d’un forfait de 50 €. Une convention d’honoraires écrite est systématiquement remise dès l’ouverture de chaque dossier.'
                : language === 'pt'
                ? 'A primeira consulta jurídica é fixada em 125 € TVAC (IVA 21% incluído). Os serviços subsequentes são faturados à tarifa horária de 150 € (sem IVA). Cancelamentos com menos de 24h implicam taxa de 50 €. É celebrada uma convenção de honorários escrita na abertura de cada processo.'
                : 'Initial legal consultation is set at 125 € incl. VAT. Subsequent representation is billed on a single transparent hourly rate of €150 (excl. VAT). Appointments cancelled less than 24 hours in advance incur a 50 € flat fee. A written fee agreement is systematically established upon file opening.'}
            </p>
          </div>

          {/* 5. Partenaires et Réseau */}
          <div className="bg-white p-5 rounded-2xl border border-[#c3c7c9]/60 shadow-2xs space-y-2">
            <h3 className="font-serif font-bold text-[#06151a]">
              {language === 'fr' 
                ? '5. Réseau professionnel & Partenaires' 
                : language === 'pt' 
                ? '5. Rede profissional & Parceiros' 
                : '5. Professional Network & Partners'}
            </h3>
            <ul className="text-xs space-y-1 list-disc list-inside text-[#43484a]">
              {PARTNERS.map((p, idx) => (
                <li key={idx}>
                  <strong className="text-[#06151a]">{p.name}</strong> — {language === 'fr' ? p.roleFr : language === 'pt' ? p.rolePt : p.roleEn}
                </li>
              ))}
            </ul>
          </div>

          {/* Copyright notice */}
          <div className="text-center pt-2 text-xs text-[#829198]">
            {language === 'fr'
              ? '© 2026 Ana Ferreira - Cabinet d’avocat. Tous droits réservés.'
              : language === 'pt'
              ? '© 2026 Ana Ferreira - Escritório de advocacia. Todos os direitos reservados.'
              : '© 2026 Ana Ferreira - Law Firm. All rights reserved.'}
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={onClose}
            className="bg-[#06151a] hover:bg-[#1b2a2f] text-white px-8 py-2.5 rounded-full text-xs font-semibold transition-all shadow-sm"
          >
            {language === 'fr' ? 'Fermer' : language === 'pt' ? 'Fechar' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
