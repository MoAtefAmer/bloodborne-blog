import { defineConfig } from 'vite';
import legacy from '@vitejs/plugin-legacy';
import { terser } from 'rollup-plugin-terser';

// Determine the environment mode
const isProduction = false

// Configure allowed origins based on the mode
const allowedOrigins = isProduction
  ? ['https://moatefamer.github.io/bloodborne-blog/']
  : '*';

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
  server: {
    cors: {
      origin: allowedOrigins,
      credentials: true,
      // Add other CORS options if needed
    },
  },
});