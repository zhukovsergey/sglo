<template>
  <v-col class="pl-md-8 pt-md-8 mx-lg-auto ord2" cols="12" sm="3" md="2">
    <v-sheet elevation="20" rounded="lg" min-height="268">
      <center>
        <br>
        <v-divider />
        <span class="px-4" style="font-size:14px;" primary color="primary">
          Липецкая областная общественная организация "Союз Женщин Липецкой
          области" (ЛООО "Союз Женщин Липецкой области"). Цель организации-
          повысить статус женщин в обществе, защита положения и интересов
          женщин, повышение их роли в общественно-политической, экономической и
          культурной жизни в Липецкой области.
        </span>
        <v-divider /><br>
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
      <iframe
        class="px-md-4 px-sm-4 mx-xs-4"
        width="100%"
        height="150"
        src="https://www.youtube.com/embed/-bYFOeDYZis"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      />
      <v-divider /><br>
      <iframe
        class="px-md-4 px-sm-4 mx-xs-4"
        width="100%"
        height="150"
        src="https://www.youtube.com/embed/tqhf8GBE0X4"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      />
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
