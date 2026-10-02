function renderizarListaOrganizacoes(lista) {
  const resultados = document.getElementById('lista-resultados');
  document.getElementById('lista-contador').textContent = lista.length;
  resultados.replaceChildren();

  if (lista.length === 0) {
    const vazio = document.createElement('p');
    vazio.className = 'lista-vazia';
    vazio.textContent = 'Nenhuma organização encontrada com os filtros selecionados.';
    resultados.appendChild(vazio);
    return;
  }

  const fragmento = document.createDocumentFragment();
  const ordenadas = [...lista].sort((a, b) =>
    texto(a.org).localeCompare(texto(b.org), 'pt-BR')
  );
  ordenadas.forEach(loc => {
    const item = document.createElement('details');
    item.className = 'lista-item';
    const resumo = document.createElement('summary');
    const titulo = document.createElement('span');
    titulo.className = 'lista-item-titulo';
    titulo.textContent = texto(loc.org);
    const cidade = document.createElement('span');
    cidade.className = 'lista-item-cidade';
    cidade.textContent = texto(loc.city);
    const categorias = document.createElement('span');
    categorias.className = 'lista-item-categorias';
    categorias.textContent = Array.isArray(loc.categorias) ? loc.categorias.join(' · ') : '';
    resumo.append(titulo, cidade, categorias);

    const ficha = document.createElement('div');
    ficha.className = 'lista-item-ficha';
    ficha.innerHTML = montarPopup(loc);
    item.append(resumo, ficha);
    fragmento.appendChild(item);
  });
  resultados.appendChild(fragmento);
}
