<template>
  <div>
  <div class="blog-block">
   <p>Блог</p>
   <div
   class="blog"
   v-for="dat in data1"
   :key=dat._id><nuxt-link :to="`/blog/${dat.url}`">{{dat.h1}}
   <img
   :src="`/uploads/blog/${dat.coverImageName}`"
    width="200"/> {{dat.introtext}}
    {{dat.tag}}
   </nuxt-link>
   </div></div>
   </div>
</template>

<script>
import axios from 'axios'
export default {
  head () {
    return {
      title: 'Блог',
      meta: [
        { hid: 'description', name: 'description', content: 'Seo optimization' },
        { hid: 'robots', name: 'robots', content: 'index,follow' }
      ]
    }
  },
  async asyncData () {
    const { data } = await axios.get('http://localhost:3000/api/blog')
    return { data1: data }
  }

}
</script>

<style>
</style>
