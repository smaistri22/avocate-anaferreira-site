import { FaqItem, PracticeArea, Language } from '../types';

export const IMAGES = {
  // Portrait in office with dark suit & glasses (from home & faq)
  portraitStanding: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAIF_6vSV9SWJoxF1kyPdFhlBL1wCDAUUUXpwTNxy7kLD5H5tYjQek4T_S_VRvD-rxfTdPElGfBE9oXgt8wsTRTrGYq-6JzaWTld9O0NaEmJSfgt72HholzMzfDmgffIhLayNq4hBIeftfq7cJr2QuP8NBgALmDJXrnMnzp3M5qgZwxLwfpSz20h4-77A3xYrdIGkLmFfXdsed0MnKuqmI3sOKKjaLGVv5Mwd8cyN2d3jXexkmY492kdpKP0GmL95AO6y0',
  portraitSeated: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-BbfWRYctwtUG9kL9ou_b_NnrA1WmeaR6ZF1UawOwbDoycI2PwtJ1QwqpupGF7V10ClJdnVvMsgZo6ZyHFS32KiZY7wdyi6N8fuZuGeU4oILxxZEw06ZmX0KvvM2kc4C1Ate9_Ud11d7LMoikGvUbULVT3Mrm07Uvt1Of984oo5HgZ_L4Tn28BijILZHd3YhJFCwbrQgTX-sv9i5VXEGPLtqlvskGQI1uEEwoaRWvDATA4QuGknvOkzg5E6Yh_3qXF-w',
  portraitFaq: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCTFRbxVISR5boJ8tf1QgqKLIzLJN-DbawJ1qMyjvPU-O-3O_BjeMX0jOx-KQYwO-9c_xB9eobK5u5PmmREMahZegOu7UHgan1SpgqZD4coEhyqz3m24l1G4y_wVc9e334C8b2UjsPgQXtsqyk1QQym90XgL8xUuXjA2Or887qh1k45TGO-NI5Y_u7dh-EjrFU-GNBYpAmzdzuxjVlMCWhOGgAYNGd3q9uHph3o4XW05O5CTYbjGswQMqLMqLUUlrvEthk',
  // Collaborative law discussion table photo
  collaborativeMeeting: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDP-Xbl6FTFS_b5_tg17cB8hwzCZBhDtjQTgQ65yfr8s8FwLutzlSvTuEduXNSeGuUln_VQoicMPXtySsLJgGGCVzCKbwFieQmKNddnk1zwXHbBqtuLV2ELtp7wy0clAGgYqX7S-z9KOnevHFAAcAujX0CllxhIzvHfuB3QMrCecK_uIWWm2HSUiE34t4iScpLqfRfTkqy5uWgT9Zx3Qm6qt4WaEo_tKhZPREOtBrAnCYAmqnLBWyM3mg',
  // Map of 1082 Berchem-Sainte-Agathe / Bruxelles
  mapLocation: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDH0-GnqK5_WcF7p1kOB3329R11yAF9-wbSdccT8pK5K-rnXMfjt9nxMkY2F29ykebPNKhEF7kL8HRlSUM_VC8BgQdjjwTk6DmnKguOmSfwNNWxAEl5vBYNC7rf4nNvS79laOu4Q1hcULigMudUxKKioxTezn2KKB4I-B-pLhot4hq645o-UVGf3KxtoZM0q8_oLFqq-Vp2QqlKShnX3QV3Kc_QnP1pal601Fm28jCrTwGQXoLsPNoGbA',
  // Business card photo
  businessCard: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBN46z2g66bRIFhErqgjDBXUyC3-XdI8s2knX1XBPledzhxcOZ03Se3-iTV1goQmI20jbPalO6FggUoTXHhET0k4I0NOgLbOiCW1UXteQKhXqbM7aYlYOpDajNKj6VjGePMspoQ5V_x4HEQl9IZdSlHrJ-8Bwgbw0ecTuzS9xWwpih8lCBRWlk77oVyMDncDZnxSakFJxDB2mFyeLQcp5-bG9K00eVwGjohM-Z2tH_BtjReBRoZldcWfzYiMelcVryheEA',
  // Abstract background texture
  abstractTexture: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAizGSvyJdinR5TGZqSTFHxABvzY5mPL9j3gTD5b0US7ytwuJRhW5U19G1Wh0NaUcY3VBgp86i0FZyXLq7wQxl-DGD9QoKbOEgsBcGJW-1sznaPgIpe8djvYO4ZStmNcWYPmNTegjWIu2MuYUa76b2YW7QJg2ja4jwTQL3DWXC1cwtX6Y8ddZk_4ZVtghpyZVB8v4cE7P06FCoHUVcQ4vfcaEQZjMuUyGyMIYZIARBFQqJ2z32HeeXsQA'
};

export const CONTACT_INFO = {
  name: 'Ana Ferreira',
  titleFr: 'Avocate au Barreau de Bruxelles',
  titlePt: 'Advogada na Ordem dos Advogados de Bruxelas',
  titleEs: 'Abogada en el Colegio de Abogados de Bruselas',
  titleEn: 'Attorney at Law - Brussels Bar',
  address: 'Rue Abbé Cuypers 3',
  postalCode: '1040 Etterbeek (Bruxelles)',
  country: 'Belgique',
  phone: '+32 471 757 011',
  phoneClean: '+32471757011',
  email: 'anaferreiraavocate@outlook.com',
  hours: 'Lun - Ven : 09h00 - 18h30',
  languages: 'Français, Português, English'
};

export const PARTNERS = [
  { name: 'Me. Maistriau Philippe', roleFr: 'Avocat Associé', rolePt: 'Advogado Associado', roleEn: 'Partner Attorney' },
  { name: 'PRIMALEX', roleFr: 'Groupement d’avocats', rolePt: 'Agrupamento de advogados', roleEn: 'Law Association' },
  { name: 'SRL ALAIN ROLAND', roleFr: 'Cabinet partenaire', rolePt: 'Escritório parceiro', roleEn: 'Partner Law Firm' },
  { name: 'Cognitive Studio', roleFr: 'Cabinet de consultance', rolePt: 'Gabinete de consultoria', roleEn: 'Consulting Agency' }
];

