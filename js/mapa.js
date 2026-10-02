
L.TileLayer.prototype.options.referrerPolicy = 'strict-origin-when-cross-origin';

const map = L.map('mapa').setView([-24.8, -51.5], 7);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  maxZoom: 19
}).addTo(map);

let clusterGroup = L.markerClusterGroup();
map.addLayer(clusterGroup);

const selectCidade = document.getElementById('filtro-cidade');

const triggerCategoria = document.getElementById('trigger-categoria');
const optionsCategoria = document.getElementById('options-categoria');
const labelCategoria = document.getElementById('label-categoria');
const triggerNacionalidade = document.getElementById('trigger-nacionalidade');
const optionsNacionalidade = document.getElementById('options-nacionalidade');
const labelNacionalidade = document.getElementById('label-nacionalidade');
let categoriasSelecionadas = [];
let nacionalidadesSelecionadas = [];

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

function padronizarTexto(valor) {
  if (!valor) return '';
  let limpo = String(valor).trim().replace(/\s+/g, ' ').toLowerCase();
  return limpo.replace(/(^|\s)\S/g, function(letra) { return letra.toUpperCase(); });
}

function preencherSelects() {
  selectCidade.innerHTML = '<option value="">— Todos os municípios —</option>';
  optionsCategoria.innerHTML = '';
  optionsNacionalidade.innerHTML = '';

  const cidades = listaUnica(localizacoes.map(l => padronizarTexto(l.city)));
  cidades.forEach(cidade => {
    const opt = document.createElement('option');
    opt.value = cidade;
    opt.textContent = cidade;
    selectCidade.appendChild(opt);
  });

  const categorias = listaUnica(
    localizacoes.flatMap(l => 
      Array.isArray(l.categorias) ? l.categorias.map(c => padronizarTexto(c)) : []
    )
  );

  categorias.forEach(categoria => {
    const label = document.createElement('label');
    label.className = 'multi-select-option';
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.value = categoria;
    
    checkbox.addEventListener('change', function() {
      if (this.checked) {
        categoriasSelecionadas.push(this.value);
      } else {
        categoriasSelecionadas = categoriasSelecionadas.filter(c => c !== this.value);
      }
      atualizarLabelCategoria();
      renderizarMarcadores(false);
    });

    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(' ' + categoria));
    optionsCategoria.appendChild(label);
  });

  const nacionalidades = listaUnica(
    localizacoes.flatMap(l =>
      Array.isArray(l.nacionalidades_lista) 
        ? l.nacionalidades_lista.map(n => padronizarTexto(n)) 
        : []
    )
  );
  nacionalidades.forEach(nacionalidade => {
    const label = document.createElement('label');
    label.className = 'multi-select-option';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.value = nacionalidade;

    checkbox.addEventListener('change', function() {
      if (this.checked) {
        nacionalidadesSelecionadas.push(this.value);
      } else {
        nacionalidadesSelecionadas = nacionalidadesSelecionadas.filter(n => n !== this.value);
      }
      atualizarLabelNacionalidade();
      renderizarMarcadores(false);
    });

    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(' ' + nacionalidade));
    optionsNacionalidade.appendChild(label);
  });
}

function atualizarLabelCategoria() {
  if (categoriasSelecionadas.length === 0) {
    labelCategoria.textContent = '— Todas as categorias —';
  } else if (categoriasSelecionadas.length === 1) {
    labelCategoria.textContent = categoriasSelecionadas[0];
  } else {
    labelCategoria.textContent = `${categoriasSelecionadas.length} categorias selecionadas`;
  }
}

function atualizarLabelNacionalidade() {
  if (nacionalidadesSelecionadas.length === 0) {
    labelNacionalidade.textContent = '— Todas as nacionalidades —';
  } else if (nacionalidadesSelecionadas.length === 1) {
    labelNacionalidade.textContent = nacionalidadesSelecionadas[0];
  } else {
    labelNacionalidade.textContent = `${nacionalidadesSelecionadas.length} nacionalidades selecionadas`;
  }
}

function atualizarContador(n) {
  document.getElementById('contador').textContent = n;
}

function adicionarCampo(html, titulo, valor) {
  if (!texto(valor)) return html;
  return html + `<div class="popup-campo"><strong>${escapar(titulo)}:</strong><br>${escapar(valor).replace(/\n/g, '<br>')}</div>`;
}

