<template>
<div>
<center><h1 class="pt-4 mx-4">{{data1.h1}}</h1></center>
<img class="mx-8 my-8" style="width:40%; float:left;" :src="`/uploads/blog/${data1.coverImageName}`"/>
<p class="mx-8 my-8" v-html="data1.content"></p>
</div>
</template>

<script>
import axios from 'axios'
export default {
  async asyncData ({ params }) {
    const { data } = await axios.get(`http://localhost:3000/api/blog/${params.id}`)
    return { data1: data }
  }
}
</script>
