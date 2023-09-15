import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [react()],
    build: {
        lib: {
            entry: 'src/main.tsx',
            name: 'GnarlyDatePicker',
            fileName: (format) => `gnarly-date-picker.${format}.js`
        },
        rollupOptions: {
            external: ['react', 'react-dom'],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                },
            },
        },
        minify: false
    }
})

