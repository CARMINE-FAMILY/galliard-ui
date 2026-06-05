import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { libInjectCss } from 'vite-plugin-lib-inject-css';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

function dedupeFontFacePlugin(): Plugin {
  return {
    name: 'dedupe-font-face-plugin',
    apply: 'build',
    generateBundle(_, bundle) {
      for (const item of Object.values(bundle)) {
        if (item.type !== 'asset') continue;
        if (!item.fileName.endsWith('.css')) continue;
        if (typeof item.source !== 'string') continue;

        const seen = new Set<string>();

        item.source = item.source.replace(/@font-face\s*\{[^}]*\}/g, (block) => {
          const normalized = block.replace(/\s+/g, ' ').trim();

          if (seen.has(normalized)) {
            return '';
          }

          seen.add(normalized);
          return block;
        });
      }
    }
  };
}

export default defineConfig({
  plugins: [
    react(),
    dedupeFontFacePlugin(),
    // Incluye el css y lo inyecta al hacer el build
    libInjectCss(),
    // Genera los archivos de tipos (.d.ts) automáticamente
    dts({
      rollupTypes: false,
      insertTypesEntry: true,
      exclude: ['**/*.test.ts', '**/*.stories.tsx', '**/*.test.tsx']
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
      '@': resolve(__dirname, './src'),
    },
  },
  build: {
    lib: {
      // El punto de entrada principal de la librería
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'Galliard UI',
      fileName: 'galliard-ui',
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