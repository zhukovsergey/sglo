<template>
  <div class="container">
    <v-carousel hide-delimiters>
      <div v-for="dat2 in sliders.slice(0, 3)" :key="dat2.src">
        <v-lazy>
        <nuxt-link :to="dat2.kuda">
        <v-carousel-item :src="dat2.src" :lazy-src="dat2.src">
            <v-row
              align-items="end"
              align-content="end"
            >
              <div
              class="headline mt-6 mx-3 zagolovok"
              style="position: absolute; top: 75%;"
              >
                {{ dat2.text }}
              </div>
            </v-row>
        </v-carousel-item></nuxt-link></v-lazy>
      </div>
    </v-carousel>
    <center>
     <h3 class="mt-6 mapreg">
        Карта районов Липецкой области
      </h3>
    <Mapreg />
      <h3 class="mt-6">
        Последние новости
      </h3>
    </center>
    <v-divider></v-divider>
    <v-row no-gutters class="mt-8">
      <v-col v-for="dat in data1" :key="dat._id" class="my-2">
        <nuxt-link :to="`/blog/${dat.url}`" style="text-decoration: none;">
          <v-card class="mx-3" max-width="280">
            <v-card-title>
              {{ dat.h1 }}
            </v-card-title>
            <div
              v-for="(filelink, index) in dat.coverImageName"
              :key="filelink.path"
            >
<div style="text-align:center;" v-if="index == 0">
<!--<nuxt-img
style="border-radius: 8px;"
quality="75"
sizes="200px md:200px lg:270px"
fit="contain"
format="webp"
:src="`/uploads/blog/${filelink.filename}`"
/>-->
<v-img
               class="resized"
                v-if="index == 0"
                :src="`/uploads/blog/${filelink.filename}`"
                :lazy-src="`/uploads/blog/${filelink.filename}`"
                height="200px"
                contain
                style="border-radius: 8px;"
              ></v-img>
</div>
   <!-- <v-img
    height="200px"
    v-if="index == 0"
    :src="`/uploads/blog/${filelink.filename}`">
  <template #sources>
    <source :srcset="`/uploads/blog/${filelink.filename.slice(0,-4) }.webp`">
  </template>
</v-img>-->
            </div>
            <v-card-subtitle>
              {{ dat.introtext | truncate(60, '...') }}
            </v-card-subtitle><center>
            <hr size="1" calss="text-center" style="width: 75%; color: #d5e6f7;"></hr></center>
            <v-card-subtitle>
              Тема: {{ dat.tag }}
            </v-card-subtitle>
            <span class="px-2" v-if="dat.region">
             <v-icon small>mdi-map-marker</v-icon> {{ dat.region }}
            </span> <br>
            <v-card-actions>
              <v-btn
                color="green"
                danger
                style="font-size: 16px; text-decoration: none;"
              >
                ПОДРОБНЕЕ...
              </v-btn>

              <v-spacer />
            </v-card-actions>
          </v-card>
        </nuxt-link>
      </v-col>
    </v-row>
    <yandex-share :services="['vkontakte', 'facebook', 'twitter']" counter />
  </div>
</template>

<script>
import YandexShare from '@cookieseater/vue-yandex-share'
import axios from 'axios'
import $ from 'jquery'
import Mapreg from '~/components/mapreg.vue'
//  import jquery from 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js'

export default {
  components: {
    YandexShare,
    Mapreg
  },
  filters: {
    truncate (text, length, suffix) {
      return text.substring(0, length) + suffix
    }
  },
  async asyncData () {
    const { data } = await axios.get('https://xn--48-mlcdei8abd3a7g9b.xn--p1ai/api/blog/last10')
    return { data1: data }
  },
  mounted () {
    $('.part').hover(
      function () {
        $('.description').html($(this).attr('description-data'))
        $('.description').fadeIn(0.1)
      },
      function () {
        $('.description').fadeOut(0.1)
      }
    )
  },
  data: () => ({
    model: 0,
    colors: ['primary', 'secondary', 'yellow darken-2', 'red', 'orange'],
    sliders: [
      {
        src: '/uploads/slider/1.jpg',
        text: 'Когда забота и ответственность в душе',
        kuda: '/blog/kogda-zabota-i-otvetstvennost-v-dushe'
      },
      {
        src: '/uploads/slider/5.jpg',
        text:
          'На очередной 27 сессии Липецкого горсовета состоялось торжественное собрание к 100-летию парламента"',
        kuda: '/blog/na-ocherednoi-27-sessii-lipeckogo-gorsoveta-sostoyalos-torzhestvennoe-sobranie-k-100-letiyu-parlamenta'
      },
      {
        src: '/uploads/slider/4.jpg',
        text: '3 октября ежегодно отмечается День ОМОН',
        kuda: 'blog/3-oktyabrya-ezhegodno-otmechaetsya-den-omon'
      }
    ]
  }),
  head () {
    return {
      title: 'Союз женщин Липецкой области - официальный сайт',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Официальный сайт Союза женщин Липецкой области. Новости, контакты и информация.'
        },
        { hid: 'robots', name: 'robots', content: 'index,follow' }
      ]
    }
  }
}
</script>

<style>
#map {
  margin: 0 auto; width: 100%;
  transition: all 0.1s;
  position: relative;
}
#map svg {
  width: 50%;
  margin-left: 5%;
  height: 450px;
}
.part:hover {fill: red;}
#two:hover {fill: deepskyblue; transition: all 0.5s;}
.win__one {width: 120px; height: 40px; background: red; transition: all 0.5s;}
.win__two {width: 150px; height: 300px; background: deepskyblue; transition: all 0.5s;}
path {cursor: pointer; transition: all 0.1s;}
path:hover {transform: scale(1.01);}
foreignobject {
  display: none; opacity: 0;
  transition: all 0.5s;
}
.part {
fill: #d0e4f8;
}
.part:hover {
transition: opacity .1s ease;
cursor: pointer;
}
.description {
display: none;
position: absolute;
padding: 20px;
box-sizing: border-box;
width: 28%;
height: auto;
box-shadow: 0 0 32px 10px #ccc;
left: 10px;
font-family: sans-serif;
margin-top: 30px;
bottom: calc(45% - 200px);
z-index: 99999999999999;
background: white;
opacity: 1;
font-size: 12px;
}
.description img {
width: 60%;
margin-bottom: 20px;
}
</style>
