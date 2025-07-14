import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    build: {
        outDir: 'dist', // Ensure this is set to 'dist'
        emptyOutDir: true,
        sourcemap: true,
        rollupOptions: {
            output: {
                manualChunks: undefined
            }
        }
    },
    server: {
        port: 5173
    },
    preview: {
        port: 5173
    },
    publicDir: 'public'
})
