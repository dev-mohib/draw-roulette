import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@assets', replacement: path.resolve(__dirname, 'src/assets') },
      { find: '@components', replacement: path.resolve(__dirname, 'src/components') },
      { find: '@pages', replacement: path.resolve(__dirname, 'src/pages') },
      { find: '@state', replacement: path.resolve(__dirname, 'src/state') },
      { find: 'types', replacement: path.resolve(__dirname, 'src/types') }
    ],
  },
})
