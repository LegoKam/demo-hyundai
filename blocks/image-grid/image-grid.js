export default async function decorate(block) {
  const rows = [...block.children];
  rows.forEach((row) => {
    const cells = [...row.children];
    // First cell = image, second cell = text overlay
    // Structure is already correct for CSS positioning
    if (cells[0]) cells[0].classList.add('image-grid-image');
    if (cells[1]) cells[1].classList.add('image-grid-content');
  });
}
