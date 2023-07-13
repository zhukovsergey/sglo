<template>
  <div>
    <Headercomp />
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
        { rel: 'canonical', href: 'https://xn--48-mlcdei8abd3a7g9b.xn--p1ai' + this.$route.path }
      ]
    }
  }
}
</script>
