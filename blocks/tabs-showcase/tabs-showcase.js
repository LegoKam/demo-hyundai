// eslint-disable-next-line import/no-unresolved
import { toClassName } from '../../scripts/aem.js';

function buildCards(panel) {
  const content = panel.querySelector(':scope > div');
  if (!content) return;

  const cards = [];
  let currentCard = null;

  [...content.children].forEach((el) => {
    if (el.tagName === 'HR') {
      if (currentCard) cards.push(currentCard);
      currentCard = null;
    } else {
      if (!currentCard) currentCard = document.createElement('div');
      currentCard.classList.add('card');
      currentCard.appendChild(el);
    }
  });
  if (currentCard) cards.push(currentCard);

  // Build carousel structure
  const carousel = document.createElement('div');
  carousel.className = 'carousel-track';

  cards.forEach((card) => {
    // Identify card elements
    const heading = card.querySelector('h3');
    const imgP = card.querySelector('p:has(picture)');
    const picture = card.querySelector('picture');
    const btnP = card.querySelector('p:has(a)');
    const link = card.querySelector('a');

    // Remaining paragraphs are description
    const allP = [...card.querySelectorAll('p')];
    const descP = allP.find((p) => p !== imgP && p !== btnP && !p.querySelector('picture') && !p.querySelector('a'));

    const cardEl = document.createElement('div');
    cardEl.className = 'showcase-card';

    const copyEl = document.createElement('div');
    copyEl.className = 'card-copy';
    if (heading) copyEl.appendChild(heading);
    if (descP) copyEl.appendChild(descP);
    cardEl.appendChild(copyEl);

    const imgEl = document.createElement('div');
    imgEl.className = 'card-image';
    if (picture) imgEl.appendChild(picture);
    else if (imgP) imgEl.appendChild(imgP);
    cardEl.appendChild(imgEl);

    const ctaEl = document.createElement('div');
    ctaEl.className = 'card-cta';
    if (link) {
      link.className = 'showcase-btn';
      ctaEl.appendChild(link);
    } else if (btnP) {
      const a = btnP.querySelector('a');
      if (a) {
        a.className = 'showcase-btn';
        ctaEl.appendChild(a);
      }
    }
    cardEl.appendChild(ctaEl);

    carousel.appendChild(cardEl);
  });

  // Navigation arrows
  const nav = document.createElement('div');
  nav.className = 'carousel-nav';

  const prevBtn = document.createElement('button');
  prevBtn.className = 'carousel-arrow carousel-prev';
  prevBtn.setAttribute('aria-label', 'Previous');
  prevBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>';

  const nextBtn = document.createElement('button');
  nextBtn.className = 'carousel-arrow carousel-next';
  nextBtn.setAttribute('aria-label', 'Next');
  nextBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 6 15 12 9 18"/></svg>';

  nav.appendChild(prevBtn);
  nav.appendChild(nextBtn);

  // Pagination indicators
  const pagination = document.createElement('div');
  pagination.className = 'carousel-pagination';
  cards.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = `carousel-dot${i === 0 ? ' active' : ''}`;
    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
    pagination.appendChild(dot);
  });

  // Replace panel content
  content.innerHTML = '';
  content.className = 'carousel-container';
  content.appendChild(carousel);
  content.appendChild(nav);
  content.appendChild(pagination);

  // Carousel logic
  let currentIndex = 0;
  const totalCards = cards.length;

  function updateCarousel() {
    const cardWidth = carousel.querySelector('.showcase-card')?.offsetWidth || 0;
    const gap = 16;
    const offset = currentIndex * (cardWidth + gap);
    carousel.style.transform = `translateX(-${offset}px)`;

    // Update pagination
    pagination.querySelectorAll('.carousel-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });

    // Update arrow states
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= totalCards - 1;
  }

  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex -= 1;
      updateCarousel();
    }
  });

  nextBtn.addEventListener('click', () => {
    if (currentIndex < totalCards - 1) {
      currentIndex += 1;
      updateCarousel();
    }
  });

  pagination.querySelectorAll('.carousel-dot').forEach((dot, i) => {
    dot.addEventListener('click', () => {
      currentIndex = i;
      updateCarousel();
    });
  });

  // Initialize
  updateCarousel();
}

export default async function decorate(block) {
  // build tablist
  const tablist = document.createElement('div');
  tablist.className = 'tabs-showcase-list';
  tablist.setAttribute('role', 'tablist');

  // decorate tabs and tabpanels
  const tabs = [...block.children].map((child) => child.firstElementChild);
  tabs.forEach((tab, i) => {
    const id = toClassName(tab.textContent);

    // decorate tabpanel
    const tabpanel = block.children[i];
    tabpanel.className = 'tabs-showcase-panel';
    tabpanel.id = `tabpanel-${id}`;
    tabpanel.setAttribute('aria-hidden', !!i);
    tabpanel.setAttribute('aria-labelledby', `tab-${id}`);
    tabpanel.setAttribute('role', 'tabpanel');

    // build tab button
    const button = document.createElement('button');
    button.className = 'tabs-showcase-tab';
    button.id = `tab-${id}`;

    button.innerHTML = tab.innerHTML;

    button.setAttribute('aria-controls', `tabpanel-${id}`);
    button.setAttribute('aria-selected', !i);
    button.setAttribute('role', 'tab');
    button.setAttribute('type', 'button');
    button.addEventListener('click', () => {
      block.querySelectorAll('[role=tabpanel]').forEach((panel) => {
        panel.setAttribute('aria-hidden', true);
      });
      tablist.querySelectorAll('button').forEach((btn) => {
        btn.setAttribute('aria-selected', false);
      });
      tabpanel.setAttribute('aria-hidden', false);
      button.setAttribute('aria-selected', true);
    });
    tablist.append(button);
    tab.remove();
  });

  block.prepend(tablist);

  // Build cards carousel for each panel
  block.querySelectorAll('.tabs-showcase-panel').forEach((panel) => {
    buildCards(panel);
  });
}
