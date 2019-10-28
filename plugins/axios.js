
//import https from 'https';

export default function ({ $axios, redirect, app }) {
  $axios.onRequest(config => {
    config.headers['x-shop'] = 6
    config.headers['x-culture'] = 'sv-SE'
    if(app.$cookies.get('session')!=undefined){
      config.headers['x-session'] = app.$cookies.get('session')
    } 
  })
  }
