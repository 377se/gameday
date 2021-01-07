import Vue from 'vue'
import TheHeader from "@/components/samdodds/TheHeader";
import TheLFCNews from "@/components/samdodds/TheLFCNews";
import NextGame from "@/components/samdodds/gamecenter/NextGame";
import TheFooter from "@/components/samdodds/TheFooter";
import OffscreenMenu from "@/components/samdodds/menu/OffscreenMenu";
import OffscreenProductTypeMenu from "@/components/samdodds/menu/ProductTypeMenu";
import OffscreenBrandMenu from "@/components/samdodds/menu/BrandMenu";

Vue.component('TheHeader', TheHeader)
Vue.component('TheLFCNews', TheLFCNews)
Vue.component('NextGame', NextGame)
Vue.component('TheFooter', TheFooter)
Vue.component('OffscreenMenu', OffscreenMenu)
Vue.component('OffscreenBrandMenu', OffscreenBrandMenu)
Vue.component('OffscreenProductTypeMenu', OffscreenProductTypeMenu)