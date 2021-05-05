<template>
  <v-container>
    <div>
      <section itemscope itemtype="http://schema.org/Article">
        <ul class="breadcrumbs">
          <li class="breadcrumbs-item">
            <nuxt-link class="breadcrumbs-link" to="/">Главная</nuxt-link>
          </li>
          <li class="breadcrumbs-item">
            <nuxt-link class="breadcrumbs-link" to="/blog">Блог</nuxt-link>
          </li>
          <li class="breadcrumbs-item">
            <span class="breadcrumbs-link  current">{{data1.h1}}</span>
          </li>
        </ul>

        <center>
          <h1 itemprop="headline" class="pt-4 mx-4">
            {{ data1.h1 }}
          </h1>
        </center><span style="float:right; font-size: 13px;"><v-icon>mdi-eye</v-icon>{{ data1.views }}</span>
        <article itemprop="articleBody">
          <div
            v-for="(filelink, index) in coverImageName"
            :key="filelink.path"
            itemscope
            itemprop="image"
            itemtype="http://schema.org/ImageObject"
          >
            <img v-if="(index === 0)" itemprop="url contentUrl" class="mx-8 my-8" style="width:40%; float:left;" :src="`/uploads/blog/${filelink.filename}`">
            </img>
          </div>
          <p class="mx-2 my-8 statestext" v-html="data1.content" />
          <span style="font-size:13px; font-family: monospace;">Дата публикации: {{ $dateFns.format(data1.createdDate, 'dd-MMMM-yyyy', { locale: 'ru' }) }}</span>
          <v-divider />
          <br> <br>
          <h2 class="text-center">
            Фотогалерея
          </h2>
          <v-container
            class="fill-height"
            fluid
            style="min-height: 234px"
          >
            <v-fade-transition mode="out-in">
              <v-row
                align="center"
                justify="center"
              >
                <v-col
                  v-for="(filelink, index) in coverImageName"
                  :key="filelink.path"
                  cols="12"
                  md="4"
                  sm="5"
                  lg="3"
                  class="d-flex child-flex"
                >
                  <img
                    v-if="(index >= 0)"
                    v-img:group
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
                      <v-progress-circular
                        indeterminate
                        color="grey lighten-5"
                      />
                    </v-row>
                  </template>
                  </v-img>
                </v-col>
              </v-row>
            </v-fade-transition>
          </v-container>
        </article>
        <yandex-share :services="['vkontakte','facebook','twitter','odnoklassniki','messenger','whatsapp']" counter /><br>
      </section>
      <div v-if="this.$auth.user == 'zhukov'" class="admin-form mx-4 mb-4">
        <v-form
          ref="service"
        >
          <v-text-field v-model="h1" label="h1" required name="h1" />
          <v-text-field v-model="title" label="title" required name="title" />
          <v-text-field v-model="introtext" label="introtext" required name="introtext" />
          <v-text-field v-model="description" label="description" required name="description" />
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
          <v-text-field v-model="content" label="content" required name="content" />
          <v-select
            v-model="tag"
            :items="items"
            required
            label="Выберите тэг"
            outlined
            name="tag"
          />
          <select v-model="tag" outlined style="boreder: 1px solid grey;" name="tag">
            <option value="Национальные проекты">
              Национальные проекты
            </option>
            <option value="Образование">
              Образование
            </option>
          </select>
          <input
            ref="file"
            type="file"
            name="file"
            @change="handleFileUpload"
          >
          <v-btn
            color="warning"
            @click="blogUpdate"
          >
            Опубликовать
          </v-btn>
          <v-btn
            color="warning"
            @click="blogDelete"
          >
            Удалить
          </v-btn>
        </v-form>
        <br>
        <img width="100" :src="`/uploads/blog/${this.data1.coverImageName}`"></img>
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
  components: {
    YandexShare,
    editor: Editor
  },
  async asyncData ({ params }) {
    const { data } = await axios.get(`http://localhost:3000/api/blog/${params.id}`)
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
      axios.patch(`http://localhost:3000/api/blog/${this.data1.url}`, formData,
        {
          headers: {
            Authorization: this.$auth.$storage._state['_token.local']
          }
        }
      )
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
  }
}
</script>
