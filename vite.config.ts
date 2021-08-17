import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import path from 'path'
import dotenv from 'dotenv'

/**
 * https://vitejs.dev/config/
 */
export default defineConfig({
  root: path.resolve(process.cwd(), 'src/renderer'),
  base: '',
  build: {
    outDir: path.resolve(process.cwd(), 'dist'),
    minify: 'esbuild',
    emptyOutDir: true,
  },
  plugins: [reactRefresh()],
  define: {
    ...dotenv.config().parsed
  }
})
