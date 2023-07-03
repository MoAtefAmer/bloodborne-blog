import { defineConfig } from 'vite';
import legacy from '@vitejs/plugin-legacy';
import { minify } from 'terser';

export default defineConfig({
  base: '/bloodborne-blog/',
  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
  ],
  build: {
    minify: 'terser',
    // other build options...
  },
});
