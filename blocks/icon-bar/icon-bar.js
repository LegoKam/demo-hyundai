export default async function decorate(block) {
  const rows = [...block.children];
  rows.forEach((row) => {
    const cell = row.querySelector(':scope > div');
    if (!cell) return;
    // Ensure icon and link are properly structured
    const icon = cell.querySelector('.icon');
    const link = cell.querySelector('a');
    if (icon && link) {
      // Wrap both in a clickable anchor structure
      const wrapper = document.createElement('a');
      wrapper.href = link.href;
      wrapper.className = 'icon-bar-item';
      wrapper.append(icon.cloneNode(true));
      const span = document.createElement('span');
      span.textContent = link.textContent;
      wrapper.append(span);
      cell.replaceChildren(wrapper);
    }
  });
}
