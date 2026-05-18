export default async function decorate(block) {
  // Each row contains a single cell with a link
  // The structure is already correct for the CSS layout
  const rows = [...block.children];
  rows.forEach((row) => {
    row.setAttribute('role', 'listitem');
  });
  block.setAttribute('role', 'list');
}
