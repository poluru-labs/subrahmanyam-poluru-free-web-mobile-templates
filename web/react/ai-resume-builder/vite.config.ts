import path from 'node:path'
import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const rootDir = fileURLToPath(new URL('.', import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(rootDir, 'src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Auto-inject design tokens into CSS modules only.
        additionalData: (source: string, filename: string) => {
          if (filename.includes('.module.scss')) {
            return `@use "@/styles/abstracts" as *;\n${source}`
          }

          return source
        },
      },
    },
    modules: {
      localsConvention: 'camelCaseOnly',
    },
  },
  server: {
    port: 5173,
    open: false,
  },
})
