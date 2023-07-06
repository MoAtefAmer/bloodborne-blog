import { defineConfig } from 'vite';
import legacy from '@vitejs/plugin-legacy';
import { terser } from 'rollup-plugin-terser';



// Configure allowed origins based on the mode
const allowedOrigins = '*'

export default defineConfig({
  base: '/bloodborne-blog/',
  plugins: [
   
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