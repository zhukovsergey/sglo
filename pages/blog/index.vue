<template>
  <div class="container">
    <v-breadcrumbs large>
      <v-breadcrumbs-item to="/" nuxt>
        Главная
      </v-breadcrumbs-item>
      <v-breadcrumbs-item to="/blog" disabled nuxt>
        Блог
      </v-breadcrumbs-item>
    </v-breadcrumbs>
     <v-btn class="primary my-md-6 my-sm-2 my-xs-2" small to="/blog" nuxt>
      Все
    </v-btn>
    <v-btn class="primary my-md-6 my-sm-2 my-xs-2" small to="/blog/national-projects" nuxt>
      Национальные проекты
    </v-btn>
    <v-btn class="primary my-md-6 my-sm-2 my-xs-2" small to="/blog/education" nuxt>
      Образование
    </v-btn>
    <v-btn class="primary my-md-6 my-sm-2 my-xs-2" small to="/blog/health" nuxt>
      Здравоохранение
    </v-btn>
    <v-row no-gutters>
      <v-col v-for="dat in data1" :key="dat._id">
        <v-card class="mx-auto my-4" max-width="320">
          <span
            style="float:right; font-size: 12px;"
            class="px-2"
          ><v-icon small>mdi-eye</v-icon>{{ dat.views }}</span>

          <nuxt-link :to="`/blog/${dat.url}`" style="text-decoration:none;">
            <v-card-title class="text-center">
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
            </div>

            <v-card-subtitle>
              {{ dat.introtext | truncate(60, '...') }}
            </v-card-subtitle><center>
            <hr size="1" calss="text-center" style="width: 75%; color: #d5e6f7;"></hr></center>
            <v-card-subtitle>
              Тема: {{ dat.tag }}
            </v-card-subtitle>
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
        </v-card>
      </v-col>
    </v-row>
    <br>
    <v-btn
      v-if="$nuxt.$route.query.page > 1"
      class="pagination-button primary"
      @click="prevPagination($nuxt)"
    >
      Назад
    </v-btn>
    <v-btn class="pagination-button primary" @click="nextPagination($nuxt)">
      Далее
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
export default {
  filters: {
    truncate (text, length, suffix) {
      return text.substring(0, length) + suffix
    }
  },
  async asyncData () {
    const { data } = await axios.get('https://zabbix.etalon48.com/api/blog')
    return { data1: data }
  },
  data: () => ({
    show: false,
    pagination: ''
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
      const config = {
        headers: { page: pagination }
      }
      await axios
        .get('https://zabbix.etalon48.com/api/blog', config)
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
        .get('https://zabbix.etalon48.com/api/blog', config)
        .then(response => (this.data1 = response.data))
      this.$router.push('/blog?page=' + nextPage)
      console.log(this.data2)
    }
  }
}
</script>

<style scoped>
.v-card__title {
    padding: 18px;
}
</style>
