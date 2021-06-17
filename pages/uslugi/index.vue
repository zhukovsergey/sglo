<template>
  <div class="container">
   <p>Услуги</p>
   <nuxt-link to="site">Вторая страница</nuxt-link>
  </div>
</template>

<script>
export default {
  head () {
    return {
      title: 'Услуги',
      meta: [
        { hid: 'description', name: 'description', content: 'Seo optimization' },
        { hid: 'robots', name: 'robots', content: 'index,follow' }
      ]
    }
  }

}
</script>

<style>

</style>
