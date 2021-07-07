import axios from 'axios'
const isDev = process.env.NODE_ENV !== 'production'
export default {
	server: {
    port: 5000,
    host: "localhost",
  },
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
 pwa: {
    manifest: {
      name: "Союз женщин Липецкой области",
      short_name: "Союз женщин Липецк",
      display: 'fullscreen',
      lang: "ru",
      theme_color: "#000000",
      description: "Союз женщин Липецкой области - официальное приложение",
    },
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [

  ],
  telemetry: false,

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/tinymce.js' },
    { src: '~/plugins/photoswipe.js', ssr: false },
    { src: '~/plugins/vue-lazyload', ssr: false },
    { src: '~/plugins/yashare', ssr: false },
    { src: '~/plugins/pwa-update.js',ssr: false }

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
    '@nuxtjs/date-fns',    
    '@aceforth/nuxt-optimized-images'
        
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
    '@nuxtjs/date-fns',
    '@nuxtjs/toast',
    'nuxt-imagemin'      
  ],
  toast: {
    position: 'top-center'    
},
  
  optimizedImages: {
    optimizeImages: true,
    webp: {
      preset: 'default',
      quality: 75,
    },
    optipng: {
      optimizationLevel: 3,
    },
    mozjpeg: {
      quality: 80,
    }   
  },
router: {
    prefetchLinks: false
  },
  optimization: {
    minimize: true
  }, 
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
  ,
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
        'https://zabbix.etalon48.com/api/blog/sitemap'
      )
      return data.map(page => `${page.path}${page.url}`)
    }
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: { proxy: true},
  proxy: {
	"/api/": "https://zabbix.etalon48.com"  
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel: {
      plugins: [
        ['@babel/plugin-proposal-private-methods', { loose: true }]
      ]
    }     
  }
}