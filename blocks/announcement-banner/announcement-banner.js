export default async function decorate(block) {
  // Add close button
  const closeBtn = document.createElement('button');
  closeBtn.className = 'close-btn';
  closeBtn.setAttribute('aria-label', 'Close announcement');
  closeBtn.textContent = '✕';
  closeBtn.addEventListener('click', () => {
    const wrapper = block.closest('.announcement-banner-wrapper');
    if (wrapper) {
      wrapper.style.display = 'none';
    } else {
      block.style.display = 'none';
    }
  });
  block.appendChild(closeBtn);
}
