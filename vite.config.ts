import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    react(),
    // Genera los archivos de tipos (.d.ts) automáticamente
    dts({
      rollupTypes: true,
      exclude: ['**/*.test.ts', '**/*.stories.tsx']
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ['legacy-js-api']
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    lib: {
      // El punto de entrada principal de la librería
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'Galliard UI',
      fileName: 'index',
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      // Quien use la librería ya debería tener React instalado.
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  }
});