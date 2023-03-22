import Vue from 'vue'
import TheHeader from "@/components/streetweek/TheHeader";
import TheFooter from "@/components/streetweek/TheFooter";
import OffscreenMenu from "@/components/streetweek/menu/OffscreenMenu";
import OffscreenProductTypeMenu from "@/components/streetweek/menu/ProductTypeMenu";
import OffscreenBrandMenu from "@/components/streetweek/menu/BrandMenu";
import TeamIcon from "@/components/TeamIcon";

Vue.component('TheHeader', TheHeader)
Vue.component('TheFooter', TheFooter)
Vue.component('OffscreenMenu', OffscreenMenu)
Vue.component('OffscreenBrandMenu', OffscreenBrandMenu)
Vue.component('OffscreenProductTypeMenu', OffscreenProductTypeMenu)
Vue.component('TeamIcon', TeamIcon)