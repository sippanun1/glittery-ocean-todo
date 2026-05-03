/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/framer-motion')) return 'vendor-motion'
          if (id.includes('node_modules/@dnd-kit')) return 'vendor-dnd'
          if (
            id.includes('node_modules/chrono-node') ||
            id.includes('node_modules/date-fns') ||
            id.includes('node_modules/fuse.js') ||
            id.includes('node_modules/nanoid') ||
            id.includes('node_modules/clsx')
          )
            return 'vendor-utils'
          if (id.includes('node_modules/lucide-react')) return 'vendor-icons'
          if (id.includes('node_modules/zustand')) return 'vendor-state'
          if (id.includes('node_modules/react-dom') || id.includes('node_modules/react/'))
            return 'vendor-react'
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
  test: {
    environment: 'jsdom',
    globals: true,
  },
})
