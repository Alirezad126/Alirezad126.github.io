import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * GitHub Pages serves static files only — it has no rewrite rules, so a deep
 * link like /experience would 404 on a hard refresh. Pages serves 404.html for
 * any unmatched path, so shipping a copy of index.html under that name lets the
 * router take over and render the right route. Harmless on Vercel, which
 * rewrites before ever reaching it.
 */
function spaFallback() {
  return {
    name: 'spa-fallback-404',
    closeBundle() {
      const out = resolve(__dirname, 'dist')
      copyFileSync(resolve(out, 'index.html'), resolve(out, '404.html'))
    }
  }
}

export default defineConfig({
  plugins: [react(), spaFallback()],
  server: {
    port: 5173
  }
})
