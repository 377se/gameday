import Vue from 'vue'
import TheHeader from "@/components/samdodds/TheHeader";
import TheLFCNews from "@/components/samdodds/TheLFCNews";
import GameCenterContainer from "@/components/samdodds/gamecenter/GameCenterContainer";
import GameCenterLatestNext from "@/components/samdodds/gamecenter/GameCenterLatestNext";
import GameCenterStandings from "@/components/samdodds/gamecenter/GameCenterStandings";
import GameCenterResultContest from "@/components/samdodds/gamecenter/GameCenterResultContest";
import TheFooter from "@/components/samdodds/TheFooter";
import OffscreenMenu from "@/components/samdodds/menu/OffscreenMenu";
import OffscreenProductTypeMenu from "@/components/samdodds/menu/ProductTypeMenu";
import OffscreenBrandMenu from "@/components/samdodds/menu/BrandMenu";

Vue.component('TheHeader', TheHeader)
Vue.component('TheLFCNews', TheLFCNews)
Vue.component('GameCenterContainer', GameCenterContainer)
Vue.component('GameCenterLatestNext', GameCenterLatestNext)
Vue.component('GameCenterStandings', GameCenterStandings)
Vue.component('GameCenterResultContest', GameCenterResultContest)
Vue.component('TheFooter', TheFooter)
Vue.component('OffscreenMenu', OffscreenMenu)
Vue.component('OffscreenBrandMenu', OffscreenBrandMenu)
Vue.component('OffscreenProductTypeMenu', OffscreenProductTypeMenu)