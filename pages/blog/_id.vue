<template>
  <div>
    <section itemscope itemtype="http://schema.org/Article">
      <center><h1 itemprop="headline" class="pt-4 mx-4">
      {{data1.h1}}</h1></center>
<div itemscope itemprop="image" itemtype="http://schema.org/ImageObject">
<img itemprop="url contentUrl" class="mx-8 my-8" style="width:40%; float:left;" :src="`/uploads/blog/${data1.coverImageName}`"/></div>
<article itemprop="articleBody">
<p class="mx-8 my-8" v-html="data1.content"></p>
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

</template>

<script>
import axios from 'axios'
import YandexShare from '@cookieseater/vue-yandex-share'
export default {
  async asyncData ({ params }) {
    const { data } = await axios.get(`http://localhost:3000/api/blog/${params.id}`)
    return { data1: data }
  },
  components: {
    YandexShare
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
    items: ['Национальные проекты', 'Здравоохранение', 'Образование', 'Конкурсы'],
    blog: []
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
      title: this.data1.title
    }
  }
}
</script>
