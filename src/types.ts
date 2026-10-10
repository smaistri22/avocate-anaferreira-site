export type Language = 'fr' | 'pt' | 'en';

export type PageId = 'accueil' | 'expertise' | 'faq' | 'contact' | 'honoraires';

export interface PracticeArea {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  icon: string;
  category?: string;
  keyPoints?: string[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'fees' | 'procedure' | 'areas';
}

export interface Partner {
  name: string;
  role: string;
  link?: string;
}

export interface ConsultationBooking {
  name: string;
  email: string;
  phone: string;
  domain: string;
  mode: 'cabinet' | 'visio' | 'phone';
  date: string;
  time: string;
  notes: string;
}
