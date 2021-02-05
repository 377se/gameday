import UIkit from 'uikit'
import Icons from 'uikit/dist/js/uikit-icons'
import smoothscroll from 'smoothscroll-polyfill'
import LottiePlayer from 'lottie-player-vue'
 
Vue.use(LottiePlayer)

// kick off the polyfill!
smoothscroll.polyfill()

UIkit.use(Icons)

window.UIkit = UIkit
