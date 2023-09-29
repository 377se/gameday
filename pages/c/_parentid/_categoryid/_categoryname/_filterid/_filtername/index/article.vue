<router>
  {
    path: '/c/:parentid/:categoryid/:categoryname/:filterid/:filtername/article',
    alias: [
      {
        path: '/c/:parentid/:categoryid/:categoryname/:filterid/:filtername/a/:id/:slug'
      },
    ]
  }
</router>
<template>
  <Modal
    v-if="!ssr">
    <PageArticle />
  </Modal>
  <PageArticle
    v-else/>
</template>

<script>
export default {
  beforeRouteEnter(to, from, next){
    next((vm) => {
        vm.$nextTick(() => {
      try{
        setTimeout(function(){
          window.UIkit.modal('#modal-article').show()
        },200)
      
      }catch(err){}
    })
    });
  },
  beforeRouteLeave (to, from, next) {
    try{
      UIkit.modal('#modal-article').hide()
    }catch(err){
      console.log(err)
    }
    next()
  },
  mounted(){
    try{
      UIkit.modal('#modal-article').show()
    }catch(err){
      console.log(err)
    }
  },
  data(){
    return{
      ssr: process.server
    }
  }
}
</script>

