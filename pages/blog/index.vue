<template>
  <div class="container">
    <div>
    <v-menu
    auto
      :close-on-click="closeOnClick"
      transition="scale-transition"
      style="margin-top: 5px;"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
         style="float:right; margin-top: 21px;"
          color="teal"
          dark
          v-bind="attrs"
          v-on="on"
        >
         <v-icon>mdi-format-align-center</v-icon> Выбор района
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          v-for="item in regions"
          :key="item.name"
          link
        >
          <v-list-item-title><nuxt-link :to="`/blog/${item.url}`">{{ item.name }}</nuxt-link></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu></div>
    <v-breadcrumbs large>
      <v-breadcrumbs-item to="/" nuxt>
        Главная
      </v-breadcrumbs-item>
      <v-breadcrumbs-item to="/blog" disabled nuxt>
        Блог
      </v-breadcrumbs-item>
    </v-breadcrumbs>
     <blogthemes />
    <v-row no-gutters>
      <v-col v-for="dat in items" :key="dat._id">
       <v-lazy
        transition="fade-transition"
        :options="{
          threshold: 1
        }"
       > <v-card class="mx-auto my-4" max-width="320">
          <span
            style="float:right; font-size: 12px;"
            class="px-2"
          ><v-icon small>mdi-eye</v-icon>{{ dat.views }}</span>
          <nuxt-link :to="`/blog/${dat.url}`" style="text-decoration:none;">
            <v-card-title class="text-center">
              {{ dat.h1 }}
            </v-card-title>
            <div v-if="!dat.thumb">
            <div
              v-for="(filelink, index) in dat.coverImageName"
              :key="filelink.path"
              itemscope
              itemprop="image"
              itemtype="https://schema.org/ImageObject"
            >
              <v-img
                v-if="index == 0"
                :src="`/uploads/blog/${filelink.filename}`"
                :lazy-src="`/uploads/blog/${filelink.filename}`"
                height="200px"
              >
              <template v-slot:placeholder>
          <v-row
            class="fill-height ma-0"
            align="center"
            justify="center"
          >
            <v-progress-circular
              indeterminate
              color="grey lighten-5"
            ></v-progress-circular>
          </v-row>
        </template>
              </v-img>
            </div></div>
            <div v-if="dat.thumb">
            <div
              v-for="(filelink, index) in dat.thumb"
              :key="filelink.path"
              itemscope
              itemprop="image"
              itemtype="https://schema.org/ImageObject"
            >
              <v-img
               class="resized"
                v-if="index == 0"
                :src="`/${filelink}`"
                :lazy-src="`/${filelink}`"
                height="200px"
                contain
                style="border-radius: 8px;"
              >
              <template v-slot:placeholder>
          <v-row
            class="fill-height ma-0"
            align="center"
            justify="center"
          >
            <v-progress-circular
              indeterminate
              color="grey lighten-5"
            ></v-progress-circular>
          </v-row>
        </template>
              </v-img>
            </div></div>

            <v-card-subtitle>
              {{ dat.introtext | truncate(60, '...') }}
            </v-card-subtitle>
            <center>
            <hr size="1" calss="text-center" style="width: 75%; color: #d5e6f7;"></hr></center>
            <v-card-subtitle>
              Тема: {{ dat.tag }}
            </v-card-subtitle>
            <span class="px-2" v-if="dat.region">
             <v-icon small>mdi-map-marker</v-icon> {{ dat.region }}
            </span> <br>
          </nuxt-link>
          <span
            class="px-2"
            style="font-size: 12px;"
          >Опубликовано:
            {{
              $dateFns.format(dat.createdDate, 'dd-MMMM-yyyy', { locale: 'ru' })
            }}
          </span>
          <nuxt-link :to="`/blog/${dat.url}`">
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
          </nuxt-link>
        </v-card></v-lazy>
      </v-col>
    </v-row>
    <br>
    <Observer @intersect="intersected"/>
   <!-- <v-btn
      v-if="$nuxt.$route.query.page > 1"
      class="pagination-button primary"
      @click="prevPagination($nuxt)"
    >
      Назад
    </v-btn>
    <v-btn class="pagination-button primary" @click="nextPagination($nuxt)">
      Далее
    </v-btn> -->
    <div
      class="ya-share2"
      data-curtain
      data-size="s"
      data-shape="round"
      data-services="messenger,vkontakte,facebook,odnoklassniki,telegram,viber,whatsapp"
    />
  </div>
</template>
<script>
import axios from 'axios'
import Observer from './observer.vue'
import blogthemes from '~/components/blogthemes.vue'
export default {
  components: {
    blogthemes,
    Observer
  },
  filters: {
    truncate (text, length, suffix) {
      return text.substring(0, length) + suffix
    }
  },
  async asyncData () {
    const { data } = await axios.get('https://xn--48-mlcdei8abd3a7g9b.xn--p1ai/api/blog')
    return { data1: data }
  },
  data: () => ({
    page: 1,
    items: [],
    closeOnClick: true,
    show: false,
    pagination: '',
    regions: [
      { name: 'г. Липецк', url: 'regions/lipetsk' },
      { name: 'Липецкий район', url: 'regions/lipetsk-region' },
      { name: 'г.Елец', url: 'regions/elets' },
      { name: 'Елецкий район', url: 'regions/eletsky' },
      { name: 'Воловский район', url: 'regions/volovo' },
      { name: 'Грязинский район', url: 'regions/gryazi' },
      { name: 'Данковский район', url: 'regions/dankov' },
      { name: 'Добринский район', url: 'regions/dobrinka' },
      { name: 'Добровский район', url: 'regions/dobroe' },
      { name: 'Долгоруковский район', url: 'regions/dolgorukovo' },
      { name: 'Задонский район', url: 'regions/zadonsk' },
      { name: 'Измалковский район', url: 'regions/izmalkovo' },
      { name: 'Краснинский район', url: 'regions/krasnoe' },
      { name: 'Лебедянский район', url: 'regions/lebedyan' },
      { name: 'Лев-Толстовский район', url: 'regions/lev-tolstoy' },
      { name: 'Становлянский район', url: 'regions/stanovoe' },
      { name: 'Тербунский район', url: 'regions/terbuni' },
      { name: 'Усманский район', url: 'regions/usman' },
      { name: 'Хлевенский район', url: 'regions/hlevnoe' },
      { name: 'Чаплыгинский район', url: 'regions/chapligin' }
    ]
  }),
  head () {
    return {
      title: 'Статьи и новости Союза женщин Липецкой области',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Актуальные новости и статьи с официального сайта Союза женщин Липецкой области'
        },
        { hid: 'robots', name: 'robots', content: 'index,follow' }
      ]
    }
  },
  methods: {
    async intersected () {
      const config = {
        headers: { page: this.page }
      }
      const res = await fetch('https://xn--48-mlcdei8abd3a7g9b.xn--p1ai/api/blog', config)
      if (this.page > 1) {
        this.$router.push(`/blog?page=${
        this.page
      }`)
      }
      this.page++
      const items = await res.json()
      this.items = [...this.items, ...items]
    }
  }
}
</script>

<style scoped>
.v-card__title {
    padding: 18px;
}
</style>
