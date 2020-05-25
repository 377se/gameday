
//import https from 'https';

export default function ({ $axios, redirect, app }) {
  $axios.onRequest(config => {
    config.headers['x-shop'] = process.env.SITE_ID
    config.headers['x-culture'] = process.env.ISO_LANG_COUNTRY
    if(app.$cookies.get('session')!=undefined){
      config.headers['x-session'] = app.$cookies.get('session')
    } 
  })
  }
