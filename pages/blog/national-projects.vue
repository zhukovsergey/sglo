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
      src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
      height="200px"
    ></v-img>

     <v-card-subtitle>
      {{dat.introtext}}
    </v-card-subtitle>

    <v-card-actions>
      <v-btn
        color="orange lighten-2"
        text
      >
        Explore
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        icon
        @click="show = !show"
      >
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
          {{dat.introtext}}
        </v-card-text>
      </div>
    </v-expand-transition></nuxt-link>
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
  async asyncData ($this) {
    const config = {
      headers: { tag: $this.route.path }
    }
    const { data } = await axios.get(
      'http://localhost:3000/api/blog/tag',
      config
    )
    return { data1: data }
  },
  data: () => ({
    show: false
  })
}
</script>

<style>
</style>
