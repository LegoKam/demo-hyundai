export default async function decorate(block) {
  const rows = [...block.children];

  // Collect tabs and cards from rows
  // Each row: cell[0] = tab category, cell[1] = image, cell[2] = text content
  const tabMap = new Map();

  rows.forEach((row) => {
    const cells = [...row.children];
    const tabName = cells[0]?.textContent.trim();
    const imageCell = cells[1];
    const textCell = cells[2];

    if (!tabMap.has(tabName)) {
      tabMap.set(tabName, []);
    }

    // Parse text cell content
    const h3 = textCell?.querySelector('h3');
    const paragraphs = [...(textCell?.querySelectorAll('p') || [])];
    const ctaP = paragraphs.find((p) => p.querySelector('a'));
    const nonCtaParagraphs = paragraphs.filter((p) => !p.querySelector('a'));

    // Determine badge vs description
    let badge = null;
    let desc = null;
    if (nonCtaParagraphs.length >= 2) {
      badge = nonCtaParagraphs[0]?.textContent.trim();
      desc = nonCtaParagraphs[1]?.textContent.trim();
    } else if (nonCtaParagraphs.length === 1) {
      desc = nonCtaParagraphs[0]?.textContent.trim();
    }

    const cta = ctaP?.querySelector('a');
    const img = imageCell?.querySelector('img');

    tabMap.set(tabName, [...tabMap.get(tabName), {
      title: h3?.textContent.trim() || '',
      badge,
      desc,
      cta: cta ? { href: cta.href, text: cta.textContent.trim() } : null,
      img: img ? { src: img.src, alt: img.alt } : null,
    }]);
  });

  // Build new DOM
  block.textContent = '';

  // Tab navigation
  const tabsNav = document.createElement('div');
  tabsNav.className = 'tabs-nav';
  const tabNames = [...tabMap.keys()];

  tabNames.forEach((name, i) => {
    const btn = document.createElement('button');
    btn.textContent = name;
    btn.dataset.tab = name;
    if (i === 0) btn.classList.add('active');
    btn.addEventListener('click', () => {
      tabsNav.querySelectorAll('button').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      block.querySelectorAll('.tab-panel').forEach((p) => p.classList.remove('active'));
      block.querySelector(`.tab-panel[data-tab="${name}"]`).classList.add('active');
    });
    tabsNav.append(btn);
  });

  block.append(tabsNav);

  // Tab panels
  tabNames.forEach((name, i) => {
    const panel = document.createElement('div');
    panel.className = `tab-panel${i === 0 ? ' active' : ''}`;
    panel.dataset.tab = name;

    const track = document.createElement('div');
    track.className = 'cards-track';

    const cards = tabMap.get(name);
    cards.forEach((cardData) => {
      const card = document.createElement('div');
      card.className = 'card';

      // Card content (title, badge, description)
      const content = document.createElement('div');
      content.className = 'card-content';

      if (cardData.title) {
        const h3El = document.createElement('h3');
        h3El.textContent = cardData.title;
        content.append(h3El);
      }

      if (cardData.badge) {
        const badgeEl = document.createElement('span');
        badgeEl.className = 'card-badge';
        badgeEl.textContent = cardData.badge;
        content.append(badgeEl);
      }

      if (cardData.desc) {
        const descEl = document.createElement('p');
        descEl.className = 'card-desc';
        descEl.textContent = cardData.desc;
        content.append(descEl);
      }

      card.append(content);

      // Card image
      if (cardData.img) {
        const imageDiv = document.createElement('div');
        imageDiv.className = 'card-image';
        const imgEl = document.createElement('img');
        imgEl.src = cardData.img.src;
        imgEl.alt = cardData.img.alt;
        imgEl.loading = 'lazy';
        imageDiv.append(imgEl);
        card.append(imageDiv);
      }

      // Card CTA
      if (cardData.cta) {
        const ctaDiv = document.createElement('div');
        ctaDiv.className = 'card-cta';
        const a = document.createElement('a');
        a.href = cardData.cta.href;
        a.textContent = cardData.cta.text;
        a.className = 'button primary';
        ctaDiv.append(a);
        card.append(ctaDiv);
      }

      track.append(card);
    });

    panel.append(track);

    // Carousel navigation
    const nav = document.createElement('div');
    nav.className = 'carousel-nav';
    const prevBtn = document.createElement('button');
    prevBtn.textContent = '\u2039';
    prevBtn.setAttribute('aria-label', 'Previous');
    prevBtn.addEventListener('click', () => {
      track.scrollBy({ left: -694, behavior: 'smooth' });
    });
    const nextBtn = document.createElement('button');
    nextBtn.textContent = '\u203A';
    nextBtn.setAttribute('aria-label', 'Next');
    nextBtn.addEventListener('click', () => {
      track.scrollBy({ left: 694, behavior: 'smooth' });
    });
    nav.append(prevBtn, nextBtn);
    panel.append(nav);

    block.append(panel);
  });
}
