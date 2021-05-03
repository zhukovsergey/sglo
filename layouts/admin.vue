<template>
  <div>
    <Headercomp />
    <div class="content center"></div>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  head () {
    return {
      meta: [{ name: 'robots', content: 'noindex, nofollow' }]
    }
  }
}
</script>
