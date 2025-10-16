import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/weather-app/',      // add for deployment on GitLab pages
  test: {
    globals: true,
    environment: 'happy-dom', // switch from jsdom
    setupFiles: './src/test/setup.js'
  },
})

