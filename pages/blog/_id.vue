<template>
  <div class="container fluid">
    <div class=" mt-4 h1">
      <h1 class="text-center py-2">
        {{ data1.h1 }}
      </h1>
      <span
        style="float:right; font-size: 13px;"
      ><v-icon>mdi-eye</v-icon>{{ data1.views }}</span>
    </div>
    <img
      class="px-4 py-2"
      style="float: left; width: 300px;"
      :src="`/uploads/blog/${data1.coverImageName[0].filename}`"
    >
    <div class="contentarticle px-4" v-html="data1.content" />
    <div class="galleriglobal">
      <h2 class="text-center py-2">
        Фотогалерея
      </h2>

      <div
        class="photogallery"
        style="display: flex; flex-wrap: wrap; justify-content: center"
      >
        <!--<div v-for="filelink in data1.coverImageName" :key="filelink.path">
          <img
            v-img="{ group: data1._id }"
            itemprop="url contentUrl"
            class="px-8 py-8 photogallery"
            style="width: 200px; height: auto;"
            contain
            :lazy-src="`/uploads/blog/${filelink.filename}`"
            :src="`/uploads/blog/${filelink.filename}`"
            :v-pswp="`/uploads/blog/${filelink.filename}`"
          ></img>
        </div>-->
        <Photoswipe rotate bubble lazy>
          <img
            v-for="(src, index) in data1.coverImageName"
            :key="index"
            v-pswp="`/uploads/blog/${src.filename}`"
            :src="`/uploads/blog/${src.filename}`"
            style="width: 200px"
            class="px-8 py-8 photogallery"
          >
        </Photoswipe>
      </div>
      <div v-if="this.$auth.user == 'zhukov'" class="admin-form mx-4 mb-4">
        <v-text-field v-model="h1" label="h1" required name="h1" />
        <v-text-field v-model="title" label="title" required name="title" />
        <v-text-field
          v-model="introtext"
          label="introtext"
          required
          name="introtext"
        />
        <v-text-field
          v-model="description"
          label="description"
          required
          name="description"
        />
        <v-text-field v-model="url" label="url" required name="url" />
        <editor
          v-model="content"
          api-key="octb58ja97o9rwhmbve45apizjpm26aljf3b44lcwxdevaht"
          :init="{
            height: 500,
            menubar: false,
            plugins: [
              'advlist autolink lists link image charmap',
              'searchreplace visualblocks code fullscreen',
              'print preview anchor insertdatetime media',
              'paste code help wordcount table'
            ],
            toolbar:
              'undo redo | formatselect | bold italic | \
        alignleft aligncenter alignright | \
        bullist numlist outdent indent | help'
          }"
        />
        <v-text-field
          v-model="content"
          label="content"
          required
          name="content"
        />
        <v-select
          v-model="tag"
          :items="items"
          required
          label="Выберите тэг"
          outlined
          name="tag"
        />
        <select
          v-model="tag"
          outlined
          style="boreder: 1px solid grey;"
          name="tag"
        >
          <option value="Национальные проекты">
            Национальные проекты
          </option>
          <option value="Образование">
            Образование
          </option>
        </select>
        <input
          id="files"
          ref="files"
          type="file"
          multiple
          @change="handleFileUploads"
        >
        <v-btn color="warning" @click="addFiles">
          Загрузить файлы для галереи
        </v-btn>

        <v-btn color="warning" @click="blogUpdate">
          Опубликовать
        </v-btn>
        <v-btn color="warning" @click="blogDelete">
          Удалить
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'
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
  components: {
    editor: Editor
  },
  async asyncData ({ params }) {
    const { data } = await axios.get(
      `http://localhost:3000/api/blog/${params.id}`
    )
    return { data1: data }
  },
  data: () => ({
    adminShow: true,
    h1: '',
    title: '',
    description: '',
    url: '',
    introtext: '',
    createdDate: '',
    files: [],
    content: '',
    coverImageName: '',
    tag: '',
    showLightBox: 'false',
    items: [
      'Национальные проекты',
      'Здравоохранение',
      'Образование',
      'Конкурсы'
    ],
    blog: []
  }),
  head () {
    return {
      title: this.data1.title + ' | Союз женщин Липецкой области',
      meta: [
        { hid: 'robots', name: 'robots', content: 'index,follow' },
        {
          hid: 'description',
          name: 'description',
          content: this.data1.introtext
        },
        { hid: 'og:type', property: 'og:type', content: 'article' },
        { hid: 'og:title', property: 'og:title', content: this.data1.title },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `http://localhost:3000/blog/${this.data1.url}`
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.data1.description
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: `http://localhost:3000/uploads/blog/${this.data1.coverImageName[0].filename}`
        }
      ]
    }
  },
  beforeMount () {
    this.h1 = this.data1.h1
    this.title = this.data1.title
    this.description = this.data1.description
    this.url = this.data1.url
    this.content = this.data1.content
    this.introtext = this.data1.introtext
    this.tag = this.data1.tag
    this.coverImageName = this.data1.coverImageName
    this.createdDate = this.data1.createdDate
  },
  methods: {
    blogUpdate (newAddedFiless) {
      console.log(this.newAddedFiless)
      const formData = {
        coverImageName: this.newAddedFiless
          ? this.newAddedFiless
          : this.coverImageName,
        h1: this.h1,
        title: this.title,
        introtext: this.introtext,
        url: this.url,
        content: this.content,
        tag: this.tag,
        description: this.description
      }
      axios
        .patch(`http://localhost:3000/api/blog/${this.data1.url}`, formData)
        .then(alert('Статья обновлена'), this.$router.push('/blog'))
    },
    handleFileUploads () {
      this.files = this.$refs.files.files
    },
    blogDelete () {
      axios
        .delete(`http://localhost:3000/api/blog/${this.data1.url}`)
        .then(
          alert(`Статья ${this.data1.h1} удалена`),
          this.$router.push('/blog')
        )
    },
    addFiles () {
      const formData = new FormData()
      for (let i = 0; i < this.files.length; i++) {
        const file = this.files[i]
        formData.append('files', file)
      }
      axios
        .post('http://localhost:3000/api/uploadmulti', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(response => (this.newAddedFiless = response.data))
    }
  }
}
</script>

<style scoped>
.preview-img-list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
.preview-img-item {
  margin: 5px;
  max-width: 100px;
  max-height: 100px;
}
</style>
