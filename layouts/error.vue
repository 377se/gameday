<template>
  <div class="uk-container uk-padding">
    <h1>Sidan hittades tyvärr inte :(</h1>
    <p>Deppa inte över det, vi kan hjälpa dig hitta något kul:</p>
    <p>
      <nuxt-link :to="localePath('/')">Gå till startsidan</nuxt-link>
    </p>
  </div>
</template>

<script>
import Page from '@/components/Page'

export default {
  head () {
    return {
      title: 'Gameday - 404 - Sidan kan tyvärr inte hittas',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Gameday - Sidan hittades inte.',
        },
        {
          hid: 'og:title',
          name:  'og:title',
          content:  'Gameday - 404 - Sidan kan tyvärr inte hittas',
        },
        {
          hid: 'og:description',
          name:  'og:description',
          content: 'Gameday - Sidan hittades inte',
        }
      ]
    }
  }
};
</script>

<style lang="scss">

</style>
