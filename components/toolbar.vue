<template>
  <div class="container-fluid">
  <div class="logincard" style="position: absolute;  z-index: 99; right: 2%; top: 13px;">
  <span v-if="this.$auth.loggedIn" ><v-icon large>mdi-account</v-icon> {{$store.state.auth.user}} </span>
  <v-btn
  v-if="this.$auth.loggedIn"
  text
  small
  @click="logout"
  >
  <v-icon medium>mdi-logout</v-icon> Выйти
  </v-btn>
  <v-btn
  v-if="this.$auth.loggedIn==false"
  text
  small
  nuxt
  to="/login"
  >
  <v-icon medium>mdi-login-variant</v-icon> Войти
  </v-btn>
  </div>
   <div
       v-if="this.$auth.loggedIn"
              >
              <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
      <v-btn
      style="position: fixed;  z-index: 99; right: 2%; bottom: 2%;"
        color="indigo"
        to="/blog/new"
        v-bind="attrs"
        v-on="on"
        nuxt
        fab
        dark
        bottom
      ><v-icon dark>
        mdi-plus
      </v-icon>
      </v-btn>
        </template>
      <span>Новая статья</span>
    </v-tooltip>
    </div>
    <v-toolbar
      color="#f5eff5"
      height="150px"
      max-height="150px"
    >
      <nuxt-link to="/" style="text-decoration: none;">
        <v-theme-provider root>
          <v-toolbar-title class="mt-md-2 hidden-xs-only">
            Союз женщин<br> Липецкой области
          </v-toolbar-title>
        </v-theme-provider>
      </nuxt-link>
      <span class="subheading"><nuxt-link to="/">
      <img
      id="my-svg"
      width="150"
      src="https://xn--48-mlcdei8abd3a7g9b.xn--p1ai/uploads/blog/SGLOnew_animated.svg?data"
      lazy-src="https://xn--48-mlcdei8abd3a7g9b.xn--p1ai/uploads/blog/SGLOnew_animated.svg?data"
      data-src="https://xn--48-mlcdei8abd3a7g9b.xn--p1ai/uploads/blog/SGLOnew_animated.svg?data"
      alt="Логотип Союза женщин Липецкой области"
      >
      </img></nuxt-link></span>
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
        <span class="subheading"> <img id="my-svg1" width="135" src="https://xn--48-mlcdei8abd3a7g9b.xn--p1ai/uploads/blog/wuor_animated.svg?data" alt="Логотип Союза женщин России"></span>
      </nuxt-link>
      <v-spacer />
      <v-toolbar-items color="#ad6262">
        <v-btn
          color="rgb(255 243 243 / 42%)"
          elevation="6"
          class="mx-2"
          style="color:#ad6262; font-size: 17px; font-weight: 700; border-radius: 14px;"
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
          <v-badge
          color="green"
          :content="counts"
        >
          Новости
          </v-badge>
        </v-btn>
        <v-divider vertical />

        <v-btn
          color="rgb(255 243 243 / 42%)"
          elevation="6"
          class="mx-2"
          style="color:#ad6262; font-size: 17px; font-weight: 700; border-radius: 14px;"
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
          style="color:#ad6262; font-size: 17px; font-weight: 700; border-radius: 14px;"
          to="/keisi"
          nuxt
        >
          Проекты
        </v-btn>
        <v-divider vertical />
      </v-toolbar-items><br>
      <v-app-bar-nav-icon class="hidden-md-and-up" @click="drawer = true" />
    </v-toolbar>
    <v-navigation-drawer v-model="drawer" absolute temporary>
     <div style="position: relative;  z-index: 99; right: 2%; top: 13px;" class="mx-4">
  <span v-if="this.$auth.loggedIn" ><v-icon large>mdi-account</v-icon> {{$store.state.auth.user}} </span>
  <v-btn
  v-if="this.$auth.loggedIn"
  text
  small
  @click="logout"
  >
  <v-icon medium>mdi-logout</v-icon> Выйти
  </v-btn>
  </div>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="text-button">
              <nuxt-link to="/">
                Главная
              </nuxt-link>
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="text-button">
              <nuxt-link to="/blog">
                Новости
              </nuxt-link>
            </v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="text-button">
              <nuxt-link to="/service">
                Информация
              </nuxt-link>
            </v-list-item-title>
          </v-list-item>
          <div class="searchblock2">
            <v-text-field
              id="search"
              v-model="search"
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
                  style="padding: 10px;"
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
                    style="padding: 10px; width: 250px;"
                  >
                    {{ searchError }}
                  </div>
                </div>
              </v-card>
            </div>
          </div>
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
    counts: '',
    dat: '',
    dataSearch: '',
    searchError: ''
  }),
  mounted () {
    setTimeout(this.destroySearch(), 4000)
    this.count()
  },
  methods: {
    async searchWiki () {
      if (this.search.length > 2) {
        this.searchError = 'Ничего не найдено'
        const config = {
          params: { searchText: this.search }
        }
        await axios
          .get('https://xn--48-mlcdei8abd3a7g9b.xn--p1ai/api/blog/search', config)
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
          this.$refs.error.style.display = 'block'
        }
      }
    },
    async count () {
      const res = await axios.get(
        'https://xn--48-mlcdei8abd3a7g9b.xn--p1ai/api/allblogs'
      )
      this.counts = res.data
      console.log(res.data.count)
    },
    destroySearch () {
      const v = this
      setTimeout(function () {
        v.dataSearch = ''
        v.searchError = ''
        v.search = ''
      }, 500)
    },
    async logout () {
      try {
        await this.$auth.logout()
        await this.$toasted.show('<span style="font-family: coursive; font-size: 23px;">Успешно вышли</span>', {
          theme: 'bubble',
          position: 'top-center',
          duration: 4000
        })
        location.reload()
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
