export default async function decorate(block) {
  const rows = [...block.children];

  rows.forEach((row) => {
    const cells = [...row.children];
    // cells[0] = heading (h3)
    // cells[1] = description/badge (p elements)
    // cells[2] = image (picture)
    // cells[3] = CTA link

    // Check if the description cell has a badge (first p with short text like "Offer")
    const descCell = cells[1];
    if (descCell) {
      const paragraphs = [...descCell.querySelectorAll('p')];
      if (paragraphs.length > 1) {
        const firstP = paragraphs[0];
        const text = firstP.textContent.trim();
        if (text.length < 20 && (text === 'Offer' || text === 'New')) {
          firstP.classList.add('badge');
        }
      }
    }
  });
}
