<template>
  <div class="container">
    <v-form ref="service" v-model="valid">
      <v-text-field
        v-model="h1"
        :rules="nameRules"
        label="Заголовок статьи"
        counter=""
        required
        name="h1"
        @keyup="translite()"
      />
      <v-text-field
        id="title"
        v-model="title"
        :rules="nameRules"
        label="Заголовк для поисковика"
        name="title"
        />
      <v-text-field
        v-model="introtext"
        :rules="nameRules"
        label="Короткое описание"
        name="introtext"
        required
      />

      <v-text-field
        v-model="description"
        :rules="nameRules"
        label="Описание для поисковика"
        name="description"
        />
      <v-text-field
        id="url"
        v-model="url"
        label="Ссылка (Это поле формируется автоматически)"
        required
        name="url"
        disabled
      />

      <editor
        v-model="content"
        api-key="octb58ja97o9rwhmbve45apizjpm26aljf3b44lcwxdevaht"
        :init="{
          height: 500,
          menubar: 'file edit view insert format tools table tc help',
          language: 'ru',
          plugins: [
            'advlist autolink lists link image charmap',
            'searchreplace visualblocks code fullscreen',
            'print preview anchor insertdatetime media',
            'paste code help wordcount table textcolor colorpicker hr',
            'insertdatetime media nonbreaking save table contextmenu directionality'
          ],
          toolbar:
            'undo redo | formatselect | bold italic | \
        alignleft aligncenter alignright | \
        bullist numlist outdent indent | help'
        }"
      />
      <v-select
        v-model="region"
        :rules="[v => !!v || 'Район не выбран']"
        :items="regions"
        required
        label="Выберите район"
        outlined
        name="region"
        />
      <v-select
        v-model="tag"
        :rules="[v => !!v || 'Тэг не выбран']"
        :items="items"
        required
        label="Выберите тэг"
        outlined
        name="tag"
        />

      <v-textarea
      :rules="[value => value.length >= 15 || 'Длина текста меньше 15 символов']"
        v-model="content"
        name="content"
        label="Текст статьи"
        hint="Hint text"
      />
      <br><br>
      <span>Файлы для фотогалереи</span>

      <v-file-input
      v-model="files"
      :rules="[value => value.length >= 1 || 'Файлы не выбраны']"
      show-size
      accept="image/png, image/jpeg, image/bmp"
      id="files"
      placeholder="Загрузите файлы"
    label="Загрузите файлы"
    multiple
    prepend-icon="mdi-paperclip"
  >
  </v-file-input>
  <v-btn color="warning" @click="newBlog" :disabled="!valid">
        Опубликовать
      </v-btn>
    </v-form>
    </div>
    </template>

<script>
import axios from 'axios'
import Editor from '@tinymce/tinymce-vue'
import scripts from '~/uploads/translit.js'

export default {
  components: {
    editor: Editor
  },
  middleware: 'auth',
  data: () => ({
    valid: true,
    h1: '',
    title: '',
    description: '',
    url: '',
    tag: '',
    region: '',
    content: '',
    files: [],
    introtext: '',
    rules: [
      value => !!value || 'Вставьте фото для статьи'],
    nameRules: [
      v => !!v || 'Заголовок обязателен',
      v => v.length >= 10 || 'Слишком короткий заголовок'
    ],
    items: [
      'Национальные проекты',
      'Здравоохранение',
      'Образование',
      'Конкурсы'
    ],
    regions: [
      'г. Липецк',
      'г. Елец',
      'Липецкий район',
      'Елецкий район',
      'Воловский район',
      'Грязинский район',
      'Данковский район',
      'Добринский район',
      'Добровский район',
      'Долгоруковский район',
      'Задонский район',
      'Измалковский район',
      'Краснинский район',
      'Лебедянский район',
      'Лев-Толстовский район',
      'Становлянский район',
      'Тербунский район',
      'Усманский район',
      'Хлевенский район',
      'Чаплыгинский район'
    ]
  }),
  head () {
    return {
      title: 'Создать запись',
      meta: [
        { hid: 'description', name: 'description', content: 'Новая запись' },
        { hid: 'robots', name: 'robots', content: 'noindex, nofollow' }
      ]
    }
  },

  methods: {
    newBlog () {
      const formData = new FormData()
      const file = this.file
      for (let i = 0; i < this.files.length; i++) {
        const file1 = this.files[i]
        formData.append('files', file1)
      }
      formData.append('h1', this.h1)
      formData.append('title', this.title)
      formData.append('description', this.description)
      formData.append('url', this.url)
      formData.append('tag', this.tag)
      formData.append('region', this.region)
      formData.append('content', this.content)
      formData.append('introtext', this.introtext)
      formData.append('file', file)
      axios.post('https://zabbix.etalon48.com/api/blog', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
        .then(this.$toast.success('Статья добавлена', { duration: 3000 }), this.$router.push('/blog'))
    },
    translite () {
      this.url = scripts.translite(this.h1)
    },
    handleFileUpload () {
      this.file = this.$refs.file.files[0]
    },
    // handleFileUploads () {
    //   this.files = this.$refs.files.files
    // },
    // handleFileUploads1 () {
    //   console.log(this)
    //   console.log(this.files)
    // },
    addFile (newAddedFiles) {
      const formData = new FormData()
      const file = this.file
      formData.append('file', file)
      axios
        .post('https://zabbix.etalon48.com/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(response => (this.newAddedFiles = response.data))
    },
    addFiles (newAddedFiless) {
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

<style></style>
