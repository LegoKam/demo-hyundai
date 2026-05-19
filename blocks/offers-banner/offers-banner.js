export default async function decorate(block) {
  const rows = [...block.children];
  if (rows.length === 0) return;

  const row = rows[0];
  const cells = [...row.children];

  // First cell: image (background)
  // Second cell: text content overlay
  // Structure is already correct from plain.html
  // Just ensure the image cell and text cell have appropriate roles
  if (cells.length >= 2) {
    cells[0].classList.add('offers-banner-image');
    cells[1].classList.add('offers-banner-content');
  }
}
