// ===== SISTEMA DE TRADUÇÃO =====

const translations = {
  'pt': {
    'page-title': 'Mapa de Organizações da Sociedade Civil - Atendimento a Migrantes',
    'nav-home': 'Início',
    'nav-about': 'Sobre',
    'nav-contact': 'Contato',
    'nav-help': 'Ajuda',
    'header-title': 'Mapa de Organizações da Sociedade Civil — Atendimento a Migrantes',
    'header-subtitle': 'Listagem de OSC por município',
    'filter-city': 'Cidade:',
    'filter-category': 'Categoria geral:',
    'filter-nationality': 'Nacionalidade atendida:',
    'filter-all': '— Todos os municípios —',
    'filter-clear': 'Limpar filtros',
    'info-displaying': 'Exibindo <strong id="contador">0</strong> organização(ões) no mapa.',
    'footer-terms': 'Termos de Uso',
    'footer-evaluation': 'Avaliação de Serviço',
    'footer-campaign': 'Campanha de Cadastramento',
    'footer-report': 'Denuncie Corrupção'
  },
  'en': {
    'page-title': 'Civil Society Organizations Map - Migrant Assistance',
    'nav-home': 'Home',
    'nav-about': 'About',
    'nav-contact': 'Contact',
    'nav-help': 'Help',
    'header-title': 'Civil Society Organizations Map — Migrant Assistance',
    'header-subtitle': 'List of CSOs by municipality',
    'filter-city': 'City:',
    'filter-category': 'General category:',
    'filter-nationality': 'Nationality served:',
    'filter-all': '— All municipalities —',
    'filter-clear': 'Clear filters',
    'info-displaying': 'Showing <strong id="contador">0</strong> organization(s) on the map.',
    'footer-terms': 'Terms of Use',
    'footer-evaluation': 'Service Evaluation',
    'footer-campaign': 'Registration Campaign',
    'footer-report': 'Report Corruption'
  },
  'es': {
    'page-title': 'Mapa de Organizaciones de la Sociedad Civil - Atención a Migrantes',
    'nav-home': 'Inicio',
    'nav-about': 'Sobre',
    'nav-contact': 'Contacto',
    'nav-help': 'Ayuda',
    'header-title': 'Mapa de Organizaciones de la Sociedad Civil — Atención a Migrantes',
    'header-subtitle': 'Listado de OSC por municipio',
    'filter-city': 'Ciudad:',
    'filter-category': 'Categoría general:',
    'filter-nationality': 'Nacionalidad atendida:',
    'filter-all': '— Todos los municipios —',
    'filter-clear': 'Limpiar filtros',
    'info-displaying': 'Mostrando <strong id="contador">0</strong> organización(es) en el mapa.',
    'footer-terms': 'Términos de Uso',
    'footer-evaluation': 'Evaluación de Servicio',
    'footer-campaign': 'Campaña de Registro',
    'footer-report': 'Denunciar Corrupción'
  },
  'fr': {
    'page-title': 'Carte des Organisations de la Société Civile - Aide aux Migrants',
    'nav-home': 'Accueil',
    'nav-about': 'À propos',
    'nav-contact': 'Contact',
    'nav-help': 'Aide',
    'header-title': 'Carte des Organisations de la Société Civile — Aide aux Migrants',
    'header-subtitle': 'Liste des OSC par municipalité',
    'filter-city': 'Ville:',
    'filter-category': 'Catégorie générale:',
    'filter-nationality': 'Nationalité desservie:',
    'filter-all': '— Toutes les municipalités —',
    'filter-clear': 'Effacer les filtres',
    'info-displaying': 'Affichage de <strong id="contador">0</strong> organisation(s) sur la carte.',
    'footer-terms': "Conditions d'Utilisation",
    'footer-evaluation': "Évaluation du Service",
    'footer-campaign': "Campagne d'Inscription",
    'footer-report': "Signaler la Corruption"
  },
  'it': {
    'page-title': 'Mappa delle Organizzazioni della Società Civile - Assistenza ai Migranti',
    'nav-home': 'Home',
    'nav-about': 'Chi siamo',
    'nav-contact': 'Contatti',
    'nav-help': 'Aiuto',
    'header-title': 'Mappa delle Organizzazioni della Società Civile — Assistenza ai Migranti',
    'header-subtitle': 'Elenco delle OSC per comune',
    'filter-city': 'Città:',
    'filter-category': 'Categoria generale:',
    'filter-nationality': 'Nazionalità servita:',
    'filter-all': '— Tutti i comuni —',
    'filter-clear': 'Cancella filtri',
    'info-displaying': 'Visualizzazione di <strong id="contador">0</strong> organizzazione(i) sulla mappa.',
    'footer-terms': 'Termini di Utilizzo',
    'footer-evaluation': 'Valutazione del Servizio',
    'footer-campaign': 'Campagna di Registrazione',
    'footer-report': 'Denuncia Corruzione' 
  },
  'de': {
    'page-title': 'Karte der Zivilgesellschaftlichen Organisationen - Migrantenhilfe',
    'nav-home': 'Startseite',
    'nav-about': 'Über uns',
    'nav-contact': 'Kontakt',
    'nav-help': 'Hilfe',
    'header-title': 'Karte der Zivilgesellschaftlichen Organisationen — Migrantenhilfe',
    'header-subtitle': 'Liste der CSOs nach Gemeinde',
    'filter-city': 'Stadt:',
    'filter-category': 'Allgemeine Kategorie:',
    'filter-nationality': 'Betreute Nationalität:',
    'filter-all': '— Alle Gemeinden —',
    'filter-clear': 'Filter zurücksetzen',
    'info-displaying': 'Zeige <strong id="contador">0</strong> Organisation(en) auf der Karte.',
    'footer-terms': 'Nutzungsbedingungen',
    'footer-evaluation': 'Servicebewertung',
    'footer-campaign': 'Registrierungskampagne',
    'footer-report': 'Korruption melden'
  },
  'ja': {
    'page-title': '市民社会組織マップ - 移民支援',
    'nav-home': 'ホーム',
    'nav-about': 'について',
    'nav-contact': 'お問い合わせ',
    'nav-help': 'ヘルプ',
    'header-title': '市民社会組織マップ — 移民支援',
    'header-subtitle': '自治体別CSOリスト',
    'filter-city': '都市:',
    'filter-category': '一般カテゴリ:',
    'filter-nationality': '対応国籍:',
    'filter-all': '— すべての自治体 —',
    'filter-clear': 'フィルターをクリア',
    'info-displaying': 'マップ上に <strong id="contador">0</strong> 組織を表示しています。',
    'footer-terms': '利用規約',
    'footer-evaluation': 'サービス評価',
    'footer-campaign': '登録キャンペーン',
    'footer-report': '汚職を通報'
  }
};

