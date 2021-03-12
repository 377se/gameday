export default {
  env: {
    THUMB_SRC: 'https://res.cloudinary.com/supportersplace/image/fetch/w_80,f_auto/https://static.supportersplace.se/product/',
    LIST_SRC: 'https://res.cloudinary.com/supportersplace/image/fetch/w_360,f_auto/',
    DETAILS_SRC: 'https://res.cloudinary.com/supportersplace/image/fetch/w_640,f_auto/http://static.supportersplace.se/product/',
    BRAND_SRC: 'https://res.cloudinary.com/supportersplace/image/fetch/w_200,f_auto/http://static.supportersplace.se/brand/',
    STORYBLOK_CATALOGUE: '/supporterprylar',
    STORYBLOK_LABELS: 'supporterprylar',
    SITE_URL: 'https://www.supporterprylar.se',
    LOGO_URL: '/sites/supporterprylar/supporterprylar-rectangle.png',
    SITE_ID: 7,
    MEMBER_PRICES: false,
    ISO_LANG: 'sv',
    CURRENCY_CODE: 'SEK',
    STORYBLOK: 'rGRW1HEorfNfSoGS5CzoDwtt',
    ZENDESK: 'fd07ec75-ec92-4ea1-ad6c-49e883112e6c'

  },
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
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
    '~/assets/scss/site.supporterprylar.scss',
    '~/assets/pe-laundry-icons/css/pe-laundry-icons.css'
    //'uikit/dist/css/uikit.css'
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    {src: '~/plugins/jsonld.js'},
    {src: '~/plugins/lottie-client.js', ssr:false},
    {src: '~/plugins/filters.js', ssr:false},
    {src: '~/plugins/supporterprylar.js'},
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
    trailingSlash: true,
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
  ],
  gtm: { id: 'GTM-PZ4NQSW' },
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/redirect-module',
    // Doc: https://axios.nuxtjs.org/usage
    ['@dansmaculotte/nuxt-zendesk',
    { 
      key: 'fd07ec75-ec92-4ea1-ad6c-49e883112e6c',
      disabled: true,
      hideOnLoad: true,
      settings: {
        webWidget: {
          color: {
            theme: '#ed8b00',
            launcherText: '#ffffff',
          },
          chat: {
            connectOnPageLoad: false
          }
        }
      }
    }],
    ['nuxt-i18n',
      {
        baseUrl: 'https://www.supporterprylar.se',
        defaultLocale: 'sv-se',
        strategy: 'prefix_except_default',
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
    ['storyblok-nuxt', { accessToken: 'rGRW1HEorfNfSoGS5CzoDwtt', cacheProvider: 'memory' }],
    ['@nuxtjs/style-resources']    
  ],
  redirect: [
    {
        from: '^((?!.*webapi).*\/[^\\?]*[^\\/])(\\?.*)?$',
        to: '$1/$2',
        statusCode: 301
    },
  ],
  styleResources: {
    scss: [
    './assets/scss/vars.supporterprylar.scss',
    './assets/scss/mixins.supporterprylar.scss'
    ]
  },
  pwa: {
    meta:{
      name: 'SupporterPrylar',
      description: 'SupporterPrylar.se',
      lang: 'sv',
      theme_color: '#ffffff'
    },
    manifest: {
      name: 'SupporterPrylar',
      short_name: 'SupporterPrylar',
      lang: 'sv',
      description: 'SupporterPrylar.se',
    },
    icon: {
      fileName: 'icon_supporterprylar.png'
    }
  },
  webfontloader: {
    google: {
      families: ['Poppins:800','Source+Sans+Pro'] //Loads Poppins and Source Sans
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
      target: 'https://api.supporterprylar.se'
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
    extend(config, ctx) {}
  }
}
