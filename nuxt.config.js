import axios from 'axios'
const isDev = process.env.NODE_ENV !== 'production'
export default {
  loading: {
    color: 'blue',
    height: '2px'
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    htmlAttrs: {
      lang: 'ru'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }

    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', type: 'text/css', href: '/assets/style.css' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [

  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/tinymce.js' },
    { src: '~/plugins/photoswipe.js', ssr: false }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,
  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify',
    '@nuxtjs/svg',
    '@nuxtjs/pwa',
    '@nuxtjs/date-fns'
  ],
  serverMiddleware: [
    '~/api/index.js'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/component-cache',
    '@nuxtjs/auth',
    '@nuxtjs/sitemap',
    '@nuxtjs/date-fns'
  ],
  router: {
    prefetchLinks: false
  },
  optimization: {
    minimize: !isDev
  },
  ...(!isDev && {
    html: {
      minify: {
        collapseBooleanAttributes: true,
        decodeEntities: true,
        minifyCSS: true,
        minifyJS: true,
        processConditionalComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        trimCustomFragments: true,
        useShortDoctype: true
      }
    }
  }),
  optimization: {
    minimize: !isDev
  },
  splitChunks: {
    layouts: true,
    pages: true,
    commons: true
  },
  dateFns: {
    locales: ['ru'],
    defaultLocale: 'ru-RU'
  },
  sitemap: {
    hostname: 'https://союзженщин48.рф',
    exclude: [
      '/blog/new',
      '/service/new'
    ],
    defaults: {
      changefreq: 'weekly',
      priority: 1,
      lastmod: new Date()
    },
    routes: async () => {
      const { data } = await axios.get(
        'http://localhost:3000/api/blog/sitemap'
      )
      return data.map(page => `${page.path}${page.url}`)
    }
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel: {
      plugins: [
        ['@babel/plugin-proposal-private-methods', { loose: true }]
      ]
    }
  }
}
