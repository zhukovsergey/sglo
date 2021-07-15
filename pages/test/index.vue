<template>
  <div>
    <ul>
    </ul>
    <v-text-field
    @change=copy
            v-model="dat"
            label="First name"
            required
          ></v-text-field>
          <v-text-field
            v-model="dat1"
            label="First name"
            required
          ></v-text-field>
  </div>
</template>

<script>
export default {
  data: () => ({
    page: 1,
    items: [],
    dat: '232131',
    dat1: ''
  }),
  methods: {
    copy () {
      this.dat1 = this.dat
    }
  }
}
</script>
