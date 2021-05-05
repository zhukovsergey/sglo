<template>
  <div class="container">
    <h1>Фотогалерея</h1>
    <v-row>
      <div v-for="(dat) in data1" :key="dat._id">
        <v-container class="" fluid style="min-height: 234px">
          <v-fade-transition mode="out-in">
            <div><v-card max-width="300px" class="d-flex flex-wrap mx-auto my-auto">
              <v-col
                v-for="(filelink, index) in dat.coverImageName"
                :key="filelink.path"
                v-show="index==0"
                cols="12"
                md="12"
                sm="12"
                lg="12"
                class=""
              >
              <v-card-title><h4>{{ dat.h1 }}</h4></v-card-title>
                <img
                  v-show="index==0"
                  v-img="{ group: dat._id}"
                  itemprop="url contentUrl"
                  class="px-8 py-8 photogallery"
                  style="width: 300px; height: auto;"
                  contain
                  :lazy-src="`/uploads/blog/${filelink.filename}`"
                  :src="`/uploads/blog/${filelink.filename}`"
                >
                <template #placeholder>
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-progress-circular indeterminate color="grey lighten-5" />
                  </v-row>
                </template>
                </img>
              </v-col></v-card>
            </div>
          </v-fade-transition>
        </v-container>
      </div>
    </v-row>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueImg from 'v-img'
const vueImgConfig = {
  // Use `alt` attribute as gallery slide title
  altAsTitle: true,
  // Display 'download' button near 'close' that opens source image in new tab
  sourceButton: true,
  // Event listener to open gallery will be applied to <img> element
  openOn: 'click',
  // Show thumbnails for all groups with more than 1 image
  thumbnails: true
}
Vue.use(VueImg, vueImgConfig)
export default {
  async asyncData () {
    const { data } = await axios.get('http://localhost:3000/api/blog/photos')
    return { data1: data }
  },
  head () {
    return {
      title: 'Фотогалерея Союза женщин Липецкой области',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Фотогалерея Союза женщин Липецкой области'
        },
        { hid: 'robots', name: 'robots', content: 'index,follow' }
      ]
    }
  }
}
</script>

<style></style>
