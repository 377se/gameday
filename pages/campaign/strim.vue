<template>
  <section>
    <div class="uk-container uk-padding">
      <h1>Du har fått 350kr att handla varor för!</h1>
      <h2>Har du konto hos oss redan?</h2>
      <p>Då har vi fyllt på det med 350 coins som automatiskt dras av i varukorgen när du handlar.</p>
      <p>Logga in med den email vi skickat den här länken till och det lösenord du valt sedan tidigare</p>
      <p><nuxt-link
            :to="localePath('/login')"
            class="uk-button uk-button-primary">Logga in</nuxt-link></p>

      <h2>Har du inte ett konto sedan tidigare?</h2>
      <p>Då har vi skapat ett konto åt dig och fyllt det med 350kr!</p>
      <p>Du behöver bara hämta ett nytt lösenord kopplat till den email du fått den här länken genom.</p>
      <p><nuxt-link
            :to="localePath('/reset-password')"
            class="uk-button uk-button-primary">Hämta nytt lösenord här</nuxt-link></p>

    </div>
  </section>
</template>


<script>
import Page from '@/components/Page'
import TextContent from '@/components/TextContent'

export default {
  head () {
    return {
      title: 'Du har fått 350kr!',
    }
  },
  components: {
    Page,
    TextContent
  },
  data () {
    
  },
  mounted () {
    
  }
}
</script>

<style scoped>

</style>

