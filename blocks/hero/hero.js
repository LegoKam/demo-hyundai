export default async function decorate(block) {
  const rows = [...block.children];
  rows.forEach((row) => {
    const cells = [...row.children];
    // First cell = background image, second cell = text overlay
    if (cells.length >= 2) {
      const imageCell = cells[0];
      const textCell = cells[1];
      imageCell.classList.add('hero-image');
      textCell.classList.add('hero-content');

      // Unwrap any <p> tags around the picture element (EDS adds them)
      const pWithPicture = imageCell.querySelector('p > picture');
      if (pWithPicture) {
        const p = pWithPicture.parentElement;
        p.replaceWith(pWithPicture);
      }
    }
  });
}
