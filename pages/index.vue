<template>
  <div class="container">
    <v-carousel hide-delimiters>
      <div v-for="dat2 in sliders.slice(0, 2)" :key="dat2.src">
        <v-lazy>
        <nuxt-link :to="dat2.kuda">
        <v-carousel-item :src="dat2.src" :lazy-src="dat2.src">
            <v-row
              align-items="end"
              justify="center"
              align-content="end"
            >
              <div
              class="headline mt-6 mx-3 zagolovok"
              style="position: absolute; top: 75%;"
              >
                {{ dat2.text }}
              </div>
            </v-row>
        </v-carousel-item></nuxt-link></v-lazy>
      </div>
    </v-carousel>
    <center>
      <h3 class="mt-6">
        Последние новости
      </h3>
    </center>
    <v-divider></v-divider>
    <v-row no-gutters class="mt-8">
      <v-col v-for="dat in data1" :key="dat._id" class="my-2">
        <nuxt-link :to="`/blog/${dat.url}`" style="text-decoration: none;">
          <v-card class="mx-3" max-width="280">
            <v-card-title>
              {{ dat.h1 }}
            </v-card-title>
            <div
              v-for="(filelink, index) in dat.coverImageName"
              :key="filelink.path"
            >
             <!--<v-img
                v-if="index == 0"
                :src="`/uploads/blog/${filelink.filename}`"
                :lazy-src="`/uploads/blog/${filelink.filename}`"
                height="200px"
              /> -->
             <picture v-if="index == 0 && !dat.thumb">
    <source type="image/webp" :srcset="`/uploads/blog/${filelink.filename.split('.')[0] }.webp`">
     <source type="image/jpeg" :srcset="`/uploads/blog/${filelink.filename}`">
    <img
    style="object-fit:cover; width:100%; height: 200px; min-width: 250px;"
    class="px-2 py-2"
    :src="`/uploads/blog/${filelink.filename}`"
    :data-src="`/uploads/blog/${filelink.filename}`"
    :lazy-src="`/uploads/blog/${filelink.filename}`"
    v-lazy="`/uploads/blog/${filelink.filename}`"
    :alt="data1.h1"
    /></picture>

   <!-- <v-img
    height="200px"
    v-if="index == 0"
    :src="`/uploads/blog/${filelink.filename}`">
  <template #sources>
    <source :srcset="`/uploads/blog/${filelink.filename.slice(0,-4) }.webp`">
  </template>
</v-img>-->
            </div>
            <div
              v-for="(filelink, index) in dat.thumb"
              :key="filelink"
            >
             <!--<v-img
                v-if="index == 0"
                :src="`/uploads/blog/${filelink.filename}`"
                :lazy-src="`/uploads/blog/${filelink.filename}`"
                height="200px"
              /> -->
             <picture v-if="index == 0 && dat.thumb">
    <source type="image/webp" :srcset="`/${filelink.split('.')[0] }.webp`">
     <source type="image/jpeg" :srcset="`/${filelink}`">
    <img
    style="object-fit:cover; width:100%; height: 200px; min-width: 250px;"
    class="px-2 py-2"
    :src="`/${filelink}`"
    :data-src="`/${filelink}`"
    :lazy-src="`/${filelink}`"
    v-lazy="`/${filelink}`"
    :alt="data1.h1"
    /></picture>

   <!-- <v-img
    height="200px"
    v-if="index == 0"
    :src="`/uploads/blog/${filelink.filename}`">
  <template #sources>
    <source :srcset="`/uploads/blog/${filelink.filename.slice(0,-4) }.webp`">
  </template>
</v-img>-->
            </div>
            <v-card-subtitle>
              {{ dat.introtext | truncate(60, '...') }}
            </v-card-subtitle><center>
            <hr size="1" calss="text-center" style="width: 75%; color: #d5e6f7;"></hr></center>
            <v-card-subtitle>
              Тема: {{ dat.tag }}
            </v-card-subtitle>
            <span class="px-2" v-if="dat.region">
             <v-icon small>mdi-map-marker</v-icon> {{ dat.region }}
            </span> <br>
            <v-card-actions>
              <v-btn
                color="green"
                danger
                style="font-size: 16px; text-decoration: none;"
              >
                ПОДРОБНЕЕ...
              </v-btn>

              <v-spacer />
            </v-card-actions>
          </v-card>
        </nuxt-link>
      </v-col>
    </v-row>
    <yandex-share :services="['vkontakte', 'facebook', 'twitter']" counter />
  </div>
</template>

<script>
import YandexShare from '@cookieseater/vue-yandex-share'
import axios from 'axios'
export default {
  components: {
    YandexShare
  },
  filters: {
    truncate (text, length, suffix) {
      return text.substring(0, length) + suffix
    }
  },
  async asyncData () {
    const { data } = await axios.get('https://zabbix.etalon48.com/api/blog/last10')
    return { data1: data }
  },
  data: () => ({
    model: 0,
    colors: ['primary', 'secondary', 'yellow darken-2', 'red', 'orange'],
    sliders: [
      {
        src: '/uploads/slider/1.png',
        text: 'Информирование жителей Воловского района о вакцинации',
        kuda: '/blog/vakcina-edinstvennyi-nadezhnyi-sposob-izbezhat-zarazheniya'
      },
      {
        src: '/uploads/slider/2.png',
        text:
          'Вокруг света без билета',
        kuda: 'blog/vokrug-sveta-bez-bileta'
      }
    ]
  }),
  head () {
    return {
      title: 'Союз женщин Липецкой области - официальный сайт',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Официальный сайт Союза женщин Липецкой области. Новости, контакты и информация.'
        },
        { hid: 'robots', name: 'robots', content: 'index,follow' }
      ]
    }
  }
}
</script>

<style></style>
