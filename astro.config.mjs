import { defineConfig } from 'astro/config';

// Local dev and normal hosting use base "/".
// GitHub Pages' project URL (/Nthambo-church/) is handled after the build by scripts/add-base.mjs.
export default defineConfig({
  site: 'https://mbaka-cmd.github.io',
});