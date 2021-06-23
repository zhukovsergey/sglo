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
        { rel: 'canonical', href: 'http://zabbix.etalon48.com' + this.$route.path }
      ]
    }
  }
}
</script>
