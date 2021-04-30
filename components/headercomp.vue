<template>
  <v-app id="inspire">
    <toolbar />

    <v-main class="grey lighten-4">
      <v-container fluid>
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
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
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
  head () {
    return {
      htmlAttrs: { lang: 'ru' },
      meta: [
        {
          hid: 'theme-color',
          property: 'theme-color',
          name: 'theme-color',
          content: '#4285f4'
        }
      ],
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
  }
}
</script>
