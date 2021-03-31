<template>
  <v-app id="inspire">
     <v-toolbar
    color="#e6dde6"
    light
    height="150px"
    max-height="150px"
      >
<nuxt-link to="/" style="text-decoration: none;">
      <v-toolbar-title class="mt-md-2 hidden-xs-only">Союз женщин<br> Липецкой области</v-toolbar-title>
      </nuxt-link>
      <nuxt-link to="/">
    <span class="subheading"><object class="mt-md-5" width="150" id="my-svg" type="image/svg+xml" data="uploads/blog/SGLOnew_animated.svg"></object></span>
</nuxt-link>
<v-divider
      class="mx-4"
      vertical
    ></v-divider>
<nuxt-link to="/" style="text-decoration: none;">
      <v-toolbar-title class="mt-md-2 hidden-xs-only">Союз женщин<br> России</v-toolbar-title>
      </nuxt-link>
      <nuxt-link to="/">
      <span class="subheading"> <object class="mt-md-5" width="135" id="my-svg" type="image/svg+xml" data="uploads/blog/wuor_animated.svg"></object></span>
    </nuxt-link>
    <v-spacer></v-spacer>

    <v-toolbar-items class="hidden-sm-and-down" color="#ad6262">
    <v-btn style="color:#ad6262; font-size: 20px; font-weight: 700; border-radius: 10px;" to="/blog" nuxt>Новости</v-btn>
    <v-divider vertical></v-divider>

      <v-btn style="color:#ad6262; font-size: 20px; font-weight: 700; border-radius: 10px;" to="/service" nuxt>Информация</v-btn>

      <v-divider vertical></v-divider>

      <v-btn style="color:#ad6262; font-size: 20px; font-weight: 700; border-radius: 10px;" to="/keisi" nuxt>Проекты</v-btn>

      <v-divider vertical></v-divider>
    </v-toolbar-items>

    <v-app-bar-nav-icon class="hidden-md-and-up"></v-app-bar-nav-icon>
  </v-toolbar>

    <v-main class="grey lighten-4">
    <v-container fluid><center><span class="text-center hidden-xs-only" style="font-family:'Naut'; font-size: 40px; color:#1976d2;">80 лет нашей славной истории</span></center>
      <v-row justify="center">
          <v-col
          class="pl-md-8 pt-md-8 mx-lg-auto"
            cols="12"
            sm="2"
          >
            <v-sheet
              elevation="20"
              rounded="lg"
              min-height="268"
            ><center>
            <span class="text-md-center" style="font-size:18px;" > <v-icon
      medium
      color="light-blue darken-1"
    >
      mdi-camera
    </v-icon> Видео</span></center>
    <iframe
    class="px-md-4 px-sm-4 mx-xs-4"
    width="100%"
    height="150"
    src="https://www.youtube.com/embed/tqhf8GBE0X4"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen>
    </iframe>
            </v-sheet>
          </v-col>

          <v-col
            cols="12"
            sm="8"
            class="pt-md-8"
          >
            <v-sheet
            elevation="20"
              min-height="70vh"
              rounded="lg"
            >
             <Nuxt />
            </v-sheet>
          </v-col>

          <v-col
            cols="12"
            sm="2"
            class="pt-md-8 pr-md-8"
          >
            <v-sheet
            elevation="20"
              rounded="lg"
              min-height="268"
            >
              <!--  -->
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
export default {
  head () {
    return {
      script: [
        { hid: 'stripe', src: 'https://cdnjs.cloudflare.com/ajax/libs/vivus/0.4.5/vivus.min.js', defer: true },
        { hid: 'stripe1', src: '/uploads/script.js', defer: true }
      ]
    }
  }
}
</script>
