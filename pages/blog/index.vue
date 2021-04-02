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
  data: () => ({
    show: false
  })
}
</script>

<style>
</style>
