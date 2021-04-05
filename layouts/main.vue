<template>
  <div>
    <Headercomp/>
    <Nuxt />
    123
  </div>
</template>

<script>
import headercomp from '~/components/headercomp.vue'
export default {
  head () {
    return {
      link: [
        { rel: 'canonical', href: 'http://localhost:3000' + this.$route.path }
      ]
    }
  },
  components: {
    headercomp
  }
}

</script>
