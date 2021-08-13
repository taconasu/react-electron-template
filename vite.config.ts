import reactRefresh from '@vitejs/plugin-react-refresh'

/**
 * https://vitejs.dev/config/
 * @type {import('vite').InlineConfig}
 */
export default {
  root: 'src/renderer',
  build: {
    outDir: 'dist',
    minify: 'esbuild',
  },
  plugins: [reactRefresh()]
}
