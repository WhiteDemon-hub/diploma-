<template>
    <v-footer
      class="p-0 bg__purple"
    >
      <v-card
        flat
        tile
        width="100%"
        class="red lighten-1 text-center bg__purple"
      >
        <v-card-text>
          <v-btn
            class="mx-4"
            icon>
            <router-link to="/"><v-icon size="24px">
              {{ 'mdi-home' }}
            </v-icon></router-link>
          </v-btn>
          <v-btn
            class="mx-4"
            icon>
            <a href="mailto:sword5157@gmil.com"><v-icon size="24px">
              {{ 'mdi-email' }}
            </v-icon></a>
          </v-btn>
          <v-btn
            class="mx-4"
            icon>
              <a href="https://t.me/WhiteDemon666"><i class="fa fa-telegram h5 m-0" aria-hidden="true"></i></a>
          </v-btn>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} — <strong>WhiteDemon</strong>
        </v-card-text>
      </v-card>
    </v-footer>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    data: () => ({
      icons: [
        'mdi-home',
        'mdi-email',
        'mdi-calendar',
      ],
    }),
})
</script>