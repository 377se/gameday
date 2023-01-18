export default {
  env: {
    THUMB_SRC: 'https://res.cloudinary.com/supportersplace/image/fetch/w_80,f_auto/https://static.supportersplace.se/product/',
    LIST_SRC: 'https://res.cloudinary.com/supportersplace/image/fetch/w_360,f_auto/',
    DETAILS_SRC: 'https://res.cloudinary.com/supportersplace/image/fetch/w_640,f_auto/http://static.supportersplace.se/product/',
    BRAND_SRC: 'https://res.cloudinary.com/supportersplace/image/fetch/w_200,f_auto/http://static.supportersplace.se/brand/',
    STORYBLOK_CATALOGUE: '/samdodds',
    STORYBLOK_LABELS: 'samdodds',
    SITE_URL: 'https://www.samdodds.dk',
    X_DEFAULT: 'https://www.samdodds.com',
    LOGO_URL: '/sites/samdodds/samdodds-logo.png',
    SITE_ID: 2,
    MEMBER_PRICES: true,
    ISO_LANG: 'da',
    CURRENCY_CODE: 'DKK',
    STORYBLOK: 'rGRW1HEorfNfSoGS5CzoDwtt',
    ZENDESK: '457ea997-85d2-4fa7-a24f-9f1ac8e950f8',
    DEFAULT_SORT_ORDER: 3, //0 for recommended and 3 for latest
    LANG_HREF: [
      {'fi-fi':'https://www.samdodds.com/fi-fi'},
      {'sv-se':'https://www.samdodds.com/sv-se'},
      {'en-gb':'https://www.samdodds.com/en'},
      {'da-dk':'https://www.samdodds.dk'}
    ]
  },
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: 'SamDodds.dk',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'SamDodds.dk'
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
    '~/assets/scss/site.samdodds.scss',
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
    {src: '~/plugins/samdodds.js'},
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
    '@nuxtjs/router-extras',
    '@nuxtjs/gtm', 
    '@nuxtjs/pwa',
    ["@storyblok/nuxt-2/module", { accessToken: "rGRW1HEorfNfSoGS5CzoDwtt" }],
  ],
  gtm: { id: 'GTM-NBCJ6D' },
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@pi0/nuxt-cache',
    '@nuxtjs/redirect-module',
    // Doc: https://axios.nuxtjs.org/usage
    ['@dansmaculotte/nuxt-zendesk',
    { 
      key: '457ea997-85d2-4fa7-a24f-9f1ac8e950f8',
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
        baseUrl: 'https://www.samdodds.dk',
        defaultLocale: 'da-dk',
        strategy: 'no_prefix',
        locales: [
          {
            code: 'da-dk',
            iso: 'da'
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
    './assets/scss/vars.samdodds.scss',
    './assets/scss/mixins.samdodds.scss'
    ]
  },
  pwa: {
    meta:{
      name: 'SamDodds.dk',
      description: 'SamDodds.dk',
      lang: 'da',
      theme_color: '#ffffff'
    },
    manifest: {
      name: 'SamDodds.dk',
      short_name: 'Sam Dodds',
      lang: 'da',
      description: 'SamDodds.dk',
    },
    icon: {
      fileName: 'icon_samdodds.png'
    },
    workbox: false
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
      target: process.env.NODE_ENV !== 'production'?'https://beta-api.samdodds.com':'https://api.samdodds.com'
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
