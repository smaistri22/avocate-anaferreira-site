import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { 
  X, 
  Calendar as CalendarIcon, 
  CheckCircle2, 
  MapPin, 
  Globe2, 
  Phone, 
  Clock, 
  AlertCircle, 
  Lock, 
  Check, 
  Trash2, 
  RefreshCw,
  ShieldCheck 
} from './Icons';
import { CONTACT_INFO } from '../data/content';
import { 
  GoogleCalendarService, 
  getLocalBookedSlots, 
  saveLocalBookedSlot, 
  removeLocalBookedSlot,
  BookedSlotRecord 
} from '../services/calendarService';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

// Available standard consulting hours in cabinet (9h to 16h on the hour only: 9h, 10h, 11h, 12h, 13h, 14h, 15h, 16h)
const DAILY_SLOTS = [
  { id: '09:00', label: '09:00 - 10:00' },
  { id: '10:00', label: '10:00 - 11:00' },
  { id: '11:00', label: '11:00 - 12:00' },
  { id: '12:00', label: '12:00 - 13:00' },
  { id: '13:00', label: '13:00 - 14:00' },
  { id: '14:00', label: '14:00 - 15:00' },
  { id: '15:00', label: '15:00 - 16:00' },
  { id: '16:00', label: '16:00 - 17:00' }
];

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, language }) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [viewTab, setViewTab] = useState<'client' | 'avocat_admin'>('client');
  
  // Form State with complete postal address
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '', // Full postal address
    mode: 'cabinet' as 'cabinet' | 'visio' | 'phone',
    domain: 'Droit de la famille',
    date: '',
    timeSlot: '10:00',
    notes: ''
  });

  // Validation error state for uncompleted fields
  const [formErrors, setFormErrors] = useState<string | null>(null);

  // Today formatted as min date (YYYY-MM-DD)
  const todayStr = new Date().toISOString().split('T')[0];

  // Cancellation policy agreement state
  const [cancellationAccepted, setCancellationAccepted] = useState<boolean>(false);
  const [googleConnected, setGoogleConnected] = useState<boolean>(false);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [googleBusyHours, setGoogleBusyHours] = useState<string[]>([]);
  const [authError, setAuthError] = useState<string | null>(null);

  // Admin password unlock
  const [isAdminUnlocked, setIsAdminUnlocked] = useState<boolean>(false);
  const [adminPin, setAdminPin] = useState('');
  const [adminPinError, setAdminPinError] = useState(false);
  const [bookedSlotsList, setBookedSlotsList] = useState<BookedSlotRecord[]>([]);

  // Initialize date to next weekday if empty
  useEffect(() => {
    if (!formData.date) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      // Skip weekend if landing on Saturday (6) or Sunday (0)
      if (tomorrow.getDay() === 6) tomorrow.setDate(tomorrow.getDate() + 2);
      if (tomorrow.getDay() === 0) tomorrow.setDate(tomorrow.getDate() + 1);
      
      const yyyy = tomorrow.getFullYear();
      const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
      const dd = String(tomorrow.getDate()).padStart(2, '0');
      setFormData(prev => ({ ...prev, date: `${yyyy}-${mm}-${dd}` }));
    }
  }, [formData.date]);

  // Load booked slots list & check Google token
  useEffect(() => {
    if (isOpen) {
      setBookedSlotsList(getLocalBookedSlots());
      const token = GoogleCalendarService.getStoredToken();
      if (token) {
        setGoogleConnected(true);
      }
    }
  }, [isOpen]);

  // Check availability when date changes or Google token is active
  useEffect(() => {
    if (formData.date) {
      refreshAvailability(formData.date);
    }
  }, [formData.date, googleConnected]);

  const refreshAvailability = async (dateStr: string) => {
    const token = GoogleCalendarService.getStoredToken();
    if (!token) {
      setGoogleBusyHours([]);
      return;
    }

    setIsSyncing(true);
    try {
      const events = await GoogleCalendarService.fetchCalendarEventsForDate(dateStr, token);
      // Find overlapping slots
      const busyTimes: string[] = [];
      
      events.forEach(evt => {
        const startH = evt.start.getHours();
        const startM = evt.start.getMinutes();
        const endH = evt.end.getHours();
        const endM = evt.end.getMinutes();

        DAILY_SLOTS.forEach(slot => {
          const [slotH, slotM] = slot.id.split(':').map(Number);
          const slotStart = slotH * 60 + slotM;
          const slotEnd = slotStart + 60; // 1 hour

          const evtStart = startH * 60 + startM;
          const evtEnd = endH * 60 + endM;

          if ((slotStart >= evtStart && slotStart < evtEnd) || (slotEnd > evtStart && slotEnd <= evtEnd) || (slotStart <= evtStart && slotEnd >= evtEnd)) {
            if (!busyTimes.includes(slot.id)) {
              busyTimes.push(slot.id);
            }
          }
        });
      });

      setGoogleBusyHours(busyTimes);
    } catch {
      // Ignore or clear
    } finally {
      setIsSyncing(false);
    }
  };

  const handleConnectGoogleCalendar = async () => {
    setAuthError(null);
    try {
      setIsSyncing(true);
      const token = await GoogleCalendarService.requestGoogleAuth();
      if (token) {
        setGoogleConnected(true);
        if (formData.date) {
          await refreshAvailability(formData.date);
        }
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Erreur de synchronisation';
      setAuthError(msg);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleDisconnectGoogle = () => {
    GoogleCalendarService.clearToken();
    setGoogleConnected(false);
    setGoogleBusyHours([]);
  };

  if (!isOpen) return null;

  // Determine if a slot is taken
  const isSlotBooked = (slotId: string) => {
    // 1. Check local booked slots for selected date
    const isBookedLocally = bookedSlotsList.some(
      s => s.date === formData.date && s.timeSlot === slotId
    );
    // 2. Check Google Calendar events busy hours
    const isBookedGoogle = googleBusyHours.includes(slotId);

    return isBookedLocally || isBookedGoogle;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors(null);

    // Strict validation: every required field must be non-empty and valid
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.address.trim() || !formData.date.trim() || !formData.timeSlot.trim()) {
      setFormErrors(
        language === 'fr'
          ? "Attention : Tous les champs obligatoires (nom, email, téléphone, adresse postale complète, date et créneau horaire) doivent être correctement complétés pour que votre demande soit prise en compte."
          : language === 'pt'
          ? "Atenção: Todos os campos obrigatórios (nome, email, telefone, morada completa, data e horário) devem ser preenchidos para que o agendamento seja validado."
          : "Attention: All required fields (name, email, phone, full postal address, date and time slot) must be accurately completed for your booking to be processed."
      );
      return;
    }

    if (!cancellationAccepted) {
      setFormErrors(
        language === 'fr'
          ? "Veuillez cocher la case d'acceptation de la condition d'annulation (50 € forfaitaires en cas d'annulation à moins de 24h) pour valider votre rendez-vous."
          : language === 'pt'
          ? "Por favor aceite a condição de cancelamento (taxa de 50€ em caso de cancelamento com menos de 24h de antecedência)."
          : "Please accept the cancellation policy (50€ fixed fee if cancelled less than 24h in advance)."
      );
      return;
    }

    if (isSlotBooked(formData.timeSlot)) {
      setFormErrors(
        language === 'fr' 
          ? "Ce créneau vient d'être réservé. Veuillez en choisir un autre." 
          : language === 'pt'
          ? "Este horário já não está disponível. Por favor selecione outro."
          : "This time slot has just been reserved. Please select another slot."
      );
      return;
    }

    // Save record to local storage
    const newRecord: BookedSlotRecord = {
      id: 'rdv_' + Date.now(),
      date: formData.date,
      timeSlot: formData.timeSlot,
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      address: formData.address.trim(),
      domain: formData.domain,
      mode: formData.mode,
      createdAt: new Date().toISOString(),
      syncGoogle: googleConnected
    };

    saveLocalBookedSlot(newRecord);
    setBookedSlotsList(getLocalBookedSlots());

    // If Google token is active, insert into Google Calendar
    const token = GoogleCalendarService.getStoredToken();
    if (token) {
      try {
        await GoogleCalendarService.createCalendarEvent({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          address: formData.address.trim(),
          mode: formData.mode,
          domain: formData.domain,
          date: formData.date,
          timeSlot: formData.timeSlot,
          notes: formData.notes
        }, token);
      } catch (err) {
        console.warn('Could not sync directly to Google Calendar:', err);
      }
    }

    setStep('success');
  };

  const resetAndClose = () => {
    setStep('form');
    setFormErrors(null);
    onClose();
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default master PIN for cabinet administration
    if (adminPin === '1040' || adminPin === '2026' || adminPin.toLowerCase() === 'avocat') {
      setIsAdminUnlocked(true);
      setAdminPinError(false);
    } else {
      setAdminPinError(true);
    }
  };

  const handleDeleteSlot = (id: string) => {
    removeLocalBookedSlot(id);
    setBookedSlotsList(getLocalBookedSlots());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#06151a]/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-[#fbf9f8] text-[#1b1c1c] rounded-2xl max-w-2xl w-full p-5 sm:p-8 shadow-2xl border border-[#c3c7c9] max-h-[92vh] overflow-y-auto relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={resetAndClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-[#efeded] hover:bg-[#eae8e7] text-[#43484a] transition-colors"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Tab switch header: Client booking vs Cabinet/Google Sync */}
        <div className="flex items-center gap-2 mb-6 border-b border-[#c3c7c9]/40 pb-3 pr-8">
          <button
            type="button"
            onClick={() => setViewTab('client')}
            className={`text-xs font-bold px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
              viewTab === 'client'
                ? 'bg-[#06151a] text-white shadow-xs'
                : 'text-[#43484a] hover:bg-[#eae8e7]'
            }`}
          >
            <CalendarIcon className="w-3.5 h-3.5" />
            <span>
              {language === 'fr' ? 'Prise de rendez-vous' : language === 'pt' ? 'Marcar Consulta' : language === 'es' ? 'Reservar Cita' : 'Book Consultation'}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setViewTab('avocat_admin')}
            className={`text-xs font-bold px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
              viewTab === 'avocat_admin'
                ? 'bg-[#775a19] text-white shadow-xs'
                : 'text-[#43484a] hover:bg-[#eae8e7]'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>
              {language === 'fr' ? 'Espace Agenda Avocat' : language === 'pt' ? 'Gestão de Agenda' : language === 'es' ? 'Gestión de Agenda' : 'Lawyer Calendar Control'}
            </span>
            {googleConnected && (
              <span className="w-2 h-2 rounded-full bg-green-400"></span>
            )}
          </button>
        </div>

        {/* View Tab: Avocat Admin & Google Calendar Sync */}
        {viewTab === 'avocat_admin' ? (
          <div className="space-y-6">
            {!isAdminUnlocked ? (
              <div className="p-6 bg-[#f5f3f3] rounded-2xl border border-[#c3c7c9]/50 text-center max-w-md mx-auto">
                <div className="w-12 h-12 rounded-full bg-[#fed488]/40 text-[#775a19] flex items-center justify-center mx-auto mb-3">
                  <Lock className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-lg font-bold text-[#06151a] mb-1">
                  {language === 'fr' ? 'Accès réservé à Maître Ana Ferreira' : 'Acesso reservado ao escritório'}
                </h4>
                <p className="text-xs text-[#43484a] mb-4">
                  {language === 'fr' 
                    ? 'Connectez votre compte Google Calendar ou gérez les créneaux déjà réservés par vos clients.' 
                    : 'Sincronize a sua conta Google Calendar e gira os agendamentos existentes.'}
                </p>

                <form onSubmit={handleAdminLogin} className="space-y-3">
                  <input
                    type="password"
                    value={adminPin}
                    onChange={(e) => {
                      setAdminPin(e.target.value);
                      setAdminPinError(false);
                    }}
                    placeholder={language === 'fr' ? 'Code confidentiel (ex: 1040)' : 'Código PIN'}
                    className="w-full text-center px-4 py-2 text-sm bg-white border border-[#c3c7c9] rounded-xl focus:outline-none focus:border-[#775a19]"
                  />
                  {adminPinError && (
                    <p className="text-xs text-red-600">
                      {language === 'fr' ? 'Code incorrect. (Code par défaut: 1040)' : 'Código incorreto (Padrão: 1040)'}
                    </p>
                  )}
                  <button
                    type="submit"
                    className="w-full bg-[#06151a] hover:bg-[#1b2a2f] text-white py-2.5 rounded-xl text-xs font-bold transition-all"
                  >
                    {language === 'fr' ? 'Déverrouiller la gestion' : 'Aceder'}
                  </button>
                </form>
              </div>
            ) : (
              <div className="space-y-6 animate-in fade-in duration-150">
                {/* Google Calendar Sync Box */}
                <div className="bg-[#06151a] text-white p-5 rounded-2xl border border-[#43484a] space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#fed488]">
                        <CalendarIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-serif font-bold text-sm text-[#d5e5ec]">
                          Synchronisation Google Calendar
                        </h4>
                        <p className="text-[11px] text-[#b9c9d0]">
                          Compte associé : <strong>anaferreiraavocate@outlook.com</strong> / Google Calendar
                        </p>
                      </div>
                    </div>

                    {googleConnected ? (
                      <span className="px-2.5 py-1 rounded-full bg-green-950/80 border border-green-500/40 text-green-300 text-[11px] font-semibold flex items-center gap-1">
                        <Check className="w-3 h-3" /> Connecté & Actif
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-300 text-[11px] font-semibold flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> Non synchronisé
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-[#b9c9d0] leading-relaxed">
                    Lorsque la synchronisation est active, le formulaire lit directement vos disponibilités dans votre agenda Google : tout créneau contenant une audience ou un événement est <strong>automatiquement grisé</strong> pour vos clients. Tout nouveau rendez-vous pris est <strong>inscrit directement dans votre calendrier</strong>.
                  </p>

                  {authError && (
                    <div className="p-3 bg-red-950/60 border border-red-500/30 rounded-xl text-xs text-red-200">
                      {authError}
                    </div>
                  )}

                  <div className="pt-2 flex flex-wrap gap-2">
                    {!googleConnected ? (
                      <button
                        type="button"
                        onClick={handleConnectGoogleCalendar}
                        disabled={isSyncing}
                        className="bg-[#fed488] hover:bg-[#ffdea5] text-[#06151a] px-5 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                        <span>Connecter mon Google Calendar</span>
                      </button>
                    ) : (
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => formData.date && refreshAvailability(formData.date)}
                          disabled={isSyncing}
                          className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5"
                        >
                          <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                          <span>Actualiser les créneaux</span>
                        </button>
                        <button
                          type="button"
                          onClick={handleDisconnectGoogle}
                          className="bg-red-500/20 hover:bg-red-500/30 text-red-200 px-4 py-2 rounded-full text-xs font-semibold transition-all"
                        >
                          Déconnecter
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* List of booked client appointments */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-serif text-sm font-bold text-[#06151a]">
                      Rendez-vous enregistrés ({bookedSlotsList.length})
                    </h4>
                    <span className="text-[11px] text-[#43484a]">
                      Créneaux bloqués de 9h à 16h pile
                    </span>
                  </div>

                  {bookedSlotsList.length === 0 ? (
                    <div className="text-center py-8 bg-[#f5f3f3] rounded-xl border border-dashed border-[#c3c7c9] text-xs text-[#43484a]">
                      Aucun rendez-vous client enregistré pour le moment.
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {bookedSlotsList.map((slot) => (
                        <div 
                          key={slot.id} 
                          className="p-3 bg-white rounded-xl border border-[#c3c7c9]/60 flex items-center justify-between gap-3 text-xs shadow-2xs"
                        >
                          <div>
                            <div className="font-bold text-[#06151a] flex items-center gap-2">
                              <span>{slot.date} à {slot.timeSlot}</span>
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#fed488]/30 text-[#775a19]">
                                {slot.domain}
                              </span>
                            </div>
                            <div className="text-[#43484a] text-[11px] mt-0.5">
                              {slot.name} — {slot.phone} ({slot.email})
                            </div>
                            {slot.address && (
                              <div className="text-[#775a19] text-[10px] mt-0.5 flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                <span>{slot.address}</span>
                              </div>
                            )}
                          </div>

                          <button
                            type="button"
                            onClick={() => handleDeleteSlot(slot.id)}
                            title="Supprimer / Libérer ce créneau"
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t border-[#c3c7c9]/40 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setViewTab('client')}
                    className="bg-[#06151a] text-white px-5 py-2 rounded-full text-xs font-semibold hover:bg-[#1b2a2f]"
                  >
                    Retour à la prise de rendez-vous client
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : step === 'success' ? (
          <div className="text-center py-6 animate-in fade-in duration-200">
            <div className="w-16 h-16 rounded-full bg-[#fed488]/50 text-[#775a19] flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#06151a] mb-2">
              {language === 'fr' 
                ? 'Rendez-vous Validé avec Succès' 
                : language === 'pt' 
                ? 'Consulta Agendada com Sucesso' 
                : 'Appointment Successfully Scheduled'}
            </h3>
            <p className="text-sm text-[#43484a] max-w-md mx-auto mb-6">
              {language === 'fr'
                ? `Merci ${formData.name}. Votre créneau du ${formData.date} à ${formData.timeSlot} a été réservé et transmis au cabinet de Me Ana Ferreira.`
                : language === 'pt'
                ? `Obrigado ${formData.name}. O seu horário para ${formData.date} às ${formData.timeSlot} foi reservado e transmitido ao escritório da Dra. Ana Ferreira.`
                : `Thank you ${formData.name}. Your appointment on ${formData.date} at ${formData.timeSlot} has been registered with Attorney Ana Ferreira's office.`}
            </p>

            <div className="bg-[#f5f3f3] p-4 rounded-xl text-left text-xs space-y-2 text-[#1b1c1c] border border-[#eae8e7] mb-6">
              <div className="flex items-center justify-between pb-2 border-b border-[#c3c7c9]/40">
                <span className="font-bold text-[#06151a]">
                  {language === 'fr' ? 'Tarif de la consultation :' : language === 'pt' ? 'Tarifa da consulta :' : 'Consultation fee :'}
                </span>
                <span className="font-bold text-xs text-[#775a19] bg-[#fed488]/40 px-2.5 py-0.5 rounded-full border border-[#775a19]/30">
                  125 € TVAC
                </span>
              </div>
              <div>
                <strong>{language === 'fr' ? 'Modalité :' : language === 'pt' ? 'Modalidade :' : 'Format :'}</strong>{' '}
                {formData.mode === 'cabinet' 
                  ? `${language === 'fr' ? 'Au Cabinet' : language === 'pt' ? 'Presencial no escritório' : 'In office'} (${CONTACT_INFO.address}, ${CONTACT_INFO.postalCode})` 
                  : formData.mode === 'visio' 
                  ? (language === 'fr' ? 'Visioconférence Google Meet' : language === 'pt' ? 'Videoconferência Google Meet' : 'Google Meet Video Call') 
                  : (language === 'fr' ? 'Consultation Téléphonique' : language === 'pt' ? 'Consulta Telefónica' : 'Phone consultation')}
              </div>
              <div>
                <strong>{language === 'fr' ? 'Matière juridique :' : language === 'pt' ? 'Assunto :' : 'Legal area :'}</strong> {formData.domain}
              </div>
              <div>
                <strong>{language === 'fr' ? 'Date & Heure :' : language === 'pt' ? 'Data & Hora :' : 'Date & Time :'}</strong> {formData.date} à {formData.timeSlot}
              </div>
              <div>
                <strong>{language === 'fr' ? 'Adresse du client :' : language === 'pt' ? 'Morada do cliente :' : 'Client address :'}</strong> {formData.address}
              </div>
              <div>
                <strong>{language === 'fr' ? 'Contact :' : language === 'pt' ? 'Contacto :' : 'Contact :'}</strong> {formData.email} • {formData.phone}
              </div>
              <div className="pt-2 border-t border-[#c3c7c9]/40 text-[11px] text-[#775a19] flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" />
                <span>
                  {language === 'fr'
                    ? "Condition d'annulation acceptée (forfait de 50 € si annulation à moins de 24h)."
                    : language === 'pt'
                    ? 'Condição de cancelamento aceite (taxa fixa de 50 € se cancelado com menos de 24h).'
                    : 'Cancellation policy accepted (50 € flat fee if cancelled less than 24h prior).'}
                </span>
              </div>
            </div>

            <button
              onClick={resetAndClose}
              className="bg-[#06151a] hover:bg-[#1b2a2f] text-white px-8 py-3 rounded-full text-sm font-semibold transition-colors"
            >
              {language === 'fr' ? 'Fermer' : language === 'pt' ? 'Concluir' : 'Close'}
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-4">
              <span className="text-xs uppercase font-bold tracking-widest text-[#775a19] block mb-1">
                {language === 'fr' ? 'Consultation Juridique & Agenda' : language === 'pt' ? 'Consulta Jurídica' : 'Legal Consultation'}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#06151a]">
                {language === 'fr' ? 'Prendre rendez-vous en direct' : language === 'pt' ? 'Marcar Consulta' : 'Book an Appointment'}
              </h3>
              <p className="text-xs text-[#43484a] mt-1">
                {language === 'fr' 
                  ? "Créneaux de consultation disponibles aux heures fixes de 9h00 à 16h00 (dernière plage horaire débutant à 16h00)." 
                  : language === 'pt'
                  ? "Horários de consulta disponíveis a horas certas das 9h00 às 16h00 (último horário às 16h00)."
                  : "Consultation slots available on the hour from 9:00 AM to 4:00 PM (last slot starts at 4:00 PM)."}
              </p>
            </div>

            {/* First consultation pricing notice */}
            <div className="mb-3 p-3 bg-[#06151a] text-white rounded-xl border border-[#43484a] flex items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#fed488]/20 flex items-center justify-center text-[#fed488] shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#fed488]">
                    {language === 'fr' 
                      ? 'Tarif de la première consultation' 
                      : language === 'pt' 
                      ? 'Tarifa da primeira consulta' 
                      : 'Initial Consultation Fee'}
                  </div>
                  <div className="text-[11px] text-[#b9c9d0]">
                    {language === 'fr'
                      ? 'Cabinet, visioconférence ou téléphone (TVA 21% comprise)'
                      : language === 'pt'
                      ? 'Escritório, videoconferência ou telefone (IVA 21% incluído)'
                      : 'In-office, video conference or phone (21% VAT included)'}
                  </div>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="font-serif text-lg sm:text-xl font-bold text-[#fed488]">
                  125 €
                </span>
                <span className="text-[10px] text-[#b9c9d0] block uppercase tracking-wider font-semibold">
                  TVAC
                </span>
              </div>
            </div>

            {/* Mandatory completion disclaimer */}
            <div className="mb-4 p-3.5 bg-[#fed488]/20 border border-[#775a19]/40 rounded-xl flex items-start gap-2.5 text-xs text-[#06151a]">
              <AlertCircle className="w-4 h-4 text-[#775a19] shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <strong>
                  {language === 'fr'
                    ? "Avertissement important :"
                    : language === 'pt'
                    ? "Aviso importante :"
                    : "Important Notice :"}
                </strong>{' '}
                {language === 'fr'
                  ? "Tout formulaire complété et envoyé sera pris en compte uniquement si TOUS les champs obligatoires (coordonnées, adresse postale complète, modalité et date) ont été rigoureusement et correctement renseignés."
                  : language === 'pt'
                  ? "Qualquer formulário submetido apenas será considerado e validado se TODOS os campos obrigatórios (dados de contacto, morada completa, modalidade e data) tiverem sido rigorosamente preenchidos."
                  : "Any submitted booking will ONLY be considered and confirmed if ALL mandatory fields (contact info, full postal address, format, and date) are strictly and accurately completed."}
              </div>
            </div>

            {formErrors && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-800 rounded-xl text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formErrors}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Consultation mode selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#43484a] mb-2">
                  {language === 'fr' ? 'Mode de consultation :' : language === 'pt' ? 'Tipo de consulta :' : 'Consultation format :'}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, mode: 'cabinet' })}
                    className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                      formData.mode === 'cabinet'
                        ? 'border-[#775a19] bg-[#fed488]/20 text-[#06151a] font-semibold'
                        : 'border-[#c3c7c9]/60 hover:bg-[#f5f3f3] text-[#43484a]'
                    }`}
                  >
                    <MapPin className="w-4 h-4 text-[#775a19]" />
                    <span className="text-xs">{language === 'fr' ? 'Au Cabinet' : language === 'pt' ? 'Presencial' : 'In Office'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, mode: 'visio' })}
                    className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                      formData.mode === 'visio'
                        ? 'border-[#775a19] bg-[#fed488]/20 text-[#06151a] font-semibold'
                        : 'border-[#c3c7c9]/60 hover:bg-[#f5f3f3] text-[#43484a]'
                    }`}
                  >
                    <Globe2 className="w-4 h-4 text-[#775a19]" />
                    <span className="text-xs">{language === 'fr' ? 'Visio Meet' : language === 'pt' ? 'Online / Visio' : 'Video Call'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, mode: 'phone' })}
                    className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                      formData.mode === 'phone'
                        ? 'border-[#775a19] bg-[#fed488]/20 text-[#06151a] font-semibold'
                        : 'border-[#c3c7c9]/60 hover:bg-[#f5f3f3] text-[#43484a]'
                    }`}
                  >
                    <Phone className="w-4 h-4 text-[#775a19]" />
                    <span className="text-xs">{language === 'fr' ? 'Téléphone' : language === 'pt' ? 'Telefónica' : 'Phone'}</span>
                  </button>
                </div>
              </div>

              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#43484a] mb-1">
                    {language === 'fr' ? 'Nom et prénom *' : language === 'pt' ? 'Nome completo *' : 'Full name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#c3c7c9] rounded-lg text-sm focus:outline-none focus:border-[#775a19]"
                    placeholder="Jean Dupont"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#43484a] mb-1">
                    {language === 'fr' ? 'Email *' : language === 'pt' ? 'Email *' : 'Email *'}
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#c3c7c9] rounded-lg text-sm focus:outline-none focus:border-[#775a19]"
                    placeholder="email@example.com"
                  />
                </div>
              </div>

              {/* Phone & Domain */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#43484a] mb-1">
                    {language === 'fr' ? 'Téléphone *' : language === 'pt' ? 'Telefone *' : 'Phone *'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#c3c7c9] rounded-lg text-sm focus:outline-none focus:border-[#775a19]"
                    placeholder="+32 400 00 00 00"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#43484a] mb-1">
                    {language === 'fr' ? 'Matière concernée *' : language === 'pt' ? 'Matéria *' : 'Legal area *'}
                  </label>
                  <select
                    value={formData.domain}
                    onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#c3c7c9] rounded-lg text-sm focus:outline-none focus:border-[#775a19]"
                  >
                    <option value="Droit de la famille">
                      {language === 'fr' ? 'Droit de la famille & Divorce' : language === 'pt' ? 'Direito da Família & Divórcio' : 'Family Law & Divorce'}
                    </option>
                    <option value="Recouvrement de créances">
                      {language === 'fr' ? 'Recouvrement de créances & Litiges civils' : language === 'pt' ? 'Cobrança de Dívidas & Contencioso' : 'Debt Recovery & Commercial Claims'}
                    </option>
                    <option value="Droit du roulage">
                      {language === 'fr' ? 'Droit du roulage & Infraction' : language === 'pt' ? 'Direito Rodoviário & Infrações' : 'Traffic Law & Driving Offenses'}
                    </option>
                    <option value="Droit pénal">
                      {language === 'fr' ? 'Droit pénal' : language === 'pt' ? 'Direito Penal' : 'Criminal Defense'}
                    </option>
                    <option value="Entreprise en difficulté">
                      {language === 'fr' ? 'Entreprise en difficulté & PRJ' : language === 'pt' ? 'Empresas em Dificuldade & PRJ' : 'Distressed Businesses & Insolvency'}
                    </option>
                    <option value="Baux et Loyers">
                      {language === 'fr' ? 'Baux & Loyers (Résidentiel / Commercial)' : language === 'pt' ? 'Arrendamento & Imobiliário' : 'Tenancy & Lease Disputes'}
                    </option>
                    <option value="Droit collaboratif">
                      {language === 'fr' ? 'Droit collaboratif & Médiation' : language === 'pt' ? 'Direito Colaborativo / Mediação' : 'Collaborative Law & Mediation'}
                    </option>
                    <option value="Autre">
                      {language === 'fr' ? 'Autre question juridique' : language === 'pt' ? 'Outro assunto' : 'Other legal matter'}
                    </option>
                  </select>
                </div>
              </div>

              {/* Full Postal Address (Mandatory) */}
              <div>
                <label className="block text-xs font-semibold text-[#43484a] mb-1">
                  {language === 'fr' 
                    ? 'Adresse postale complète (Rue, n°, code postal, ville, pays) *' 
                    : language === 'pt' 
                    ? 'Morada postal completa (Rua, nº, código postal, localidade, país) *' 
                    : 'Full Postal Address (Street, no., postal code, city, country) *'}
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#c3c7c9] rounded-lg text-sm focus:outline-none focus:border-[#775a19]"
                  placeholder={language === 'fr' ? 'ex : Avenue Louise 120, 1050 Bruxelles, Belgique' : 'ex : Rua da Prata 45, 1100-414 Lisboa'}
                />
              </div>

              {/* Dynamic Date Selection & Real-Time Slot Picker (9h to 16h on the hour) */}
              <div className="bg-[#f5f3f3] p-4 rounded-xl border border-[#c3c7c9]/60 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <label className="block text-xs font-bold text-[#06151a]">
                    {language === 'fr' ? '1. Choisissez la date :' : language === 'pt' ? '1. Escolha a data :' : '1. Select date :'}
                  </label>
                  <input
                    type="date"
                    min={todayStr}
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="px-3 py-1.5 bg-white border border-[#c3c7c9] rounded-lg text-xs font-semibold focus:outline-none focus:border-[#775a19]"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-bold text-[#06151a]">
                      {language === 'fr' 
                        ? '2. Sélectionnez un créneau (heures fixes de 9h à 16h) :' 
                        : language === 'pt' 
                        ? '2. Selecione o horário (horas certas das 9h às 16h) :' 
                        : '2. Select a time slot (on the hour from 9:00 to 16:00) :'}
                    </label>
                    {isSyncing && (
                      <span className="text-[10px] text-[#775a19] flex items-center gap-1">
                        <RefreshCw className="w-3 h-3 animate-spin" />
                        Vérification de l'agenda...
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {DAILY_SLOTS.map((slot) => {
                      const booked = isSlotBooked(slot.id);
                      const isSelected = formData.timeSlot === slot.id && !booked;

                      return (
                        <button
                          key={slot.id}
                          type="button"
                          disabled={booked}
                          onClick={() => setFormData({ ...formData, timeSlot: slot.id })}
                          className={`p-2.5 rounded-xl text-xs font-semibold text-center border transition-all flex flex-col items-center justify-center ${
                            booked
                              ? 'bg-gray-200/70 border-gray-300 text-gray-400 cursor-not-allowed line-through'
                              : isSelected
                              ? 'bg-[#06151a] border-[#06151a] text-[#fed488] shadow-xs'
                              : 'bg-white border-[#c3c7c9] text-[#1b1c1c] hover:border-[#775a19] hover:bg-[#faf8f7]'
                          }`}
                        >
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{slot.id}</span>
                          </div>
                          <span className="text-[10px] opacity-80 mt-0.5">
                            {booked 
                              ? (language === 'fr' ? 'Occupé' : language === 'pt' ? 'Ocupado' : 'Busy') 
                              : (language === 'fr' ? 'Disponible' : language === 'pt' ? 'Livre' : 'Available')}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-semibold text-[#43484a] mb-1">
                  {language === 'fr' ? 'Précisions supplémentaires (optionnel)' : language === 'pt' ? 'Informações adicionais' : 'Additional details (optional)'}
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#c3c7c9] rounded-lg text-sm focus:outline-none focus:border-[#775a19]"
                  placeholder={language === 'fr' ? 'Décrivez brièvement le contexte ou l’urgence de votre dossier...' : language === 'pt' ? 'Descreva brevemente a situação...' : 'Briefly describe your situation...'}
                />
              </div>

              {/* Cancellation policy clause (Obligatory acceptance) */}
              <div className="bg-[#fed488]/15 border border-[#775a19]/30 rounded-xl p-3.5 space-y-2">
                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    required
                    checked={cancellationAccepted}
                    onChange={(e) => setCancellationAccepted(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded border-[#775a19] text-[#775a19] focus:ring-[#775a19] accent-[#775a19] cursor-pointer"
                  />
                  <span className="text-xs text-[#1b1c1c] leading-relaxed">
                    <strong className="text-[#775a19] font-bold">
                      {language === 'fr' 
                        ? "Condition d'annulation & engagement :" 
                        : language === 'pt' 
                        ? 'Condições de cancelamento :' 
                        : 'Cancellation Policy :'}
                    </strong>{' '}
                    {language === 'fr'
                      ? "J'accepte expressément que tout rendez-vous annulé à moins de 24 heures de l'horaire convenu sera facturé à un montant forfaitaire de 50 €."
                      : language === 'pt'
                      ? 'Aceito expressamente que qualquer consulta cancelada com menos de 24 horas de antecedência será faturada no valor fixo de 50 €.'
                      : 'I expressly agree that any appointment cancelled less than 24 hours prior to the scheduled time will be billed a flat fee of 50 €.'}
                  </span>
                </label>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={!cancellationAccepted}
                  className={`w-full py-3.5 rounded-full text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 ${
                    cancellationAccepted
                      ? 'bg-[#06151a] hover:bg-[#1b2a2f] text-white cursor-pointer'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <CalendarIcon className={`w-4 h-4 ${cancellationAccepted ? 'text-[#fed488]' : 'text-gray-400'}`} />
                  <span>
                    {language === 'fr' 
                      ? 'Confirmer & Réserver le rendez-vous (125 € TVAC)' 
                      : language === 'pt' 
                      ? 'Confirmar marcação da consulta (125 € TVAC)' 
                      : 'Confirm & Book Appointment (125 € incl. VAT)'}
                  </span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
