import { defineConfig } from 'vite';
import legacy from '@vitejs/plugin-legacy';
import { terser } from 'rollup-plugin-terser';

export default defineConfig({
  base: '/bloodborne-blog/',
  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
  ],
  build: {
    minify: 'terser',
    terserOptions: {
      // Terser options go here
    },
    // other build options...
  },
});