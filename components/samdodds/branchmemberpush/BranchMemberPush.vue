<template>
  <div
    v-editable="blok"
    class="uk-margin-bottom">
    <a 
      style="position:relative;display:block;"
      :href="blok.BranchMemberPushURL.url">

<video :poster="'https://res.cloudinary.com/supportersplace/image/fetch/w_1400,fl_lossy,f_auto,fl_progressive/http:'+blok.BranchMemberPushImage" muted autoplay webkit-playsinline playsinline preload="auto" loop style="width: 100%;">
<source src="https://res.cloudinary.com/supportersplace/video/upload/v1614780456/bmp-videobackground_vpb7zn.mp4" type="video/mp4">
</video>


      <div class="bmp-container">
        <div class="bmp-infobox">

          <div class="bmp-push-promo-text" uk-scrollspy="target: > div; cls: uk-animation-slide-right; delay: 500">
            <div>{{ branchStatus.PushPromoText[0] }}</div>
            <div v-if="branchStatus.PushPromoText[1]">{{ branchStatus.PushPromoText[1] }}</div>
          </div>
          <div class="bmp-push-price-message uk-animation-fade" uk-scrollspy="target: > div; cls: uk-animation-fade; delay: 1000">
            <div>{{ branchStatus.PushPriceMessage[0] }}</div>
            <div v-if="branchStatus.PushPriceMessage[1]">{{ branchStatus.PushPriceMessage[1] }}</div>
          </div>
          <nuxt-link
            class="nuxt-link-exact-active uk-transform-origin-bottom-center"
            uk-scrollspy="cls: uk-animation-scale-up; delay: 1500"
            v-for="b in blok.BranchMemberPushButton"
            :key="b._uid"
            :to="b.button_url.url"
            >
            <span>{{ branchStatus.PushButtonText }}</span>
          </nuxt-link>
        </div>
          <div class="bmp-crest" uk-scrollspy="cls: uk-animation-slide-top; delay: 1500">
            <img src="/logos/lfc_headline_below.png" style="width: 60%" alt="OSC Logo">
          </div>

      </div>

    </a>
  </div>
</template>
<script>
export default {
  props: {
    blok: {
      type: Object,
      required: true,
    },
  },
	data () {
		return {
			branchStatus: [],
		}
	},
	async fetch () {
		try {
			const [branchStatus] = await Promise.all([
				this.$axios.$get('/webapi/BranchSe/GetBranchStatus'),
      		])
			this.branchStatus = branchStatus
		} catch (err) {
      		console.log(err);
		}
    },
}
</script>
<style lang="scss" scoped>
.bmp-container {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: 0px;
  width: 100%;
  height: 100%;
}
.bmp-infobox {
  position: relative;
  width: 50%;
}
.bmp-push-promo-text {
  font-family: "Oswald", sans-serif;
  font-size: 7rem;
  font-weight: bold;
  line-height: 1;
  color:rgb(255, 255, 255);
  margin: 0 0 2rem 0;
  padding: 0 0 0 2rem;
}
.bmp-push-price-message {
  font-family: "Oswald", sans-serif;
  font-size: 1.7rem;
  margin: 0 0 2rem 0;
  padding: 0 0 0 2rem;
  color:rgb(255, 255, 255);
}
.nuxt-link-exact-active {
  font-family: "Oswald", sans-serif;
  font-size: 1.2rem;
  line-height: 1.9;
  color: #000;
  font-weight: bold;
  display: inline-block;
  background-color: #FBB03B;
  width: 100%;
  height: 2.2rem;
  border-radius: 5px;
  text-align: center;
  -webkit-box-shadow: 8px 8px 0px 0px rgba(0,0,0,0.40); 
  box-shadow: 8px 8px 0px 0px rgba(0,0,0,0.40);
  transition: 300ms;
}
.nuxt-link-exact-active:hover {
  text-decoration: none;
  -webkit-box-shadow: 2px 2px 0px 0px rgba(0,0,0,0.40); 
  box-shadow: 2px 2px 0px 0px rgba(0,0,0,0.40);
}
.bmp-crest {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  top: 0;
  right: 60px;
  width: 170px;
  height: 150px;
  background-color: #fff;
  -webkit-box-shadow: 8px 8px 0px 0px rgba(0,0,0,0.40); 
  box-shadow: 8px 8px 0px 0px rgba(0,0,0,0.40);
}

</style>