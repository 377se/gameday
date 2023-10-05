
//import https from 'https';

export default function ({ $axios, redirect, app }) {
  $axios.onRequest(config => {
    config.headers.common['x-shop'] = process.env.SITE_ID
    let xculture = app.i18n.locale?app.i18n.locale:app.i18n.defaultLocale
    if(xculture=='en'){xculture='en-gb'}
    config.headers.common['x-culture'] = xculture
    if(app.$cookies.get('session')!=undefined){
      config.headers.common['x-session'] = app.$cookies.get('session')
    } 
    if(app.$cookies.get('voucherid')!=undefined && app.$cookies.get('voucherid')!=null){
      config.headers.common['x-voucherid'] = app.$cookies.get('voucherid')
    }
  })
  }
