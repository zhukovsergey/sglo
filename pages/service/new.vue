<template>
  <div class="container">
    <v-form ref="service">
      <v-text-field v-model="h1" label="h1" required name="h1" />
      <v-text-field v-model="title" label="title" required name="title" />
      <v-text-field
        v-model="description"
        label="description"
        required
        name="description"
      />
      <v-text-field v-model="url" label="url" required name="url" />
      <v-text-field v-model="content" label="content" required name="content" />
      <input ref="file" type="file" name="file" @change="handleFileUpload">
      <v-btn color="warning" @click="addFile">
        Загрузить
      </v-btn>
      <v-btn color="warning" @click="newBlog">
        Опубликовать
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  middleware: 'auth',
  data: () => ({
    h1: '',
    title: '',
    description: '',
    url: '',
    content: ''
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
      formData.append('h1', this.h1)
      formData.append('title', this.title)
      formData.append('description', this.description)
      formData.append('url', this.url)
      formData.append('content', this.content)
      formData.append('file', file)
      axios.post('https://zabbix.etalon48.com/api/service', formData)
    },
    handleFileUpload () {
      this.file = this.$refs.file.files[0]
    },
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
      console.log(formData)
    }
  }
}
</script>
<style></style>
