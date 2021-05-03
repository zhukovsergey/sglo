<template>
  <div>
    <v-form @submit.prevent="userLogin" class="px-12 py-12 text-center">
      <div>
        <v-text-field label="Имя пользователя" type="text" v-model="login.user" />
      </div>
      <div>
          <v-text-field label="Пароль" type="text" v-model="login.password" />
      </div>
      <div>
        <v-btn class="primary" type="submit">Войти</v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      login: {
        user: '',
        password: ''
      }
    }
  },
  methods: {
    async userLogin () {
      try {
        await this.$auth.loginWith('local', { data: this.login })
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
