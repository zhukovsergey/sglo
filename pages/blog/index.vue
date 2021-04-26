<template>
  <div class="container">
   <v-btn class="primary my-md-6" to="/blog/national-projects" nuxt>Национальные проекты</v-btn>
   <v-btn class="primary my-md-6" to="/blog/education" nuxt>Образование</v-btn>
  <v-row>
  <v-col
  v-for="dat in data1"
:key=dat._id>
<v-card
class="mx-auto"
max-width="300"
><nuxt-link :to="`/blog/${dat.url}`">
<v-card-title>
      {{dat.title}}
    </v-card-title>
    <div
v-for="(filelink, index) in dat.coverImageName"
:key="filelink.path"
itemscope
itemprop="image"
itemtype="http://schema.org/ImageObject">
    <v-img
      v-if="(index == 0)"
      :src="`/uploads/blog/${filelink.filename}`"
      :lazy-src="`/uploads/blog/${filelink.filename}`"
      height="200px"
    ></v-img></div>

     <v-card-subtitle>
      {{dat.introtext| truncate(60, '...')}}
    </v-card-subtitle>
     <v-card-subtitle>
      {{dat.tag}}
    </v-card-subtitle>

    <v-card-actions>
      <v-btn
        color="green"
        danger
        style="font-size: 16px; text-decoration: none;"
      >
        ПОДРОБНЕЕ...
      </v-btn>

      <v-spacer></v-spacer>
</v-card-actions>

   </nuxt-link>
  </v-card>
  </v-col>
  </v-row>
   <button v-on:click="prevPagination($nuxt)" v-if="$nuxt.$route.query.page > 1" class="pagination-button">
    Назад
  </button>
  <button v-on:click="nextPagination($nuxt)" class="pagination-button">
 Далее
  </button>
  <div class="ya-share2" data-curtain data-size="s" data-shape="round" data-services="messenger,vkontakte,facebook,odnoklassniki,telegram,viber,whatsapp"></div>
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
  },
  methods: {
    async nextPagination ($nuxt) {
      $nuxt.$route.query.page = 1
      if (isNaN($nuxt.$route.query.page)) {
        const nextPage = 2
        const pagination = 2
        console.log(nextPage)
        console.log(pagination)
      }
      const nextPage = parseInt($nuxt.$route.query.page) + 1
      const pagination = parseInt($nuxt.$route.query.page) + 1
      // console.log(nextPage)
      // console.log(pagination)
      const config = {
        headers: { page: pagination }
      }
      await axios
        .get('http://localhost:3000/api/blog', config)
        .then(response => (this.data1 = response.data))
      this.$router.push('/blog?page=' + nextPage)
    },
    async prevPagination ($nuxt) {
      const nextPage = parseInt($nuxt.$route.query.page) - 1
      const pagination = parseInt($nuxt.$route.query.page) - 1
      const config = {
        headers: { page: pagination }
      }
      await axios
        .get('http://localhost:3000/api/blog', config)
        .then(response => (this.data1 = response.data))
      this.$router.push('/blog?page=' + nextPage)
      console.log(this.data2)
    }
  },
  filters: {
    truncate (text, length, suffix) {
      return text.substring(0, length) + suffix
    }
  },
  data: () => ({
    show: false,
    pagination: ''
  })
}
</script>

<style>
</style>
