import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import string from 'vite-plugin-string';



export default defineConfig({
  base: '/FlutterLearning/',
  plugins: [
    react(),
    string({
      include: ['**/*.md'],
    }),
  ],
})
