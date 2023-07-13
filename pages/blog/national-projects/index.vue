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
    <blogthemes />

    <v-row>
      <v-col v-for="dat in data1" :key="dat._id">
        <div>
        <v-lazy transition="fade-transition">
        <v-card class="mx-auto" max-width="300">
          <span
            style="float:right; font-size: 12px;"
            class="px-2"
          ><v-icon small>mdi-eye</v-icon>{{ dat.views }}</span>

          <nuxt-link :to="`/blog/${dat.url}`" style="text-decoration: none;">
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
            </v-card>
          </v-lazy>
        </div>
      </v-col>
    </v-row>
    <br>
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
  async asyncData () {
    const { data } = await axios.get(
      'https://xn--48-mlcdei8abd3a7g9b.xn--p1ai/api/blog/national-projects'
    )
    return { data1: data }
  },
  data: () => ({
    show: false,
    pagination: '',
    loadMore: true // прокрутка комментов
  }),
  head () {
    return {
      title:
        'Статьи на тему "Национальные проекты" Союза женщин Липецкой обалсти',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Актуальные новости и статьи на тему Национальных проектов с официального сайта Союза женщин Липецкой области'
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
