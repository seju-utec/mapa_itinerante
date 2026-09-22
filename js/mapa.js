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
  // Função auxiliar para criar as tags
  const criarTags = (lista) => {
    if (!Array.isArray(lista) || lista.length === 0) return '-';
    return lista.map(item => `<span class="tag">${escapar(item)}</span>`).join(' ');
  };

  // Monta a coluna da ESQUERDA (Informações principais)
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

  // Monta a coluna da DIREITA (Contatos)
  let colunaDireita = ``;
  
  if (texto(loc.email)) {
    colunaDireita += `<div class="popup-contato-item"><b>E-mail:</b><br>${escapar(loc.email)}</div>`;
  }
  if (texto(loc.telefone)) {
    colunaDireita += `<div class="popup-contato-item"><b>Telefone:</b><br>${escapar(loc.telefone)}</div>`;
  }
  if (texto(loc.redes_sociais)) {
    colunaDireita += `<div class="popup-contato-item"><b>Redes sociais:</b><br>${escapar(loc.redes_sociais)}</div>`;
  }
  if (texto(loc.site)) {
    const site = texto(loc.site);
    const href = /^https?:\/\//i.test(site) ? site : `https://${site}`;
    colunaDireita += `<div class="popup-contato-item"><b>Site:</b><br><a href="${escapar(href)}" target="_blank" rel="noopener noreferrer">${escapar(site)}</a></div>`;
  }

  // Se não houver nenhum contato, mostra um traço
  if (colunaDireita === '') {
    colunaDireita = `<div class="popup-contato-item">-</div>`;
  }

  // Monta o HTML final
  let html = `
    <div class="popup-organizacao">
      <div class="popup-titulo">
        ${escapar(loc.org)}
      </div>
      <div class="popup-endereco">
        <b>${escapar(loc.city)}</b> ${loc.endereco ? '— ' + escapar(loc.endereco) : ''}
      </div>

      <!-- AQUI É A MÁGICA DAS DUAS COLUNAS -->
      <div class="popup-conteudo">
        <div class="popup-coluna-esquerda">
          ${colunaEsquerda}
        </div>
        <div class="popup-coluna-direita">
          ${colunaDireita}
        </div>
      </div>

      <!-- O RESTANTE (Grid, Campos extras, etc.) FICA ABAIXO DAS COLUNAS -->
      <div class="popup-grid">
        <div class="popup-card">
          <b>Tipo de entidade</b><br>
          ${escapar(loc.tipo_entidade) || '-'}
        </div>
        <div class="popup-card">
          <b>Forma de acesso</b><br>
          ${escapar(loc.forma_acesso) || '-'}
        </div>
        <div class="popup-card">
          <b>Horário</b><br>
          ${escapar(loc.horarios) || '-'}
        </div>
        <div class="popup-card">
          <b>Fundação</b><br>
          ${escapar(loc.fundacao) || '-'}
        </div>
      </div>
  `;

  // Adiciona os outros campos extras que você tinha no código original
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
      // No computador, o popup pode ser largo e o mapa não é reposicionado
      // automaticamente quando as informações são abertas.
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


map.on("popupopen", function (e) {
    const popup = e.popup;

    // Impede o Leaflet de mover o mapa
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

        // Limite esquerdo
        if (popupRect.left < mapRect.left + margem) {
            left += (mapRect.left + margem) - popupRect.left;
        }

        // Limite direito
        if (popupRect.right > mapRect.right - margem) {
            left -= popupRect.right - (mapRect.right - margem);
        }

        // Limite superior
        if (popupRect.top < mapRect.top + margem) {
            top += (mapRect.top + margem) - popupRect.top;
        }

        // Limite inferior
        if (popupRect.bottom > mapRect.bottom - margem) {
            top -= popupRect.bottom - (mapRect.bottom - margem);
        }

        popupElement.style.left = `${left}px`;
        popupElement.style.top = `${top}px`;
    });
});

console.log('🌍 Mapa OSC carregado com os dados de instituições.ods');
console.log('📚 Instituições carregadas:', localizacoes.length);
