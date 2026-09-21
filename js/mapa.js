// ===== FUNÇÕES DO MAPA =====

const map = L.map('mapa').setView([-24.8, -51.5], 7);

L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  subdomains: 'abcd',
  maxZoom: 18
}).addTo(map);

let clusterGroup = L.markerClusterGroup();
map.addLayer(clusterGroup);

const selectCidade = document.getElementById('filtro-cidade');
const selectCategoria = document.getElementById('filtro-categoria');
const selectNacionalidade = document.getElementById('filtro-nacionalidade');

function texto(valor) {
  if (valor === null || valor === undefined) return '';
  return String(valor).trim();
}

function escapar(valor) {
  return texto(valor)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function listaUnica(lista) {
  return [...new Set(lista.filter(Boolean))].sort((a, b) =>
    String(a).localeCompare(String(b), 'pt-BR')
  );
}

function preencherSelects() {
  const cidades = listaUnica(localizacoes.map(l => l.city));

  cidades.forEach(cidade => {
    const opt = document.createElement('option');
    opt.value = cidade;
    opt.textContent = cidade;
    selectCidade.appendChild(opt);
  });

  const categorias = listaUnica(
    localizacoes.flatMap(l => Array.isArray(l.categorias) ? l.categorias : [])
  );

  categorias.forEach(categoria => {
    const opt = document.createElement('option');
    opt.value = categoria;
    opt.textContent = categoria;
    selectCategoria.appendChild(opt);
  });

  const nacionalidades = listaUnica(
    localizacoes.flatMap(l =>
      Array.isArray(l.nacionalidades_lista) ? l.nacionalidades_lista : []
    )
  );

  nacionalidades.forEach(nacionalidade => {
    const opt = document.createElement('option');
    opt.value = nacionalidade;
    opt.textContent = nacionalidade;
    selectNacionalidade.appendChild(opt);
  });
}

function atualizarContador(n) {
  document.getElementById('contador').textContent = n;
}

function adicionarCampo(html, titulo, valor) {
  if (!texto(valor)) return html;
  return html + `<div class="popup-campo"><strong>${escapar(titulo)}:</strong><br>${escapar(valor).replace(/\n/g, '<br>')}</div>`;
}

function montarPopup(loc) {
  let html = `
    <div class="popup-osc">
      <h3>${escapar(loc.org)}</h3>
      <p><strong>${escapar(loc.city)}</strong>${loc.endereco ? ' — ' + escapar(loc.endereco) : ''}</p>
  `;

  if (loc.categorias?.length) {
    html += `<p><strong>Áreas de atuação:</strong><br>${loc.categorias.map(c => `<span class="tag">${escapar(c)}</span>`).join(' ')}</p>`;
  }

  if (loc.nacionalidades_lista?.length) {
    html += `<p><strong>Nacionalidades atendidas:</strong><br>${loc.nacionalidades_lista.map(n => `<span class="tag tag-nac">${escapar(n)}</span>`).join(' ')}</p>`;
  }

  html = adicionarCampo(html, 'Tipo de entidade', loc.tipo_entidade);
  html = adicionarCampo(html, 'Perfil migratório atendido', loc.perfil_migratorio);
  html = adicionarCampo(html, 'Serviços oferecidos', loc.servicos);
  html = adicionarCampo(html, 'Forma de acesso aos serviços', loc.forma_acesso);
  html = adicionarCampo(html, 'Horários de atendimento', loc.horarios);
  html = adicionarCampo(html, 'Público principal', loc.publico_principal);
  html = adicionarCampo(html, 'Segundo público', loc.segundo_publico);
  html = adicionarCampo(html, 'Outros públicos', loc.outros_publicos);
  html = adicionarCampo(html, 'Principais atividades', loc.atividades);
  html = adicionarCampo(html, 'Problema que busca resolver', loc.problema);
  html = adicionarCampo(html, 'Como resolve', loc.como_resolve);
  html = adicionarCampo(html, 'Responsável pelo cadastro', loc.responsavel);
  html = adicionarCampo(html, 'CNPJ', loc.cnpj);
  html = adicionarCampo(html, 'Data de fundação', loc.fundacao);
  html = adicionarCampo(html, 'Tempo de atuação', loc.tempo_atuacao);
  html = adicionarCampo(html, 'E-mail institucional', loc.email);
  html = adicionarCampo(html, 'Telefone institucional', loc.telefone);
  html = adicionarCampo(html, 'Possui mais de uma sede?', loc.mais_de_uma_sede);

  if (loc.site) {
    const site = texto(loc.site);
    const href = /^https?:\/\//i.test(site) ? site : `https://${site}`;
    html += `<div class="popup-campo"><strong>Site:</strong><br><a href="${escapar(href)}" target="_blank" rel="noopener noreferrer">${escapar(site)}</a></div>`;
  }

  html = adicionarCampo(html, 'Redes sociais', loc.redes_sociais);

  html += `</div>`;
  return html;
}

function renderizarMarcadores() {
  clusterGroup.clearLayers();

  const filtroCidade = selectCidade.value;
  const filtroCategoria = selectCategoria.value;
  const filtroNacionalidade = selectNacionalidade.value;

  const lista = localizacoes.filter(l => {
    if (filtroCidade && l.city !== filtroCidade) return false;

    if (
      filtroCategoria &&
      (!Array.isArray(l.categorias) || !l.categorias.includes(filtroCategoria))
    ) return false;

    if (
      filtroNacionalidade &&
      (!Array.isArray(l.nacionalidades_lista) ||
       !l.nacionalidades_lista.includes(filtroNacionalidade))
    ) return false;

    return true;
  });

  lista.forEach(loc => {
    if (typeof loc.lat !== 'number' || typeof loc.lng !== 'number') return;

    const marker = L.marker([loc.lat, loc.lng]);
    marker.bindPopup(montarPopup(loc), {
      maxWidth: 420
    });
    clusterGroup.addLayer(marker);
  });

  atualizarContador(lista.length);

  if (lista.length > 0) {
    const bounds = lista.map(l => [l.lat, l.lng]);
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 13 });
  }
}

