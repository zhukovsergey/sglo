<template>
  <v-footer padless>
    <v-container fluid>
      <v-row justify="center" no-gutters>
        <v-btn
          v-for="link in links"
          :key="link.name"
          text
          rounded
          class="my-2"
        >
          <nuxt-link :to="link.src" style="color: white;">
            {{ link.name }}
          </nuxt-link>
        </v-btn>
      </v-row><v-divider color="white"></v-divider><v-row>
        <v-col
        color="blue"
          class="lighten-2 py-4 white--text text-center"
          cols="12"
          md="5"
        >
          <blockquote style="color: white; text-shadow: black 1px 3px 27px;">
            <p
              class="font-italic justify-content-end "
              style="font-size:20px;font-family:'Asessorc';"
            >
              {{ citate.citate }}
            </p>

            <cite style="padding-left: 190px;">{{ citate.author }}</cite>
          </blockquote>
        </v-col>
        <v-col
          class="lighten-2 py-4 white--text text-center"
          cols="12"
          md="4"
        >
          {{ new Date().getFullYear() }} —
          <strong
            class="text-center
"
          >Союз женщин Липецкой области</strong>
          <a
            style="text-decoration:none;"
            href="https://vk.com/sglo48"
          ><v-icon large color="dark-blue">
            mdi-vk
          </v-icon></a><a
            style="text-decoration:none;"
            href="https://www.instagram.com/sglo48/"
          ><v-icon large color="dark-blue">
            mdi-instagram
          </v-icon></a>
        </v-col>
        <v-col
        class="lighten-2 py-4 white--text text-center"
        cols="12"
          md="3"
          style="text-align: end;">
      <v-dialog
      width="300px"
      >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="white lighten-2"
          dark
          v-bind="attrs"
          v-on="on"
          elevation=2
          text
          style="font-size: 0.7rem;"
        >
          Разработчик сайта: Жуков Сергей
        </v-btn>
      </template>
      <v-card>
        <v-card-text style="font-size: 18px;"><br>
         Жуков Сергей<br>
         e-mail: zhukov@etalon48.com<br>
        </v-card-text>
        <v-divider></v-divider>
      </v-card>
    </v-dialog>
    </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>
<script>
import axios from 'axios'
export default {
  data: () => ({
    citate: '',
    citates: '',
    links: [
      { name: 'Главная', src: '/' },
      { name: 'Блог', src: '/blog' },
      { name: 'Информация', src: '/service' }
    ]
  }),
  mounted () {
    this.randCitate()
  },

  methods: {
    async randCitate () {
      const res = await axios.get('https://xn--48-mlcdei8abd3a7g9b.xn--p1ai/uploads/citates.json')

      const nOfFollowers = res.data
      this.citates = nOfFollowers
      this.citate = this.citates[
        Math.floor(Math.random() * this.citates.length)
      ]
    }
  }
}
</script>
