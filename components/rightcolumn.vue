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
        <span class="text-md-center" style="font-size:18px;">Председатель</span>
        <v-img src="http://localhost:3000/uploads/viprofile.jpg" lazy-src="http://localhost:3000/uploads/viprofile.jpg" width="200" class="mt-4" style="border-radius: 8px;" />
        <span class="text-md-center" style="font-size:18px;">Урываева В.И.</span>
        <v-divider /><br>
        <span class="text-md-center" style="font-size:18px;">Наши контакты</span>
      </center><br>
      <div class="ml-4">
        <v-icon color="red">
          mdi-phone-outline
        </v-icon>
        <span class="text-md-center" style="font-size:18px;">+7 (4742) 28-12-21</span>
        <br></v-icon><v-icon color="red">
          mdi-map-marker
        </v-icon><span class="text-md-center" style="font-size:18px;">г. Липецк, ул. Плеханова, д. 33Б</span>
        <br><a style="text-decoration:none;" href="https://vk.com/sglo48"><v-icon large color="red">
          mdi-vk
        </v-icon></a><a style="text-decoration:none;" href="https://www.instagram.com/sglo48/"><v-icon large color="red">
          mdi-instagram
        </v-icon></a>
      </div>
      <v-divider /><br>
      <center><span class="text-md-center" style="font-size:18px;">Информация</span></center>
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
    </v-sheet>
  </v-col>
</template>