preencherSelects();
renderizarMarcadores();

selectCidade.addEventListener('change', renderizarMarcadores);
selectCategoria.addEventListener('change', renderizarMarcadores);
selectNacionalidade.addEventListener('change', renderizarMarcadores);

document.getElementById('btn-limpar').addEventListener('click', () => {
  selectCidade.value = '';
  selectCategoria.value = '';
  selectNacionalidade.value = '';
  renderizarMarcadores();
});

document.addEventListener('click', function(event) {
  const selector = document.getElementById('language-selector');

  if (selector && !selector.contains(event.target)) {
    const dropdown = document.getElementById('language-dropdown');
    if (dropdown) dropdown.classList.remove('show');
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const savedLang = localStorage.getItem('preferred-language');

  if (savedLang && typeof translations !== 'undefined' && translations[savedLang]) {
    const langMap = {
      pt: { flag: '🇧🇷', name: 'Português' },
      en: { flag: '🇺🇸', name: 'English' },
      es: { flag: '🇪🇸', name: 'Español' },
      fr: { flag: '🇫🇷', name: 'Français' },
      it: { flag: '🇮🇹', name: 'Italiano' },
      de: { flag: '🇩🇪', name: 'Deutsch' },
      ja: { flag: '🇯🇵', name: '日本語' }
    };

    const langInfo = langMap[savedLang];

    if (langInfo) {
      document.getElementById('current-flag').textContent = langInfo.flag;
      document.getElementById('current-lang').textContent = langInfo.name;
      applyTranslations(savedLang);
    }
  }
});

console.log('🌍 Mapa OSC carregado com os dados de instituições.ods');
console.log('📚 Instituições carregadas:', localizacoes.length);
