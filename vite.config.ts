import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages: репозиторий публикуется по пути /cv-cbt/
  base: '/cv-cbt/',
})
