<template>
  <div v-if="!branchStatus.ShowMeTheMoney">
  </div>
  <div v-else
    v-editable="blok"
    class="uk-margin-bottom">
    <a
      style="position:relative;display:block;"
      :href="blok.BranchMemberPushURL.url">

      <div class="bmp-container">


        <video
          id="branchVideo" 
          :poster="'https://res.cloudinary.com/supportersplace/image/fetch/w_1400,fl_lossy,f_auto,fl_progressive/http:'+blok.BranchMemberPushImage" muted autoplay webkit-playsinline playsinline preload="auto" loop style="width: 100%;">
          <source src="https://res.cloudinary.com/supportersplace/video/upload/q_auto,f_auto/v1614780456/bmp-videobackground_vpb7zn.mp4" type="video/mp4">
        </video>


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
  activated(){
    try{
      document.getElementById('branchVideo').play()
    }catch(err){
      console.log(err)
    }
  }
}
</script>
<style lang="scss" scoped>
.bmp-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: 0px;
  width: 100%;
  height: 100%;
  font-size: 2vw;
}
.bmp-container video {
      object-fit: cover;
      width: 100%;
      height: 100%;
      @media (max-width: 449px) {
        height: 600px;
      }
      @media (min-width: 450px) and (max-width: 999px) {
        height: 500px;
      }
}
.bmp-infobox {
  position: absolute;
  width: 50%;
  @media (max-width: 449px) {
    width: 90%;
  }
  @media (min-width: 450px) and (max-width: 999px) {
    width: 70%;
  }


}
.bmp-push-promo-text {
  font-family: "Oswald", sans-serif;
  font-size: 90px;
  line-height: 98px;
  @media (min-width: 450px) and (max-width: 999px) {
    font-size: 70px;
    line-height: 70px;
  }
  @media (max-width: 449px) {
    font-size: 60px;
    line-height: 65px;
  }
  font-weight: bold;
  color:rgb(255, 255, 255);
  margin: 0 0 0.15em 0;
  padding: 0 0 0 1.7rem;
}
.bmp-push-price-message {
  font-family: "Oswald", sans-serif;
  font-size: 20px;
  line-height: 25px;
  margin: 0 0 1em 0;
  padding: 0 0 0 1.7rem;
  color:rgb(255, 255, 255);
}
.nuxt-link-exact-active {
  font-family: "Oswald", sans-serif;
  font-size: 1.1em;
  line-height: 1.5;
  color: #000;
  font-weight: bold;
  display: inline-block;
  background-color: #FBB03B;
  width: 100%;
  height: 1.6em;
  @media (max-width: 449px) {
    font-size: 17px;
    line-height: 25px;
    width: 80%;
    margin: 0 20px 0 20px;
    height: 1.6em;
  }
  @media (min-width: 450px) and (max-width: 999px) {
    font-size: 20px;
    line-height: 30px;
    width: 80%;
    margin: 0 20px 0 20px;
    height: 1.6em;
  }

  border-radius: 5px;
  text-align: center;
  -webkit-box-shadow: 0.3em 0.3em 0px 0px rgba(0,0,0,0.40);
  box-shadow: 0.3em 0.3em 0px 0px rgba(0,0,0,0.40);
  transition: 300ms;
}
.nuxt-link-exact-active:hover {
  text-decoration: none;
  -webkit-box-shadow: 0.05em 0.05em 0px 0px rgba(0,0,0,0.40);
  box-shadow: 0.05em 0.05em 0px 0px rgba(0,0,0,0.40);
}
.bmp-crest {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  top: 0;
  right: 70px;
  width: 180px;
  height: 180px;
  @media (min-width: 450px) and (max-width: 999px) {
    right: 60px;
    width: 120px;
    height: 120px;
  }
  @media (max-width: 449px) {
    right: 40px;
    width: 100px;
    height: 100px;
  }
  background-color: #fff;
  -webkit-box-shadow: 0.3em 0.3em 0px 0px rgba(0,0,0,0.40);
  box-shadow: 0.3em 0.3em 0px 0px rgba(0,0,0,0.40);
}

</style>