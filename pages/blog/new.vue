<template>
  <div class="container">
    <v-form ref="service">
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

      <v-select
        v-model="tag"
        :items="items"
        required
        label="Выберите тэг"
        outlined
        name="tag"
      />

      <v-textarea
        v-model="content"
        name="content"
        label="content"
        hint="Hint text"
      />
      <span>Файл для статьи</span>
      <br><br>
      <span>Файлы для фотогалереи</span>
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
      <v-btn color="warning" @click="newBlog">
        Опубликовать
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import axios from 'axios'
import Editor from '@tinymce/tinymce-vue'
export default {
  components: {
    editor: Editor
  },
  data: () => ({
    h1: '',
    title: '',
    description: '',
    url: '',
    tag: '',
    content: '',
    files: [],
    introtext: '',
    items: [
      'Национальные проекты',
      'Здравоохранение',
      'Образование',
      'Конкурсы'
    ]
  }),
  head () {
    return {
      title: 'Создать запись',
      meta: [
        { hid: 'description', name: 'description', content: 'Новая запись' },
        { hid: 'robots', name: 'robots', content: 'index,follow' }
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
      formData.append('content', this.content)
      formData.append('introtext', this.introtext)
      formData.append('file', file)
      axios.post('http://localhost:3000/api/blog', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
    },
    handleFileUpload () {
      this.file = this.$refs.file.files[0]
    },
    handleFileUploads () {
      this.files = this.$refs.files.files
      console.log(this.files[0])
    },
    addFile (newAddedFiles) {
      const formData = new FormData()
      const file = this.file
      formData.append('file', file)
      axios
        .post('http://localhost:3000/api/upload', formData, {
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

<style></style>
