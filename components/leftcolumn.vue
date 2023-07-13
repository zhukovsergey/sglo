<template>
  <v-col class="pl-md-8 pt-md-8 mx-lg-auto ord2" cols="12" sm="3" md="2">
    <v-sheet elevation="20" rounded="lg" min-height="268">
      <center>
        <br>
        <v-divider />
        <v-col>
        <span class="px-4" style="font-size:14px;" primary color="primary">
          Липецкая областная общественная организация "Союз Женщин Липецкой
          области" (ЛООО "Союз Женщин Липецкой области"). Цели организации:
          повышение статуса женщин в обществе, защита положения и интересов женщин в обществе, повышение их роли
          в общественно-политической, экономической и культурной жизни Липецкой области.
        </span></v-col>
        <v-divider /><br>

         <span
          class="text-md-center"
          style="font-size:23px; font-family: 'Asessorc';"
        >
          <v-icon medium color="light-blue darken-1">
            mdi-calendar-text-outline
          </v-icon>
          Предстоящие события
        </span>
        <v-card
    class="mx-auto"
    color="white"
    light
    max-width="230"
  >
    <v-card-text class="subheading mr-2 font-weight-bold">
     <v-icon
        small
        left
      >
        mdi-arrow-right-bold
      </v-icon>
      22.10 Состоится Форум предпринимателей в Омске
    </v-card-text>
  </v-card><br>
  <v-card
    class="mx-auto"
    color="white"
    light
    max-width="230"
  >
    <v-card-text class="subheading mr-2 font-weight-bold">
     <v-icon
        small
        left
      >
        mdi-arrow-right-bold
      </v-icon>
      26.10 Состоится Собрание СЖЛО
    </v-card-text>
  </v-card>
        <v-devider/><br>
        <span
          class="text-md-center"
          style="font-size:23px; font-family: 'Asessorc';"
        >
          <v-icon medium color="light-blue darken-1">
            mdi-camera
          </v-icon>
          Видео
        </span>
      </center>
      <v-lazy>
      <iframe
        class="px-md-4 px-sm-4 mx-xs-4"
        width="100%"
        height="150"
        src="https://www.youtube.com/embed/-bYFOeDYZis"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      /></v-lazy>
      <v-divider /><br>
      <v-lazy>
      <iframe
        class="px-md-4 px-sm-4 mx-xs-4"
        width="100%"
        height="150"
        src="https://www.youtube.com/embed/tqhf8GBE0X4"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      /></v-lazy>
      <v-divider /><br>
      <center>
      <span
          class="text-md-center"
          style="font-family: 'Asessorc';
          width: 100%; font-size: 22px; "
        >
          <v-icon medium color="light-blue darken-1">
            mdi-notification-clear-all
          </v-icon>
          Категории
        </span><br>
        <div style="width: 100%; margin-left: 5px;">
      <nuxt-link style="text-decoration: none;" class="mx-1 my-md-1 my-sm-2" small to="/blog/national-projects">
      Национальные проекты
    </nuxt-link><br>
    <nuxt-link style="text-decoration: none;" class=" mx-2 my-md-1 my-sm-2" small to="/blog/education" nuxt>
      Образование
    </nuxt-link><br>
    <nuxt-link style="text-decoration: none;" class=" mx-2 my-md-1 my-sm-2" small to="/blog/health" nuxt>
      Здравоохранение
    </nuxt-link></div></center>
    </v-sheet>
  </v-col>
</template>
