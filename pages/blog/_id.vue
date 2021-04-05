<template>
<div>
<h1>{{data1.h1}}</h1>
<span v-html="data1.content"></span>
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
