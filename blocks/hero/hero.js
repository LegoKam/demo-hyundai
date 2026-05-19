export default async function decorate(block) {
  const rows = [...block.children];
  rows.forEach((row) => {
    const cells = [...row.children];

    if (cells.length >= 2) {
      // Two-cell: first = background image, second = text overlay
      const imageCell = cells[0];
      const textCell = cells[1];
      imageCell.classList.add('hero-image');
      textCell.classList.add('hero-content');

      // Unwrap <p> around picture
      const pWithPicture = imageCell.querySelector('p > picture');
      if (pWithPicture) {
        const p = pWithPicture.parentElement;
        p.replaceWith(pWithPicture);
      }
    } else if (cells.length === 1) {
      // Single-cell: picture + h1/text are together - split them
      const cell = cells[0];
      const picture = cell.querySelector('picture');
      const pWithPicture = cell.querySelector('p:has(picture), p > picture');

      if (picture) {
        // Create image cell
        const imageCell = document.createElement('div');
        imageCell.classList.add('hero-image');
        const picParent = picture.closest('p') || picture;
        imageCell.appendChild(picture);
        cell.insertBefore(imageCell, cell.firstChild);

        // Create content cell from remaining content
        const contentCell = document.createElement('div');
        contentCell.classList.add('hero-content');
        // Move all remaining children (h1, p, etc.) to content cell
        while (cell.children.length > 1) {
          contentCell.appendChild(cell.children[1]);
        }
        // Remove empty p that held picture
        if (pWithPicture && pWithPicture.childElementCount === 0 && !pWithPicture.textContent.trim()) {
          pWithPicture.remove();
        }
        cell.appendChild(contentCell);
      }
    }
  });
}
