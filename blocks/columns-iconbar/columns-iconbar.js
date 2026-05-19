export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-iconbar-${cols.length}-cols`);

  // Each cell contains: icon span, <br>, text label, and a link
  // Restructure so the link wraps icon + label text
  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const icon = col.querySelector('.icon');
      const link = col.querySelector('a');

      if (icon && link) {
        // Get link text as label (use link text or extract from text nodes)
        const label = link.textContent.trim();

        // Clear the cell and rebuild with link wrapping icon + label
        col.innerHTML = '';
        const anchor = document.createElement('a');
        anchor.href = link.href;
        anchor.className = 'iconbar-item';
        anchor.appendChild(icon);
        const span = document.createElement('span');
        span.className = 'iconbar-label';
        span.textContent = label;
        anchor.appendChild(span);
        col.appendChild(anchor);
      }
    });
  });
}
