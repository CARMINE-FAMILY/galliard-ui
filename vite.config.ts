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
    emptyOutDir: true,
    copyPublicDir: false,
    cssCodeSplit: true, // Para que todo el CSS vaya en un solo archivo
    sourcemap: false,
    cssMinify: true,
    lib: {
      // El punto de entrada principal de la librería
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        actions: resolve(__dirname, 'src/actions/index.ts')
      },
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
          'react/jsx-runtime': 'jsxRuntime'
        },
        // Esto asegura que los assets se manejen correctamente
        assetFileNames: (assetInfo) => {
          const ext = assetInfo.name?.split('.').pop();
          if (/png|jpe?g|svg|gif|tiff|bmp|ico|webp/i.test(ext || '')) {
            return 'assets/images/[name].[hash].[ext]';
          }
          if (ext === 'css') {
            return 'styles/[name].[ext]';
          }
          return 'assets/[name].[ext]';
        }
      },
    },
  }
});