export default async function decorate(block) {
  const rows = [...block.children];
  rows.forEach((row) => {
    const cells = [...row.children];
    // First cell is image, second is text content
    if (cells.length >= 2) {
      cells[0].classList.add('models-carousel-image');
      cells[1].classList.add('models-carousel-info');
    }
  });
}
