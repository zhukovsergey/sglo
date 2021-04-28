<template>
  <v-app id="inspire">
     <v-toolbar
    color="#e6dde6"
    height="150px"
    max-height="150px"
      >
<nuxt-link to="/" style="text-decoration: none;">
      <v-toolbar-title class="mt-md-2 hidden-xs-only">Союз женщин<br> Липецкой области</v-toolbar-title>
      </nuxt-link>
      <span class="subheading"><nuxt-link to="/"><img width="150" id="my-svg" src="http://localhost:3000/uploads/blog/SGLOnew_animated.svg?data" /></nuxt-link></span>
<v-divider
      class="mx-4"
      vertical
    ></v-divider>
<nuxt-link to="/" style="text-decoration: none;">
      <v-toolbar-title class="mt-md-2 hidden-xs-only">Союз женщин<br> России</v-toolbar-title>
      </nuxt-link>
      <nuxt-link to="/">
      <span class="subheading"> <img width="135" id="my-svg1" src="http://localhost:3000/uploads/blog/wuor_animated.svg?data" /></span>
    </nuxt-link>
    <v-spacer></v-spacer>
    <v-toolbar-items color="#ad6262">
    <v-btn
     color="rgb(255 243 243 / 42%)"
    elevation="6"
    class="mx-2"
    style="color:#ad6262; font-size: 17px; font-weight: 700; border-radius: 30px;"
    to="/blog"
    nuxt>
    <v-icon
          dark
          left
          medium
          class="ma-2"
        >
          mdi-newspaper-variant-multiple
        </v-icon> Новости</v-btn>
    <v-divider vertical></v-divider>

      <v-btn
      color="rgb(255 243 243 / 42%)"
      elevation="6"
      class="mx-2"
      style="color:#ad6262; font-size: 17px; font-weight: 700; border-radius: 30px;"
      to="/service"
      nuxt><v-icon
          dark
          left
          medium
          class="ma-2"
        >
          mdi-folder-information-outline
        </v-icon>Информация</v-btn>

      <v-divider vertical></v-divider>

      <v-btn
      color="rgb(255 243 243 / 42%)"
      elevation="6"
      class="mx-2"
      style="color:#ad6262; font-size: 17px; font-weight: 700; border-radius: 30px;"
      to="/keisi"
      nuxt>Проекты</v-btn>

      <v-divider vertical></v-divider>
    </v-toolbar-items>

    <v-app-bar-nav-icon @click="drawer = true" class="hidden-md-and-up"></v-app-bar-nav-icon>
</v-toolbar>
<v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title><nuxt-link to="/">Главная</nuxt-link></v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title><nuxt-link to="/blog">Новости</nuxt-link></v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title><nuxt-link to="/service">Информация</nuxt-link></v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-main class="grey lighten-4">
    <v-container fluid><center><span class="text-center hidden-xs-only" style="font-family:'Naut'; font-size: 40px; color:#1976d2;">Наша сила - в единстве. Наше богатство - в многообразии!</span></center>
      <v-row justify="center">
          <v-col
          class="pl-md-8 pt-md-8 mx-lg-auto ord2"
            cols="12"
            sm="3"
            md="2"
          >
            <v-sheet
              elevation="20"
              rounded="lg"
              min-height="268"
            ><center><br>
            <v-divider></v-divider>
            <span color="secondary">Липецкая областная общественная организация "Союз Женщин Липецкой области" (ЛООО "Союз Женщин Липецкой области").
            Цель организации- повысить статус женщин в обществе, защита положения и интересов женщин, повышение их роли в общественно-политической, экономической и культурной жизни в Липецкой области.</span>
            <v-divider></v-divider><br>
            <span class="text-md-center" style="font-size:18px;" >
            <v-icon
      medium
      color="light-blue darken-1"
    >
      mdi-camera
    </v-icon> Видео</span></center>
    <iframe
    class="px-md-4 px-sm-4 mx-xs-4"
    width="100%"
    height="150"
    src="https://www.youtube.com/embed/-bYFOeDYZis"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen>
    </iframe><v-divider></v-divider><br>
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
    <v-divider></v-divider><br>
    </v-sheet>
          </v-col>

          <v-col
            cols="12"
            sm="6"
            class="pt-md-8 ord1"
            md="8"
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
            sm="3"
            md="2"
            class="pt-md-8 pr-md-8 ord3"
          >
            <v-sheet
            elevation="20"
              rounded="lg"
              min-height="268"
            >
             <center>
            <span class="text-md-center" style="font-size:18px;" >Председатель</span>
            <v-img src="http://localhost:3000/uploads/viprofile.jpg" width="200" class="mt-4" style="border-radius: 8px;"/>
            <span class="text-md-center" style="font-size:18px;" >Урываева В.И.</span>
             <v-divider></v-divider><br>
             <span class="text-md-center" style="font-size:18px;" >Наши контакты</span></center><br>
           <div class="ml-4"><v-icon color="red">
            mdi-phone-outline
            </v-icon>
            <span class="text-md-center" style="font-size:18px;" >+7 (4742) 28-12-21</span>
            <br></v-icon><v-icon color="red">
            mdi-map-marker
            </v-icon><span class="text-md-center" style="font-size:18px;" >г. Липецк, ул. Плеханова, д. 33Б</span>
            <br><a style="text-decoration:none;" href="https://vk.com/sglo48"><v-icon large color="red">
            mdi-vk
            </v-icon></a><a style="text-decoration:none;" href="https://www.instagram.com/sglo48/"><v-icon large color="red">
            mdi-instagram
            </v-icon></a>
            </div>
            <v-divider></v-divider><br>
            <center><span class="text-md-center" style="font-size:18px;" >Информация</span></center>
            <div></v-icon><v-icon color="red">
            mdi-file-document
            </v-icon><span class="pl-4"><a href="/uploads/ustav.pdf">Устав СЖР</a></span><br>
            <v-icon color="red">
            mdi-file-document
            </v-icon><span class="pl-4"><a href="/uploads/ustavsglo.pdf">Устав СЖЛО</a></span><br>
            <v-icon color="red">
            mdi-file-document
            </v-icon><span class="pl-4"><a href="/uploads/ukaz.pdf">Указ президента</a></span><br>
            </div>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
export default {
  data: () => ({
    drawer: false,
    group: null
  }),
  head () {
    return {
      meta: [
        { hid: 'theme-color',property: 'theme-color',name: 'theme-color', content: '#4285f4' }
      ],
      script: [
        { hid: 'stripe', src: 'https://cdnjs.cloudflare.com/ajax/libs/vivus/0.4.5/vivus.min.js', defer: true },
        { hid: 'stripe1', src: '/uploads/script.js', defer: true }
      ]
    }
  }
}
</script>