function montarPopup(loc) {
  const criarTags = (lista) => {
    if (!Array.isArray(lista) || lista.length === 0) return '-';
    return lista.map(item => `<span class="tag">${escapar(item)}</span>`).join(' ');
  };

  let colunaEsquerda = `
    <div class="popup-secao">
      <b>Áreas de atuação:</b><br>
      ${criarTags(loc.categorias)}
    </div>
    <div class="popup-secao">
      <b>Nacionalidades atendidas:</b><br>
      ${criarTags(loc.nacionalidades_lista)}
    </div>
    <div class="popup-secao">
      <b>Público principal:</b><br>
      ${escapar(loc.publico_principal) || '-'}
    </div>
  `;

  let colunaDireita = ``;
  if (texto(loc.email)) colunaDireita += `<div class="popup-contato-item"><b>E-mail:</b><br>${escapar(loc.email)}</div>`;
  if (texto(loc.telefone)) colunaDireita += `<div class="popup-contato-item"><b>Telefone:</b><br>${escapar(loc.telefone)}</div>`;
  if (texto(loc.redes_sociais)) {
    const redes = texto(loc.redes_sociais)
      .split('|')
      .map(r => r.trim())
      .filter(r => r.length > 0);
  
    const linksRedes = redes.map(rede => {
      const href = /^https?:\/\//i.test(rede) ? rede : `https://${rede}`;
      return `<a href="${escapar(href)}" target="_blank" rel="noopener noreferrer">${escapar(rede)}</a>`;
    }).join('<br>');
  
    colunaDireita += `<div class="popup-contato-item"><b>Redes sociais:</b><br>${linksRedes}</div>`;
  }
  if (texto(loc.site)) {
    const site = texto(loc.site);
    const href = /^https?:\/\//i.test(site) ? site : `https://${site}`;
    colunaDireita += `<div class="popup-contato-item"><b>Site:</b><br><a href="${escapar(href)}" target="_blank" rel="noopener noreferrer">${escapar(site)}</a></div>`;
  }
  if (colunaDireita === '') colunaDireita = `<div class="popup-contato-item">-</div>`;

  let html = `
    <div class="popup-organizacao">
      <div class="popup-titulo">${escapar(loc.org)}</div>
      <div class="popup-endereco"><b>${escapar(loc.city)}</b> ${loc.endereco ? '— ' + escapar(loc.endereco) : ''}</div>
      <div class="popup-conteudo">
        <div class="popup-coluna-esquerda">${colunaEsquerda}</div>
        <div class="popup-coluna-direita">${colunaDireita}</div>
      </div>
      <div class="popup-grid">
        <div class="popup-card"><b>Tipo de entidade</b><br>${escapar(loc.tipo_entidade) || '-'}</div>
        <div class="popup-card"><b>Forma de acesso</b><br>${escapar(loc.forma_acesso) || '-'}</div>
        <div class="popup-card"><b>Horário</b><br>${escapar(loc.horarios) || '-'}</div>
        <div class="popup-card"><b>Fundação</b><br>${escapar(loc.fundacao) || '-'}</div>
      </div>
  `;

  const camposExtras = [
    { titulo: 'Perfil migratório atendido', valor: loc.perfil_migratorio },
    { titulo: 'Serviços oferecidos', valor: loc.servicos },
    { titulo: 'Segundo público', valor: loc.segundo_publico },
    { titulo: 'Outros públicos', valor: loc.outros_publicos },
    { titulo: 'Principais atividades', valor: loc.atividades },
    { titulo: 'Problema que busca resolver', valor: loc.problema },
    { titulo: 'Como resolve', valor: loc.como_resolve },
    { titulo: 'Responsável pelo cadastro', valor: loc.responsavel },
    { titulo: 'CNPJ', valor: loc.cnpj },
    { titulo: 'Tempo de atuação', valor: loc.tempo_atuacao },
    { titulo: 'Possui mais de uma sede?', valor: loc.mais_de_uma_sede }
  ];

  camposExtras.forEach(campo => {
    if (texto(campo.valor)) {
      html += `<div class="popup-campo"><strong>${escapar(campo.titulo)}:</strong><br>${escapar(campo.valor).replace(/\n/g, '<br>')}</div>`;
    }
  });

  html += `</div>`;
  return html;
}

function renderizarMarcadores(ajustarVista = false) {
  clusterGroup.clearLayers();

  const filtroCidade = selectCidade.value;
  const lista = localizacoes.filter(l => {
    if (filtroCidade && padronizarTexto(l.city) !== filtroCidade) return false;

    if (categoriasSelecionadas.length > 0) {
      const catsPadronizadas = Array.isArray(l.categorias) 
        ? l.categorias.map(c => padronizarTexto(c)) 
        : [];
      const temAlgumaCategoria = categoriasSelecionadas.some(cat => 
        catsPadronizadas.includes(cat)
      );
      if (!temAlgumaCategoria) return false;
    }

    if (nacionalidadesSelecionadas.length > 0) {
      const nacsPadronizadas = Array.isArray(l.nacionalidades_lista) 
        ? l.nacionalidades_lista.map(n => padronizarTexto(n)) 
        : [];
      if (!nacionalidadesSelecionadas.some(nacionalidade => nacsPadronizadas.includes(nacionalidade))) return false;
    }

    return true;
  });

  lista.forEach(loc => {
    if (typeof loc.lat !== 'number' || typeof loc.lng !== 'number') return;

    const marker = L.marker([loc.lat, loc.lng]);
    marker.bindPopup(montarPopup(loc), {
      maxWidth: 600,
      minWidth: 200,
      autoPan: false,
      keepInView: false,
      closeButton: true,
      className: 'popup-instituicao'
    });
    clusterGroup.addLayer(marker);
  });

  atualizarContador(lista.length);
  renderizarListaOrganizacoes(lista);

  if (ajustarVista && clusterGroup.getLayers().length > 0) {
    const bounds = clusterGroup.getLayers().map(marker => marker.getLatLng());
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 13 });
  }
}

