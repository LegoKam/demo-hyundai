export default async function decorate(block) {
  // Each row is a card with two cells: image cell and text cell
  // The structure is already correct for CSS to handle layout
  const rows = [...block.children];
  rows.forEach((row) => {
    row.classList.add('services-card');
  });
}
