<template>
  <v-footer color="primary lighten-3" padless>
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
      <v-col class="primary lighten-2 py-4 text-center white--text" cols="12">
        {{ new Date().getFullYear() }} —
        <strong>Союз женщин Липецкой области</strong>
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
    </v-row>
  </v-footer>
</template>
<script>
export default {
  data: () => ({
    links: [
      { name: 'Главная', src: '/' },
      { name: 'Блог', src: '/blog' },
      { name: 'Информация', src: '/service' }
    ]
  })
}
</script>