export const CONTENT = {
  fr: {
    nav: {
      home: 'Accueil',
      expertise: 'Expertise',
      honoraires: 'Honoraires',
      faq: 'FAQ',
      contact: 'Contact',
      bookAppointment: 'Prendre rendez-vous'
    },
    hero: {
      badge: 'Avocate au Barreau de Bruxelles',
      titlePart1: 'Une défense rigoureuse,',
      titlePart2: 'une écoute',
      titleItalic: 'attentive.',
      desc: "J'accompagne mes clients avec détermination et clarté. Spécialisée en droit de la famille, recouvrement de créances, droit du roulage, droit pénal et entreprise en difficulté, chaque dossier bénéficie d'une approche sur-mesure et d'un engagement total.",
      btnCta: 'Prendre rendez-vous',
      btnBio: 'Découvrir mon parcours',
      quote: '« L’excellence au service de vos droits. »'
    },
    bentoHome: {
      title: "Domaines d'Expertise",
      desc: "Une maîtrise approfondie dans des domaines clés pour vous assurer une représentation optimale, humaine et stratégique.",
      viewAll: 'Voir tout'
    },
    collaborativeSection: {
      badge: 'Approche alternative',
      title: 'Le Droit Collaboratif',
      desc: "Le droit collaboratif est un processus volontaire et confidentiel de règlement des conflits. Il offre un espace de dialogue structuré où les parties, assistées de leurs avocats formés à cette méthode, s'engagent à trouver un accord global sans recourir aux tribunaux.",
      bullet1: 'Recherche de solutions sur mesure et pérennes.',
      bullet2: 'Maintien du dialogue et apaisement des tensions.',
      bullet3: 'Confidentialité absolue des échanges.',
      btnMore: 'En savoir plus sur la méthode'
    },
    bioSection: {
      badge: 'Parcours & Expériences',
      title: 'Découvrir mon parcours',
      subtitle: 'Une pratique juridique forgée par l’immersion concrète au cœur des juridictions et la maîtrise rigoureuse des rouages judiciaires.',
      intro: "Mon engagement d'avocate s'appuie sur une compréhension globale et vivante de l'appareil judiciaire belge. De ma formation universitaire d'excellence à l'Université libre de Bruxelles jusqu'au siège pénal, aux études d'huissiers et aux cabinets d'avocats plaidants, chaque étape a forgé une rigueur d'analyse, une grande maîtrise procédurale et une vision stratégique décisive.",
      experiencesTitle: 'Expériences professionnelles & Stages',
      educationTitle: 'Formation Universitaire',
      experiences: [
        {
          id: 'exp-1',
          role: 'Stagiaire auprès des magistrats',
          institution: 'Tribunal correctionnel de Bruxelles',
          type: 'Stage · 2 mois',
          period: 'Fév 2018 – Mars 2018',
          location: 'Région de Bruxelles, Belgique',
          quote: "« Le stage au Tribunal correctionnel m’a permis de comprendre comment le juge tranche et j’ai pu constater les “derrières” de la justice. »",
          takeaway: "Immersion au cœur de la juridiction pénale, compréhension approfondie du raisonnement du juge, de la collégialité et de la dynamique des audiences répressives."
        },
        {
          id: 'exp-2',
          role: 'Stagiaire en étude d’huissier de justice',
          institution: 'Étude d’huissier Labranche-Walravens',
          type: 'Stage · 2 mois',
          period: 'Oct 2017 – Nov 2017',
          location: 'Bruxelles, Belgique',
          quote: "« Lors de mon stage à l’étude, j’ai pu voir comment fonctionnent les introductions des actions en justice, et j’ai pu rédiger énormément de citations et de mises en demeure. »",
          takeaway: "Maîtrise pratique des actes introductifs d’instance, précision formelle indispensable pour les citations, les exploits, les mises en demeure et la stratégie des voies d’exécution."
        },
        {
          id: 'exp-3',
          role: 'Stagiaire en cabinet d’avocats',
          institution: 'Buisseret Advocaten (Cabinet de Me Nathalie Buisseret)',
          type: 'Stage · 2 mois',
          period: 'Fév 2017 – Mars 2017',
          location: 'Bruxelles, Belgique',
          quote: "« Lors de mon stage auprès de Maître Buisseret, j’ai rédigé différentes conclusions dont l’une d’entre elles a permis d’acquitter le client. »",
          takeaway: "Élaboration d’argumentations de fond percutantes, rédaction de conclusions judiciaires déterminantes et plaidoiries stratégiques aboutissant à un résultat probant."
        }
      ],
      education: [
        {
          id: 'edu-1',
          degree: 'Master 2 (M2) en Droit',
          institution: 'Université libre de Bruxelles (ULB)',
          period: 'Sep 2018 – Sep 2021',
          location: 'Bruxelles, Belgique',
          description: 'Formation juridique supérieure dispensée par l’Université libre de Bruxelles, développant une rigueur doctrinale approfondie, l’art de l’argumentation juridique et une maîtrise globale du droit belge et européen.'
        }
      ]
    },
    expertisePage: {
      title: "Domaines d'intervention",
      desc: "Une approche rigoureuse et humaine du droit, adaptée aux besoins spécifiques de chaque client. Nous intervenons avec précision et dévouement pour défendre vos intérêts.",
      otherAreasTitle: "Autres domaines de compétence"
    },
    faqPage: {
      title: 'Frequently Asked Questions.',
      titleFr: 'Foire Aux Questions.',
      desc: "Trouvez les réponses aux questions courantes concernant nos services juridiques, le processus de consultation et le déroulement de votre dossier. Nous privilégions la transparence et la clarté.",
      commonInquiries: 'Common Inquiries',
      stillQuestionsTitle: 'Une question spécifique ?',
      stillQuestionsDesc: 'Nous sommes à votre disposition pour vous apporter la clarté et le soutien nécessaires. Contactez-nous pour planifier une consultation ou soumettre votre demande.',
      ctaButton: 'Contactez-nous',
      searchPlaceholder: 'Rechercher une question ou un mot clé...'
    },
    contactPage: {
      title: 'Contact & Consultation',
      desc: 'Pour toute demande d’information juridique, la prise d’un rendez-vous ou une première orientation, veuillez utiliser le formulaire ci-dessous ou joindre directement le cabinet. Rigueur et discrétion assurées.',
      formTitle: 'Envoyer un message',
      firstName: 'Prénom',
      lastName: 'Nom',
      email: 'Adresse email',
      phone: 'Numéro de téléphone',
      subject: 'Objet de la demande',
      subjects: [
        'Demande générale',
        'Prise de rendez-vous / Consultation (125 € TVAC)',
        'Droit de la famille & Divorce',
        'Recouvrement de créances & Litiges civils',
        'Droit du roulage & Infraction routière',
        'Droit pénal',
        'Entreprise en difficulté & PRJ',
        'Bail et Loyers',
        'Droit collaboratif / Médiation',
        'Autre question juridique'
      ],
      message: 'Votre message',
      messagePlaceholder: 'Décrivez brièvement votre situation ou vos disponibilités...',
      submitBtn: 'Envoyer le message',
      officeDetails: 'Coordonnées du Cabinet',
      addressLabel: 'Adresse',
      phoneLabel: 'Téléphone',
      emailLabel: 'Email',
      hoursLabel: 'Horaires',
      successMessage: 'Votre message a bien été transmis. Maître Ferreira vous recontactera sous 24 à 48 heures ouvrées.',
      businessCardTitle: 'Carte Professionnelle',
      vCardDownload: 'Enregistrer le contact',
      copyAddress: 'Copier l’adresse'
    },
    honorairesPage: {
      title: 'Honoraires et Transparence',
      desc: 'La clarté et la prévisibilité financière sont des principes fondamentaux du cabinet. L’ensemble des prestations est calculé sur la base d’une tarification claire, forfaitaire pour le premier rendez-vous et horaire pour le suivi du dossier.',
      rateAmount: '150 €',
      rateUnit: 'par heure (Hors TVA)',
      badge: 'Tarif Unique & Transparent',
      mainTitle: 'Tarification Horaire Unique',
      mainSubtitle: 'Un taux unique de 150 € / heure HTVA (soit 181,50 € TVAC) pour toutes les prestations juridiques du cabinet.',
      consultationBadge: 'Première Consultation',
      consultationTitle: 'Premier Rendez-vous Juridique',
      consultationRate: '125 €',
      consultationUnit: 'TVAC (TVA 21% comprise)',
      consultationDesc: 'Entretien approfondi au cabinet, par visioconférence ou par téléphone : examen attentif des pièces, analyse des enjeux juridiques et définition des premières orientations stratégiques.',
      cancellationTitle: "Politique d'annulation",
      cancellationDesc: "Tout rendez-vous annulé à moins de 24 heures de l'horaire convenu sera facturé à un montant forfaitaire de 50 €.",
      transparencyTitle: 'Engagements de Transparence',
      transparencyDesc: 'Dès la première consultation, une convention d’honoraires écrite vous est remise, fixant le cadre clair de notre collaboration.',
      item1Title: 'Relevé de prestations détaillé',
      item1Desc: 'Chaque acte posé (étude de dossier, réunions, audiences, rédaction d’actes, courriers et appels) fait l’objet d’un décompte précis du temps passé transmis avec transparence.',
      item2Title: 'Convention d’honoraires écrite',
      item2Desc: 'Un accord clair et préalable est signé dès l’ouverture du dossier, définissant les modalités d’intervention sans aucune mauvaise surprise.',
      item3Title: 'Provisions et étalement',
      item3Desc: 'Des demandes de provisions périodiques permettent de suivre l’état d’avancement de votre affaire et de maîtriser votre budget juridique en toute sérénité.',
      scopeTitle: 'Prestations incluses dans le taux horaire',
      scopeItems: [
        'Consultations juridiques et entretiens (au cabinet, en visio ou par téléphone)',
        'Analyse approfondie des pièces, recherches doctrinales et jurisprudentielles',
        'Rédaction des actes de procédure, requêtes, citations et conclusions',
        'Négociations amiables et processus de droit collaboratif',
        'Représentation et plaidoiries devant les cours et tribunaux',
        'Gestion administrative, correspondances et suivi continu du dossier'
      ],
      vatNoteTitle: 'Précisions légales & TVA',
      vatNoteDesc: 'Conformément à la législation fiscale belge applicable aux prestations d’avocats, la TVA de 21% est applicable en sus du taux horaire de 150 € HTVA. Les frais de justice éventuels (frais d’huissier, droits de greffe) sont facturés à prix coûtant sans supplément.'
    },
    footer: {
      about: 'Avocate au Barreau de Bruxelles.\nUne défense rigoureuse, une écoute attentive et des conseils stratégiques.',
      navTitle: 'Navigation',
      partnersTitle: 'Partenaires & Réseau',
      legalNotices: 'Mentions légales',
      copyright: '© 2026 Ana Ferreira - Avocate au Barreau de Bruxelles. Tous droits réservés.'
    }
  },
  pt: {
    nav: {
      home: 'Início',
      expertise: 'Áreas de Atuação',
      honoraires: 'Honorários',
      faq: 'Perguntas Frequentes',
      contact: 'Contacto',
      bookAppointment: 'Marcar consulta'
    },
    hero: {
      badge: 'Advogada na Ordem dos Advogados de Bruxelas',
      titlePart1: 'Uma defesa rigorosa,',
      titlePart2: 'uma escuta',
      titleItalic: 'atenta.',
      desc: 'Acompanho os meus clientes com determinação, proximidade e transparência. Com forte atuação em direito da família, cobrança de dívidas, direito rodoviário, direito penal e empresas em dificuldade, cada processo beneficia de uma abordagem personalizada.',
      btnCta: 'Marcar consulta',
      btnBio: 'Conhecer o meu percurso',
      quote: '« A excelência ao serviço dos seus direitos. »'
    },
    bentoHome: {
      title: 'Áreas de Atuação',
      desc: 'Um domínio aprofundado nas áreas fundamentais para lhe assegurar uma representação estratégica, humana e eficaz.',
      viewAll: 'Ver todas'
    },
    collaborativeSection: {
      badge: 'Abordagem alternativa',
      title: 'O Direito Colaborativo',
      desc: 'O direito colaborativo é um processo voluntário e confidencial de resolução de conflitos. Oferece um espaço de diálogo estruturado onde as partes, apoiadas pelos seus advogados formados neste método, se comprometem a encontrar um acordo global sem recorrer aos tribunais.',
      bullet1: 'Procura de soluções à medida e sustentáveis no tempo.',
      bullet2: 'Manutenção do diálogo e redução das tensões.',
      bullet3: 'Confidencialidade absoluta das conversações.',
      btnMore: 'Saber mais sobre o método'
    },
    bioSection: {
      badge: 'Percurso & Experiência',
      title: 'Conhecer o meu percurso',
      subtitle: 'Uma prática jurídica forjada pela experiência concreta no terreno e pelo domínio do sistema judicial belga.',
      intro: 'O meu compromisso como advogada assenta numa visão abrangente e prática das instituições judiciais belgas. Desde a formação universitária na Université libre de Bruxelles até à experiência no tribunal criminal, em oficiais de justiça e em escritórios de advocacia, cada etapa consolidou o rigor analítico, a precisão processual e a capacidade de conceber estratégias de defesa eficazes.',
      experiencesTitle: 'Experiências Profissionais & Estágios',
      educationTitle: 'Formação Universitária',
      experiences: [
        {
          id: 'exp-1',
          role: 'Estagiária junto dos magistrados',
          institution: 'Tribunal correctionnel de Bruxelles (Tribunal Criminal)',
          type: 'Estágio · 2 meses',
          period: 'Fev 2018 – Mar 2018',
          location: 'Região de Bruxelas, Bélgica',
          quote: '« O estágio no Tribunal Criminal permitiu-me compreender como o juiz decide e observar os bastidores da justiça. »',
          takeaway: 'Imersão direta na jurisdição penal, compreensão aprofundada do raciocínio judicial, da deliberação dos magistrados e da dinâmica das audiências.'
        },
        {
          id: 'exp-2',
          role: 'Estagiária em gabinete de oficial de justiça',
          institution: 'Étude d’huissier Labranche-Walravens',
          type: 'Estágio · 2 meses',
          period: 'Out 2017 – Nov 2017',
          location: 'Bruxelas, Bélgica',
          quote: '« Durante o estágio no escritório de execução, pude compreender como funcionam as introduções de ações judiciais e redigir inúmeras citações e notificações formais. »',
          takeaway: 'Domínio prático dos atos de instauração de processos, rigor na redação de citações, notificações formais e compreensão dos mecanismos de execução judicial.'
        },
        {
          id: 'exp-3',
          role: 'Estagiária em escritório de advocacia',
          institution: 'Buisseret Advocaten (Escritório de Me. Nathalie Buisseret)',
          type: 'Estágio · 2 meses',
          period: 'Fev 2017 – Mar 2017',
          location: 'Bruxelas, Bélgica',
          quote: '« Durante o estágio com a Dra. Buisseret, redigi diversas alegações de defesa, uma das quais permitiu a absolvição do cliente. »',
          takeaway: 'Construção de argumentação jurídica sólida, redação de peças processuais estratégicas e obtenção de resultados decisivos na defesa penal.'
        }
      ],
      education: [
        {
          id: 'edu-1',
          degree: 'Master 2 (M2) em Direito',
          institution: 'Université libre de Bruxelles (ULB)',
          period: 'Set 2018 – Set 2021',
          location: 'Bruxelas, Bélgica',
          description: 'Formação jurídica de excelência na conceituada Université libre de Bruxelles, com aprofundamento doutrinário, rigor de investigação e domínio do direito belga e europeu.'
        }
      ]
    },
    expertisePage: {
      title: 'Áreas de Intervenção',
      desc: 'Uma abordagem rigorosa e humanizada do direito, adaptada às necessidades específicas de cada cliente. Intervimos com precisão e dedicação na defesa dos seus interesses.',
      otherAreasTitle: 'Outras áreas de competência'
    },
    faqPage: {
      title: 'Perguntas Frequentes.',
      titleFr: 'Frequently Asked Questions.',
      desc: 'Encontre respostas para as dúvidas mais comuns sobre os nossos serviços jurídicos, processo de consulta e gestão de processos. Privilegiamos a transparência e a clareza.',
      commonInquiries: 'Perguntas Comuns',
      stillQuestionsTitle: 'Ainda tem dúvidas?',
      stillQuestionsDesc: 'Estamos disponíveis para lhe fornecer o apoio e o esclarecimento necessários. Contacte-nos para agendar uma consulta.',
      ctaButton: 'Contacte-nos',
      searchPlaceholder: 'Pesquisar uma pergunta ou tema...'
    },
    contactPage: {
      title: 'Contacto & Consulta',
      desc: 'Para qualquer questão jurídica, agendamento de consulta ou orientação inicial, preencha o formulário abaixo ou contacte diretamente o escritório. Rigor e discrição assegurados.',
      formTitle: 'Enviar uma mensagem',
      firstName: 'Nome',
      lastName: 'Apelido',
      email: 'Endereço de email',
      phone: 'Contacto telefónico',
      subject: 'Assunto',
      subjects: [
        'Pedido geral',
        'Marcação de consulta (125 € TVAC)',
        'Direito da Família & Divórcio',
        'Cobrança de Dívidas & Contencioso',
        'Direito Rodoviário & Contraordenações',
        'Direito Penal',
        'Empresas em Dificuldade & PRJ',
        'Arrendamento e Imobiliário',
        'Direito Colaborativo / Mediação',
        'Outra questão jurídica'
      ],
      message: 'A sua mensagem',
      messagePlaceholder: 'Descreva resumidamente a sua situação ou disponibilidade...',
      submitBtn: 'Enviar mensagem',
      officeDetails: 'Dados do Escritório',
      addressLabel: 'Morada',
      phoneLabel: 'Telefone',
      emailLabel: 'Email',
      hoursLabel: 'Horário',
      successMessage: 'A sua mensagem foi enviada com sucesso. A Dra. Ana Ferreira responderá dentro de 24 a 48 horas úteis.',
      businessCardTitle: 'Cartão Profissional',
      vCardDownload: 'Guardar contacto',
      copyAddress: 'Copiar morada'
    },
    honorairesPage: {
      title: 'Honorários e Transparência',
      desc: 'A clareza e a previsibilidade financeira são pilares essenciais do escritório. Todos os serviços são calculados com base numa tarifação transparente: valor fixo para a primeira consulta e valor horário para o seguimento do processo.',
      rateAmount: '150 €',
      rateUnit: 'por hora (sem IVA)',
      badge: 'Tarifa Única & Transparente',
      mainTitle: 'Tarifação Horária Única',
      mainSubtitle: 'Uma taxa única de 150 € / hora (sem IVA, ou seja 181,50 € com IVA) para todas as intervenções jurídicas do escritório.',
      consultationBadge: 'Primeira Consulta',
      consultationTitle: 'Primeira Consulta Jurídica',
      consultationRate: '125 €',
      consultationUnit: 'TVAC (IVA 21% incluído)',
      consultationDesc: 'Análise aprofundada inicial da sua situação no escritório, por videoconferência ou telefone: exame dos documentos e definição das linhas estratégicas de atuação.',
      cancellationTitle: 'Condição de cancelamento',
      cancellationDesc: 'Qualquer consulta cancelada com menos de 24 horas de antecedência é faturada no valor fixo de 50 €.',
      transparencyTitle: 'Compromissos de Transparência',
      transparencyDesc: 'Desde a primeira consulta, é apresentada uma convenção escrita de honorários, definindo com rigor o enquadramento do nosso trabalho.',
      item1Title: 'Relatório detalhado de prestações',
      item1Desc: 'Cada ato realizado (estudo do processo, reuniões, audiências, redação de peças, contactos e telefonemas) é registado com rigor com base no tempo despendido.',
      item2Title: 'Convenção de honorários escrita',
      item2Desc: 'Um acordo prévio e transparente é formalizado na abertura do processo, definindo claramente as modalidades sem surpresas.',
      item3Title: 'Provisões e acompanhamento regular',
      item3Desc: 'Pedidos periódicos de provisão permitem acompanhar a evolução do processo e gerir o seu orçamento jurídico com total tranquilidade.',
      scopeTitle: 'Serviços abrangidos pela tarifa horária',
      scopeItems: [
        'Consultas jurídicas e reuniões (presenciais, por videoconferência ou telefone)',
        'Análise aprofundada de documentos e pesquisa jurídica',
        'Redação de peças processuais, requerimentos e alegações',
        'Negociações amigáveis e procedimentos de direito colaborativo',
        'Representação e intervenção perante os tribunais',
        'Gestão administrativa e acompanhamento contínuo do processo'
      ],
      vatNoteTitle: 'Enquadramento legal e IVA',
      vatNoteDesc: 'Em conformidade com a legislação fiscal belga aplicável aos serviços de advocacia, acresce IVA à taxa legal de 21% sobre o valor de 150 €/h. Custas judiciais eventuais (oficiais de justiça, custas de secretaria) são faturadas ao custo real sem qualquer acréscimo.'
    },
    footer: {
      about: 'Advogada na Ordem dos Advogados de Bruxelas.\nDefesa rigorosa, escuta atenta e aconselhamento estratégico.',
      navTitle: 'Navegação',
      partnersTitle: 'Parceiros & Rede',
      legalNotices: 'Avisos Legais',
      copyright: '© 2026 Ana Ferreira - Advogada na Ordem dos Advogados de Bruxelas. Todos os direitos reservados.'
    }
  },
  en: {
    nav: {
      home: 'Home',
      expertise: 'Practice Areas',
      honoraires: 'Fees',
      faq: 'FAQ',
      contact: 'Contact',
      bookAppointment: 'Book an appointment'
    },
    hero: {
      badge: 'Attorney at Law - Brussels Bar',
      titlePart1: 'Rigorous legal defense,',
      titlePart2: 'attentive and dedicated',
      titleItalic: 'guidance.',
      desc: 'I assist and defend my clients with determination, proximity, and strategic clarity. Specializing in family law, debt recovery, traffic law, criminal defense, and distressed businesses, every case receives a tailor-made approach and unwavering commitment.',
      btnCta: 'Book an appointment',
      btnBio: 'Discover my background',
      quote: '“Excellence in the service of your rights.”'
    },
    bentoHome: {
      title: 'Practice Areas',
      desc: 'In-depth expertise in key legal fields to ensure strategic, human, and effective representation.',
      viewAll: 'View all'
    },
    collaborativeSection: {
      badge: 'Alternative Dispute Resolution',
      title: 'Collaborative Law',
      desc: 'Collaborative law is an innovative, voluntary, and strictly confidential dispute resolution process. It provides a structured dialogue framework where parties, assisted by certified collaborative attorneys, commit to reaching a global agreement without going to court.',
      bullet1: 'Tailor-made and sustainable solutions.',
      bullet2: 'Preservation of dialogue and reduction of conflict.',
      bullet3: 'Strict and absolute confidentiality of all exchanges.',
      btnMore: 'Learn more about the method'
    },
    bioSection: {
      badge: 'Background & Experience',
      title: 'Discover my background',
      subtitle: 'A legal practice built on hands-on institutional experience and deep mastery of the judicial system.',
      intro: 'My dedication as an attorney is rooted in a comprehensive and practical understanding of the Belgian legal system. From academic training at the Université libre de Bruxelles to internships in criminal courts, bailiff offices, and prominent litigation firms, every milestone has honed my analytical rigor, procedural mastery, and strategic defense acumen.',
      experiencesTitle: 'Professional Experience & Internships',
      educationTitle: 'Academic Education',
      experiences: [
        {
          id: 'exp-1',
          role: 'Judicial Intern to Magistrates',
          institution: 'Tribunal correctionnel de Bruxelles (Brussels Criminal Court)',
          type: 'Internship · 2 mos',
          period: 'Feb 2018 – Mar 2018',
          location: 'Brussels Region, Belgium',
          quote: '“My internship at the Criminal Court allowed me to understand how judges make rulings and see the inner workings of justice.”',
          takeaway: 'Direct immersion in criminal court proceedings, understanding judicial reasoning, deliberations, and courtroom dynamics.'
        },
        {
          id: 'exp-2',
          role: 'Intern at Judicial Officers & Bailiffs Office',
          institution: 'Étude d’huissier Labranche-Walravens',
          type: 'Internship · 2 mos',
          period: 'Oct 2017 – Nov 2017',
          location: 'Brussels, Belgium',
          quote: '“During my internship, I observed how legal proceedings are initiated and drafted numerous summonses and formal notices.”',
          takeaway: 'Practical mastery of originating summonses, formal demand letters, procedural formalities, and enforcement proceedings.'
        },
        {
          id: 'exp-3',
          role: 'Intern at Law Firm',
          institution: 'Buisseret Advocaten (Law Firm of Nathalie Buisseret)',
          type: 'Internship · 2 mos',
          period: 'Feb 2017 – Mar 2017',
          location: 'Brussels, Belgium',
          quote: '“During my internship with Attorney Buisseret, I drafted various legal conclusions, one of which led to the full acquittal of the client.”',
          takeaway: 'Formulating decisive legal arguments, drafting key trial conclusions, and achieving concrete success in defense litigation.'
        }
      ],
      education: [
        {
          id: 'edu-1',
          degree: 'Master of Laws (LL.M. / Master 2 en Droit)',
          institution: 'Université libre de Bruxelles (ULB)',
          period: 'Sep 2018 – Sep 2021',
          location: 'Brussels, Belgium',
          description: 'Comprehensive legal education at the prestigious Université libre de Bruxelles, developing advanced doctrinal research, legal rigor, and mastery of Belgian and European law.'
        }
      ]
    },
    expertisePage: {
      title: 'Areas of Practice',
      desc: 'A rigorous and human approach to law, tailored to the specific needs of each client. We act with precision and dedication to protect your interests.',
      otherAreasTitle: 'Additional practice fields'
    },
    faqPage: {
      title: 'Frequently Asked Questions.',
      titleFr: 'Frequently Asked Questions.',
      desc: 'Find answers to common questions about our legal services, the consultation process, and how cases are handled. We prioritize transparency and clarity.',
      commonInquiries: 'Common Inquiries',
      stillQuestionsTitle: 'Have a specific question?',
      stillQuestionsDesc: 'We are here to provide the clarity and legal support you need. Contact our firm to schedule a consultation.',
      ctaButton: 'Contact us',
      searchPlaceholder: 'Search for a question or keyword...'
    },
    contactPage: {
      title: 'Contact & Consultation',
      desc: 'For legal advice, scheduling an appointment, or initial guidance, please fill out the form below or contact the office directly. Rigor and discretion guaranteed.',
      formTitle: 'Send a message',
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email Address',
      phone: 'Phone Number',
      subject: 'Subject of inquiry',
      subjects: [
        'General inquiry',
        'Schedule an appointment / Consultation (125 € TVAC)',
        'Family Law & Divorce',
        'Debt Recovery & Commercial Claims',
        'Traffic Law & Road Infractions',
        'Criminal Defense',
        'Distressed Businesses & PRJ',
        'Tenancy & Real Estate Law',
        'Collaborative Law / Mediation',
        'Other legal matter'
      ],
      message: 'Your message',
      messagePlaceholder: 'Briefly describe your situation or preferred availability...',
      submitBtn: 'Send message',
      officeDetails: 'Firm Details',
      addressLabel: 'Address',
      phoneLabel: 'Phone',
      emailLabel: 'Email',
      hoursLabel: 'Office Hours',
      successMessage: 'Your message has been sent successfully. Attorney Ana Ferreira will get back to you within 24 to 48 business hours.',
      businessCardTitle: 'Business Card',
      vCardDownload: 'Save contact (vCard)',
      copyAddress: 'Copy address'
    },
    honorairesPage: {
      title: 'Fees & Transparency',
      desc: 'Financial predictability and clarity are essential principles of our law practice. All legal services are billed based on transparent rates: flat fee for the initial consultation and a single hourly rate for ongoing representation.',
      rateAmount: '150 €',
      rateUnit: 'per hour (excl. VAT)',
      badge: 'Single Transparent Hourly Rate',
      mainTitle: 'Single Hourly Rate Billing',
      mainSubtitle: 'A single transparent rate of €150 / hour (excluding VAT, i.e. €181.50 incl. VAT) for all legal services rendered by the firm.',
      consultationBadge: 'Initial Consultation',
      consultationTitle: 'First Legal Consultation',
      consultationRate: '125 €',
      consultationUnit: 'TVAC (incl. 21% VAT)',
      consultationDesc: 'Comprehensive initial evaluation in-office, via secure videoconference or phone: review of case documents and definition of initial strategic orientations.',
      cancellationTitle: 'Cancellation Policy',
      cancellationDesc: 'Any appointment cancelled less than 24 hours prior to the scheduled time will be billed a flat fee of 50 €.',
      transparencyTitle: 'Commitments to Transparency',
      transparencyDesc: 'From the very first consultation, a written fee agreement is established, defining clear terms for our cooperation.',
      item1Title: 'Itemized timesheet of services',
      item1Desc: 'Every action performed (case study, meetings, hearings, legal drafting, calls, and correspondence) is precisely recorded based on actual time spent.',
      item2Title: 'Written fee agreement',
      item2Desc: 'A clear and prior agreement is signed at the outset of the case, detailing the terms of engagement with no hidden surprises.',
      item3Title: 'Periodic retainers and budgeting',
      item3Desc: 'Periodic advance requests enable you to monitor progress and maintain full control over your legal expenses with peace of mind.',
      scopeTitle: 'Services included in the hourly rate',
      scopeItems: [
        'Legal consultations and conferences (in-office, video conference, or phone)',
        'In-depth review of evidence, case law, and legal research',
        'Drafting of procedural deeds, motions, writs, and written submissions',
        'Amicable negotiations and collaborative law procedures',
        'Legal representation and pleadings before courts and tribunals',
        'Administrative follow-up, communications, and continuous case management'
      ],
      vatNoteTitle: 'Legal notices & VAT',
      vatNoteDesc: 'In accordance with Belgian tax legislation applicable to legal services, 21% VAT is applicable on top of the €150/h hourly rate. Any direct court fees (bailiff fees, court registry filing taxes) are billed at exact cost without markup.'
    },
    footer: {
      about: 'Attorney at Law at the Brussels Bar.\nRigorous defense, attentive listening, and strategic legal counsel.',
      navTitle: 'Navigation',
      partnersTitle: 'Partners & Network',
      legalNotices: 'Legal Notices',
      copyright: '© 2026 Ana Ferreira - Attorney at the Brussels Bar. All rights reserved.'
    }
  }
};

