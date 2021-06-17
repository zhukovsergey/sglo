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
        { rel: 'canonical', href: 'http://localhost:3000' + this.$route.path }
      ]
    }
  }
}
</script>
