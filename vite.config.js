import * as path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'Parser Parfait',
      formats: ['es', 'umd'],
      fileName: (format) => {
        return `index.${format}.js`
      }
    },
    sourcemap: true,
    rollupOptions: {
      external: ['zod'],
      output: {
        globals: {
          zod: 'zod'
        }
      }
    }
  },
  exclude: ['./src/**/*.spec.ts']
})
