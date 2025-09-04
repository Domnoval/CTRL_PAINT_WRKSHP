import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
      '@workshop/shared': '../../../packages/shared/src',
    },
  },
  build: {
    outDir: '../../../dist/apps/web',
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate chunk for mystical 3D libraries
          mystical: ['three', '@react-three/fiber', '@react-three/drei'],
          // UI components chunk
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
        }
      }
    }
  },
  server: {
    port: 3000,
    host: true,
  }
})
