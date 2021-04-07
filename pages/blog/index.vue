<template>
  <div class="container">
   <v-btn class="primary my-md-6" to="/blog/national-projects" nuxt>Национальные проекты</v-btn>
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
    <v-img
      src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
      :lazy-src="`https://cdn.vuetifyjs.com/images/cards/sunshine.jpg`"
      height="200px"
    ></v-img>

     <v-card-subtitle>
      {{dat.introtext}}
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
      if (isNaN($nuxt.$route.query.page)) {
        const nextPage = 2
        const pagination = 2
        console.log(nextPage)
        console.log(pagination)
      }
      const nextPage = parseInt($nuxt.$route.query.page) + 1
      const pagination = parseInt($nuxt.$route.query.page) + 1
      console.log(nextPage)
      console.log(pagination)
      const config = {
        headers: { page: pagination }
      }
      await axios
        .get('http://localhost:3000/api/blog', config)
        .then(response => (this.blogs = response.blogs))
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
        .then(response => (this.blogs = response.blogs))
      this.$router.push('/blog?page=' + nextPage)
      console.log(this.blogs)
    }
  },
  data: () => ({
    show: false
  })
}
</script>

<style>
</style>
