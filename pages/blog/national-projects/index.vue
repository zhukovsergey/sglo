<template>
  <div class="container">
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
      :src="`/uploads/blog/${dat.coverImageName}`"
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
        color="orange lighten-2"
        text
      >
        Подробнее...
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
    const { data } = await axios.get('http://localhost:3000/api/blog/national-projects')
    return { data1: data }
  },
  data: () => ({
    show: false
  })
}
</script>

<style>
</style>
