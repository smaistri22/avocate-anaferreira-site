import React, { useState, useEffect } from 'react';
import { Language, PageId, PracticeArea } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { ExpertiseView } from './components/ExpertiseView';
import { FaqView } from './components/FaqView';
import { ContactView } from './components/ContactView';
import { HonorairesView } from './components/HonorairesView';
import { BookingModal } from './components/BookingModal';
import { PracticeDetailModal } from './components/PracticeDetailModal';
import { LegalNoticeModal } from './components/LegalNoticeModal';
import { SEO_PAGES, SITE_URL } from './data/seoPages.js';

// Retrouve la rubrique correspondant à l'adresse affichée dans le navigateur.
function pageFromPath(pathname: string): PageId {
  const clean = pathname.replace(/\/+$/, '') || '/';
  const ids = Object.keys(SEO_PAGES) as PageId[];
  const match = ids.find((id) => (SEO_PAGES[id].path.replace(/\/+$/, '') || '/') === clean);
  return match ?? 'accueil';
}

function setMeta(selector: string, attribute: string, value: string) {
  const element = document.querySelector(selector);
  if (element) element.setAttribute(attribute, value);
}

export default function App() {
  const [currentPage, setCurrentPageState] = useState<PageId>(() => pageFromPath(window.location.pathname));
  const [language, setLanguage] = useState<Language>('fr');
  const [selectedArea, setSelectedArea] = useState<PracticeArea | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isLegalNoticesOpen, setIsLegalNoticesOpen] = useState(false);

  // Change de rubrique et met à jour l'adresse du navigateur (une adresse par rubrique)
  const setCurrentPage = (page: PageId) => {
    const path = SEO_PAGES[page].path;
    if (window.location.pathname !== path) {
      window.history.pushState({ page }, '', path);
    }
    setCurrentPageState(page);
  };

  // Boutons Précédent / Suivant du navigateur
  useEffect(() => {
    const onPopState = () => setCurrentPageState(pageFromPath(window.location.pathname));
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // Scroll to top on page change + titre, description et adresse canonique de la rubrique
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const seo = SEO_PAGES[currentPage];
    const url = SITE_URL + seo.path;
    document.title = seo.title;
    setMeta('meta[name="description"]', 'content', seo.description);
    setMeta('link[rel="canonical"]', 'href', url);
    setMeta('meta[property="og:title"]', 'content', seo.title);
    setMeta('meta[property="og:description"]', 'content', seo.description);
    setMeta('meta[property="og:url"]', 'content', url);
  }, [currentPage]);

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf9f8] text-[#1b1c1c] font-sans selection:bg-[#fed488] selection:text-[#785a1a]">
      {/* Top Header */}
      <Header
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        language={language}
        setLanguage={setLanguage}
        onOpenBooking={() => setIsBookingOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentPage === 'accueil' && (
          <HomeView
            language={language}
            setCurrentPage={setCurrentPage}
            onOpenBooking={() => setIsBookingOpen(true)}
            onSelectArea={(area) => setSelectedArea(area)}
          />
        )}

        {currentPage === 'expertise' && (
          <ExpertiseView
            language={language}
            onSelectArea={(area) => setSelectedArea(area)}
            onOpenBooking={() => setIsBookingOpen(true)}
          />
        )}

        {currentPage === 'honoraires' && (
          <HonorairesView
            language={language}
            onOpenBooking={() => setIsBookingOpen(true)}
          />
        )}

        {currentPage === 'faq' && (
          <FaqView
            language={language}
            setCurrentPage={setCurrentPage}
            onOpenBooking={() => setIsBookingOpen(true)}
          />
        )}

        {currentPage === 'contact' && (
          <ContactView
            language={language}
            onOpenBooking={() => setIsBookingOpen(true)}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        language={language}
        setCurrentPage={setCurrentPage}
        onOpenLegalNotices={() => setIsLegalNoticesOpen(true)}
      />

      {/* Interactive Modals */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        language={language}
      />

      <PracticeDetailModal
        area={selectedArea}
        onClose={() => setSelectedArea(null)}
        language={language}
        onOpenBooking={() => setIsBookingOpen(true)}
      />

      <LegalNoticeModal
        isOpen={isLegalNoticesOpen}
        onClose={() => setIsLegalNoticesOpen(false)}
        language={language}
      />
    </div>
  );
}

