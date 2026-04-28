import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name:             'ElectIQ',
        short_name:       'ElectIQ',
        description:      'Indian Elections Guide — Quiz & AI Expert',
        theme_color:      '#E8650A',
        background_color: '#F7F4EF',
        display:          'standalone',
        orientation:      'portrait',
        start_url:        '/',
        icons: [
          {
            src:   '/icon-192.png',
            sizes: '192x192',
            type:  'image/png',
          },
          {
            src:   '/icon-512.png',
            sizes: '512x512',
            type:  'image/png',
          },
        ],
      },
      workbox: {
        globPatterns: [
          '**/*.{js,css,html,ico,png,svg}'
        ],
        runtimeCaching: [{
          urlPattern: /^https:\/\/fonts\.googleapis\.com/,
          handler: 'CacheFirst',
        }],
      },
    }),
  ],
  build: {
    sourcemap: false,
    chunkSizeWarningLimit: 800,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/tests/setup.js'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.{js,jsx}'],
      exclude: [
        'src/tests/**',
        'src/main.jsx',
        'src/data/**',
      ],
    },
  },
})
