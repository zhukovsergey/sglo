<template>
  <div class="container">
  <h1 class="text-center">Новости Чаплыгинского районного отделения</h1>
  <div class="float-right mt-4" style="color: green;">
  Новостей в разделе:
  <span
  style="color: green;">
  {{data1.length}}
  </span>
  </div>
    <v-breadcrumbs large>
      <v-breadcrumbs-item to="/" nuxt>
        Главная
      </v-breadcrumbs-item>
      <v-breadcrumbs-item to="/blog" disabled nuxt>
        Блог
      </v-breadcrumbs-item>
    </v-breadcrumbs>
    <blogthemes />
    <v-row v-if="data1">
      <v-col v-for="(dat, index) in data1" :key="dat._id">
      <div v-if="index < pageSize">
        <v-card class="mx-auto" max-width="300">
          <span
            style="float:right; font-size: 12px;"
            class="px-2"
          ><v-icon small>mdi-eye</v-icon>{{ dat.views }}</span>

          <nuxt-link :to="`/blog/${dat.url}`">
            <v-card-title>
              {{ dat.h1 }}
            </v-card-title>
            <div
              v-for="(filelink, index) in dat.coverImageName"
              :key="filelink.path"
              itemscope
              itemprop="image"
              itemtype="http://schema.org/ImageObject"
            >
              <v-img
                v-if="index == 0"
                :src="`/uploads/blog/${filelink.filename}`"
                :lazy-src="`/uploads/blog/${filelink.filename}`"
                height="200px"
              />
            </div>

            <v-card-subtitle>
              {{ dat.introtext | truncate(60, '...') }}
            </v-card-subtitle>
            <center>
            <hr size="1" calss="text-center" style="width: 75%; color: #d5e6f7;"></hr></center>
            <v-card-subtitle>
              {{ dat.tag }}
            </v-card-subtitle>
            <span class="px-2" v-if="dat.region">
             <v-icon small>mdi-map-marker</v-icon> {{ dat.region }}
            </span> <br>
          </nuxt-link><span
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
        </v-card></div>
      </v-col>
    </v-row>
    {{this.$store.getters["getSelectedDankov"]}}
    <v-row v-if="data1.length < 1">
    <h3 class="px-4">К сожалению, в этом разделе пока нет новостей</h3>
    </v-row>
    <br>
   <v-btn
      v-if="data1.length > 6"
      depressed
      color="primary"
      @click="pageSize += pageSize"
    >
      Показать еще...
    </v-btn>
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
import blogthemes from '~/components/blogthemes.vue'
export default {
  components: {
    blogthemes
  },
  filters: {
    truncate (text, length, suffix) {
      return text.substring(0, length) + suffix
    }
  },
  async asyncData ({ store }) {
    const { data } = await axios.get(
      'https://zabbix.etalon48.com/api/blog/regions/chapligin'
    )
    return { data1: data }
  },
  data: () => ({
    show: false,
    pagination: '',
    loadMore: true, // прокрутка комментов
    page: 1, // прокрутка комментов
    pageSize: 6 // прокрутка комментов
  }),
  head () {
    return {
      title:
        'Статьи Чаплыгинского регионального отделения Союза женщин',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Актуальные новости и статьи Чаплыгинского регионального отделения с официального сайта Союза женщин Липецкой области'
        },
        { hid: 'robots', name: 'robots', content: 'index,follow' }
      ]
    }
  },
  methods: {
  }
}
</script>

<style></style>
