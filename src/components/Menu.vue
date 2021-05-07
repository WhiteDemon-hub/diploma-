<template>
  <v-row>
      <v-card height="70px" w-100 class="w-100">
        <v-card-title class="white--text">
          <v-menu
            bottom
            left
            rounded
            offset-y
            v-if="User">
                <template v-slot:activator="{ on }">
                    <v-btn
                        class="m-auto"
                        icon
                        x-large
                        v-on="on">
                            <v-avatar
                                v-if="User.avatar !== null"
                                :size="36"
                            >
                                <img :src="User.avatar" alt="Avatar" class="v-avatar">
                            </v-avatar>
                            <v-avatar v-else class="bg-primary h1 text-white" :size="48">
                                <span class="white--text headline">{{User.login | name}}</span>
                            </v-avatar>
                    </v-btn>
                </template>
                <v-card class="min-w-200">
                    <v-list-item-content class="justify-center">
                        <div class="mx-auto text-center">
                        <v-avatar
                                v-if="User.avatar !== null"
                                :size="48"
                            >
                                <img :src="User.avatar" alt="Avatar" class="v-avatar">
                            </v-avatar>
                            <v-avatar v-else class="bg-primary h1 text-white" :size="48">
                                <span class="white--text headline">{{User.login | name}}</span>
                            </v-avatar>
                        <p class="h6 p-2">{{ User.login }}</p>
                        <p class="h6 p-2">
                            {{ User.email }}
                        </p>
                        <v-divider class="my-3"></v-divider>
                        <v-btn
                            depressed
                            rounded
                            text
                        >
                        <router-link to="/">Главная</router-link>
                        </v-btn>
                        <v-divider class="my-3"></v-divider>
                        <v-btn
                            depressed
                            rounded
                            text
                        >
                        <router-link to="/profile">Профиль</router-link>
                        </v-btn>
                        <v-divider class="my-3"></v-divider>
                        <v-btn
                            depressed
                            rounded
                            text
                        >
                            <a role="button"  @click="LogOut(false)">Выход</a>
                        </v-btn>
                        </div>
                    </v-list-item-content>
            </v-card>
          </v-menu>
        </v-card-title>
      </v-card>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import firebase from '../firebase/index'
import { mapGetters, mapActions } from 'vuex'
export default Vue.extend({
  computed:
    {

      ...mapGetters('user', ['GetUser']),
      User () {
        if(this.GetUser == null || this.GetUser == undefined)
        {
            return false
        }
        return JSON.parse(this.GetUser)
      }
    },
  
  filters: {
    name: function (value : string) {
      return value.substr(0, 1)
    }
  },
  methods: {
    ...mapActions('user', ['LoadUser', 'ClearUser']),
    LogOut () {
      firebase.firebase.auth().signOut().then(() => {
        localStorage.removeItem('user');
        this.$store.dispatch('user/ClearUser')
        this.$router.push({ name: 'Login' })
      })
    }
  },
  mounted () {
    // this.$store.dispatch('user/LoadUser', localStorage.user)
    // this.LoadUser(localStorage.user);
  },
})
</script>