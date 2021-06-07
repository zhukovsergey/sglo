<template>
  <v-app id="inspire">
    <v-container fluid>
      <toolbar />

      <v-main>
        <v-row>
          <v-col cols="10" sm="6" md="3" xs="8">
            <v-switch
              v-model="$vuetify.theme.dark"
              hint="Этот переключатель со светлого оформления на темное"
              inset
              label="Переключатель оформления"
              persistent-hint
            />
          </v-col>
          <v-col sm="5" md="6" lg="4" xs="4" class="mx-2 mt-2">
            <div class="searchblock">
              <v-text-field
                id="search"
                v-model="search"
                hide-details
                label="Поиск по сайту"
                class="wiki-search search"
                type="search"
                @blur="destroySearch"
                @input="searchWiki"
              />
              <div id="searchresults" class="search-results">
                <v-card v-if="dataSearch.length">
                  <div
                    v-for="wiki in dataSearch"
                    :key="wiki._id"
                    class="search-result"
                  >
                    <nuxt-link :to="`/blog/${wiki.url}`">
                      {{ wiki.h1 }}
                    </nuxt-link>
                  </div>
                </v-card>
                <v-card v-else>
                  <div
                    ref="error"
                    class="search-results search-error"
                    style="display:none;"
                  >
                    <div
                      :v-model="searchError"
                      class="search-result"
                      style="padding: 10px"
                    >
                      {{ searchError }}
                    </div>
                  </div>
                </v-card>
              </div>
            </div>
          </v-col>
          <v-col class="pt-2 mx-2 float: right;" md="3">
            <div class="weather">
              <p style="font-family:'font'; font-size: 18px;" solo>
                Погода в Липецке:

                {{ temperature }}
              </p>
              <v-img
                style="
                padding-top:
                -20px;
                "
                :src="`http://openweathermap.org/img/wn/${weathericon}@2x.png`"
                :lazy-src="
                  `http://openweathermap.org/img/wn/${weathericon}@2x.png`
                "
                height="90"
                contain
              />
            </div>
          </v-col>
        </v-row>

        <center>
          <span
            class="text-center hidden-xs-only"
            style="font-family:'Naut'; font-size: 40px; color:#1976d2;"
          >Наша сила - в единстве. Наше богатство - в многообразии!</span>
        </center>
        <v-row justify="center">
          <leftcolumn />
          <centercolumn />
          <rightcolumn />
        </v-row><br>
        <podval />
      </v-main>
    </v-container>
  </v-app>
</template>
<script>
import axios from 'axios'
import podval from './podval.vue'
import toolbar from './toolbar.vue'
import leftcolumn from './leftcolumn.vue'
import centercolumn from './centercolumn.vue'
import rightcolumn from './rightcolumn.vue'
export default {
  components: {
    toolbar,
    leftcolumn,
    centercolumn,
    rightcolumn,
    podval
  },

  data: () => ({
    search: '',
    dataSearch: '',
    searchError: '',
    temperature: '',
    mainweather: '',
    weathericon: ''
  }),
  head () {
    return {
      htmlAttrs: { lang: 'ru' },
      script: [
        {
          hid: 'stripe',
          src:
            'https://cdnjs.cloudflare.com/ajax/libs/vivus/0.4.5/vivus.min.js',
          defer: true
        },
        { hid: 'stripe1', src: '/uploads/script.js', defer: true }
      ]
    }
  },
  mounted () {
    this.weather()
    console.log(this.temperature)
  },
  methods: {
    async searchWiki () {
      if (this.search.length > 2) {
        this.searchError = 'Ничего не найдено'
        const config = {
          params: { searchText: this.search }
        }
        await axios
          .get('http://localhost:3000/api/blog/search', config)
          .then(response => (this.dataSearch = response.data))
      } else if (this.search.length > 0 && this.search.length < 3) {
        this.dataSearch = []
        if (this.$refs.error) {
          this.$refs.error.style.display = 'block'
          this.searchError = 'Минимальная длина запроса 3 символа'
        }
      } else if (this.search.length < 1) {
        this.dataSearch = []
        this.searchError = 'Введите запрос'
        if (this.$refs.error) {
          this.$refs.error.style.display = 'none'
        }
      }
    },
    async weather () {
      const res = await axios.get(
        'https://api.openweathermap.org/data/2.5/weather?q=Lipetsk,ru&appid=375b5b72defecfdfccfa090d50f49db4'
      )
      this.temperature = Math.round(res.data.main.temp - 273) + '°C'
      this.mainweather = res.data.weather[0].description
      this.weathericon = res.data.weather[0].icon
      console.log(res)
    },

    destroySearch () {
      const v = this
      setTimeout(function () {
        v.dataSearch = ''
        v.searchError = ''
        v.search = ''
      }, 500)
    }
  }
}
</script>
