// ===== FUNÇÕES DO MAPA =====

L.TileLayer.prototype.options.referrerPolicy = 'strict-origin-when-cross-origin';

const map = L.map('mapa').setView([-24.8, -51.5], 7);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  maxZoom: 19
}).addTo(map);

let clusterGroup = L.markerClusterGroup();
map.addLayer(clusterGroup);

// ===== REFERÊNCIAS AOS ELEMENTOS DO DOM =====
const selectCidade = document.getElementById('filtro-cidade');
const selectNacionalidade = document.getElementById('filtro-nacionalidade');

// Referências para o Multi-Select de Categorias
const triggerCategoria = document.getElementById('trigger-categoria');
const optionsCategoria = document.getElementById('options-categoria');
const labelCategoria = document.getElementById('label-categoria');
let categoriasSelecionadas = []; 

// ===== FUNÇÕES AUXILIARES =====
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

// ===== PREENCHIMENTO DOS FILTROS =====
function preencherSelects() {
  // Limpa os selects antes de preencher (evita duplicatas se a função rodar 2x)
  selectCidade.innerHTML = '<option value="">— Todos os municípios —</option>';
  selectNacionalidade.innerHTML = '<option value="">— Todas as nacionalidades —</option>';
  optionsCategoria.innerHTML = '';

  // --- CIDADES ---
  const cidades = listaUnica(localizacoes.map(l => padronizarTexto(l.city)));
  cidades.forEach(cidade => {
    const opt = document.createElement('option');
    opt.value = cidade;
    opt.textContent = cidade;
    selectCidade.appendChild(opt);
  });

  // --- CATEGORIAS (Checkboxes) ---
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
      renderizarMarcadores();
    });

    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(' ' + categoria));
    optionsCategoria.appendChild(label);
  });

  // --- NACIONALIDADES ---
  const nacionalidades = listaUnica(
    localizacoes.flatMap(l =>
      Array.isArray(l.nacionalidades_lista) 
        ? l.nacionalidades_lista.map(n => padronizarTexto(n)) 
        : []
    )
  );
  nacionalidades.forEach(nacionalidade => {
    const opt = document.createElement('option');
    opt.value = nacionalidade;
    opt.textContent = nacionalidade;
    selectNacionalidade.appendChild(opt);
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

function atualizarContador(n) {
  document.getElementById('contador').textContent = n;
}

function adicionarCampo(html, titulo, valor) {
  if (!texto(valor)) return html;
  return html + `<div class="popup-campo"><strong>${escapar(titulo)}:</strong><br>${escapar(valor).replace(/\n/g, '<br>')}</div>`;
}

// ===== MONTAGEM DO POPUP =====
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
    // Separa as redes sociais por "|" (você tem vários links separados por "|")
    const redes = texto(loc.redes_sociais)
      .split('|')
      .map(r => r.trim())
      .filter(r => r.length > 0);
  
    // Cria os links clicáveis mantendo o texto completo
    const linksRedes = redes.map(rede => {
      // Verifica se já tem http/https, senão adiciona
      const href = /^https?:\/\//i.test(rede) ? rede : `https://${rede}`;
      // Mantém o texto original completo (sem encurtar)
      return `<a href="${escapar(href)}" target="_blank" rel="noopener noreferrer">${escapar(rede)}</a>`;
    }).join('<br>'); // Uma rede social por linha
  
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

// ===== RENDERIZAÇÃO DOS MARCADORES =====
function renderizarMarcadores() {
  clusterGroup.clearLayers();

  const filtroCidade = selectCidade.value;
  const filtroNacionalidade = selectNacionalidade.value;

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

    if (filtroNacionalidade) {
      const nacsPadronizadas = Array.isArray(l.nacionalidades_lista) 
        ? l.nacionalidades_lista.map(n => padronizarTexto(n)) 
        : [];
      if (!nacsPadronizadas.includes(filtroNacionalidade)) return false;
    }

    return true;
  });

  lista.forEach(loc => {
    if (typeof loc.lat !== 'number' || typeof loc.lng !== 'number') return;

    const marker = L.marker([loc.lat, loc.lng]);
    marker.bindPopup(montarPopup(loc), {
      maxWidth: 680,
      minWidth: 520,
      autoPan: false,
      className: 'popup-instituicao'
    });
    clusterGroup.addLayer(marker);
  });

  atualizarContador(lista.length);

  if (lista.length > 0) {
    const bounds = lista.map(l => [l.lat, l.lng]);
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 13 });
  }
}

// ===== INICIALIZAÇÃO E EVENTOS =====
preencherSelects();
renderizarMarcadores();

selectCidade.addEventListener('change', renderizarMarcadores);
selectNacionalidade.addEventListener('change', renderizarMarcadores);

// Abre/fecha o dropdown de categorias (CORRIGIDO)
if (triggerCategoria) {
  triggerCategoria.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    optionsCategoria.classList.toggle('show');
  });
}

// Fecha o dropdown se clicar fora
document.addEventListener('click', function(e) {
  const multiSelect = document.getElementById('multi-select-categoria');
  if (multiSelect && !multiSelect.contains(e.target)) {
    if (optionsCategoria) optionsCategoria.classList.remove('show');
  }
});

// Botão Limpar Filtros
document.getElementById('btn-limpar').addEventListener('click', () => {
  selectCidade.value = '';
  selectNacionalidade.value = '';
  
  categoriasSelecionadas = [];
  document.querySelectorAll('#options-categoria input[type="checkbox"]').forEach(cb => {
    cb.checked = false;
  });
  atualizarLabelCategoria();
  
  renderizarMarcadores();
});

// Fecha o dropdown de idiomas ao clicar fora
document.addEventListener('click', function(event) {
  const selector = document.getElementById('language-selector');
  if (selector && !selector.contains(event.target)) {
    const dropdown = document.getElementById('language-dropdown');
    if (dropdown) dropdown.classList.remove('show');
  }
});

// Carrega idioma salvo
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

// Ajuste fino do popup
map.on("popupopen", function (e) {
    const popup = e.popup;
    popup.options.autoPan = false;

    requestAnimationFrame(() => {
        const popupElement = popup.getElement();
        const mapElement = map.getContainer();
        if (!popupElement || !mapElement) return;

        const mapRect = mapElement.getBoundingClientRect();
        const popupRect = popupElement.getBoundingClientRect();

        let left = popupElement.offsetLeft;
        let top = popupElement.offsetTop;
        const margem = 10;

        if (popupRect.left < mapRect.left + margem) left += (mapRect.left + margem) - popupRect.left;
        if (popupRect.right > mapRect.right - margem) left -= popupRect.right - (mapRect.right - margem);
        if (popupRect.top < mapRect.top + margem) top += (mapRect.top + margem) - popupRect.top;
        if (popupRect.bottom > mapRect.bottom - margem) top -= popupRect.bottom - (mapRect.bottom - margem);

        popupElement.style.left = `${left}px`;
        popupElement.style.top = `${top}px`;
    });
});

console.log('🌍 Mapa OSC carregado com os dados de instituições.ods');
console.log('📚 Instituições carregadas:', localizacoes.length);
