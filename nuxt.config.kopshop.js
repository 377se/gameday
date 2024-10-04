export default {
  env: {
    THUMB_SRC: 'https://res.cloudinary.com/supportersplace/image/fetch/w_80,f_auto/https://static.supportersplace.se/product/',
    LIST_SRC: 'https://res.cloudinary.com/supportersplace/image/fetch/w_360,f_auto/',
    DETAILS_SRC: 'https://res.cloudinary.com/supportersplace/image/fetch/w_640,f_auto/http://static.supportersplace.se/product/',
    BRAND_SRC: 'https://res.cloudinary.com/supportersplace/image/fetch/w_200,f_auto/http://static.supportersplace.se/brand/',
    STORYBLOK_CATALOGUE: '/kopshop',
    STORYBLOK_LABELS: 'kopshop',
    SITE_URL: 'https://www.kopshop.no',
    X_DEFAULT: 'https://www.samdodds.com',
    LOGO_URL: '/sites/kopshop/kopshop-logo.png',
    SITE_ID: 3,
    MEMBER_PRICES: true,
    ISO_LANG: 'nb-no',
    CURRENCY_CODE: 'NOK',
    STORYBLOK: 'rGRW1HEorfNfSoGS5CzoDwtt',
    ZENDESK: '457ea997-85d2-4fa7-a24f-9f1ac8e950f8',
    DEFAULT_SORT_ORDER: 3, //0 for recommended and 3 for latest
    LANG_HREF: {
      'nb-no':'https://www.kopshop.no'
    },
    BASE_HREF: [{
      Culture:'nb-no',Url:''
    }]
  },
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: 'KopShop',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'KopShop'
      }
    ]
  },
  components: true,
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
    {src: '~/plugins/inmobi.js', ssr: false},
    {src: '~/plugins/jsonld.js'},
    {src: '~/plugins/lottie-client.js', ssr:false},
    {src: '~/plugins/filters.js', ssr:false},
    {src: '~/plugins/vue-placeholders.js'},
    {src: '~/plugins/kopshop.js'},
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
    ["@storyblok/nuxt-2/module",
    { accessToken: "rGRW1HEorfNfSoGS5CzoDwtt" }],
  ],
  gtm: { id: 'GTM-K7K2MN' },
  /*
   ** Nuxt.js modules
   */
  modules: [
    "@nuxtjs/auth-next",
    '@nuxtjs/axios',
    'cookie-universal-nuxt',
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
        baseUrl: 'https://www.kopshop.no',
        defaultLocale: 'nb-no',
        strategy: 'no_prefix',
        locales: [
          {
            code: 'nb-no',
            iso: 'nb'
          }
        ],
        seo:false
      }
    ],
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
  auth:{
    strategies: {
      awsCognito: {
        scheme: "oauth2",
        endpoints: {
          authorization: "https://liverpoolno.auth.eu-central-1.amazoncognito.com/login",
          token: "https://liverpoolno.auth.eu-central-1.amazoncognito.com/oauth2/token",
          userInfo: "https://liverpoolno.auth.eu-central-1.amazoncognito.com/oauth2/userInfo",
          logout: "https://liverpoolno.auth.eu-central-1.amazoncognito.com/logout"
        },
        token: {
          property: "access_token",
          type: "Bearer",
          maxAge: 3600
        },
        refreshToken: {
          property: "refresh_token",
          maxAge: 60 * 60 * 24 * 30
        },
        responseType: "code",
        redirectUri: "https://kopshop.no/callback/cognito/login",
        logoutRedirectUri: "http://localhost:3000/login",
        clientId: "65qi5lmu89hgcr4ma1aipaleus",
        scope: ["email", "openid", "profile"]
      }
    }
  },
  styleResources: {
    scss: [
    './assets/scss/vars.samdodds.scss',
    './assets/scss/mixins.samdodds.scss'
    ]
  },
  pwa: {
    meta:{
      name: 'KopShop.no',
      description: 'KopShop.no',
      lang: 'nb',
      theme_color: '#ffffff'
    },
    manifest: {
      name: 'KopShop.no',
      short_name: 'KopShop',
      lang: 'nb',
      description: 'KopShop.no',
    },
    icon: {
      fileName: 'icon_kopshop.png'
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
      target: process.env.NODE_ENV !== 'production'?'https://api.kopshop.no':'https://api.kopshop.no',
      secure: false,
      changeOrigin: true
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
