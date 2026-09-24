document.addEventListener('DOMContentLoaded', () => {

  /* ─── Elementos do DOM ─── */
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
  const siteHeader     = document.getElementById('site-header');
  const heroQuote      = document.getElementById('hero-quote');
  const printBtn       = document.getElementById('print-btn');
  const dropdownMenu   = document.getElementById('dropdown-menu');
  const dropdownToggle = document.querySelector('.dropdown-toggle');
  const navDropdown    = document.querySelector('.nav-dropdown');

  /* ════════════════════════════════════════
     DROPDOWN — preenchido com os poemas
     Separado por categoria com números romanos
  ════════════════════════════════════════ */
  const numeraisRomanos = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

  function construirDropdown() {
    // Agrupa poemas por categoria
    const categorias = {};
    poemsData.forEach((poem, index) => {
      if (!categorias[poem.category]) categorias[poem.category] = [];
      categorias[poem.category].push({ ...poem, num: index });
    });

    dropdownMenu.innerHTML = '';

    Object.entries(categorias).forEach(([categoria, poemas]) => {
      // Separador de categoria
      const sep = document.createElement('li');
      sep.className = 'dropdown-separator';
      sep.textContent = categoria;
      dropdownMenu.appendChild(sep);

      poemas.forEach((poem, i) => {
        const li = document.createElement('li');
        li.innerHTML = `
          <a href="#poemas" data-id="${poem.id}">
            <span class="dropdown-num">${numeraisRomanos[poem.num] || poem.num + 1}</span>
            ${poem.title}
          </a>
        `;
        // Clicar no dropdown abre o poema direto
        li.querySelector('a').addEventListener('click', (e) => {
          e.preventDefault();
          fecharDropdown();
          // Pequeno delay para o scroll terminar antes de abrir o modal
          setTimeout(() => openPoem(poem.id), 300);
        });
        dropdownMenu.appendChild(li);
      });
    });
  }

  function abrirDropdown() {
    navDropdown.classList.add('open');
    dropdownToggle.setAttribute('aria-expanded', 'true');
  }

  function fecharDropdown() {
    navDropdown.classList.remove('open');
    dropdownToggle.setAttribute('aria-expanded', 'false');
  }

  dropdownToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    navDropdown.classList.contains('open') ? fecharDropdown() : abrirDropdown();
  });

  // Fecha ao clicar fora
  document.addEventListener('click', (e) => {
    if (!navDropdown.contains(e.target)) fecharDropdown();
  });

  // Fecha com Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') fecharDropdown();
  });

  construirDropdown();


  /* ════════════════════════════════════════
     EFEITO DE DIGITAÇÃO no hero
  ════════════════════════════════════════ */
  const verso = '"Entre as veredas do Piauí e os horizontes do Maranhão,\no sertão canta na voz da alma."';

  function digitarVerso() {
    let i = 0;
    heroQuote.innerHTML = '<span class="typing-cursor"></span>';
    const cursor = heroQuote.querySelector('.typing-cursor');

    const intervalo = setInterval(() => {
      if (i < verso.length) {
        cursor.insertAdjacentText('beforebegin', verso[i]);
        i++;
      } else {
        clearInterval(intervalo);
        setTimeout(() => {
          cursor.style.animation = 'none';
          cursor.style.opacity = '0';
          cursor.style.transition = 'opacity 0.5s ease';
        }, 2000);
      }
    }, 36);
  }

  setTimeout(digitarVerso, 1000);


  /* ════════════════════════════════════════
     SOMBRA NO HEADER ao rolar
  ════════════════════════════════════════ */
  window.addEventListener('scroll', () => {
    siteHeader.classList.toggle('scrolled', window.scrollY > 30);
  }, { passive: true });


  /* ════════════════════════════════════════
     INTERSECTION OBSERVER — revelar elementos
  ════════════════════════════════════════ */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));


  /* ════════════════════════════════════════
     TEMA ESCURO com localStorage
  ════════════════════════════════════════ */
  function aplicarTema(escuro) {
    document.body.classList.toggle('dark-theme', escuro);
    themeToggle.textContent = escuro ? '☀️ Modo Claro' : '🌙 Leitura Noturna';
  }

  const temaSalvo = localStorage.getItem('tema');
  if (temaSalvo === 'escuro') aplicarTema(true);

  themeToggle.addEventListener('click', () => {
    const estaEscuro = document.body.classList.contains('dark-theme');
    aplicarTema(!estaEscuro);
    localStorage.setItem('tema', !estaEscuro ? 'escuro' : 'claro');
  });


  /* ════════════════════════════════════════
     MENU HAMBÚRGUER
  ════════════════════════════════════════ */
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


  /* ════════════════════════════════════════
     RENDERIZAR POEMAS com transição suave
  ════════════════════════════════════════ */
  function displayPoems(category = 'todos') {
    poemsContainer.style.opacity = '0';
    poemsContainer.style.transform = 'translateY(8px)';

    setTimeout(() => {
      poemsContainer.innerHTML = '';

      const filteredPoems = category === 'todos'
        ? poemsData
        : poemsData.filter(p => p.category === category);

      if (filteredPoems.length === 0) {
        poemsContainer.innerHTML = `
          <p style="
            grid-column:1/-1;
            text-align:center;
            color:var(--text-muted);
            font-family:var(--font-poem);
            font-style:italic;
            padding:2rem 0;
          ">Nenhum poema encontrado nesta categoria.</p>`;
      } else {
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

      poemsContainer.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      poemsContainer.style.opacity = '1';
      poemsContainer.style.transform = 'translateY(0)';

    }, 200);
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      displayPoems(btn.getAttribute('data-category'));
    });
  });


  /* ════════════════════════════════════════
     MODAL: abrir, fechar e PRINT
  ════════════════════════════════════════ */
  function openPoem(id) {
    const poem = poemsData.find(p => p.id === id);
    if (!poem) return;

    modalTitle.textContent    = poem.title;
    modalCategory.textContent = poem.category;
    modalBody.textContent     = poem.content;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    closeModalBtn.focus();
  }

  function closePoem() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  closeModalBtn.addEventListener('click', closePoem);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closePoem();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closePoem();
  });

  // Botão de print — abre o diálogo nativo do navegador
  // O CSS @media print cuida da marca d'água automaticamente
  printBtn.addEventListener('click', () => window.print());


  /* ─── Inicializar ─── */
  displayPoems();

});