// Função para aplicar traduções
function applyTranslations(langCode) {
  const translation = translations[langCode];
  if (!translation) return;

  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (translation[key]) {
      if (element.innerHTML.includes('<strong') || element.innerHTML.includes('<strong id="contador"')) {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = translation[key];
        element.innerHTML = tempDiv.innerHTML;
      } else {
        element.textContent = translation[key];
      }
    }
  });

  const idMap = {
    'page-title': translation['page-title'],
    'header-title': translation['header-title'],
    'header-subtitle': translation['header-subtitle']
  };

  for (const [id, text] of Object.entries(idMap)) {
    const element = document.getElementById(id);
    if (element) {
      element.textContent = text;
    }
  }

  document.querySelectorAll('select option[data-i18n]').forEach(option => {
    const key = option.getAttribute('data-i18n');
    if (translation[key]) {
      option.textContent = translation[key];
    }
  });
}

// Função para mudar idioma
function changeLanguage(langCode, flag, langName) {
  document.getElementById('current-flag').textContent = flag;
  document.getElementById('current-lang').textContent = langName;
  document.getElementById('language-dropdown').classList.remove('show');
  applyTranslations(langCode);
  localStorage.setItem('preferred-language', langCode);
}

// Função para toggle do dropdown
function toggleLanguageDropdown() {
  const dropdown = document.getElementById('language-dropdown');
  dropdown.classList.toggle('show');
}