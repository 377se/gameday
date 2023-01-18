<router>
  {
    path: '/c/:parentid/:categoryid/:categoryname/index',
    alias: [
      {
        path: '/c/:parentid/:categoryid/:categoryname/a/:id/:slug'
      }
    ]
  }
  </router>
<template>
  <PageArticle />
</template>

<script>
export default {
  cache: true
}
</script>
