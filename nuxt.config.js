export default {
  env: {
    THUMB_SRC: 'https://res.cloudinary.com/supportersplace/image/fetch/w_80,f_auto/https://static.supportersplace.se/product/',
    LIST_SRC: 'https://res.cloudinary.com/supportersplace/image/fetch/w_360,f_auto/',
    DETAILS_SRC: 'https://res.cloudinary.com/supportersplace/image/fetch/w_640,f_auto/http://static.supportersplace.se/product/',
    DETAILS_LARGE_SRC: 'https://res.cloudinary.com/supportersplace/image/fetch/w_1280,f_auto/http://static.supportersplace.se/product/',
    BRAND_SRC: 'https://res.cloudinary.com/supportersplace/image/fetch/w_200,f_auto/http://static.supportersplace.se/brand/',
    STORYBLOK_CATALOGUE: '/gameday',
    STORYBLOK_LABELS: 'gameday',
    SITE_URL: 'https://gameday.se',
    X_DEFAULT: 'https://gameday.se',
    LOGO_URL: '/sites/gameday/gameday-logo.svg',
    SITE_ID: 6,
    MEMBER_PRICES: false,
    ISO_LANG: 'sv',
    CURRENCY_CODE: 'SEK',
    STORYBLOK: 'rGRW1HEorfNfSoGS5CzoDwtt',
    ZENDESK: 'b2384b65-02c4-40fe-b25f-c195c554d089',
    DEFAULT_SORT_ORDER: 3, //0 for recommended and 3 for latest
    LANG_HREF: {
      'sv-se':'https://gameday.se'
    }

  },
  /*
   ** Headers of the page
   */
  head: {
    title: 'Gameday',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Gameday'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: false ,
  /*
   ** Global CSS
   */
  css: [
    // SCSS file in the project
    '~/assets/scss/site.scss',
    '~/assets/pe-laundry-icons/css/pe-laundry-icons.css'
    //'uikit/dist/css/uikit.css'
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    {src: '~/plugins/vue-intersection-observer.js', ssr: false},
    {src: '~/plugins/jsonld.js'},
    {src: '~/plugins/lottie-client.js', ssr:false},
    {src: '~/plugins/filters.js', ssr:false},
    {src: '~/plugins/gameday.js'},
    {src: '~/plugins/vue-placeholders.js'},
    {src: "~/plugins/uikit.js", ssr: false },
    {src: '~/plugins/axios'},
    {src: '~/plugins/get'},
  ],
  render: {
    http2: {
      push: true
      //,pushAssets: (req, res, publicPath, preloadFiles) => console.log(preloadFiles)
    }
  },
  router: {
    trailingSlash: false,
    extendRoutes (routes, resolve) {
      routes.push({
        name: 'home',
        path: '/home',
        component: resolve(__dirname, 'pages/index.vue')
      })
    }
  },
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    //'@nuxtjs/eslint-module'
    '@nuxtjs/gtm', 
    '@nuxtjs/pwa',
    ["@storyblok/nuxt-2/module", { accessToken: "rGRW1HEorfNfSoGS5CzoDwtt" }],
  ],
  gtm: { id: 'GTM-WDJLNSJ' },
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/redirect-module',
    // Doc: https://axios.nuxtjs.org/usage
    ['@dansmaculotte/nuxt-zendesk',
    { 
      key: 'b2384b65-02c4-40fe-b25f-c195c554d089',
      disabled: true,
      hideOnLoad: true,
      settings: {
        webWidget: {
          color: {
            theme: '#fa6900',
            launcherText: '#ffffff',
          },
          chat: {
            connectOnPageLoad: false
          }
        }
      }
    }],
    ['@nuxtjs/i18n',
      {
        baseUrl: 'https://gameday.se',
        defaultLocale: 'sv-se',
        strategy: 'no_prefix',
        locales: [
          {
            code: 'sv-se',
            iso: 'sv'
          }
        ],
        seo:false
      }
    ],
    '@nuxtjs/axios',
    'cookie-universal-nuxt',
    'nuxt-webfontloader',
    ['@nuxtjs/style-resources']
  ],
  redirect: [
    {
        from: '^((?!.*webapi).*\/[^\\?]*(?<=\\w))([\/])(\\?.*)?$',
        to: '$1$3',
        statusCode: 301
    },
  ],
  styleResources: {
    scss: [
    './assets/scss/vars.scss',
    './assets/scss/mixins.scss'
    ]
  },
  pwa: {
    meta:{
      name: 'Gameday',
      description: 'Gameday',
      lang: 'sv',
      theme_color: '#ffffff'
    },
    manifest: {
      name: 'Gameday',
      short_name: 'Gameday',
      lang: 'sv',
      description: 'Gameday',
    },
    icon: {
      fileName: 'icon_gameday.png'
    },
    workbox: false
  },
  webfontloader: {
    google: {
      families: ['Lato:300,400,900'] //Loads Lato
    }
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    proxy: true
  },
  proxy: {
    '/webapi': {
      target: process.env.NODE_ENV !== 'production'?'https://api.gameday.se':'https://api.gameday.se'
    }
  },
  /*
   ** Build configuration
   */
  build: {
    //analyze: true, //if we wish to do npm run build --analyze
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
    babel:{
      plugins: [
        ['@babel/plugin-proposal-private-methods', { loose: true }]
      ]
    }
  }
}
