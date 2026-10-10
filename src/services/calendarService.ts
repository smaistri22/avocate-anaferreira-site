// Google Calendar Integration Service for Cabinet d'Avocat Ana Ferreira

export interface TimeSlot {
  time: string; // e.g. "09:30"
  endTime: string; // e.g. "10:30"
  available: boolean;
  reason?: string;
}

export interface DayAvailability {
  date: string; // YYYY-MM-DD
  slots: TimeSlot[];
}

export interface BookingPayload {
  name: string;
  email: string;
  phone: string;
  address: string; // Full postal address
  mode: 'cabinet' | 'visio' | 'phone';
  domain: string;
  date: string; // YYYY-MM-DD
  timeSlot: string; // e.g. "09:00"
  notes?: string;
}

// Client ID configured in Google Cloud project for OAuth token acquisition
const GOOGLE_CLIENT_ID = '996751628329-google-calendar-auth.apps.googleusercontent.com';

export class GoogleCalendarService {
  private static token: string | null = null;
  private static tokenExpiry: number = 0;

  public static getStoredToken(): string | null {
    if (this.token && Date.now() < this.tokenExpiry) {
      return this.token;
    }
    const local = localStorage.getItem('ana_ferreira_gcal_token');
    const expiry = localStorage.getItem('ana_ferreira_gcal_expiry');
    if (local && expiry && Date.now() < parseInt(expiry, 10)) {
      this.token = local;
      this.tokenExpiry = parseInt(expiry, 10);
      return local;
    }
    return null;
  }

  public static setStoredToken(token: string, expiresInSeconds: number) {
    this.token = token;
    this.tokenExpiry = Date.now() + expiresInSeconds * 1000;
    localStorage.setItem('ana_ferreira_gcal_token', token);
    localStorage.setItem('ana_ferreira_gcal_expiry', this.tokenExpiry.toString());
  }

  public static clearToken() {
    this.token = null;
    this.tokenExpiry = 0;
    localStorage.removeItem('ana_ferreira_gcal_token');
    localStorage.removeItem('ana_ferreira_gcal_expiry');
  }

  /**
   * Request Google OAuth token from client side using Google Identity Services
   */
  public static async requestGoogleAuth(): Promise<string> {
    return new Promise((resolve, reject) => {
      // @ts-expect-error Google GSI global
      if (typeof window.google === 'undefined' || !window.google.accounts || !window.google.accounts.oauth2) {
        reject(new Error('Google Identity Services not loaded'));
        return;
      }

      // @ts-expect-error Google GSI global
      const client = window.google.accounts.oauth2.initTokenClient({
        client_id: GOOGLE_CLIENT_ID,
        scope: 'https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar.readonly',
        callback: (response: { access_token?: string; expires_in?: number; error?: string }) => {
          if (response.error || !response.access_token) {
            reject(new Error(response.error || 'Authentication cancelled'));
            return;
          }
          GoogleCalendarService.setStoredToken(response.access_token, response.expires_in || 3600);
          resolve(response.access_token);
        },
      });

      client.requestAccessToken();
    });
  }

  /**
   * Fetch busy periods from Google Calendar for a given date
   */
  public static async fetchCalendarEventsForDate(dateStr: string, token: string): Promise<Array<{ start: Date; end: Date; summary: string }>> {
    try {
      const timeMin = new Date(`${dateStr}T00:00:00Z`).toISOString();
      const timeMax = new Date(`${dateStr}T23:59:59Z`).toISOString();

      const url = `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${encodeURIComponent(timeMin)}&timeMax=${encodeURIComponent(timeMax)}&singleEvents=true&orderBy=startTime`;

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          GoogleCalendarService.clearToken();
        }
        throw new Error(`Calendar API returned ${response.status}`);
      }

      const data = await response.json();
      const items = data.items || [];

