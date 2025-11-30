// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  
  modules: [
    '@vite-pwa/nuxt',
    '@nuxtjs/google-fonts'
  ],

  // Google Fonts
  googleFonts: {
    families: {
      Poppins: [400, 600, 700]
    }
  },

  // PWA Configuration
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Kelimo - Kelime Tahmin Oyunu',
      short_name: 'Kelimo',
      description: 'Günlük kelime tahmin oyunu - Her harften bir kelime!',
      theme_color: '#6366f1',
      background_color: '#0f172a',
      display: 'standalone',
      orientation: 'portrait',
      icons: [
        {
          src: '/icon-192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/icon-512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    },
    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html,png,svg,ico,woff2}']
    }
  },

  // SEO & Open Graph
  app: {
    head: {
      title: 'Kelimo - Günlük Kelime Tahmin Oyunu',
      htmlAttrs: { lang: 'tr' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no' },
        { name: 'description', content: 'Parolla benzeri günlük kelime tahmin oyunu. Her harften bir kelime, 5 dakika süre!' },
        { name: 'theme-color', content: '#6366f1' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        // Open Graph
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'Kelimo - Günlük Kelime Tahmin Oyunu' },
        { property: 'og:description', content: 'Parolla benzeri günlük kelime tahmin oyunu. Her harften bir kelime!' },
        { property: 'og:image', content: '/og-image.png' },
        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Kelimo - Günlük Kelime Tahmin Oyunu' },
        { name: 'twitter:description', content: 'Parolla benzeri günlük kelime tahmin oyunu!' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', href: '/icon-192.png' }
      ]
    }
  },

  css: ['~/assets/css/main.css']
})
