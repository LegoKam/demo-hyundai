export default async function decorate(block) {
  const rows = [...block.children];
  rows.forEach((row) => {
    const cells = [...row.children];
    // First cell = image (background), second cell = text content
    if (cells.length >= 2) {
      cells[0].classList.add('promo-banner-image');
      cells[1].classList.add('promo-banner-content');
    }
  });
}
