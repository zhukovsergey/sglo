<template>
  <div class="container fluid">
    <div class=" mt-4 h1">
      <h1 class="text-center py-2">
        {{ data1.h1 }}
      </h1>
      <span
        style="float:right; font-size: 13px;"
      ><v-icon>mdi-eye</v-icon>{{ data1.views }}</span>
    </div> <div class="maincontentofarticle">
    <div class="singlepicture" style="float:left; margin-right: 20px;">
    <picture>
    <source type="image/webp" :srcset="`/uploads/blog/${data1.coverImageName[0].filename.slice(0,-4) }.webp`">
     <source type="image/jpeg" :srcset="`/uploads/blog/${data1.coverImageName[0].filename}`">
    <img
    class="px-2 py-2"
    style="width: 300px;"
    :src="`/uploads/blog/${data1.coverImageName[0].filename}`"
    :data-src="`/uploads/blog/${data1.coverImageName[0].filename}`"
    :lazy-src="`/uploads/blog/${data1.coverImageName[0].filename}`"
    v-lazy="`/uploads/blog/${data1.coverImageName[0].filename}`"
    :alt="data1.h1"
    />
</picture></div>
<div class="contentarticle px-4" v-html="data1.content" /></div>
    <span
      class="px-2"
      style="font-size: 12px;"
    >Опубликовано:
      {{ $dateFns.format(data1.createdDate, 'dd-MMMM-yyyy', { locale: 'ru' }) }}
    </span>
 <br>
    <div class="galleriglobal">
      <h2 class="text-center py-2">
        Фотогалерея
      </h2>

      <div
        v-lazy-container="{ selector: 'img' }"
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
        <v-row>
    <v-col
      v-for="(src, index) in data1.coverImageName"
      :key="index"
      class="d-flex child-flex"
      cols="6"
      sm="3"
      md="3"
      xs="6"
    >
        <picture>
    <source type="image/webp" :srcset="`/uploads/blog/${src.filename.slice(0,-4) }.webp`">
     <source type="image/jpeg" :srcset="`/uploads/blog/${src.filename}`">
    <v-img
    v-pswp="`/uploads/blog/${src.filename}`"
    :lazy-src="`/uploads/blog/${src.filename}`"
    :src="`/uploads/blog/${src.filename}`"
    :data-src="`/uploads/blog/${src.filename}`"
    style="width: 150px"
    v-lazy="`/uploads/blog/${src.filename}`"
    class="px-2 py-8 photogallery"> <template v-slot:placeholder>
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
        </template></v-img></picture></v-col>
  </v-row>
        </Photoswipe>
        </div>
      <br><br>
      <v-divider />
       <yandex-share :services="['vkontakte', 'facebook', 'twitter,odnoklassniki,telegram,whatsapp']" :image="`https://zabbix.etalon48.com/uploads/blog/${this.data1.coverImageName[0].filename}`" :title="data1.title" :description="data1.description" counter />
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
    <div class="comments">
    <v-badge
    v-if="data1.comments.length > 0"
     color="green"
     :content="data1.comments.length"
    >
      <h3>Комментарии</h3></v-badge>
      <h3 v-if="data1.comments.length == 0">Комментарии</h3>
      <form>
        <v-text-field v-model="fio" name="fio" label="Ваше имя" required />

        <v-textarea
          v-model="comment"
          name="comment"
          label="Ваш комментарий"
          required
        />

        <v-btn color="warning" @click="newComment">
          Опубликовать
        </v-btn>
      </form>
      <div
        v-for="(comm, index) in data1.comments"
        :key="comm._id"
        class="comment-list"
      >
        <v-card
          v-if="$store.state.auth.user == 'zhukov' || comm.active"
          class="mx-auto mt-4"
          max-width="90%"
        >
          <div v-if="index < pageSize">
            <v-card-text>
              <div>
                <span
                  class="px-2"
                  style="font-size: 12px;"
                >Опубликовано:

                  {{
                    $dateFns.format(comm.createdDatecom, 'dd-MMMM-yyyy', {
                      locale: 'ru'
                    })
                  }}
                </span>
              </div>
              <p class="title text--primary">
                Имя: {{ comm.fio }}
              </p>
              <v-divider inset />

              <div class="text--primary">
                {{ comm.comment }}
              </div>
              <span
                v-if="$store.state.auth.user == 'zhukov'"
              >Активен :{{ comm.active }}</span>
              <v-checkbox
                v-if="$store.state.auth.user == 'zhukov'"
                v-model="modcomment"
                label="опубликовать"
                name="modcomment"
                :value="comm._id"
                @change="moderatecom"
              />
              <v-checkbox
                v-if="$store.state.auth.user == 'zhukov'"
                v-model="commid"
                label="Удалить"
                name="commentDel"
                :value="comm._id"
                @change="commentDelete"
              />
            </v-card-text>
          </div>
        </v-card>
      </div>
    </div>
    <br>
    <v-btn
      v-if="data1.comments.length > 4"
      depressed
      color="primary"
      @click="pageSize += pageSize"
    >
      Показать еще...
    </v-btn>
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
      `https://zabbix.etalon48.com/api/blog/${params.id}`
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
    loadMore: true, // прокрутка комментов
    page: 1, // прокрутка комментов
    pageSize: 4, // прокрутка комментов
    images: [], // прокрутка комментов
    commentsToShow: 3,
    showLightBox: 'false',
    fio: '',
    comment: '',
    commentid: '',
    modcomment: false,
    commid: '',
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
        { hid: 'apple-mobile-web-app-title', property: 'apple-mobile-web-app-title', content: this.data1.title },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `https://zabbix.etalon48.com/blog/${this.data1.url}`
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.data1.description
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: `https://zabbix.etalon48.com/uploads/blog/${this.data1.coverImageName[0].filename}`
        }
      ]
    }
  },
  filters: {
    truncate (text, length) {
      return text.substring(0, text.length - 4)
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
    this.data1.comments = this.data1.comments.reverse()
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
        .patch(`https://zabbix.etalon48.com/api/blog/${this.data1.url}`, formData, {
          headers: {
            Authorization: this.$auth.$storage._state['_token.local']
          }
        })
        .then(alert('Статья обновлена'), this.$router.push('/blog'))
    },
    handleFileUploads () {
      this.files = this.$refs.files.files
    },
    moderatecom () {
      const formData = {
        active: this.modcomment,
        id: this.commentid
      }
      axios
        .patch(
          `https://zabbix.etalon48.com/api/blog/${this.data1.url}/comment`,
          formData
        )
        .then(alert('Статья обновлена'))
    },

    blogDelete () {
      axios
        .delete(`https://zabbix.etalon48.com/api/blog/${this.data1.url}`)
        .then(
          alert(`Статья ${this.data1.h1} удалена`),
          this.$router.push('/blog')
        )
    },
    commentDelete () {
      const formData = { active: this.commid, id: this.commentid }

      axios
        .patch(
          `https://zabbix.etalon48.com/api/blog/${this.data1.url}/comment/del`,
          formData
        )
        .then(alert('Комментарий удален'))
      location.reload()
    },
    newComment () {
      const formData = {
        comment: this.comment,
        fio: this.fio
      }

      axios.post(
        `https://zabbix.etalon48.com/api/blog/${this.data1.url}/comment`,
        formData
      )
      this.sendNoticeComment()
      location.reload()
    },
    sendNoticeComment () {
      const formData = {
        email: 'zhukov@etalon48.com Оставлен новый комментарий',
        namefio: this.fio,
        mailtext: this.comment
      }
      axios.post('https://zabbix.etalon48.com/api/contact', formData)
        .then(alert('Успешно отправлено'))
    },
    addFiles () {
      const formData = new FormData()
      for (let i = 0; i < this.files.length; i++) {
        const file = this.files[i]
        formData.append('files', file)
      }
      axios
        .post('https://zabbix.etalon48.com/api/uploadmulti', formData, {
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
