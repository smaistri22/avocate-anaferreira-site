import React, { useState } from 'react';
import { Language } from '../types';
import { CONTENT } from '../data/content';
import { Scale, CheckCircle2, Calendar, Phone, ArrowRight, Sparkles, Clock, FileText, ShieldCheck } from './Icons';

interface HonorairesViewProps {
  language: Language;
  onOpenBooking: () => void;
}

export const HonorairesView: React.FC<HonorairesViewProps> = ({ language, onOpenBooking }) => {
  const t = CONTENT[language];
  const hp = t.honorairesPage;

  // Interactive Hours Estimator
  const [estimatedHours, setEstimatedHours] = useState<number>(1);
  const hourlyRateHTVA = 150;
  const vatRate = 0.21;

  const totalHTVA = estimatedHours * hourlyRateHTVA;
  const totalTVA = totalHTVA * vatRate;
  const totalTTC = totalHTVA + totalTVA;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-16 space-y-16 sm:space-y-20">
      {/* Header Section */}
      <section className="max-w-3xl">
        <div className="editorial-line" />
        <h1 className="font-serif text-4xl sm:text-5xl font-normal text-[#06151a] tracking-tight leading-tight">
          {hp.title}
        </h1>
        <p className="text-base sm:text-lg text-[#43484a] mt-4 leading-relaxed font-normal">
          {hp.desc}
        </p>
      </section>

      {/* Rates Cards Grid: First Consultation & Hourly Rate */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Card 1: First Consultation (125 € TVAC) */}
        <div className="lg:col-span-5 bg-[#fed488]/20 rounded-3xl p-8 sm:p-10 border border-[#775a19]/30 shadow-md flex flex-col justify-between relative overflow-hidden">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#775a19]/30 text-xs font-bold uppercase tracking-wider text-[#775a19]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#775a19]" />
              <span>{hp.consultationBadge}</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#06151a]">
              {hp.consultationTitle}
            </h2>

            <div className="flex flex-wrap items-baseline gap-2 pt-1">
              <span className="font-serif text-5xl sm:text-6xl font-bold text-[#775a19] tracking-tight">
                {hp.consultationRate}
              </span>
              <span className="text-sm font-semibold text-[#06151a] uppercase tracking-wider">
                {hp.consultationUnit}
              </span>
            </div>

            <p className="text-sm text-[#43484a] leading-relaxed">
              {hp.consultationDesc}
            </p>

            <div className="p-4 bg-white/80 rounded-2xl border border-[#775a19]/20 space-y-2 text-xs">
              <div className="font-bold text-[#775a19] flex items-center gap-1.5">
                <Clock className="w-4 h-4 shrink-0" />
                <span>{hp.cancellationTitle}</span>
              </div>
              <p className="text-[#43484a] leading-relaxed">
                {hp.cancellationDesc}
              </p>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-[#775a19]/20">
            <button
              onClick={onOpenBooking}
              className="w-full bg-[#06151a] hover:bg-[#1b2a2f] text-white py-3.5 px-6 rounded-full text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-md active:scale-98"
            >
              <Calendar className="w-4 h-4 text-[#fed488]" />
              <span>
                {language === 'fr' 
                  ? 'Réserver ma consultation (125 € TVAC)' 
                  : language === 'pt' 
                  ? 'Marcar consulta (125 € TVAC)' 
                  : 'Book consultation (125 € incl. VAT)'}
              </span>
            </button>
          </div>
        </div>

        {/* Card 2: Main Hourly Rate (150 € HTVA) with Interactive Simulator */}
        <div className="lg:col-span-7 bg-[#06151a] text-white rounded-3xl p-8 sm:p-10 border border-[#1b2a2f] shadow-2xl flex flex-col justify-between relative overflow-hidden">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1b2a2f] border border-[#775a19]/50 text-xs font-bold uppercase tracking-wider text-[#fed488]">
              <Sparkles className="w-3.5 h-3.5 text-[#fed488]" />
              <span>{hp.badge}</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl text-[#d5e5ec] font-normal leading-tight">
              {hp.mainTitle}
            </h2>

            <div className="flex flex-wrap items-baseline gap-3">
              <span className="font-serif text-5xl sm:text-6xl font-bold text-[#fed488] tracking-tight">
                {hp.rateAmount}
              </span>
              <span className="text-base sm:text-lg text-[#b9c9d0] font-normal">
                {hp.rateUnit}
              </span>
            </div>

            <p className="text-sm text-[#b9c9d0] leading-relaxed">
              {hp.mainSubtitle}
            </p>

            {/* Quick Simulator embedded */}
            <div className="bg-[#1b2a2f] p-5 sm:p-6 rounded-2xl border border-[#43484a]/60 shadow-lg space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#fed488]" />
                  {language === 'fr' ? 'Simulateur d’heures :' : language === 'pt' ? 'Simulador de horas :' : 'Hourly Estimator :'}
                </span>
                <span className="font-bold text-[#fed488] text-sm">
                  {estimatedHours} {estimatedHours > 1 ? (language === 'fr' ? 'heures' : language === 'pt' ? 'horas' : 'hours') : (language === 'fr' ? 'heure' : language === 'pt' ? 'hora' : 'hour')}
                </span>
              </div>

              <input
                type="range"
                min="1"
                max="20"
                step="1"
                value={estimatedHours}
                onChange={(e) => setEstimatedHours(parseInt(e.target.value) || 1)}
                className="w-full h-2 bg-[#06151a] rounded-lg appearance-none cursor-pointer accent-[#fed488]"
              />

              <div className="grid grid-cols-3 text-center gap-2 pt-2 border-t border-[#43484a]/60 text-xs">
                <div className="bg-[#06151a] p-2 rounded-xl">
                  <span className="block text-[10px] text-[#829198] uppercase">HTVA</span>
                  <span className="font-bold text-white">{totalHTVA.toFixed(2)} €</span>
                </div>
                <div className="bg-[#06151a] p-2 rounded-xl">
                  <span className="block text-[10px] text-[#829198] uppercase">TVA (21%)</span>
                  <span className="font-bold text-[#b9c9d0]">{totalTVA.toFixed(2)} €</span>
                </div>
                <div className="bg-[#06151a] p-2 rounded-xl border border-[#775a19]/40">
                  <span className="block text-[10px] text-[#fed488] uppercase font-bold">Total TVAC</span>
                  <span className="font-bold text-[#fed488]">{totalTTC.toFixed(2)} €</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-[#1b2a2f] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="text-xs text-[#829198] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#fed488] shrink-0" />
              <span>
                {language === 'fr' 
                  ? 'Convention d’honoraires écrite systématique' 
                  : language === 'pt' 
                  ? 'Convenção escrita em todos os processos' 
                  : 'Written fee agreement systematically established'}
              </span>
            </div>

            <button
              onClick={onOpenBooking}
              className="bg-[#fed488] hover:bg-[#ffdea5] text-[#06151a] px-6 py-3 rounded-full text-xs font-bold flex items-center justify-center gap-2 transition-all shrink-0"
            >
              <span>{language === 'fr' ? 'Prendre rendez-vous' : language === 'pt' ? 'Marcar consulta' : 'Book appointment'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 3 Pillars of Transparency */}
      <section className="space-y-8">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-[#775a19] block mb-1">
            {language === 'fr' ? 'Méthodologie' : language === 'pt' ? 'Metodologia' : 'Methodology'}
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#06151a]">
            {hp.transparencyTitle}
          </h2>
          <p className="text-sm sm:text-base text-[#43484a] mt-2 max-w-2xl">
            {hp.transparencyDesc}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Pillar 1 */}
          <div className="bg-[#f5f3f3] p-8 rounded-3xl border border-[#c3c7c9]/50 flex flex-col justify-between shadow-2xs hover:shadow-sm transition-shadow">
            <div>
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#775a19] mb-6 shadow-2xs font-bold text-sm">
                01
              </div>
              <h3 className="font-serif text-xl font-bold text-[#06151a] mb-3">
                {hp.item1Title}
              </h3>
              <p className="text-sm text-[#43484a] leading-relaxed">
                {hp.item1Desc}
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-[#c3c7c9]/30 text-xs font-semibold text-[#775a19] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>
                {language === 'fr' ? 'Timesheet horodaté' : language === 'pt' ? 'Registo rigoroso' : 'Itemized timesheet'}
              </span>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="bg-[#f5f3f3] p-8 rounded-3xl border border-[#c3c7c9]/50 flex flex-col justify-between shadow-2xs hover:shadow-sm transition-shadow">
            <div>
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#775a19] mb-6 shadow-2xs font-bold text-sm">
                02
              </div>
              <h3 className="font-serif text-xl font-bold text-[#06151a] mb-3">
                {hp.item2Title}
              </h3>
              <p className="text-sm text-[#43484a] leading-relaxed">
                {hp.item2Desc}
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-[#c3c7c9]/30 text-xs font-semibold text-[#775a19] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>
                {language === 'fr' ? 'Accord écrit préalable' : language === 'pt' ? 'Acordo formal prévio' : 'Prior written agreement'}
              </span>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="bg-[#f5f3f3] p-8 rounded-3xl border border-[#c3c7c9]/50 flex flex-col justify-between shadow-2xs hover:shadow-sm transition-shadow">
            <div>
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#775a19] mb-6 shadow-2xs font-bold text-sm">
                03
              </div>
              <h3 className="font-serif text-xl font-bold text-[#06151a] mb-3">
                {hp.item3Title}
              </h3>
              <p className="text-sm text-[#43484a] leading-relaxed">
                {hp.item3Desc}
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-[#c3c7c9]/30 text-xs font-semibold text-[#775a19] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>
                {language === 'fr' ? 'Maîtrise budgétaire' : language === 'pt' ? 'Controlo financeiro' : 'Budgetary control'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Scope of Interventions Covered */}
      <section className="bg-[#fbf9f8] p-8 sm:p-12 rounded-3xl border border-[#c3c7c9]/60 shadow-xs">
        <div className="max-w-3xl mb-8">
          <span className="text-xs uppercase font-bold tracking-widest text-[#775a19] block mb-1">
            {language === 'fr' ? 'Périmètre d’intervention' : language === 'pt' ? 'Âmbito de Intervenção' : 'Scope of representation'}
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#06151a]">
            {hp.scopeTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {hp.scopeItems.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-3.5 bg-white p-5 rounded-2xl border border-[#c3c7c9]/40 shadow-2xs"
            >
              <div className="w-6 h-6 rounded-full bg-[#fed488]/30 flex items-center justify-center text-[#775a19] shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <p className="text-sm text-[#1b1c1c] leading-relaxed font-medium">
                {item}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Legal & Fiscal Notice Section */}
      <section className="p-6 sm:p-8 rounded-2xl bg-[#f5f3f3] border border-[#c3c7c9]/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-1.5 max-w-3xl">
          <h4 className="font-serif text-lg font-bold text-[#06151a] flex items-center gap-2">
            <Scale className="w-4 h-4 text-[#775a19]" />
            <span>{hp.vatNoteTitle}</span>
          </h4>
          <p className="text-xs sm:text-sm text-[#43484a] leading-relaxed">
            {hp.vatNoteDesc}
          </p>
        </div>

        <button
          onClick={onOpenBooking}
          className="bg-[#06151a] hover:bg-[#1b2a2f] text-white px-6 py-3 rounded-full text-xs font-semibold whitespace-nowrap transition-colors shadow-xs shrink-0 self-stretch sm:self-auto text-center"
        >
          {language === 'fr' ? 'Prendre rendez-vous' : language === 'pt' ? 'Marcar Consulta' : 'Book an Appointment'}
        </button>
      </section>
    </div>
  );
};
