
//import https from 'https';

export default function ({ $axios, redirect, app }) {
  $axios.onRequest(config => {
    config.headers['x-shop'] = process.env.SITE_ID
    config.headers['x-culture'] = app.$i18n.locale
    if(app.$cookies.get('session')!=undefined){
      config.headers['x-session'] = app.$cookies.get('session')
    } 
    if(app.$cookies.get('voucherid')!=undefined && app.$cookies.get('voucherid')!=null){
      config.headers['x-voucherid'] = app.$cookies.get('voucherid')
    }
  })
  }
