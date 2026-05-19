export default async function decorate(block) {
  const rows = [...block.children];
  rows.forEach((row) => {
    const cells = [...row.children];
    // Each row has: cell[0] = icon, cell[1] = link text
    // Merge them into a single flex item
    if (cells.length >= 2) {
      row.style.display = 'flex';
      row.style.alignItems = 'center';
    }
  });
}
