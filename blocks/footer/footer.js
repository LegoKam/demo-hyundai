import { loadSections, decorateSections, decorateBlocks } from '../../scripts/aem.js';
import { decorateMain } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const footerMeta = document.querySelector('meta[name="footer"]');
  const footerPath = footerMeta ? footerMeta.content : '/drafts/footer';
  const resp = await fetch(`${footerPath}.plain.html`);
  if (!resp.ok) return;

  const html = await resp.text();
  const fragment = document.createElement('div');
  fragment.innerHTML = html;

  decorateMain(fragment);
  await loadSections(fragment);

  block.textContent = '';
  while (fragment.firstElementChild) {
    block.append(fragment.firstElementChild);
  }
}
