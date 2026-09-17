document.addEventListener('DOMContentLoaded', () => {

  const poemsContainer = document.getElementById('poems-container');
  const filterBtns     = document.querySelectorAll('.filter-btn');
  const modal          = document.getElementById('poem-modal');
  const closeModalBtn  = document.getElementById('close-modal');
  const modalTitle     = document.getElementById('modal-title');
  const modalCategory  = document.getElementById('modal-category');
  const modalBody      = document.getElementById('modal-body');
  const themeToggle    = document.getElementById('theme-toggle');
  const hamburger      = document.getElementById('hamburger');
  const mainNav        = document.getElementById('main-nav');

  /* ─── Tema escuro com localStorage ─── */
  function aplicarTema(escuro) {
    document.body.classList.toggle('dark-theme', escuro);
    themeToggle.textContent = escuro ? '☀️ Modo Claro' : '🌙 Modo Escuro';
  }

  const temaSalvo = localStorage.getItem('tema');
  if (temaSalvo === 'escuro') aplicarTema(true);

  themeToggle.addEventListener('click', () => {
    const estaEscuro = document.body.classList.contains('dark-theme');
    aplicarTema(!estaEscuro);
    localStorage.setItem('tema', !estaEscuro ? 'escuro' : 'claro');
  });

  /* ─── Menu hambúrguer ─── */
  hamburger.addEventListener('click', () => {
    const estaAberto = mainNav.classList.toggle('open');
    hamburger.classList.toggle('open', estaAberto);
    hamburger.setAttribute('aria-label', estaAberto ? 'Fechar menu' : 'Abrir menu');
  });

  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      hamburger.classList.remove('open');
    });
  });

  /* ─── Renderizar poemas ─── */
  function displayPoems(category = 'todos') {
    poemsContainer.innerHTML = '';

    const filteredPoems = category === 'todos'
      ? poemsData
      : poemsData.filter(poem => poem.category === category);

    if (filteredPoems.length === 0) {
      poemsContainer.innerHTML = '<p style="text-align:center;color:var(--text-muted);">Nenhum poema encontrado.</p>';
      return;
    }

    filteredPoems.forEach(poem => {
      const card = document.createElement('div');
      card.classList.add('poem-card');
      card.innerHTML = `
        <div>
          <span class="poem-category">${poem.category}</span>
          <h3>${poem.title}</h3>
          <p class="poem-excerpt">${poem.excerpt}</p>
        </div>
        <button class="read-btn" data-id="${poem.id}">Ler poema completo &rarr;</button>
      `;
      poemsContainer.appendChild(card);
    });

    poemsContainer.querySelectorAll('.read-btn').forEach(btn => {
      btn.addEventListener('click', () => openPoem(Number(btn.dataset.id)));
    });
  }

  /* ─── Filtros ─── */
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      displayPoems(btn.getAttribute('data-category'));
    });
  });

  /* ─── Modal: abrir ─── */
  function openPoem(id) {
    const poem = poemsData.find(p => p.id === id);
    if (!poem) return;
    modalTitle.textContent    = poem.title;
    modalCategory.textContent = poem.category;
    modalBody.textContent     = poem.content;
    modal.classList.add('active');
    closeModalBtn.focus();
  }

  /* ─── Modal: fechar ─── */
  function closePoem() {
    modal.classList.remove('active');
  }

  closeModalBtn.addEventListener('click', closePoem);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closePoem();
  });

  // Fechar com Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closePoem();
  });

  /* ─── Inicializar ─── */
  displayPoems();

});