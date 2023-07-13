<template>
<div>
  <v-timeline>
    <v-timeline-item
      color="red lighten-2"
      large
      style="margin: 0 auto;"
    >
      <template v-slot:opposite>
      <img style="margin-right: 20px;" width='100' src="/uploads/blog/1632128294017af5b8351-3720-4178-b59e-6b04152475dd.jpg">
        <span>25 сентября 2021 года</span>
      </template>
      <v-card class="elevation-2">
        <v-card-title class="text-h5">
          Съезд СЖЛО
        </v-card-title>
        <v-card-text>
          Обсуждение проектов экологии
        </v-card-text>
      </v-card>
    </v-timeline-item>
    <v-timeline-item
      color="yellow lighten-2"
      large
      style="margin-right: 80px;"
    >
      <template v-slot:opposite>
      <img style="margin-right: 20px;" width='100' src="/uploads/blog/16321282578913.jpg">
        <span>19 декабря 2021 года</span>
      </template>
      <v-card class="elevation-2">
        <v-card-title class="text-h5">
          Открытие доски почета
        </v-card-title>
        <v-card-text>
          Открывается доска почета в Сырском руднике
        </v-card-text>
      </v-card>
    </v-timeline-item>
     <v-timeline-item
      color="green lighten-2"
      large
      style="margin-right: 80px;"
    >
      <template v-slot:opposite>
      <img style="margin-right: 20px;" width='100' src="/uploads/blog/1632128294017af5b8351-3720-4178-b59e-6b04152475dd.jpg">
        <span>25 декабря 2021 года</span>
      </template>
      <v-card class="elevation-2">
        <v-card-title class="text-h5">
          Конференция СЖЛО
        </v-card-title>
        <v-card-text>
          Обсуждение национальных проектов
        </v-card-text>
      </v-card>
    </v-timeline-item>
  </v-timeline>
  </div>
</template>
