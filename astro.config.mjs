import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://www.timelessgrass.com',
  trailingSlash: 'always',
  build: { format: 'directory' },
  /* The harness assigns the dev port via PORT; astro dev otherwise pins 4321 and collides
     with whatever already holds it. Falls back to Astro's own default when PORT is unset. */
  server: { port: Number(process.env.PORT) || 4321 },
});
