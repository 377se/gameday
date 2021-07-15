export default {
  env: {
    THUMB_SRC: 'https://res.cloudinary.com/supportersplace/image/fetch/w_80,f_auto/https://static.supportersplace.se/product/',
    LIST_SRC: 'https://res.cloudinary.com/supportersplace/image/fetch/w_360,f_auto/',
    DETAILS_SRC: 'https://res.cloudinary.com/supportersplace/image/fetch/w_640,f_auto/http://static.supportersplace.se/product/',
    BRAND_SRC: 'https://res.cloudinary.com/supportersplace/image/fetch/w_200,f_auto/http://static.supportersplace.se/brand/',
    STORYBLOK_CATALOGUE: '/samdodds',
    STORYBLOK_LABELS: 'samdodds',
    SITE_URL: 'https://www.samdodds.com',
    LOGO_URL: '/sites/samdodds/samdodds-logo.png',
    SITE_ID: 2,
    MEMBER_PRICES: true,
    ISO_LANG: 'sv',
    CURRENCY_CODE: 'SEK',
    STORYBLOK: 'rGRW1HEorfNfSoGS5CzoDwtt',
    ZENDESK: 'b2384b65-02c4-40fe-b25f-c195c554d089'
  },
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: 'Sam Dodds',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Sam Dodds'
      }
    ],
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
    '~/assets/scss/site.samdodds.scss',
    '~/assets/pe-laundry-icons/css/pe-laundry-icons.css'
    //'uikit/dist/css/uikit.css'
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    {src: '~/plugins/jsonld.js'},
    {src: '~/plugins/samdodds.js'},
    {src: '~/plugins/vue-placeholders.js'},
    {src: "~/plugins/uikit.js", ssr: false },
    {src: '~/plugins/axios'},
    {src: '~/plugins/get'},
    {src: '~/plugins/lottie-client.js', ssr:false},
    {src: '~/plugins/filters.js', ssr:false},
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
  ],
  gtm: { id: 'GTM-NBCJ6D' },
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/redirect-module',
    // Doc: https://axios.nuxtjs.org/usage
    ['@dansmaculotte/nuxt-zendesk',
    { 
      key: '457ea997-85d2-4fa7-a24f-9f1ac8e950f8',
      disabled: true,
      settings: {
        webWidget: {
          color: {
            theme: '#fa6900',
            launcherText: '#ffffff',
          }
        }
      }
    }],
    ['nuxt-i18n',
    {
      detectBrowserLanguage: {
        useCookie: true,
        alwaysRedirect: true,
        cookieKey: 'i18n_redirected',
        onlyOnRoot: true,  // recommended
      },
      baseUrl: 'https://www.samdodds.com',
      defaultLocale: 'sv-se',
      strategy: 'prefix',
      locales: [
        {
          code: 'sv-se',
          iso: 'sv',
          name: 'Sweden'
        },
        {
          code: 'fi-fi',
          iso: 'fi',
          name: 'Finland'
        }
      ],
      seo:false
    }
    ],
    '@nuxtjs/axios',
    'cookie-universal-nuxt',
    '@nuxtjs/pwa',
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
    './assets/scss/vars.samdodds.scss',
    './assets/scss/mixins.samdodds.scss'
    ]
  },
  pwa: {
    meta:{
      name: 'SamDodds',
      description: 'SamDodds.com',
      lang: 'sv',
      theme_color: '#ffffff'
    },
    manifest: {
      name: 'SamDodds.com',
      short_name: 'Sam Dodds',
      lang: 'sv',
      description: 'SamDodds.com',
    },
    icon: {
      fileName: 'icon_samdodds.png'
    }
  },
  webfontloader: {
    google: {
      families: ['Lato:400,600,700','Oswald:400,500,700,900']
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
      target: process.env.NODE_ENV !== 'production'?'https://api.samdodds.com':'https://api.samdodds.com'
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
