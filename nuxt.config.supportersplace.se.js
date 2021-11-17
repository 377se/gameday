export default {
  env: {
    THUMB_SRC: 'https://res.cloudinary.com/supportersplace/image/fetch/w_80,f_auto/https://static.supportersplace.se/product/',
    LIST_SRC: 'https://res.cloudinary.com/supportersplace/image/fetch/w_360,f_auto/',
    DETAILS_SRC: 'https://res.cloudinary.com/supportersplace/image/fetch/w_640,f_auto/http://static.supportersplace.se/product/',
    BRAND_SRC: 'https://res.cloudinary.com/supportersplace/image/fetch/w_200,f_auto/http://static.supportersplace.se/brand/',
    STORYBLOK_CATALOGUE: '/supportersplace',
    STORYBLOK_LABELS: 'supporters-place',
    SITE_URL: 'https://supportersplace.se',
    LOGO_URL: '/sites/supportersplace/supportersplace_logo_light.svg',
    SITE_ID: 1,
    MEMBER_PRICES: true,
    ISO_LANG: 'sv',
    CURRENCY_CODE: 'SEK',
    STORYBLOK: 'rGRW1HEorfNfSoGS5CzoDwtt',
    ZENDESK: '8e038054-4899-4e86-8561-a33fa7eb78c2',
    DEFAULT_SORT_ORDER: 3 //0 for recommended and 3 for latest
  },
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: 'Supporters Place',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Supporters Place'
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
    '~/assets/scss/site.supportersplace.scss',
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
    {src: '~/plugins/supportersplace.js'},
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
  ],
  gtm: { id: 'GTM-5GW9PW' },
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/redirect-module',
    // Doc: https://axios.nuxtjs.org/usage
    ['@dansmaculotte/nuxt-zendesk',
    { 
      key: '8e038054-4899-4e86-8561-a33fa7eb78c2',
      disabled: true,
      settings: {
        webWidget: {
          color: {
            theme: '#ed8b00',
            launcherText: '#ffffff',
          }
        }
      }
    }],
    ['nuxt-i18n',
      {
        baseUrl: 'https://supportersplace.se',
        defaultLocale: 'sv-se',
        strategy: 'prefix_and_default',
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
        from: '^((?!.*webapi).*\/[^\\?]*(?<=\\w))([\/])(\\?.*)?$',
        to: '$1$3',
        statusCode: 301
    },
  ],
  styleResources: {
    scss: [
    './assets/scss/vars.supportersplace.scss',
    './assets/scss/mixins.supportersplace.scss'
    ]
  },
  pwa: {
    meta:{
      name: 'Supporters Place',
      description: 'SupportersPlace.se',
      lang: 'sv',
      theme_color: '#ffffff'
    },
    manifest: {
      name: 'Supporters Place',
      short_name: 'SupportersPlace',
      lang: 'sv',
      description: 'SupportersPlace.se',
    },
    icon: {
      fileName: 'icon_supportersplace.png'
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
      target: process.env.NODE_ENV !== 'production'?'https://beta-api.supportersplace.com':'https://api.supportersplace.com'
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
     babel:{
      plugins: [
        ['@babel/plugin-proposal-private-methods', { loose: true }]
      ]
    },
    extend(config, ctx) {}
  }
}