      return items.map((item: { start?: { dateTime?: string; date?: string }; end?: { dateTime?: string; date?: string }; summary?: string }) => {
        const startStr = item.start?.dateTime || item.start?.date || '';
        const endStr = item.end?.dateTime || item.end?.date || '';
        return {
          start: new Date(startStr),
          end: new Date(endStr),
          summary: item.summary || 'Occupé',
        };
      });
    } catch (err) {
      console.warn('Could not fetch events from Google Calendar:', err);
      return [];
    }
  }

  /**
   * Insert confirmed appointment into Google Calendar
   */
  public static async createCalendarEvent(booking: BookingPayload, token: string): Promise<{ success: boolean; eventLink?: string }> {
    try {
      // Calculate start and end ISO strings (Assuming Brussels timezone CET/CEST)
      const [hours, minutes] = booking.timeSlot.split(':').map(Number);
      const startDateTime = new Date(`${booking.date}T${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00`);
      const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000); // 1 hour consultation

      const modeTitle = booking.mode === 'cabinet' 
        ? 'Au Cabinet (Rue Abbé Cuypers 3, Etterbeek)' 
        : booking.mode === 'visio' 
        ? 'Visioconférence Google Meet' 
        : 'Consultation Téléphonique';

      const event = {
        summary: `RDV Avocat : ${booking.name} — ${booking.domain}`,
        description: `Consultation juridique avec Me Ana Ferreira (anaferreiraavocate@outlook.com)\n\n` +
          `Tarif de la consultation : 125 € TVAC\n` +
          `Client : ${booking.name}\n` +
          `Email : ${booking.email}\n` +
          `Téléphone : ${booking.phone}\n` +
          `Adresse postale complète : ${booking.address}\n` +
          `Matière : ${booking.domain}\n` +
          `Mode : ${modeTitle}\n` +
          `Condition acceptée : Forfait de 50 € dû en cas d'annulation à moins de 24h\n` +
          `Notes / Détails : ${booking.notes || 'Aucune note'}\n\n` +
          `Cabinet d'Avocat Ana Ferreira\nRue Abbé Cuypers 3, 1040 Etterbeek (Bruxelles)`,
        location: booking.mode === 'cabinet' ? 'Rue Abbé Cuypers 3, 1040 Etterbeek, Bruxelles, Belgique' : 'En ligne / Téléphone',
        start: {
          dateTime: startDateTime.toISOString(),
          timeZone: 'Europe/Brussels',
        },
        end: {
          dateTime: endDateTime.toISOString(),
          timeZone: 'Europe/Brussels',
        },
        attendees: [
          { email: booking.email, displayName: booking.name },
          { email: 'anaferreiraavocate@outlook.com', displayName: 'Me Ana Ferreira' }
        ],
        reminders: {
          useDefault: false,
          overrides: [
            { method: 'email', minutes: 24 * 60 },
            { method: 'popup', minutes: 30 },
          ],
        },
      };

      const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events?sendUpdates=all', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      });

      if (!response.ok) {
        throw new Error(`Failed to create event: ${response.statusText}`);
      }

      const created = await response.json();
      return {
        success: true,
        eventLink: created.htmlLink,
      };
    } catch (err) {
      console.error('Error creating Google Calendar event:', err);
      return { success: false };
    }
  }
}

// Local mock/fallback slots persistence so client appointments are retained in local state
export const LOCAL_BOOKINGS_STORAGE_KEY = 'ana_ferreira_booked_slots';

export interface BookedSlotRecord {
  id: string;
  date: string; // YYYY-MM-DD
  timeSlot: string; // "09:00"
  name: string;
  email: string;
  phone: string;
  address: string;
  domain: string;
  mode: string;
  createdAt: string;
  syncGoogle?: boolean;
}

export function getLocalBookedSlots(): BookedSlotRecord[] {
  try {
    const raw = localStorage.getItem(LOCAL_BOOKINGS_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveLocalBookedSlot(slot: BookedSlotRecord) {
  try {
    const current = getLocalBookedSlots();
    current.push(slot);
    localStorage.setItem(LOCAL_BOOKINGS_STORAGE_KEY, JSON.stringify(current));
  } catch (err) {
    console.error('Could not save slot', err);
  }
}

export function removeLocalBookedSlot(id: string) {
  try {
    const current = getLocalBookedSlots();
    const filtered = current.filter(s => s.id !== id);
    localStorage.setItem(LOCAL_BOOKINGS_STORAGE_KEY, JSON.stringify(filtered));
  } catch (err) {
    console.error('Could not remove slot', err);
  }
}