export const PRACTICE_AREAS: Record<Language, PracticeArea[]> = {
  fr: [
    {
      id: 'famille',
      title: 'Droit de la famille',
      shortDesc: 'Divorce, séparation, hébergement des enfants, contributions alimentaires et autorité parentale.',
      fullDesc: 'Le cabinet vous accompagne avec empathie, rigueur et fermeté dans toutes les étapes des séparations conjugales, des procédures de divorce (par consentement mutuel ou pour désunion irrémédiable), de la fixation de l’hébergement des enfants mineurs, de l’autorité parentale et du calcul des pensions alimentaires.',
      icon: 'family_restroom',
      keyPoints: [
        'Divorce par consentement mutuel ou contentieux',
        'Hébergement des enfants et autorité parentale',
        'Pensions et contributions alimentaires',
        'Liquidation et partage de régimes matrimoniaux',
        'Filiation, reconnaissance et adoption'
      ]
    },
    {
      id: 'creances',
      title: 'Recouvrement de créances',
      shortDesc: 'Mise en demeure, saisies conservatoires, contentieux commercial et civil, exécution forcée. Des solutions rapides pour protéger votre trésorerie.',
      fullDesc: 'Pour les particuliers, indépendants et entreprises, intervention rapide pour obtenir le paiement de factures impayées et créances : sommation d’avocat, injonctions de payer, mesures conservatoires et voies d’exécution forcée (saisies-arrêts bancaires, saisies mobilières via huissier de justice).',
      icon: 'account_balance',
      keyPoints: [
        'Mise en demeure officielle et sommation d’avocat',
        'Procédure de recouvrement amiable et judiciaire',
        'Saisies conservatoires et exécutions mobilières/immobilières',
        'Défense des débiteurs contre des réclamations abusives',
        'Gestion des litiges commerciaux et contractuels'
      ]
    },
    {
      id: 'roulage',
      title: 'Droit du roulage',
      shortDesc: 'Infractions routières, accidents de la circulation, indemnisation des dommages corporels et matériels, retrait de permis.',
      fullDesc: 'Défense complète devant le Tribunal de police : excès de vitesse, conduite sous l’influence d’alcool ou de stupéfiants, délit de fuite, franchissement de feu rouge, contestation de déchéance du droit de conduire et négociation avec les compagnies d’assurances pour l’indemnisation des préjudices.',
      icon: 'directions_car',
      keyPoints: [
        'Défense devant le Tribunal de police',
        'Assistance protection juridique (frais pris en charge par l’assurance)',
        'Contestation d’excès de vitesse et alcoolémie',
        'Indemnisation du préjudice corporel et matériel',
        'Récupération du permis de conduire'
      ]
    },
    {
      id: 'penal',
      title: 'Droit Pénal',
      shortDesc: 'Défense des auteurs et des victimes devant les juridictions d’instruction et de jugement.',
      fullDesc: 'Assistance à tous les stades de la procédure pénale : audition Salduz (police), mandat d’arrêt devant le juge d’instruction, comparution devant la Chambre du Conseil, Tribunal correctionnel et Cour d’appel. Constitution de partie civile et réparation du dommage pour les victimes.',
      icon: 'gavel',
      keyPoints: [
        'Assistance lors des auditions de police (Salduz)',
        'Défense devant le Juge d’instruction et la Chambre du Conseil',
        'Plaidoirie devant le Tribunal correctionnel',
        'Assistance et constitution de partie civile pour les victimes',
        'Aménagement de peines et libération conditionnelle'
      ]
    },
    {
      id: 'entreprises',
      title: 'Entreprise en difficulté',
      shortDesc: 'Procédures de réorganisation judiciaire (PRJ), restructuration de dettes, accords amiables et gestion de crise.',
      fullDesc: 'Accompagnement préventif et curatif des indépendants et entrepreneurs confrontés à des tensions de trésorerie : négociation avec les créanciers institutionnels (ONSS, TVA), mise en place d’une PRJ par accord amiable ou collectif, et accompagnement sécurisé.',
      icon: 'business_center',
      keyPoints: [
        'Procédure de Réorganisation Judiciaire (PRJ)',
        'Négociation d’échéanciers fiscaux et sociaux',
        'Accompagnement lors des procédures de réorganisation ou cessation',
        'Protection de la responsabilité personnelle du dirigeant',
        'Restructuration d’activités et négociation de dettes'
      ]
    },
    {
      id: 'loyers',
      title: 'Bail et Loyers',
      shortDesc: 'Rédaction de contrats, litiges locatifs, résiliation, expulsions, arriérés de loyers et troubles de jouissance.',
      fullDesc: 'Assistance aux bailleurs et aux locataires pour sécuriser leurs relations contractuelles : rédaction de baux résidentiels et commerciaux, mise en œuvre de la garantie locative, conciliation devant le Juge de paix, recouvrement de loyers impayés et procédure d’expulsion.',
      icon: 'real_estate_agent',
      keyPoints: [
        'Rédaction et audit de baux d’habitation et commerciaux',
        'Gestion des impayés et résiliation judiciaire du bail',
        'Procédure d’expulsion dans le respect des délais légaux',
        'Litiges sur l’état des lieux et libération de garantie',
        'Action en suppression des troubles anormaux de voisinage'
      ]
    }
  ],
  pt: [
    {
      id: 'famille',
      title: 'Direito da Família',
      shortDesc: 'Divórcio, regulação das responsabilidades parentais, alimentos, filiação e património conjugal.',
      fullDesc: 'Apoio jurídico com sensibilidade e estratégia em todas as questões familiares: divórcio por mútuo acordo ou litigioso, residência alternada ou exclusiva de menores, fixação de pensões de alimentos e liquidação do regime de bens.',
      icon: 'family_restroom',
      keyPoints: [
        'Divórcio consensual e litigioso',
        'Regulação do poder paternal e guarda partilhada',
        'Fixação e cobrança de pensões de alimentos',
        'Partilha do património e regimes matrimoniais',
        'Filiação, perfilhação e adoção'
      ]
    },
    {
      id: 'creances',
      title: 'Cobrança de Dívidas',
      shortDesc: 'Notificações formais, penhoras, contencioso comercial e recuperação célere de créditos na Bélgica.',
      fullDesc: 'Ações ágeis e estruturadas para recuperação de montantes em dívida para particulares e empresas, através de vias extrajudiciais e processos de execução judicial (penhoras de contas e bens).',
      icon: 'account_balance',
      keyPoints: [
        'Interpelação formal e notificação de advogado',
        'Cobrança amigável e judicial de créditos',
        'Penhoras bancárias e execução de títulos',
        'Defesa de devedores contra cobranças indevidas',
        'Gestão de litígios contratuais e comerciais'
      ]
    },
    {
      id: 'roulage',
      title: 'Direito Rodoviário',
      shortDesc: 'Infrações na estrada, acidentes de viação, indemnizações por danos corporais e recuperação de carta de condução.',
      fullDesc: 'Defesa rigorosa perante o Tribunal de Polícia na Bélgica em casos de excesso de velocidade, álcool, drogas ou acidentes, bem como na negociação de indemnizações com as seguradoras.',
      icon: 'directions_car',
      keyPoints: [
        'Defesa perante o Tribunal de Polícia belga',
        'Ativação da cobertura de proteção jurídica do seguro',
        'Contestação de infrações e inibições de conduzir',
        'Indemnização de danos corporais e materiais',
        'Recuperação do título de condução'
      ]
    },
    {
      id: 'penal',
      title: 'Direito Penal',
      shortDesc: 'Defesa de arguidos e vítimas em todas as fases do processo criminal.',
      fullDesc: 'Representação em interrogatórios policiais (Salduz), perante o juiz de instrução e no Tribunal Correcional.',
      icon: 'gavel',
      keyPoints: [
        'Assistência em audições policiais (lei Salduz)',
        'Representação perante o Juiz de Instrução',
        'Defesa no Tribunal Correcional e de Recurso',
        'Constituição de assistente e pedido de indemnização',
        'Execução de penas'
      ]
    },
    {
      id: 'entreprises',
      title: 'Empresas em Dificuldade',
      shortDesc: 'Processos de reestruturação judicial (PRJ), negociação de dívidas e responsabilidade dos gerentes.',
      fullDesc: 'Aconselhamento preventivo a gestores e empresas em risco financeiro, acordos de pagamento fiscal e social (ONSS, IVA) e procedimentos de reestruturação judicial.',
      icon: 'business_center',
      keyPoints: [
        'Procedimento de Reorganização Judicial (PRJ)',
        'Acordos de pagamento fiscal e social',
        'Acompanhamento e assessoria em insolvência',
        'Salvaguarda do património e responsabilidade do gerente',
        'Reestruturação de negócios'
      ]
    },
    {
      id: 'loyers',
      title: 'Arrendamento e Imobiliário',
      shortDesc: 'Contratos de arrendamento, litígios entre senhorios e inquilinos, despejos e rendas em atraso.',
      fullDesc: 'Defesa de direitos em contratos de habitação e comerciais perante o Juiz de Paz, resolução de contratos e desocupação.',
      icon: 'real_estate_agent',
      keyPoints: [
        'Elaboração de contratos de arrendamento',
        'Cobrança de rendas não pagas',
        'Processos de despejo legal',
        'Disputa sobre cauções e estado do imóvel',
        'Resolução de litígios de vizinhança'
      ]
    }
  ],
  en: [
    {
      id: 'famille',
      title: 'Family Law',
      shortDesc: 'Divorce, legal separation, child custody & residence, child support, and marital property division.',
      fullDesc: 'Our law firm assists and represents you with empathy, rigor, and firmness in all aspects of family disputes: mutual consent and contentious divorce, child custody arrangements, parental authority, child maintenance calculation, and spousal alimony.',
      icon: 'family_restroom',
      keyPoints: [
        'Mutual consent and contested divorce proceedings',
        'Child custody, visitation rights, and parental authority',
        'Child support and spousal maintenance calculations',
        'Liquidation and division of marital property regimes',
        'Paternity acknowledgment, parentage, and adoption'
      ]
    },
    {
      id: 'creances',
      title: 'Debt Recovery & Commercial Claims',
      shortDesc: 'Formal demand letters, asset seizures, commercial litigation, and prompt debt enforcement in Belgium.',
      fullDesc: 'Prompt and decisive action to collect unpaid receivables for individuals, freelancers, and businesses: formal attorney notices, payment orders, conservatory seizures, and judicial enforcement (bank account attachments and bailiff executions).',
      icon: 'account_balance',
      keyPoints: [
        'Official formal notice from an attorney-at-law',
        'Amicable and judicial debt collection proceedings',
        'Bank and property seizures and attachment orders',
        'Debtor defense against unlawful or unfounded claims',
        'Commercial disputes and contract enforcement'
      ]
    },
    {
      id: 'roulage',
      title: 'Traffic & Road Law',
      shortDesc: 'Traffic offenses, road accidents, bodily injury claims, and driving license recovery.',
      fullDesc: 'Comprehensive defense before the Belgian Police Court: speeding citations, driving under the influence (alcohol/drugs), hit-and-run charges, driving ban appeals, and negotiations with insurance companies for full damage recovery.',
      icon: 'directions_car',
      keyPoints: [
        'Representation before the Belgian Police Court',
        'Legal defense insurance coverage assistance',
        'Defense against speeding, DUI, and traffic citations',
        'Compensation for bodily injury and material damage',
        'Reinstatement and recovery of driving licenses'
      ]
    },
    {
      id: 'penal',
      title: 'Criminal Defense',
      shortDesc: 'Defense of accused persons and representation of victims across all stages of criminal proceedings.',
      fullDesc: 'Assistance during police interrogations (Salduz rights), representation before investigating judges and the Council Chamber (pre-trial custody), defense before Correctional Courts, and victim civil claims.',
      icon: 'gavel',
      keyPoints: [
        'Assistance during police interrogations (Salduz rights)',
        'Representation before the Investigating Judge and Council Chamber',
        'Defense pleadings before the Correctional Court and Court of Appeal',
        'Civil party claims and compensation for crime victims',
        'Sentence adjustments and conditional release'
      ]
    },
    {
      id: 'entreprises',
      title: 'Distressed Businesses & Restructuring',
      shortDesc: 'Judicial reorganization (PRJ), debt restructuring, creditor negotiations, and director defense.',
      fullDesc: 'Preventive and remedial legal guidance for entrepreneurs and freelancers facing liquidity challenges: debt rescheduling with tax/social authorities (ONSS, VAT), collective judicial reorganization (PRJ), and risk mitigation.',
      icon: 'business_center',
      keyPoints: [
        'Judicial Reorganization Procedure (PRJ)',
        'Negotiation of tax and social security payment schedules',
        'Support and guidance in insolvency or cessation proceedings',
        'Director personal liability mitigation',
        'Business restructuring and debt negotiation'
      ]
    },
    {
      id: 'loyers',
      title: 'Tenancy & Real Estate Law',
      shortDesc: 'Lease drafting, rental disputes, eviction procedures, unpaid rent recovery, and landlord-tenant litigation.',
      fullDesc: 'Assisting landlords and tenants to secure their rights: residential and commercial lease drafting, rental guarantee disputes, conciliation before the Justice of the Peace, and lawful eviction proceedings.',
      icon: 'real_estate_agent',
      keyPoints: [
        'Drafting and review of residential and commercial leases',
        'Rent recovery and judicial termination of tenancy contracts',
        'Lawful eviction proceedings in compliance with statutory notice',
        'Security deposit releases and inventory disputes',
        'Legal action against neighborhood disturbances'
      ]
    }
  ]
};

