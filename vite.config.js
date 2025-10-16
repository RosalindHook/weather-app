import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',      // change to relative paths - to match where GitLab Pages is serving files
  test: {
    globals: true,
    environment: 'happy-dom', // switch from jsdom
    setupFiles: './src/test/setup.js'
  }
})