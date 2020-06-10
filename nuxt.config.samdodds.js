export default {
  env: {
    THUMB_SRC: 'https://res.cloudinary.com/supportersplace/image/fetch/w_80,f_auto/https://static.supportersplace.se/product/',
    LIST_SRC: 'https://res.cloudinary.com/supportersplace/image/fetch/w_360,f_auto/',
    DETAILS_SRC: 'https://res.cloudinary.com/supportersplace/image/fetch/w_640,f_auto/http://static.supportersplace.se/product/'
    ,STORYBLOK_CATALOGUE: 'samdodds/da-dk/',
    LOGO_URL: '/sites/samdodds/samdodds-logo.png',
    SITE_ID: 2,
    MEMBER_PRICES: true,
    ISO_LANG_COUNTRY: 'da-DK',
    ISO_LANG: 'da',
    STORYBLOK: 'rGRW1HEorfNfSoGS5CzoDwtt'
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
    '~/assets/scss/site.samdodds.scss'
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
    {src: '~/plugins/vue-placeholders.js'},
    {src: '~/plugins/samdodds.js'},
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
  ],
  gtm: { id: 'GTM-NBCJ6D' },
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    ['@dansmaculotte/nuxt-zendesk',
    { 
      key: '457ea997-85d2-4fa7-a24f-9f1ac8e950f8',
      disabled: false,
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
        defaultLocale: 'da',
        strategy: 'prefix_except_default',
        locales: [
          {
            code: 'da',
            iso: 'da-DK'
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
  styleResources: {
    scss: [
    './assets/scss/vars.samdodds.scss'
    ]
  },
  webfontloader: {
    google: {
      families: ['Source+Sans+Pro:wght@400;600;700','Ubuntu:wght@400;500;700&display=swap'] //Loads Source Sans and Ubuntu
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
