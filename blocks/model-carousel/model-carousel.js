export default async function decorate(block) {
  const rows = [...block.children];

  // Create the scrollable track
  const track = document.createElement('div');
  track.className = 'carousel-track';

  rows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length < 2) return;

    const card = document.createElement('div');
    card.className = 'carousel-card';

    // Image cell
    const imageCell = cells[0];
    const imageDiv = document.createElement('div');
    imageDiv.className = 'card-image';
    imageDiv.append(...imageCell.childNodes);

    // Text cell
    const textCell = cells[1];
    const bodyDiv = document.createElement('div');
    bodyDiv.className = 'card-body';
    bodyDiv.append(...textCell.childNodes);

    card.append(imageDiv, bodyDiv);
    track.append(card);
  });

  // Clear block and build structure
  block.textContent = '';

  block.append(track);

  // Add navigation arrows
  const nav = document.createElement('div');
  nav.className = 'carousel-nav';

  const prevBtn = document.createElement('button');
  prevBtn.setAttribute('aria-label', 'Previous');
  prevBtn.textContent = '\u2039';

  const nextBtn = document.createElement('button');
  nextBtn.setAttribute('aria-label', 'Next');
  nextBtn.textContent = '\u203A';

  const scrollAmount = () => {
    const card = track.querySelector('.carousel-card');
    return card ? card.offsetWidth + 24 : 300;
  };

  prevBtn.addEventListener('click', () => {
    track.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
  });

  nextBtn.addEventListener('click', () => {
    track.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
  });

  nav.append(prevBtn, nextBtn);
  block.append(nav);
}
