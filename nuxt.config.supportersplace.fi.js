export default {
  env: {
    THUMB_SRC: 'https://res.cloudinary.com/supportersplace/image/fetch/w_80,f_auto/https://static.supportersplace.se/product/',
    LIST_SRC: 'https://res.cloudinary.com/supportersplace/image/fetch/w_360,f_auto/',
    DETAILS_SRC: 'https://res.cloudinary.com/supportersplace/image/fetch/w_640,f_auto/http://static.supportersplace.se/product/',
    BRAND_SRC: 'https://res.cloudinary.com/supportersplace/image/fetch/w_200,f_auto/http://static.supportersplace.se/brand/',
    STORYBLOK_CATALOGUE: '/supportersplace',
    STORYBLOK_LABELS: 'supporters-place',
    SITE_URL: 'https://supportersplace.fi',
    X_DEFAULT: 'https://supportersplace.com',
    LOGO_URL: '/sites/supportersplace/supportersplace_header_neg.svg',
    SITE_ID: 1,
    MEMBER_PRICES: true,
    ISO_LANG: 'fi',
    CURRENCY_CODE: 'EUR',
    STORYBLOK: 'rGRW1HEorfNfSoGS5CzoDwtt',
    ZENDESK: '8e038054-4899-4e86-8561-a33fa7eb78c2',
    DEFAULT_SORT_ORDER: 3, //0 for recommended and 3 for latest
    LANG_HREF:{
      'fi-fi':'https://supportersplace.fi',
      'sv-se':'https://supportersplace.se',
      'nb-no':'https://supportersplace.no',
      'da-dk':'https://supportersplace.com/da-dk',
      'en-gb':'https://supportersplace.com/en'
    },
    BASE_HREF: [
      {Culture:'fi-fi', Url:''},
      {Culture:'sv-se', Url:''},
      {Culture:'nb-no', Url:''},
      {Culture:'da-dk', Url:''},
      {Culture:'en-gb', Url:''}
    ]
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
    {src: '~/plugins/vue-intersection-observer.js', ssr: false},
    {src: '~/plugins/inmobi.js', ssr: false},
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
    '@nuxtjs/router-extras',
    '@nuxtjs/gtm', 
    '@nuxtjs/pwa',
    ["@storyblok/nuxt-2/module", { accessToken: "rGRW1HEorfNfSoGS5CzoDwtt" }],
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
    ['@nuxtjs/i18n',
      {
        baseUrl: 'https://supportersplace.fi',
        defaultLocale: 'fi-fi',
        strategy: 'prefix_and_default',
        locales: [
          {
            code: 'fi-fi',
            iso: 'fi'
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
    './assets/scss/vars.supportersplace.scss',
    './assets/scss/mixins.supportersplace.scss'
    ]
  },
  pwa: {
    meta:{
      name: 'Supporters Place',
      description: 'SupportersPlace.fi',
      lang: 'fi',
      theme_color: '#ffffff'
    },
    manifest: {
      name: 'Supporters Place',
      short_name: 'SupportersPlace',
      lang: 'fi',
      description: 'SupportersPlace.fi',
    },
    icon: {
      fileName: 'icon_supportersplace_badge.png'
    },
    workbox: false
  },
  webfontloader: {
    google: {
      families: ['Poppins:800','Source+Sans+3'] //Loads Poppins and Source Sans
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
      target: process.env.NODE_ENV !== 'production'?'https://api.supportersplace.com':'https://api.supportersplace.com',
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
