export default async function decorate(block) {
  const rows = [...block.children];
  rows.forEach((row) => {
    const cells = [...row.children];
    // First cell has the icon, second cell has the link text
    // Merge them into a single clickable column item
    if (cells.length >= 2) {
      const iconCell = cells[0];
      const textCell = cells[1];
      const link = textCell.querySelector('a');
      if (link && iconCell.querySelector('.icon')) {
        // Wrap entire row content in the link for better UX
        const icon = iconCell.querySelector('.icon');
        const wrapper = document.createElement('a');
        wrapper.href = link.href;
        wrapper.className = 'quick-links-item';
        wrapper.append(icon);
        const label = document.createElement('span');
        label.className = 'quick-links-label';
        label.textContent = link.textContent;
        wrapper.append(label);
        row.innerHTML = '';
        row.append(wrapper);
      }
    }
  });
}
