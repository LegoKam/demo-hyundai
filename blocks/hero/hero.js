export default async function decorate(block) {
  const rows = [...block.children];
  if (rows.length === 0) return;

  const row = rows[0];
  const cells = [...row.children];

  // First cell: image (background), Second cell: text content
  if (cells.length >= 2) {
    const imageCell = cells[0];
    const textCell = cells[1];

    imageCell.classList.add('hero-image');
    textCell.classList.add('hero-content');
  }
}
