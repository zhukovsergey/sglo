<template>
  <div>
    <Headercomp />
    <Nuxt />
    123
  </div>
</template>

<script>
import headercomp from '~/components/headercomp.vue'
export default {
  components: {
    headercomp
  },
  head () {
    return {
      link: [
        { rel: 'canonical', href: 'http://xn--48-mlcdei8abd3a7g9b.xn--p1ai' + this.$route.path }
      ]
    }
  }
}
</script>
