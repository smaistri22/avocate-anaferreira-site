import React, { useState } from 'react';
import { Language } from '../types';
import { CONTENT, IMAGES, CONTACT_INFO } from '../data/content';
import { MapPin, Phone, Mail, Clock, CheckCircle2, Copy, Download, ExternalLink, Calendar, Check } from './Icons';

interface ContactViewProps {
  language: Language;
  onOpenBooking: () => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ language, onOpenBooking }) => {
  const t = CONTENT[language];
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: t.contactPage.subjects[0],
    message: ''
  });

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(`${CONTACT_INFO.address}, ${CONTACT_INFO.postalCode}, ${CONTACT_INFO.country}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadVCard = () => {
    const vCardData = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      'N:Ferreira;Ana;;;',
      'FN:Ana Ferreira',
      'ORG:Cabinet d’Avocat Ana Ferreira',
      'TITLE:Avocate au Barreau de Bruxelles',
      `TEL;TYPE=CELL:${CONTACT_INFO.phoneClean}`,
      `EMAIL;TYPE=INTERNET:${CONTACT_INFO.email}`,
      `ADR;TYPE=WORK:;;${CONTACT_INFO.address};Etterbeek;;${CONTACT_INFO.postalCode};Belgique`,
      'NOTE:Cabinet d’avocat au Barreau de Bruxelles - Droit de la famille, recouvrement de créances, roulage, pénal, entreprise en difficulté.',
      'END:VCARD'
    ].join('\r\n');

    const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Ana_Ferreira_Avocate.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Envoi : ouvre la messagerie du visiteur avec un e-mail pré-rempli adressé au cabinet
  // (aucun service tiers : le message part de la boîte du visiteur vers celle du cabinet).
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullName = `${formData.firstName} ${formData.lastName}`.trim();
    const subject = `[Site internet] ${formData.subject} – ${fullName}`;
    const body = [
      formData.message,
      '',
      '—',
      `Nom : ${fullName}`,
      `E-mail : ${formData.email}`,
      formData.phone ? `Téléphone : ${formData.phone}` : '',
      `Objet : ${formData.subject}`,
    ].filter((line, index, lines) => line !== '' || index < lines.length - 1).join('\n');
    const mailto = `mailto:${CONTACT_INFO.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const link = document.createElement('a');
    link.href = mailto;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setFormSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-16 space-y-16">
      {/* Header Section */}
      <section className="max-w-3xl">
        <div className="editorial-line" />
        <h1 className="font-serif text-4xl sm:text-5xl font-normal text-[#06151a] tracking-tight leading-tight">
          {t.contactPage.title}
        </h1>
        <p className="text-base sm:text-lg text-[#43484a] mt-4 leading-relaxed font-normal">
          {t.contactPage.desc}
        </p>
      </section>

      {/* 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left: Contact Form with Underline Design */}
        <div className="lg:col-span-7 bg-[#f5f3f3] p-8 sm:p-10 rounded-3xl border border-[#c3c7c9]/50 shadow-xs">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#06151a] mb-6">
            {t.contactPage.formTitle}
          </h2>

          {formSubmitted ? (
            <div className="bg-white p-8 rounded-2xl border border-[#775a19]/30 text-center space-y-4 animate-in fade-in">
              <div className="w-14 h-14 rounded-full bg-[#fed488]/40 text-[#775a19] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#06151a]">
                {language === 'fr'
                  ? 'Votre message est prêt'
                  : language === 'pt'
                  ? 'A sua mensagem está pronta'
                  : 'Your message is ready'}
              </h3>
              <p className="text-sm text-[#43484a] leading-relaxed max-w-md mx-auto">
                {language === 'fr'
                  ? `Votre messagerie s'est ouverte avec votre message pré-rempli : il ne reste qu'à cliquer sur Envoyer. Si rien ne s'est ouvert, écrivez directement à ${CONTACT_INFO.email} ou appelez le ${CONTACT_INFO.phone}.`
                  : language === 'pt'
                  ? `O seu programa de e-mail abriu com a mensagem pré-preenchida: basta clicar em Enviar. Se nada abriu, escreva diretamente para ${CONTACT_INFO.email} ou ligue para ${CONTACT_INFO.phone}.`
                  : `Your email app has opened with your message pre-filled: just click Send. If nothing opened, write directly to ${CONTACT_INFO.email} or call ${CONTACT_INFO.phone}.`}
              </p>
              <button
                type="button"
                onClick={() => {
                  setFormSubmitted(false);
                  setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    subject: t.contactPage.subjects[0],
                    message: ''
                  });
                }}
                className="bg-[#06151a] text-white px-6 py-2.5 rounded-full text-xs font-semibold hover:bg-[#1b2a2f] transition-all"
              >
                {language === 'fr' 
                  ? 'Envoyer un autre message' 
                  : language === 'pt' 
                  ? 'Enviar nova mensagem' 
                  : 'Send another message'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Names */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold text-[#43484a] mb-2">
                    {t.contactPage.firstName} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full bg-transparent border-b-2 border-[#c3c7c9] focus:border-[#775a19] py-2.5 text-sm text-[#06151a] focus:outline-none transition-colors"
                    placeholder="Jean"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold text-[#43484a] mb-2">
                    {t.contactPage.lastName} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full bg-transparent border-b-2 border-[#c3c7c9] focus:border-[#775a19] py-2.5 text-sm text-[#06151a] focus:outline-none transition-colors"
                    placeholder="Dupont"
                  />
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold text-[#43484a] mb-2">
                    {t.contactPage.email} *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-transparent border-b-2 border-[#c3c7c9] focus:border-[#775a19] py-2.5 text-sm text-[#06151a] focus:outline-none transition-colors"
                    placeholder="jean.dupont@email.com"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold text-[#43484a] mb-2">
                    {t.contactPage.phone}
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-transparent border-b-2 border-[#c3c7c9] focus:border-[#775a19] py-2.5 text-sm text-[#06151a] focus:outline-none transition-colors"
                    placeholder="+32 470 00 00 00"
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-[#43484a] mb-2">
                  {t.contactPage.subject}
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-transparent border-b-2 border-[#c3c7c9] focus:border-[#775a19] py-2.5 text-sm text-[#06151a] focus:outline-none transition-colors"
                >
                  {t.contactPage.subjects.map((subj, idx) => (
                    <option key={idx} value={subj} className="bg-white text-[#06151a]">
                      {subj}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-[#43484a] mb-2">
                  {t.contactPage.message} *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-white/70 border border-[#c3c7c9] rounded-xl p-3.5 text-sm text-[#06151a] focus:outline-none focus:border-[#775a19] transition-colors"
                  placeholder={t.contactPage.messagePlaceholder}
                />
              </div>

              {/* Submit & Schedule quick link */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-[#06151a] hover:bg-[#1b2a2f] text-white px-8 py-3.5 rounded-full text-sm font-semibold transition-all shadow-md active:scale-98"
                >
                  {t.contactPage.submitBtn}
                </button>

                <button
                  type="button"
                  onClick={onOpenBooking}
                  className="text-xs font-bold text-[#775a19] hover:underline flex items-center gap-1.5"
                >
                  <Calendar className="w-4 h-4" />
                  <span>
                    {language === 'fr' 
                      ? 'Ou planifier un rendez-vous en direct' 
                      : language === 'pt' 
                      ? 'Ou agendar diretamente' 
                      : 'Or schedule an appointment directly'}
                  </span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Right: Office details, Map visual & Official Business Card */}
        <div className="lg:col-span-5 space-y-8">
          {/* Office Details Card */}
          <div className="bg-[#f5f3f3] p-8 rounded-3xl border border-[#c3c7c9]/50 shadow-xs space-y-6">
            <h3 className="font-serif text-2xl font-bold text-[#06151a]">
              {t.contactPage.officeDetails}
            </h3>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#775a19] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#06151a]">{t.contactPage.addressLabel}</strong>
                  <span className="text-[#43484a] block">{CONTACT_INFO.address}</span>
                  <span className="text-[#43484a] block">{CONTACT_INFO.postalCode}, {CONTACT_INFO.country}</span>
                  <button
                    onClick={handleCopyAddress}
                    className="mt-1.5 inline-flex items-center gap-1 text-xs font-semibold text-[#775a19] hover:text-[#06151a] transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? (language === 'fr' ? 'Adresse copiée !' : language === 'pt' ? 'Copiado!' : 'Address copied!') : t.contactPage.copyAddress}</span>
                  </button>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#775a19] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#06151a]">{t.contactPage.phoneLabel}</strong>
                  <a
                    href={`tel:${CONTACT_INFO.phoneClean}`}
                    className="text-[#43484a] hover:text-[#775a19] font-medium"
                  >
                    {CONTACT_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#775a19] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#06151a]">{t.contactPage.emailLabel}</strong>
                  <a
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="text-[#43484a] hover:text-[#775a19] font-medium"
                  >
                    {CONTACT_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#775a19] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#06151a]">{t.contactPage.hoursLabel}</strong>
                  <span className="text-[#43484a]">{CONTACT_INFO.hours}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#c3c7c9]/40 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleDownloadVCard}
                  className="inline-flex items-center gap-2 bg-white hover:bg-[#eae8e7] text-[#06151a] border border-[#c3c7c9] px-4 py-2 rounded-full text-xs font-semibold transition-all shadow-2xs cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-[#775a19]" />
                  <span>{t.contactPage.vCardDownload}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Map Preview & Directions */}
          <div className="rounded-3xl overflow-hidden border border-[#c3c7c9] bg-white shadow-xs">
            <div className="relative aspect-16/9 overflow-hidden">
              <img
                src={IMAGES.mapLocation}
                alt="Localisation du cabinet à Etterbeek Bruxelles"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-[#06151a]/15 pointer-events-none" />
              <div className="absolute bottom-3 left-3 bg-[#06151a]/85 backdrop-blur-xs text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm">
                <MapPin className="w-3.5 h-3.5 text-[#fed488]" />
                <span>1040 Etterbeek (Bruxelles)</span>
              </div>
            </div>
            <div className="p-4 bg-[#f5f3f3] flex items-center justify-between">
              <span className="text-xs text-[#43484a]">
                {language === 'fr' 
                  ? 'Accès aisé en métro (Mérode / Thieffry) & parking' 
                  : language === 'pt' 
                  ? 'Acesso fácil por metro (Mérode / Thieffry) & estacionamento'
                  : 'Easy access via metro (Mérode / Thieffry) & parking'}
              </span>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent('Rue Abbé Cuypers 3, 1040 Etterbeek, Bruxelles, Belgique')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-bold text-[#775a19] hover:underline"
              >
                <span>Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
