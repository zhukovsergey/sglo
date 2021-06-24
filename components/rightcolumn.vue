<template>
  <v-col
    cols="12"
    sm="3"
    md="2"
    class="pt-md-8 pr-md-8 ord3"
  >
    <v-sheet
      elevation="20"
      rounded="lg"
      min-height="268"
    >
      <center>
        <span class="text-md-center" style="font-size:23px; font-family: 'Asessorc';">Председатель</span>
        <v-lazy><v-img src="https://zabbix.etalon48.com/uploads/viprofile.jpg" lazy-src="https://zabbix.etalon48.com/uploads/viprofile.jpg" class="mt-4" style="border-radius: 8px; width: 100%;" /></v-lazy>     <span class="text-md-center" style="font-size:18px;">Урываева В.И.</span>
        <v-divider /><br>
        <span class="text-md-center" style="font-size:23px; font-family: 'Asessorc';">Наши контакты</span>
      </center><br>
      <div class="ml-4">
        <v-icon color="red">
          mdi-phone-outline
        </v-icon>
        <span class="text-md-center" style="font-size:16px;">+7 (4742) 28-12-21</span>
        <br></v-icon><v-icon color="red">
          mdi-map-marker
        </v-icon><span class="text-md-center" style="font-size:16px;">г. Липецк, ул. Плеханова, д. 33Б</span>
        <br><a style="text-decoration:none;" href="https://vk.com/sglo48"><v-icon large color="red">
          mdi-vk
        </v-icon></a><a style="text-decoration:none;" href="https://www.instagram.com/sglo48/"><v-icon large color="red">
          mdi-instagram
        </v-icon></a>
      </div>
      <v-divider /><br>
      <center><span class="text-md-center" style="font-size:23px; font-family: 'Asessorc';">Информация</span></center>
      <div>
        <v-icon color="red">
          mdi-file-document
        </v-icon><span class="pl-4"><a href="/uploads/ustav.pdf">Устав СЖР</a></span><br>
        <v-icon color="red">
          mdi-file-document
        </v-icon><span class="pl-4"><a href="/uploads/ustavsglo.pdf">Устав СЖЛО</a></span><br>
        <v-icon color="red">
          mdi-file-document
        </v-icon><span class="pl-4"><a href="/uploads/ukaz.pdf">Указ президента</a></span><br>
      </div>
       <v-dialog
      v-model="dialog"
      max-width="500px"
      style="background:white;"
    >
      <template v-slot:activator="{ on, attrs }"><center>
        <v-btn
        class="submitmail"
        block
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
          style="width: 90%; max-width: 200px; font-size: 0.8em;"
        >
          Отправить сообщение
        </v-btn></center><br><v-divider></v-divider>
      </template>
      <v-card>
        <v-card-title>Отправка сообщения</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      v-model="namefio"
      name="namefio"
      :counter="10"
      :rules="nameRules"
      label="Имя"
      required
    ></v-text-field>

    <v-text-field
      v-model="email"
      :rules="emailRules"
      name="email"
      label="E-mail"
      required
    ></v-text-field>

     <v-textarea
         v-model="mailtext"
         :rules="[v => !!v || 'Текст не введен']"
          name="mailtext"
          label="Текст сообщения"
          value="Текст сообщения."
        ></v-textarea>
          <v-btn
      color="warning"
      @click="sendForm()"
    >
      Отправить
    </v-btn><br><br>
        </v-form>
        </v-card-text>
        <v-divider></v-divider>
      </v-card>
    </v-dialog>
    <br>
    </v-sheet>
  </v-col>
</template>

<script>
import axios from 'axios'
export default {
  data: () => ({
    mailtext: '',
    namefio: '',
    email: '',
    dialogm1: '',
    dialog: false,
    valid: true,
    nameRules: [
      v => !!v || 'Имя обязательно',
      v => (v && v.length <= 10) || 'Имя должно быть меньше 10 символов'
    ],
    emailRules: [
      v => !!v || 'E-mail обязателен',
      v => /.+@.+\..+/.test(v) || 'E-mail неправильный'
    ],
    select: null
  }),
  methods: {
    sendForm () {
      const formData = {
        email: this.email,
        namefio: this.namefio,
        mailtext: this.mailtext
      }
      axios.post('https://zabbix.etalon48.com/api/contact', formData)
        .then(alert('Успешно отправлено'))
    }
  }
}
</script>
