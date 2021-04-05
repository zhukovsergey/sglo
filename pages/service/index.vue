<template>
  <div class="container">
   <p>Сервис</p>
   <div
   v-for="dat in data1"
   :key=dat._id><nuxt-link :to="`/service/${dat.url}`">{{dat.title}}</nuxt-link></div>
   </div>
</template>

<script>
import axios from 'axios'
export default {
  head () {
    return {
      title: 'Сервис',
      meta: [
        { hid: 'description', name: 'description', content: 'Seo optimization' },
        { hid: 'robots', name: 'robots', content: 'index,follow' }
      ]
    }
  },
  async asyncData () {
    const { data } = await axios.get('http://localhost:3000/api/service')
    return { data1: data }
  }
}
</script>

<style>

</style>
