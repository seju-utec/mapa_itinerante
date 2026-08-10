// ===== FUNÇÕES DO MAPA =====

// Inicializa o mapa
const map = L.map('mapa').setView([-24.8, -51.5], 7);

L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  subdomains: 'abcd',
  maxZoom: 18
}).addTo(map);

// Grupo de clusters
let clusterGroup = L.markerClusterGroup();
map.addLayer(clusterGroup);

// Referências aos selects
const selectCidade = document.getElementById('filtro-cidade');
const selectCategoria = document.getElementById('filtro-categoria');
const selectNacionalidade = document.getElementById('filtro-nacionalidade');

// Preenche os selects com os dados
function preencherSelects() {
  // Cidades
  const cidadesUnicas = [...new Set(localizacoes.map(l => l.city))].sort();
  cidadesUnicas.forEach(cidade => {
    const opt = document.createElement('option');
    opt.value = cidade;
    opt.textContent = cidade;
    selectCidade.appendChild(opt);
  });

  // Categorias
  const categoriasUnicas = [...new Set(localizacoes.flatMap(l => l.categorias))].sort();
  categoriasUnicas.forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat;
    opt.textContent = cat;
    selectCategoria.appendChild(opt);
  });

  // Nacionalidades
  const nacionalidadesUnicas = [...new Set(localizacoes.flatMap(l => l.nacionalidades))].sort();
  nacionalidadesUnicas.forEach(nac => {
    const opt = document.createElement('option');
    opt.value = nac;
    opt.textContent = nac;
    selectNacionalidade.appendChild(opt);
  });
}

// Atualiza o contador
function atualizarContador(n) {
  document.getElementById('contador').textContent = n;
}

// Monta o popup
function montarPopup(loc) {
  const tagsCategorias = loc.categorias.map(c => `<span class="tag">${c}</span>`).join('');
  const tagsNacionalidades = loc.nacionalidades.map(n => `<span class="tag tag-nac">${n}</span>`).join('');
  let html = `<div class="popup-osc"><h3>${loc.org}</h3>`;
  html += `<p><strong>${loc.city}</strong>${loc.local ? ' — ' + loc.local : ''}</p>`;
  if (loc.subcategoria) html += `<p>${loc.subcategoria}</p>`;
  if (tagsCategorias) html += `<p>${tagsCategorias}</p>`;
  if (tagsNacionalidades) html += `<p><em>Migrantes atendidos:</em><br>${tagsNacionalidades}</p>`;
  if (loc.tema) html += `<p><em>Atuação:</em> ${loc.tema}</p>`;
  if (loc.site) html += `<p><a href="${loc.site}" target="_blank" rel="noopener">Site</a></p>`;
  if (loc.insta) html += `<p>${loc.insta}</p>`;
  if (loc.selo) html += `<p><em>Selo Social:</em> ${loc.selo}</p>`;
  if (loc.aceleradora) html += `<p><em>Aceleradora:</em> ${loc.aceleradora}</p>`;
  if (loc.rede) html += `<p><em>Rede:</em> ${loc.rede}</p>`;
  html += `</div>`;
  return html;
}

// Renderiza os marcadores
function renderizarMarcadores() {
  clusterGroup.clearLayers();

  const filtroCidade = selectCidade.value;
  const filtroCategoria = selectCategoria.value;
  const filtroNacionalidade = selectNacionalidade.value;

  const lista = localizacoes.filter(l => {
    if (filtroCidade && l.city !== filtroCidade) return false;
    if (filtroCategoria && !l.categorias.includes(filtroCategoria)) return false;
    if (filtroNacionalidade && !l.nacionalidades.includes(filtroNacionalidade)) return false;
    return true;
  });

  lista.forEach(loc => {
    const marker = L.marker([loc.lat, loc.lng]);
    marker.bindPopup(montarPopup(loc));
    clusterGroup.addLayer(marker);
  });

  atualizarContador(lista.length);

  if (lista.length > 0) {
    const bounds = lista.map(l => [l.lat, l.lng]);
    map.fitBounds(bounds, { padding: [40, 40] });
  }
}

// ===== INICIALIZAÇÃO =====

// Preenche os selects
preencherSelects();

// Carrega os marcadores
renderizarMarcadores();

// Event listeners dos filtros
selectCidade.addEventListener('change', renderizarMarcadores);
selectCategoria.addEventListener('change', renderizarMarcadores);
selectNacionalidade.addEventListener('change', renderizarMarcadores);

// Botão limpar
document.getElementById('btn-limpar').addEventListener('click', () => {
  selectCidade.value = '';
  selectCategoria.value = '';
  selectNacionalidade.value = '';
  renderizarMarcadores();
});

// Fecha dropdown ao clicar fora
document.addEventListener('click', function(event) {
  const selector = document.getElementById('language-selector');
  if (selector && !selector.contains(event.target)) {
    const dropdown = document.getElementById('language-dropdown');
    if (dropdown) {
      dropdown.classList.remove('show');
    }
  }
});

// Carrega idioma salvo
document.addEventListener('DOMContentLoaded', function() {
  const savedLang = localStorage.getItem('preferred-language');
  if (savedLang && translations[savedLang]) {
    const langMap = {
      'pt': { flag: '🇧🇷', name: 'Português' },
      'en': { flag: '🇺🇸', name: 'English' },
      'es': { flag: '🇪🇸', name: 'Español' },
      'fr': { flag: '🇫🇷', name: 'Français' },
      'it': { flag: '🇮🇹', name: 'Italiano' },
      'de': { flag: '🇩🇪', name: 'Deutsch' },
      'ja': { flag: '🇯🇵', name: '日本語' }
    };
    const langInfo = langMap[savedLang];
    if (langInfo) {
      document.getElementById('current-flag').textContent = langInfo.flag;
      document.getElementById('current-lang').textContent = langInfo.name;
      applyTranslations(savedLang);
    }
  }
});

console.log('🌍 Mapa OSC carregado com suporte multilíngue!');
console.log('📚 Idiomas disponíveis:', Object.keys(translations).join(', '));