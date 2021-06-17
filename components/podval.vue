<template>
  <v-footer color="primary lighten-3" padless>
    <v-container fluid>
      <v-row justify="center" no-gutters>
        <v-btn
          v-for="link in links"
          :key="link.name"
          color="white"
          text
          rounded
          class="my-2"
        >
          <nuxt-link :to="link.src">
            {{ link.name }}
          </nuxt-link>
        </v-btn>
      </v-row><v-row>
        <v-col
          class="primary lighten-2 py-4 white--text text-center"
          cols="12"
          md="12"
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
          class="primary lighten-2 py-4 white--text text-center"
          cols="12"
          md="12"
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
      const res = await axios.get('https://zabbix.etalon48.com/uploads/citates.json')

      const nOfFollowers = res.data
      this.citates = nOfFollowers
      this.citate = this.citates[
        Math.floor(Math.random() * this.citates.length)
      ]
    }
  }
}
</script>
