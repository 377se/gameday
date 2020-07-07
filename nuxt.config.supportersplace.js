export default {
  env: {
    THUMB_SRC: 'https://res.cloudinary.com/supportersplace/image/fetch/w_80,f_auto/https://static.supportersplace.se/product/',
    LIST_SRC: 'https://res.cloudinary.com/supportersplace/image/fetch/w_360,f_auto/',
    DETAILS_SRC: 'https://res.cloudinary.com/supportersplace/image/fetch/w_640,f_auto/http://static.supportersplace.se/product/'
    ,STORYBLOK_CATALOGUE: 'supportersplace/sv-se',
    SITE_URL: 'https://www.supportersplace.com',
    LOGO_URL: '/sites/supportersplace/supportersplace-logo-light.png',
    SITE_ID: 1,
    MEMBER_PRICES: true,
    ISO_LANG_COUNTRY: 'sv-SE',
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
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
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
    '~/assets/scss/site.supportersplace.scss'
    //'uikit/dist/css/uikit.css'
  ],
  router: {
    /*scrollBehavior: function (to, from, savedPosition) {
      return { x: 0, y: 0 }
    }*/
  },
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    {src: '~/plugins/jsonld.js'},
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
  gtm: { id: 'GTM-WDJLNSJ' },
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    ['@dansmaculotte/nuxt-zendesk',
    { 
      key: 'b2384b65-02c4-40fe-b25f-c195c554d089',
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
        defaultLocale: 'sv-se',
        strategy: 'prefix',
        locales: [
          {
            code: 'sv-se',
            iso: 'sv-SE'
          },
          {
            code: 'nb-no',
            iso: 'nb-NO'
          },
          {
            code: 'da-dk',
            iso: 'da-DK'
          },
          {
            code: 'en-gb',
            iso: 'en-GB'
          },
          {
            code: 'fi-fi',
            iso: 'fi-FI'
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
  styleResources: {
    scss: [
    './assets/scss/vars.supportersplace.scss'
    ]
  },
  pwa: {
    meta:{
      name: 'Supporters Place',
      description: 'SupportersPlace.com',
      lang: 'sv',
      theme_color: '#ffffff'
    },
    manifest: {
      name: 'Supporters Place',
      short_name: 'SupportersPlace',
      lang: 'sv',
      description: 'SupportersPlace.com',
    },
    icon: {
      iconFileName: 'logos/sites/supportersplace/supportersplace-logo-light.png'
    }
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
    extend(config, ctx) {}
  }
}
