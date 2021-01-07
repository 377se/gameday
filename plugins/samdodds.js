import Vue from 'vue'
import TheHeader from "@/components/samdodds/TheHeader";
import TheLFCNews from "@/components/samdodds/TheLFCNews";
import GameCenterPromo from "@/components/samdodds/gamecenter/GameCenterPromo";
import NextGame from "@/components/samdodds/gamecenter/NextGame";
import LastGame from "@/components/samdodds/gamecenter/LastGame";
import TheFooter from "@/components/samdodds/TheFooter";
import OffscreenMenu from "@/components/samdodds/menu/OffscreenMenu";
import OffscreenProductTypeMenu from "@/components/samdodds/menu/ProductTypeMenu";
import OffscreenBrandMenu from "@/components/samdodds/menu/BrandMenu";

Vue.component('TheHeader', TheHeader)
Vue.component('TheLFCNews', TheLFCNews)
Vue.component('GameCenterPromo', GameCenterPromo)
Vue.component('NextGame', NextGame)
Vue.component('LastGame', LastGame)
Vue.component('TheFooter', TheFooter)
Vue.component('OffscreenMenu', OffscreenMenu)
Vue.component('OffscreenBrandMenu', OffscreenBrandMenu)
Vue.component('OffscreenProductTypeMenu', OffscreenProductTypeMenu)