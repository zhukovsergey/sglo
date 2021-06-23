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
        { rel: 'canonical', href: 'https://zabbix.etalon48.com' + this.$route.path }
      ]
    }
  }
}
</script>