export const FAQ_ITEMS: Record<Language, FaqItem[]> = {
  fr: [
    {
      id: 'faq-1',
      category: 'procedure',
      question: 'Combien coûte le premier rendez-vous et comment se déroule-t-il ?',
      answer: "Le premier rendez-vous (au cabinet, par visioconférence ou par téléphone) est fixé au tarif de 125 € TVAC. Cette première consultation permet d'analyser votre situation en détail, d'examiner vos pièces et de définir vos objectifs. Nous établirons ensemble les premières orientations stratégiques ainsi qu'une évaluation transparente des suites et des honoraires du dossier."
    },
    {
      id: 'faq-2',
      category: 'areas',
      question: 'Quels sont vos domaines de compétence principaux ?',
      answer: "Notre cabinet intervient au quotidien en droit de la famille (divorce, séparation, hébergement des enfants, pensions), recouvrement de créances (factures impayées, mises en demeure, saisies et voies d'exécution), droit du roulage (tribunal de police, accidents, infractions), droit pénal, entreprise en difficulté (PRJ, restructuration) et bail et loyers. Nous sommes également formés et agréés en Droit Collaboratif pour le règlement amiable des litiges."
    },
    {
      id: 'faq-3',
      category: 'fees',
      question: 'Comment sont calculés les honoraires ?',
      answer: "Le cabinet applique un tarif horaire unique et transparent de 150 € par heure (Hors TVA). Dès l’ouverture de votre dossier, une convention d’honoraires écrite vous est remise. L’ensemble des prestations (consultations, étude de pièces, rédaction d’actes, correspondances, audiences et négociations) est consigné au temps réel sur un relevé détaillé qui accompagne chaque demande de provision."
    },
    {
      id: 'faq-4',
      category: 'fees',
      question: "Puis-je bénéficier de l'aide juridique (Pro Deo) ?",
      answer: "L'accès à l'aide juridique dépend de vos revenus et de votre situation familiale selon les barèmes fixés par le législateur belge. Lors de notre premier contact, nous vérifierons si vous remplissez les conditions légales pour en bénéficier et nous vous accompagnerons dans la constitution du dossier administratif."
    },
    {
      id: 'faq-5',
      category: 'procedure',
      question: 'Proposez-vous des consultations à distance (Visioconférence ou Téléphone) ?',
      answer: "Oui, le cabinet propose des consultations en visioconférence sécurisée (Google Meet / Teams) ou par téléphone pour les clients ne pouvant pas se déplacer au cabinet situé à Bruxelles (1040 Etterbeek)."
    },
    {
      id: 'faq-6',
      category: 'procedure',
      question: 'En quelles langues assurez-vous le traitement des dossiers ?',
      answer: "Maître Ana Ferreira parle couramment français, portugais et anglais. Tous les actes judiciaires officiels en Belgique sont rédigés en français conformément aux exigences du Barreau de Bruxelles."
    },
    {
      id: 'faq-7',
      category: 'procedure',
      question: "Qu'est-ce que le Droit Collaboratif et en quoi est-il différent du tribunal ?",
      answer: "Le droit collaboratif est une méthode novatrice de règlement amiable où les parties s'engagent, avec leurs avocats formés, à négocier de bonne foi sans jamais saisir le juge durant le processus. Cela permet de préserver les liens familiaux ou professionnels, de réduire drastiquement les délais et de construire une solution durable."
    }
  ],
  pt: [
    {
      id: 'faq-1',
      category: 'procedure',
      question: 'Qual é o valor da primeira consulta e como se desenvolve?',
      answer: 'A primeira consulta (no escritório, por videoconferência ou por telefone) tem o valor fixo de 125 € TVAC (IVA incluído). É o momento para analisar a sua situação em detalhe, compreender os seus objetivos e examinar os documentos relevantes. Discutiremos as melhores estratégias jurídicas e será apresentada uma estimativa transparente do seguimento do processo e respetivos honorários.'
    },
    {
      id: 'faq-2',
      category: 'areas',
      question: 'Quais são as suas principais áreas de intervenção?',
      answer: 'O escritório atua com grande foco em Direito da Família (divórcio, regulação paternal, pensões), Cobrança de Dívidas (recuperação célere de créditos e faturas), Direito Rodoviário (Tribunal de Polícia), Direito Penal, Empresas em Dificuldade (PRJ) e Arrendamento. Possuímos ainda formação certificada em Direito Colaborativo.'
    },
    {
      id: 'faq-3',
      category: 'fees',
      question: 'Como são calculados os honorários?',
      answer: 'O escritório aplica uma tarifa horária única e transparente de 150 € por hora (sem IVA). Na abertura do processo, é estabelecida uma convenção escrita de honorários. Todas as intervenções (análise de documentos, redação de peças, contactos, audiências e negociações) são contabilizadas pelo tempo despendido e discriminadas detalhadamente em cada fatura.'
    },
    {
      id: 'faq-4',
      category: 'fees',
      question: 'Posso ter acesso ao apoio judiciário (Pro Deo)?',
      answer: 'O acesso ao apoio judiciário depende dos rendimentos do agregado familiar segundo a legislação belga. No primeiro contacto, verificaremos a sua elegibilidade e apoiaremos na entrega dos documentos necessários.'
    },
    {
      id: 'faq-5',
      category: 'procedure',
      question: 'É possível agendar consultas online ou por videoconferência?',
      answer: 'Sim, realizamos consultas por videoconferência (Google Meet/Teams) ou por chamada telefónica para clientes em qualquer parte da Bélgica ou no estrangeiro (escritório localizado em 1040 Etterbeek, Bruxelas).'
    },
    {
      id: 'faq-6',
      category: 'procedure',
      question: 'Em que idiomas é prestado o atendimento?',
      answer: 'A Dra. Ana Ferreira presta atendimento rigoroso em francês, português e inglês, garantindo que toda a comunicação é compreendida com clareza e precisão.'
    },
    {
      id: 'faq-7',
      category: 'procedure',
      question: 'O que é o Direito Colaborativo e quais as suas vantagens?',
      answer: 'É um procedimento voluntário onde as partes e os respetivos advogados se comprometem a encontrar uma solução negociada amigável sem recorrer ao tribunal, garantindo confidencialidade, rapidez e preservação de relações.'
    }
  ],
  en: [
    {
      id: 'faq-1',
      category: 'procedure',
      question: 'What is the fee for the initial consultation and how does it work?',
      answer: 'The initial legal consultation (in-office, via videoconference, or by phone) is charged at a fixed fee of €125 TVAC (incl. VAT). It provides the opportunity to thoroughly examine your situation, understand your objectives, and review all relevant documentation. We will discuss actionable legal strategies and provide a clear, transparent assessment of prospective legal fees for the continuation of your case.'
    },
    {
      id: 'faq-2',
      category: 'areas',
      question: 'What are the firm’s core areas of practice?',
      answer: 'Our firm routinely handles Family Law (divorce, child custody, alimony), Debt Recovery & Commercial Claims (unpaid invoices, demand letters, enforcement), Traffic & Road Law (Police Court defense), Criminal Defense, Distressed Businesses (PRJ restructuring), and Tenancy & Real Estate Law. We are also fully certified in Collaborative Law for amicable dispute resolution.'
    },
    {
      id: 'faq-3',
      category: 'fees',
      question: 'How are legal fees calculated and billed?',
      answer: 'The firm operates on a single transparent hourly rate of €150 / hour (excluding VAT). Upon opening your file, a written fee agreement is established. Every legal action performed (consultations, evidence review, legal drafting, phone conferences, and court hearings) is precisely itemized on a timesheet accompanying each invoice.'
    },
    {
      id: 'faq-4',
      category: 'fees',
      question: 'Am I eligible for legal aid (Pro Deo)?',
      answer: 'Eligibility for legal aid in Belgium depends on household income and family circumstances according to statutory thresholds. During our first exchange, we will evaluate your eligibility and assist in compiling the necessary administrative documentation for the legal aid office (BAJ).'
    },
    {
      id: 'faq-5',
      category: 'procedure',
      question: 'Do you offer remote consultations (Videoconference or Phone)?',
      answer: 'Yes, we provide secure remote consultations via video conference (Google Meet / Teams) or phone for clients unable to travel to our Brussels office (1040 Etterbeek).'
    },
    {
      id: 'faq-6',
      category: 'procedure',
      question: 'In which languages can consultations and case handling be conducted?',
      answer: 'Attorney Ana Ferreira assists clients fluently in English, French, and Portuguese. All official Belgian court pleadings and deeds are prepared in French in compliance with the Brussels Bar regulations.'
    },
    {
      id: 'faq-7',
      category: 'procedure',
      question: 'What is Collaborative Law and how does it differ from court litigation?',
      answer: 'Collaborative law is an innovative alternative dispute resolution method where parties and their certified attorneys formally agree not to resort to court proceedings during negotiations. It fosters constructive, interest-based solutions, dramatically shortens resolution timelines, and preserves constructive relationships.'
    }
  ]
};
