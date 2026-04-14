import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      include: ['crypto', 'buffer', 'stream', 'util'],
      globals: {
        Buffer: true,
      },
    }),
  ],
  build: {
    // SEO: Generate clean HTML for crawlers
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
    // Enable CSS code splitting for faster FCP
    cssCodeSplit: true,
    // Inline small assets for reduced HTTP requests
    assetsInlineLimit: 4096,
  },
})
