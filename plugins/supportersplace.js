import Vue from 'vue'
import TheHeader from "@/components/supportersplace/TheHeader";
import TheFooter from "@/components/supportersplace/TheFooter";
import OffscreenMenu from "@/components/supportersplace/menu/OffscreenMenu";
import OffscreenProductTypeMenu from "@/components/supportersplace/menu/ProductTypeMenu";
import OffscreenBrandMenu from "@/components/supportersplace/menu/BrandMenu";

Vue.component('TheHeader', TheHeader)
Vue.component('TheFooter', TheFooter)
Vue.component('OffscreenMenu', OffscreenMenu)
Vue.component('OffscreenBrandMenu', OffscreenBrandMenu)
Vue.component('OffscreenProductTypeMenu', OffscreenProductTypeMenu)