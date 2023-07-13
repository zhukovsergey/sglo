<template>
  <div>
    <h1 v-if="error.statusCode === 404">Страница не найдена ошибка 404</h1>
    <div v-if="error.statusCode === 404">
      <v-container fill-height="fill-height">
      <NuxtLink to="/">Главная  </NuxtLink><br>
              <p>К сожалению не можем найти такую страницу на нашем сайте :)</p>
        <v-layout justify-center="justify-center" align-center="align-center">
          <v-flex>
            <div class="pb-5"><img src="https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/blank_canvas_3rbb.svg"/></div>
          </v-flex>
          <v-flex>
            <div class="pb-4">
            </div>
            <div>
              <svg width="59" height="8" viewBox="0 0 59 8" fill="none">
                <path d="M0.646446 3.64645C0.451183 3.84171 0.451183 4.15829 0.646446 4.35355L3.82843 7.53553C4.02369 7.7308 4.34027 7.7308 4.53553 7.53553C4.7308 7.34027 4.7308 7.02369 4.53553 6.82843L1.70711 4L4.53553 1.17157C4.7308 0.976311 4.7308 0.659728 4.53553 0.464466C4.34027 0.269204 4.02369 0.269204 3.82843 0.464466L0.646446 3.64645ZM59 3.5L1 3.5V4.5L59 4.5V3.5Z" fill="black"></path>
              </svg>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
    <h1 v-else>An error occurred - {{ error.statusCode }} </h1>
  </div>
</template>

<script>
export default {
  props: ['error'],
  layout: 'error' // you can set a custom layout for the error page
}
</script>
