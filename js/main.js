document.addEventListener('DOMContentLoaded', () => {

  /* ════════════════════════════════════════
     COMPARTILHADO — roda em todas as páginas
  ════════════════════════════════════════ */

  /* Sombra no header ao rolar */
  const siteHeader = document.getElementById('site-header');
  if (siteHeader) {
    window.addEventListener('scroll', () => {
      siteHeader.classList.toggle('scrolled', window.scrollY > 30);
    }, { passive: true });
  }

  /* Tema escuro com localStorage */
  const themeToggle = document.getElementById('theme-toggle');
  function aplicarTema(escuro) {
    document.body.classList.toggle('dark-theme', escuro);
    if (themeToggle) themeToggle.textContent = escuro ? '☀️ Modo Claro' : '🌙 Leitura Noturna';
  }
  const temaSalvo = localStorage.getItem('tema');
  if (temaSalvo === 'escuro') aplicarTema(true);
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const estaEscuro = document.body.classList.contains('dark-theme');
      aplicarTema(!estaEscuro);
      localStorage.setItem('tema', !estaEscuro ? 'escuro' : 'claro');
    });
  }

  /* Menu hambúrguer */
  const hamburger = document.getElementById('hamburger');
  const mainNav   = document.getElementById('main-nav');
  if (hamburger && mainNav) {
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
  }

  /* Intersection Observer — revelar elementos */
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
     INDEX.HTML — hero com digitação
  ════════════════════════════════════════ */
  const heroQuote = document.getElementById('hero-quote');
  if (heroQuote) {
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
  }


  /* ════════════════════════════════════════
     POEMAS.HTML — cards, modal, dropdown
  ════════════════════════════════════════ */
  const poemsContainer = document.getElementById('poems-container');
  if (poemsContainer && typeof poemsData !== 'undefined') {

    /* ── Dropdown de poemas ── */
    const dropdownMenu   = document.getElementById('dropdown-menu');
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const navDropdown    = document.querySelector('.nav-dropdown');
    const numeraisRomanos = ['I','II','III','IV','V','VI','VII','VIII','IX','X'];

    if (dropdownMenu && dropdownToggle) {
      const categorias = {};
      poemsData.forEach((poem, i) => {
        if (!categorias[poem.category]) categorias[poem.category] = [];
        categorias[poem.category].push({ ...poem, num: i });
      });

      dropdownMenu.innerHTML = '';
      Object.entries(categorias).forEach(([cat, poemas]) => {
        const sep = document.createElement('li');
        sep.className = 'dropdown-separator';
        sep.textContent = cat;
        dropdownMenu.appendChild(sep);
        poemas.forEach(poem => {
          const li = document.createElement('li');
          li.innerHTML = `<a href="#" data-id="${poem.id}">
            <span class="dropdown-num">${numeraisRomanos[poem.num] || poem.num + 1}</span>
            ${poem.title}
          </a>`;
          li.querySelector('a').addEventListener('click', (e) => {
            e.preventDefault();
            navDropdown.classList.remove('open');
            setTimeout(() => openPoem(poem.id), 200);
          });
          dropdownMenu.appendChild(li);
        });
      });

      dropdownToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        navDropdown.classList.toggle('open');
      });
      document.addEventListener('click', (e) => {
        if (navDropdown && !navDropdown.contains(e.target)) navDropdown.classList.remove('open');
      });
    }

    /* ── Renderizar poemas ── */
    function displayPoems(category = 'todos') {
      poemsContainer.style.opacity = '0';
      poemsContainer.style.transform = 'translateY(8px)';
      setTimeout(() => {
        poemsContainer.innerHTML = '';
        const filtered = category === 'todos'
          ? poemsData
          : poemsData.filter(p => p.category === category);

        if (filtered.length === 0) {
          poemsContainer.innerHTML = `<p style="grid-column:1/-1;text-align:center;color:var(--text-muted);font-family:var(--font-poem);font-style:italic;padding:2rem 0;">Nenhum poema encontrado.</p>`;
        } else {
          filtered.forEach(poem => {
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

    /* ── Filtros ── */
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        displayPoems(btn.getAttribute('data-category'));
      });
    });

    /* ── Modal ── */
    const modal          = document.getElementById('poem-modal');
    const closeModalBtn  = document.getElementById('close-modal');
    const modalTitle     = document.getElementById('modal-title');
    const modalCategory  = document.getElementById('modal-category');
    const modalBody      = document.getElementById('modal-body');
    const modalYear      = document.getElementById('modal-year');
    const modalGallery   = document.getElementById('modal-gallery');
    const modalGalleryGrid = document.getElementById('modal-gallery-grid');
    const modalAudio     = document.getElementById('modal-audio');
    const modalAudioEl   = document.getElementById('modal-audio-player');
    const printBtn       = document.getElementById('print-btn');

    function openPoem(id) {
      const poem = poemsData.find(p => p.id === id);
      if (!poem || !modal) return;

      modalTitle.textContent    = poem.title;
      modalCategory.textContent = poem.category;
      modalBody.textContent     = poem.content;

      /* Ano */
      if (poem.year) {
        modalYear.textContent = `Escrito em ${poem.year}`;
        modalYear.style.display = '';
      } else {
        modalYear.style.display = 'none';
      }

      /* Galeria de imagens */
      if (poem.images && poem.images.length > 0) {
        modalGalleryGrid.innerHTML = '';
        poem.images.forEach((src, i) => {
          const img = document.createElement('img');
          img.src = src;
          img.alt = `Foto ${i + 1} — ${poem.title}`;
          img.loading = 'lazy';
          if (i === 0) img.classList.add('selected');
          modalGalleryGrid.appendChild(img);
        });
        modalGallery.classList.add('visible');
      } else {
        modalGallery.classList.remove('visible');
      }

      /* Áudio */
      if (poem.audio) {
        modalAudioEl.src = poem.audio;
        modalAudio.classList.add('visible');
      } else {
        modalAudioEl.src = '';
        modalAudio.classList.remove('visible');
        modalAudioEl.pause?.();
      }

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      closeModalBtn.focus();
    }

    function closePoem() {
      if (!modal) return;
      modal.classList.remove('active');
      document.body.style.overflow = '';
      if (modalAudioEl && modalAudioEl.src) {
        modalAudioEl.pause();
        modalAudioEl.currentTime = 0;
      }
    }

    if (closeModalBtn) closeModalBtn.addEventListener('click', closePoem);
    if (modal) modal.addEventListener('click', (e) => { if (e.target === modal) closePoem(); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal?.classList.contains('active')) closePoem();
    });
    if (printBtn) printBtn.addEventListener('click', () => window.print());

    displayPoems();
  }


  /* ════════════════════════════════════════
     GALERIA.HTML — lightbox
  ════════════════════════════════════════ */
  const galleryGrid = document.getElementById('gallery-grid');
  const lightbox    = document.getElementById('lightbox');

  if (galleryGrid && lightbox) {
    const lightboxImg     = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose   = document.getElementById('lightbox-close');
    const lightboxPrev    = document.getElementById('lightbox-prev');
    const lightboxNext    = document.getElementById('lightbox-next');

    const items = Array.from(galleryGrid.querySelectorAll('.gallery-item'));
    let currentIndex = 0;

    function abrirLightbox(index) {
      const item = items[index];
      if (!item) return;
      const img     = item.querySelector('img');
      const caption = item.querySelector('.gallery-item-caption');
      if (!img || !img.src) return;

      currentIndex = index;
      lightboxImg.src        = img.src;
      lightboxImg.alt        = img.alt;
      lightboxCaption.textContent = caption ? caption.textContent : '';
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function fecharLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }

    function navegar(direcao) {
      const total = items.length;
      currentIndex = (currentIndex + direcao + total) % total;
      abrirLightbox(currentIndex);
    }

    items.forEach((item, i) => {
      item.addEventListener('click', () => abrirLightbox(i));
    });

    lightboxClose.addEventListener('click', fecharLightbox);
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) fecharLightbox(); });
    lightboxPrev.addEventListener('click', (e) => { e.stopPropagation(); navegar(-1); });
    lightboxNext.addEventListener('click', (e) => { e.stopPropagation(); navegar(1); });

    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape')      fecharLightbox();
      if (e.key === 'ArrowLeft')   navegar(-1);
      if (e.key === 'ArrowRight')  navegar(1);
    });
  }

});