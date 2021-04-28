<template>
<v-container class="grey lighten-5">
  <div>
    <section itemscope itemtype="http://schema.org/Article">
      <center><h1 itemprop="headline" class="pt-4 mx-4">
      {{data1.h1}}</h1></center>
<article itemprop="articleBody">

<div
v-for="(filelink, index) in coverImageName"
:key="filelink.path"
itemscope
itemprop="image"
itemtype="http://schema.org/ImageObject">
<img v-if="(index === 0)" itemprop="url contentUrl" class="mx-8 my-8" style="width:40%; float:left;" :src="`/uploads/blog/${filelink.filename}`"/></div>
<p class="mx-2 my-8 statestext" v-html="data1.content"></p>
<br> <br>
<h2 class="text-center">Фотогалерея</h2>
 <v-row>
    <v-col
      v-for="(filelink, index) in coverImageName"
     :key="filelink.path"
      class="d-flex child-flex"
      cols="3"
    >
      <img
v-img:group
v-if="(index >= 0)"
itemprop="url contentUrl"
class="mx-8 my-8"
height="140"
  contain
 :lazy-src="`/uploads/blog/${filelink.filename}`"
:src="`/uploads/blog/${filelink.filename}`"/>
        <template v-slot:placeholder>
          <v-row
            class="fill-height ma-0"
            align="center"
            justify="center"
          >
            <v-progress-circular
              indeterminate
              color="grey lighten-5"
            ></v-progress-circular>
          </v-row>
        </template>
      </v-img>
    </v-col>
  </v-row>
  </article>
<yandex-share :services="['vkontakte','facebook','twitter','odnoklassniki','messenger','whatsapp']" counter /><br>
</section>
<div class="admin-form mx-4 mb-4" v-if="adminShow">
<v-form
    ref="service"
    >
   <v-text-field v-model="h1" label="h1" required name="h1"></v-text-field>
   <v-text-field v-model="title" label="title" required name="title"></v-text-field>
   <v-text-field v-model="introtext" label="introtext" required name="introtext"></v-text-field>
   <v-text-field v-model="description" label="description" required name="description"></v-text-field>
   <v-text-field v-model="url" label="url" required name="url"></v-text-field>
    <editor
    api-key="octb58ja97o9rwhmbve45apizjpm26aljf3b44lcwxdevaht"
    v-model="content"
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
  >
  </editor>
   <v-text-field v-model="content" label="content" required name="content"></v-text-field>
   <v-select
          :items="items"
          required
          label="Выберите тэг"
          outlined
          name="tag"
          v-model="tag"
          ></v-select>
        <select  outlined style="boreder: 1px solid grey;" name="tag" v-model="tag">
        <option value="Национальные проекты">Национальные проекты</option>
        <option value="Образование">Образование</option>
        </select>
  <input
  v-on:change="handleFileUpload"
   type="file"
   name="file"
   ref="file"
   />
   <v-btn
      color="warning"
      v-on:click="blogUpdate" >Опубликовать</v-btn>
      <v-btn
      color="warning"
      v-on:click="blogDelete" >Удалить</v-btn>
    </v-form>
<br>
<img width="100" :src="`/uploads/blog/${this.data1.coverImageName}`"/>
</div>
</div>
</v-container>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'
import Vue from 'vue'
import axios from 'axios'
import YandexShare from '@cookieseater/vue-yandex-share'
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
  async asyncData ({ params }) {
    const { data } = await axios.get(`http://localhost:3000/api/blog/${params.id}`)
    return { data1: data }
  },
  components: {
    YandexShare,
    editor: Editor
  },
  data: () => ({
    adminShow: true,
    h1: '',
    title: '',
    description: '',
    url: '',
    introtext: '',
    content: '',
    coverImageName: '',
    tag: '',
    showLightBox: 'false',
    items: ['Национальные проекты', 'Здравоохранение', 'Образование', 'Конкурсы'],
    blog: [],
    images: [
      { thumb: 'https://i.wifegeek.com/200426/f9459c52.jpg', src: 'https://i.wifegeek.com/200426/f9459c52.jpg' },
      { thumb: 'https://i.wifegeek.com/200426/f9459c52.jpg', src: 'https://i.wifegeek.com/200426/f9459c52.jpg' },
      { thumb: 'https://i.wifegeek.com/200426/f9459c52.jpg', src: 'https://i.wifegeek.com/200426/f9459c52.jpg' }
    ]
  }),
  beforeMount () {
    this.h1 = this.data1.h1
    this.title = this.data1.title
    this.description = this.data1.description
    this.url = this.data1.url
    this.content = this.data1.content
    this.introtext = this.data1.introtext
    this.tag = this.data1.tag
    this.coverImageName = this.data1.coverImageName
  },
  methods: {
    blogUpdate () {
      const formData = {
        coverImageName: this.coverImageName,
        h1: this.h1,
        title: this.title,
        introtext: this.introtext,
        url: this.url,
        content: this.content,
        tag: this.tag,
        description: this.description
      }
      axios.patch(`http://localhost:3000/api/blog/${this.data1.url}`, formData)
        .then(alert('Статья обновлена'), this.$router.push('/blog'))
    },
    handleFileUpload () {
      this.file = this.$refs.file.files[0]
    },
    blogDelete () {
      axios.delete(`http://localhost:3000/api/blog/${this.data1.url}`)
        .then(alert(`Статья ${this.data1.h1} удалена`), this.$router.push('/blog'))
    },
    addFile (newAddedFiles) {
      const formData = new FormData()
      const file = this.file
      formData.append('file', file)
      axios
        .patch(`http://localhost:3000/api/blog/${this.data1.url}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(response => (this.newAddedFiles = response.data))
    }
  },
  head () {
    return {
      title: this.data1.title,
      meta: [
        { hid: 'robots', name: 'robots', content: 'index,follow' },
        {
          hid: 'description',
          name: 'description',
          content: this.data1.introtext
        },
        { hid: 'og:type', property: 'og:type', content: 'article' },
        { hid: 'og:title', property: 'og:title', content: this.data1.title },
        { hid: 'og:url', property: 'og:url', content: `http://localhost:3000/blog/${this.data1.url}` },
        { hid: 'og:description', property: 'og:description', content: this.data1.description },
        { hid: 'og:image', property: 'og:image', content: `http://localhost:3000/uploads/blog/${this.data1.coverImageName[0].filename}` }
      ]
    }
  }
}
</script>
