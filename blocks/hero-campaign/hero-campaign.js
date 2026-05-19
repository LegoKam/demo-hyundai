export default function decorate(block) {
  // Check if the first row contains a picture element for background image
  const firstRowPicture = block.querySelector(':scope > div:first-child picture');
  if (!firstRowPicture) {
    block.classList.add('no-image');
  }

  // Decorate CTA links as buttons
  block.querySelectorAll(':scope > div:last-child a').forEach((link) => {
    link.classList.add('button');
    const wrapper = link.closest('p');
    if (wrapper) {
      wrapper.classList.add('button-container');
    }
  });
}
