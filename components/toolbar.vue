<template>
  <div>
    <v-toolbar
      color="#e6dde6"
      height="250px"
      max-height="250px"
    >
      <nuxt-link to="/" style="text-decoration: none;">
        <v-toolbar-title class="mt-md-2 hidden-xs-only">
          Союз женщин<br> Липецкой области
        </v-toolbar-title>
      </nuxt-link>
      <span class="subheading"><nuxt-link to="/"><img id="my-svg" width="150" src="http://localhost:3000/uploads/blog/SGLOnew_animated.svg?data"></img></nuxt-link></span>
      <v-divider
        class="mx-4"
        vertical
      />
      <nuxt-link to="/" style="text-decoration: none;">
        <v-toolbar-title class="mt-md-2 hidden-xs-only">
          Союз женщин<br> России
        </v-toolbar-title>
      </nuxt-link>
      <nuxt-link to="/">
        <span class="subheading"> <img id="my-svg1" width="135" src="http://localhost:3000/uploads/blog/wuor_animated.svg?data"></span>
      </nuxt-link>
      <v-spacer />
      <v-toolbar-items color="#ad6262">
        <v-btn
          color="rgb(255 243 243 / 42%)"
          elevation="6"
          class="mx-2"
          style="color:#ad6262; font-size: 17px; font-weight: 700; border-radius: 30px;"
          to="/blog"
          nuxt
        >
          <v-icon
            dark
            left
            medium
            class="ma-2"
          >
            mdi-newspaper-variant-multiple
          </v-icon>
          Новости
        </v-btn>
        <v-divider vertical />

        <v-btn
          color="rgb(255 243 243 / 42%)"
          elevation="6"
          class="mx-2"
          style="color:#ad6262; font-size: 17px; font-weight: 700; border-radius: 30px;"
          to="/service"
          nuxt
        >
          <v-icon
            dark
            left
            medium
            class="ma-2"
          >
            mdi-folder-information-outline
          </v-icon>
          Информация
        </v-btn>
        <v-divider vertical />

        <v-btn
          color="rgb(255 243 243 / 42%)"
          elevation="6"
          class="mx-2"
          style="color:#ad6262; font-size: 17px; font-weight: 700; border-radius: 30px;"
          to="/keisi"
          nuxt
        >
          Проекты
        </v-btn>

        <v-divider vertical />
      </v-toolbar-items><br>
      <v-app-bar-nav-icon class="hidden-md-and-up" @click="drawer = true" />
      <div class="searchblock">
        <input
          id="search"
          v-model="search"
          class="wiki-search"
          type="search"
          placeholder="Поиск по сайту"
          @blur="destroySearch"
          @input="searchWiki"
        >
        </input>
        <v-icon id="mdisearch" large color="blue darken-2">
          mdi-magnify
        </v-icon>
        <div id="searchresults" class="search-results">
          <v-card v-if="dataSearch">
            <div v-for="wiki in dataSearch" :key="wiki._id" class="search-result">
              <nuxt-link
                :to="`/blog/${wiki.url}`"
              >
                {{ wiki.h1 }}
              </nuxt-link>
            </div>
          </v-card>
          <v-card v-else-if="searchError">
            <div ref="error" class="search-results search-error">
              <div :v-model="searchError" class="search-result" style="padding: 10px">
                {{ searchError }}
              </div>
            </div>
          </v-card>
        </div>
      </div>
    </v-toolbar>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              <nuxt-link to="/">
                Главная
              </nuxt-link>
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              <nuxt-link to="/blog">
                Новости
              </nuxt-link>
            </v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              <nuxt-link to="/service">
                Информация
              </nuxt-link>
            </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data: () => ({
    drawer: false,
    group: null,
    search: '',
    dataSearch: '',
    searchError: ''
  }),
  mounted () {
    setTimeout(this.destroySearch(), 4000)
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
          this.$refs.error.style.display = 'none'
          this.searchError = 'Минимальная длина запроса 3 символа'
        }
      } else if (this.search.length < 1) {
        this.dataSearch = []
        this.searchError = 'Ввудите запрос'
        if (this.$refs.error) {
          this.$refs.error.style.display = 'none'
        }
      }
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
