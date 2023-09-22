import * as path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'cjs'],
      fileName: (format) => {
        switch (format) {
          case 'es':
            return `index.es.js`
          case 'cjs':
            return `index.cjs`
        }
      }
    },
    sourcemap: true,
    rollupOptions: {
      external: ['@cosmjs/cosmwasm-stargate', 'idna-uts46-hx', 'js-sha3']
    }
  },
  exclude: ['./src/**/*.spec.ts']
})
