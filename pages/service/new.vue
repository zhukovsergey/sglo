<template>
  <div class="container">
    <label for="h1">h1</label>
    <input v-model="h1" type="text" name="h1" />
    <label for="title">title</label>
    <input v-model="title" type="text" name="title" />
    <label for="description">description</label>
    <input v-model="description" type="text" name="description" />
    <label for="url">url</label>
    <input v-model="url" name="url" />
    <label for="content">content</label>
    <input v-model="content" type="text" name="content" />
    <button v-on:click="newBlog" >Опубликовать</button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
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
        { hid: 'robots', name: 'robots', content: 'index,follow' }
      ]
    }
  },

  methods: {
    newBlog () {
      const formData = {
        h1: this.h1,
        title: this.title,
        description: this.description,
        url: this.url,
        content: this.content
      }
      axios.post('http://localhost:3000/api/service', formData)
    }
  }

}
</script>

<style>

</style>
