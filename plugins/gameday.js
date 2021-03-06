import Vue from 'vue'
import TheHeader from "@/components/gameday/TheHeader";
import TheFooter from "@/components/gameday/TheFooter";
import OffscreenMenu from "@/components/gameday/menu/OffscreenMenu";
import OffscreenProductTypeMenu from "@/components/gameday/menu/ProductTypeMenu";
import OffscreenBrandMenu from "@/components/gameday/menu/BrandMenu";

Vue.component('TheHeader', TheHeader)
Vue.component('TheFooter', TheFooter)
Vue.component('OffscreenMenu', OffscreenMenu)
Vue.component('OffscreenBrandMenu', OffscreenBrandMenu)
Vue.component('OffscreenProductTypeMenu', OffscreenProductTypeMenu)