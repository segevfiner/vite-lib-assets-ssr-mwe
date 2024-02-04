import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import nodeExternals from 'rollup-plugin-node-externals';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import libAssets from '@laynezh/vite-plugin-lib-assets';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    { ...nodeExternals({ exclude: /\.css|\.json$/ }), enforce: 'pre' },
    vue(),
    dts({
      tsconfigPath: 'tsconfig.app.json',
      entryRoot: 'src',
      insertTypesEntry: true,
    }),
    libAssets({ name: '[name].[contenthash:8].[ext]' }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    lib: {
      entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      formats: ['cjs', 'es'],
    },
  },
});