preencherSelects();
renderizarMarcadores(true);

selectCidade.addEventListener('change', () => renderizarMarcadores(true));

[
  { trigger: triggerCategoria, options: optionsCategoria },
  { trigger: triggerNacionalidade, options: optionsNacionalidade }
].forEach(({ trigger, options }) => {
  trigger.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    options.classList.toggle('show');
    trigger.setAttribute('aria-expanded', options.classList.contains('show'));
  });
  trigger.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      options.classList.remove('show');
      trigger.setAttribute('aria-expanded', 'false');
    }
  });
});

document.addEventListener('click', function(e) {
  [
    { container: document.getElementById('multi-select-categoria'), trigger: triggerCategoria, options: optionsCategoria },
    { container: document.getElementById('multi-select-nacionalidade'), trigger: triggerNacionalidade, options: optionsNacionalidade }
  ].forEach(({ container, trigger, options }) => {
    if (!container.contains(e.target)) {
      options.classList.remove('show');
      trigger.setAttribute('aria-expanded', 'false');
    }
  });
});

document.getElementById('btn-limpar').addEventListener('click', () => {
  selectCidade.value = '';

  categoriasSelecionadas = [];
  document.querySelectorAll('#options-categoria input[type="checkbox"]').forEach(cb => {
    cb.checked = false;
  });
  nacionalidadesSelecionadas = [];
  document.querySelectorAll('#options-nacionalidade input[type="checkbox"]').forEach(cb => {
    cb.checked = false;
  });
  atualizarLabelCategoria();
  atualizarLabelNacionalidade();
  
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

const POPUP_CFG = {
  margem: 10,
  pinoX: 26,
  espaco: 16,
  larguraMax: 600,
  margemConteudo: 34
};
const PINO_MEIO = 20;

function layoutPopup(popup, animar) {
  if (!popup || !map.hasLayer(popup)) return;
  map.stop();
  const tam = map.getSize();
  const largura = Math.max(1, Math.min(POPUP_CFG.larguraMax, tam.x - 70));
  const alturaMax = Math.max(1, tam.y - POPUP_CFG.margem * 2);

  popup.options.minWidth = Math.max(1, largura - POPUP_CFG.margemConteudo);
  popup.options.maxWidth = popup.options.minWidth;
  popup.options.maxHeight = alturaMax;
  popup.options.offset = L.point(0, 0);
  popup.update();

  const el = popup.getElement();
  if (!el) return;
  const conteudo = el.querySelector('.leaflet-popup-content');
  if (!conteudo) return;
  const alturaExterna = el.offsetHeight - conteudo.offsetHeight;
  popup.options.maxHeight = Math.max(1, alturaMax - alturaExterna);
  popup.update();
  const largPainel = el.offsetWidth;
  const altPainel = el.offsetHeight;

  const conjunto = POPUP_CFG.espaco + largPainel;
  let pinoX = Math.round((tam.x - conjunto) / 2);
  pinoX = Math.max(POPUP_CFG.pinoX, Math.min(pinoX, tam.x - conjunto - POPUP_CFG.margem));
  pinoX = Math.max(POPUP_CFG.pinoX, pinoX);
  const pinoY = Math.round(tam.y / 2) + PINO_MEIO;

  const atual = map.latLngToContainerPoint(popup.getLatLng());
  const mapaRect = map.getContainer().getBoundingClientRect();
  const popupRect = el.getBoundingClientRect();
  popup.options.offset = L.point(
    Math.round(POPUP_CFG.espaco - (popupRect.left - mapaRect.left - atual.x)),
    Math.round(-PINO_MEIO - altPainel / 2 - (popupRect.top - mapaRect.top - atual.y))
  );
  popup.update();

  const alvo = L.point(pinoX, pinoY);
  const delta = atual.subtract(alvo);
  if (Math.abs(delta.x) > 1 || Math.abs(delta.y) > 1) {
    map.panBy(delta, { animate: animar !== false, duration: 0.35 });
  }
}

map.on('popupopen', function (e) {
  e.popup.options.autoPan = false;
  const conteudo = e.popup.getElement().querySelector('.leaflet-popup-content');
  if (conteudo) conteudo.scrollTop = 0;
  requestAnimationFrame(() => layoutPopup(e.popup, true));
});

let resizeTimer = null;
map.on('resize', function () {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    map.eachLayer(l => { if (l instanceof L.Popup && map.hasLayer(l)) layoutPopup(l, false); });
  }, 120);
});
window.addEventListener('resize', () => map.invalidateSize());

