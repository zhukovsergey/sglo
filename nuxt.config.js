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
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { name: 'yandex-verification', content: '954d9f596eeb3689' },
            { name: 'google-site-verification', content: '6P4hMHgjVq2ty3-o406MYGuThum7a8Hzg6HAVzFcDWk' },
			{ name: 'zen-verification', content: 'bBTbRNiaOOIDEPX5qI7iOJVeavVQk1VPHIuIBlZGuVoIl0NT8kcIxEpb8Q1Bc7Rc' },
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            { rel: 'stylesheet', type: 'text/css', href: '/assets/style.css' }
        ],
        script: [{
            src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js',
            type: "text/javascript"
        }]
    },
    pwa: {
        meta: {
            title: 'Союз женщин Липецкой области',
            author: 'Жуков Сергей',
        },
        manifest: {
            name: "Союз женщин Липецкой области",
            short_name: "Союз женщин Липецкой области",
            display: 'fullscreen',
            lang: "ru",
            theme_color: "#FFFFFF",
            background_color: "#FFC0CB",
            description: "Союз женщин Липецкой области - официальное приложение",
            icons: [{
                    "src": "assets/icons/icon-72x72.png",
                    "sizes": "72x72",
                    "type": "image/png",
                    "purpose": "maskable any"
                },
                {
                    "src": "assets/icons/icon-96x96.png",
                    "sizes": "96x96",
                    "type": "image/png",
                    "purpose": "maskable any"
                },
                {
                    "src": "assets/icons/icon-128x128.png",
                    "sizes": "128x128",
                    "type": "image/png",
                    "purpose": "maskable any"
                },
                {
                    "src": "assets/icons/icon-144x144.png",
                    "sizes": "144x144",
                    "type": "image/png",
                    "purpose": "maskable any"
                },
                {
                    "src": "assets/icons/icon-152x152.png",
                    "sizes": "152x152",
                    "type": "image/png",
                    "purpose": "maskable any"
                },
                {
                    "src": "assets/icons/icon-192x192.png",
                    "sizes": "192x192",
                    "type": "image/png",
                    "purpose": "maskable any"
                },
                {
                    "src": "assets/icons/icon-384x384.png",
                    "sizes": "384x384",
                    "type": "image/png",
                    "purpose": "maskable any"
                },
                {
                    "src": "assets/icons/icon-512x512.png",
                    "sizes": "512x512",
                    "type": "image/png",
                    "purpose": "maskable any"
                }
            ],
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
        { src: '~/plugins/pwa-update.js', ssr: false }

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
        '@aceforth/nuxt-optimized-images',
        '@nuxt/image'

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
        'nuxt-imagemin',
        '@nuxt/image',
        '@nuxtjs/robots',
        '@nuxtjs/yandex-metrika',
    ],
    yandexMetrika: {
    id: '88268210',
  },
    robots: [
    {
      UserAgent: '*',
      Disallow: ['/user', '/admin','/api','/*?','/*?page=','/news/','/test','*/observer','/page/','/login'],
    }
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
    },
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
            changefreq: 'daily',
            priority: 1,
            lastmod: new Date()
        },
        routes: async() => {
            const { data } = await axios.get(
                'https://xn--48-mlcdei8abd3a7g9b.xn--p1ai/api/blog/sitemap'
            )
            return data.map(page => `${page.path}${page.url}`)
        }
    },

    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: { proxy: true },
    proxy: {
        "/api/": "https://xn--48-mlcdei8abd3a7g9b.xn--p1ai"
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