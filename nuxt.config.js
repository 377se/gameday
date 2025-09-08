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
    ],
    script: [
      {
        hid: 'inmobi-cmp',
        innerHTML: `
(function() {
  var host = window.location.hostname;
  var element = document.createElement('script');
  var firstScript = document.getElementsByTagName('script')[0];
  var url = 'https://cmp.inmobi.com'
    .concat('/choice/', 'J2Y0tY9tEBqcb', '/', host, '/choice.js?tag_version=V3');
  var uspTries = 0;
  var uspTriesLimit = 3;
  element.async = true;
  element.type = 'text/javascript';
  element.src = url;

  firstScript.parentNode.insertBefore(element, firstScript);

  function makeStub() {
    var TCF_LOCATOR_NAME = '__tcfapiLocator';
    var queue = [];
    var win = window;
    var cmpFrame;

    function addFrame() {
      var doc = win.document;
      var otherCMP = !!(win.frames[TCF_LOCATOR_NAME]);

      if (!otherCMP) {
        if (doc.body) {
          var iframe = doc.createElement('iframe');

          iframe.style.cssText = 'display:none';
          iframe.name = TCF_LOCATOR_NAME;
          doc.body.appendChild(iframe);
        } else {
          setTimeout(addFrame, 5);
        }
      }
      return !otherCMP;
    }

    function tcfAPIHandler() {
      var gdprApplies;
      var args = arguments;

      if (!args.length) {
        return queue;
      } else if (args[0] === 'setGdprApplies') {
        if (
          args.length > 3 &&
          args[2] === 2 &&
          typeof args[3] === 'boolean'
        ) {
          gdprApplies = args[3];
          if (typeof args[2] === 'function') {
            args[2]('set', true);
          }
        }
      } else if (args[0] === 'ping') {
        var retr = {
          gdprApplies: gdprApplies,
          cmpLoaded: false,
          cmpStatus: 'stub'
        };

        if (typeof args[2] === 'function') {
          args[2](retr);
        }
      } else {
        if(args[0] === 'init' && typeof args[3] === 'object') {
          args[3] = Object.assign(args[3], { tag_version: 'V3' });
        }
        queue.push(args);
      }
    }

    function postMessageEventHandler(event) {
      var msgIsString = typeof event.data === 'string';
      var json = {};

      try {
        if (msgIsString) {
          json = JSON.parse(event.data);
        } else {
          json = event.data;
        }
      } catch (ignore) {}

      var payload = json.__tcfapiCall;

      if (payload) {
        window.__tcfapi(
          payload.command,
          payload.version,
          function(retValue, success) {
            var returnMsg = {
              __tcfapiReturn: {
                returnValue: retValue,
                success: success,
                callId: payload.callId
              }
            };
            if (msgIsString) {
              returnMsg = JSON.stringify(returnMsg);
            }
            if (event && event.source && event.source.postMessage) {
              event.source.postMessage(returnMsg, '*');
            }
          },
          payload.parameter
        );
      }
    }

    while (win) {
      try {
        if (win.frames[TCF_LOCATOR_NAME]) {
          cmpFrame = win;
          break;
        }
      } catch (ignore) {}

      if (win === window.top) {
        break;
      }
      win = win.parent;
    }
    if (!cmpFrame) {
      addFrame();
      win.__tcfapi = tcfAPIHandler;
      win.addEventListener('message', postMessageEventHandler, false);
    }
  };

  makeStub();

  function makeGppStub() {
    const CMP_ID = 10;
    const SUPPORTED_APIS = [
      '2:tcfeuv2',
      '6:uspv1',
      '7:usnatv1',
      '8:usca',
      '9:usvav1',
      '10:uscov1',
      '11:usutv1',
      '12:usctv1'
    ];

    window.__gpp_addFrame = function (n) {
      if (!window.frames[n]) {
        if (document.body) {
          var i = document.createElement("iframe");
          i.style.cssText = "display:none";
          i.name = n;
          document.body.appendChild(i);
        } else {
          window.setTimeout(window.__gpp_addFrame, 10, n);
        }
      }
    };
    window.__gpp_stub = function () {
      var b = arguments;
      __gpp.queue = __gpp.queue || [];
      __gpp.events = __gpp.events || [];

      if (!b.length || (b.length == 1 && b[0] == "queue")) {
        return __gpp.queue;
      }

      if (b.length == 1 && b[0] == "events") {
        return __gpp.events;
      }

      var cmd = b[0];
      var clb = b.length > 1 ? b[1] : null;
      var par = b.length > 2 ? b[2] : null;
      if (cmd === "ping") {
        clb(
          {
            gppVersion: "1.1",
            cmpStatus: "stub",
            cmpDisplayStatus: "hidden",
            signalStatus: "not ready",
            supportedAPIs: SUPPORTED_APIS,
            cmpId: CMP_ID,
            sectionList: [],
            applicableSections: [-1],
            gppString: "",
            parsedSections: {},
          },
          true
        );
      } else if (cmd === "addEventListener") {
        if (!("lastId" in __gpp)) {
          __gpp.lastId = 0;
        }
        __gpp.lastId++;
        var lnr = __gpp.lastId;
        __gpp.events.push({
          id: lnr,
          callback: clb,
          parameter: par,
        });
        clb(
          {
            eventName: "listenerRegistered",
            listenerId: lnr,
            data: true,
            pingData: {
              gppVersion: "1.1",
              cmpStatus: "stub",
              cmpDisplayStatus: "hidden",
              signalStatus: "not ready",
              supportedAPIs: SUPPORTED_APIS,
              cmpId: CMP_ID,
              sectionList: [],
              applicableSections: [-1],
              gppString: "",
              parsedSections: {},
            },
          },
          true
        );
      } else if (cmd === "removeEventListener") {
        var success = false;
        for (var i = 0; i < __gpp.events.length; i++) {
          if (__gpp.events[i].id == par) {
            __gpp.events.splice(i, 1);
            success = true;
            break;
          }
        }
        clb(
          {
            eventName: "listenerRemoved",
            listenerId: par,
            data: success,
            pingData: {
              gppVersion: "1.1",
              cmpStatus: "stub",
              cmpDisplayStatus: "hidden",
              signalStatus: "not ready",
              supportedAPIs: SUPPORTED_APIS,
              cmpId: CMP_ID,
              sectionList: [],
              applicableSections: [-1],
              gppString: "",
              parsedSections: {},
            },
          },
          true
        );
      } else if (cmd === "hasSection") {
        clb(false, true);
      } else if (cmd === "getSection" || cmd === "getField") {
        clb(null, true);
      }
      else {
        __gpp.queue.push([].slice.apply(b));
      }
    };
    window.__gpp_msghandler = function (event) {
      var msgIsString = typeof event.data === "string";
      try {
        var json = msgIsString ? JSON.parse(event.data) : event.data;
      } catch (e) {
        var json = null;
      }
      if (typeof json === "object" && json !== null && "__gppCall" in json) {
        var i = json.__gppCall;
        window.__gpp(
          i.command,
          function (retValue, success) {
            var returnMsg = {
              __gppReturn: {
                returnValue: retValue,
                success: success,
                callId: i.callId,
              },
            };
            event.source.postMessage(msgIsString ? JSON.stringify(returnMsg) : returnMsg, "*");
          },
          "parameter" in i ? i.parameter : null,
          "version" in i ? i.version : "1.1"
        );
      }
    };
    if (!("__gpp" in window) || typeof window.__gpp !== "function") {
      window.__gpp = window.__gpp_stub;
      window.addEventListener("message", window.__gpp_msghandler, false);
      window.__gpp_addFrame("__gppLocator");
    }
  };

  makeGppStub();

  var uspStubFunction = function() {
    var arg = arguments;
    if (typeof window.__uspapi !== uspStubFunction) {
      setTimeout(function() {
        if (typeof window.__uspapi !== 'undefined') {
          window.__uspapi.apply(window.__uspapi, arg);
        }
      }, 500);
    }
  };

  var checkIfUspIsReady = function() {
    uspTries++;
    if (window.__uspapi === uspStubFunction && uspTries < uspTriesLimit) {
      console.warn('USP is not accessible');
    } else {
      clearInterval(uspInterval);
    }
  };

  if (typeof window.__uspapi === 'undefined') {
    window.__uspapi = uspStubFunction;
    var uspInterval = setInterval(checkIfUspIsReady, 6000);
  }
})();
        `,
        type: 'text/javascript',
        async: true
      }
    ],
    __dangerouslyDisableSanitizers: ['script']
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
