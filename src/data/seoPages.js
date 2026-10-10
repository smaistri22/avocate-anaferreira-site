// Adresse, titre et description de chaque rubrique du site.
// Utilisé par l'application (src/App.tsx) et par le script de publication (.github/postbuild.mjs).
export const SITE_URL = 'https://avocate-anaferreira.com';

export const SEO_PAGES = {
  accueil: {
    path: '/',
    label: 'Accueil',
    title: "Ana Ferreira – Avocate à Etterbeek (Bruxelles) | Cabinet d'avocat",
    description:
      "Me Ana Ferreira, avocate au Barreau de Bruxelles à Etterbeek : droit de la famille, recouvrement de créances, roulage, pénal, entreprises en difficulté, bail.",
    heading: 'Ana Ferreira – Avocate au Barreau de Bruxelles',
  },
  expertise: {
    path: '/expertise/',
    label: "Domaines d'expertise",
    title: "Domaines d'expertise – Ana Ferreira, avocate à Etterbeek (Bruxelles)",
    description:
      "Droit de la famille, recouvrement de créances, droit du roulage, droit pénal, entreprises en difficulté, bail et droit collaboratif : les matières traitées par Me Ana Ferreira.",
    heading: "Domaines d'expertise du cabinet",
  },
  honoraires: {
    path: '/honoraires/',
    label: 'Honoraires',
    title: 'Honoraires – Ana Ferreira, avocate à Etterbeek (Bruxelles)',
    description:
      "Honoraires transparents : première consultation à 125 € TVAC, puis taux horaire unique de 150 € HTVA (181,50 € TVAC) pour toutes les prestations du cabinet.",
    heading: 'Honoraires et transparence',
  },
  faq: {
    path: '/faq/',
    label: 'Questions fréquentes',
    title: 'Questions fréquentes – Ana Ferreira, avocate à Etterbeek (Bruxelles)',
    description:
      "Réponses aux questions courantes sur la première consultation, les honoraires, le déroulement d'un dossier et la prise de rendez-vous au cabinet.",
    heading: 'Questions fréquentes',
  },
  contact: {
    path: '/contact/',
    label: 'Contact',
    title: 'Contact et rendez-vous – Ana Ferreira, avocate à Etterbeek (Bruxelles)',
    description:
      "Contactez le cabinet de Me Ana Ferreira, Rue Abbé Cuypers 3 à 1040 Etterbeek : téléphone +32 471 757 011, e-mail et prise de rendez-vous.",
    heading: 'Contact et prise de rendez-vous',
  },
};
