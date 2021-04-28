<template>
  <div class="container">
   <p>Главная</p>
   <v-carousel hide-delimiters>
  <div
  v-for="dat2 in data1.slice(0, 2)"
  :key="dat2._id">
  <div
  v-for="(filelink, index) in dat2.coverImageName"
  :key="filelink.path"
  >
  <v-carousel-item
 v-if="(index < 1)"
 :src="`/uploads/blog/${filelink.filename}`"
    >
    <nuxt-link :to="`blog/${dat2.url}`">

    <v-row
          class="fill-height"
          align-items="end"
          justify="center"
          align-content="end"
        >
        <div class="display-1 mt-6 mx-3 zagolovok">
        {{dat2.h1}}
          </div>
        </v-row></nuxt-link></v-carousel-item></div></div>
  </v-carousel>
  <center><h3 class="mt-6">Последние новости</h3></center>
  <v-row no-gutters class="mt-8">
      <v-col
      class="my-2"
      v-for="dat in data1"
      :key="dat._id"
      >
      <nuxt-link :to="`/blog/${dat.url}`">
      <v-card
      class="mx-3"
    max-width="280"
  >
  <v-card-title>
      {{dat.h1}}
    </v-card-title>
    <div
v-for="(filelink, index) in dat.coverImageName"
:key="filelink.path">
    <v-img
    v-if="(index == 0)"
    :src="`/uploads/blog/${filelink.filename}`"
      :lazy-src="`/uploads/blog/${filelink.filename}`"
      height="200px"
    ></v-img></div>
    <v-card-subtitle>
      {{dat.introtext | truncate(60, '...')}}
    </v-card-subtitle>

    <v-card-actions>
      <v-btn
        color="green lighten-2"
        text
      >
        Подробнее...
      </v-btn>
      <v-spacer></v-spacer>
      </v-card-actions>
      </v-card></nuxt-link>
      </v-col>
      </v-row>
      <yandex-share :services="['vkontakte','facebook','twitter']" counter />
  </div>
</template>

<script>
import YandexShare from '@cookieseater/vue-yandex-share'
import axios from 'axios'
export default {
  head () {
    return {
      title: 'Союз женщин Липецкой области - официальный сайт',
      meta: [
        { hid: 'description', name: 'description', content: 'Официальный сайт Союза женщин Липецкой области. Новости, контакты и информация.' },
        { hid: 'robots', name: 'robots', content: 'index,follow' }
      ]
    }
  },
  components: {
    YandexShare
  },
  async asyncData () {
    const { data } = await axios.get('http://localhost:3000/api/blog/last10')
    return { data1: data }
  },
  filters: {
    truncate (text, length, suffix) {
      return text.substring(0, length) + suffix
    }
  },
  data: () => ({
    model: 0,
    colors: [
      'primary',
      'secondary',
      'yellow darken-2',
      'red',
      'orange'
    ]
  })
}
</script>

<style>

</style>
