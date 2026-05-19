export default async function decorate(block) {
  const rows = [...block.children];
  rows.forEach((row) => {
    const cells = [...row.children];
    // First cell is image, second is text content — no restructuring needed
    if (cells[0]) cells[0].classList.add('services-cards-image');
    if (cells[1]) cells[1].classList.add('services-cards-content');
  });
}
