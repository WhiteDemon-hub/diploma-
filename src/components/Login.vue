<template>
    <div class="form">
        <v-form lazy-validation
        ref="login"
        v-model="valid"
        @submit.prevent="Auth">
            <h2 class="text-center">Вход</h2>
            <div class="form-group">
                <label for="email"></label>
                <v-text-field
                v-model="form.email"
                :rules="[rules.required, rules.email]"
                label="Email"
                hint="XXXXX@XXXX.XXX"
                ></v-text-field>
            </div>
            <div class="form-group">
                <label for="password"></label>
                <v-text-field
                    v-model="form.password"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required, rules.min]"
                    :type="show1 ? 'text' : 'password'"
                    name="password"
                    label="Пароль"
                    hint="Минимум 8 символов"
                    counter
                    @click:append="show1 = !show1"
                ></v-text-field>
            </div>
            <div class="form-group">
                <v-btn
                        type="submit"
                        class="m-auto w-100"
                        elevation="2"
                        rounded
                        text
                >Войти</v-btn>
            </div>

        </v-form>
        <v-snackbar
        v-model="notification.snackbar"
        color="success"
        outlined
        right
        
        >
        <p class="text-danger p-0 m-0" >{{ notification.text }}</p>

            <template>
                <v-btn
                color="red"
                text
                @click="notification.snackbar = false"
                class="btn btn-outline-danger m-2"
                >
                Закрыть
                </v-btn>
            </template>
        </v-snackbar>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import firebase from '../firebase/index';
import Notification from '../interfaces/notification';
export default Vue.extend({
    data () {
    return {
      valid: true,
      form: {
        email: '',
        password: ''
      },
        notification: {
            snackbar: false,
            text: '',
        } as Notification,
      show1: false,
      rules: {
        required: (value : string) => !!value || 'Обязательно.',
        min: (v : string) => v.length >= 8 || 'Неменьше 8 символов',
        email: (value : string ): true|"Некорректный e-mail." => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Некорректный e-mail.'
        }
      }
    }
  },
  methods:
  {
    ...mapActions('user', ['LoadUser']),
    Auth (): void {
      if ((this.$refs.login as Vue & { validate: () => boolean }).validate()) {
        firebase.firebase.auth().signInWithEmailAndPassword(this.form.email, this.form.password)
          .then(async (userCredential : any) => {
            const user = await firebase.fs
            .collection('users')
            .doc(userCredential.user.uid)
            .get();
            const data : any = {
                login: user.data().login,
                email: user.data().email,
                avatar: user.data().avatar,
                
            }
            localStorage.setItem('user', JSON.stringify(data));
            this.LoadUser(localStorage.user);
            
            
            
            this.$router.push({ name: 'Home' })
          })
          .catch((error) => {
                this.notification.text = error.message;
                this.notification.snackbar = true;
                console.error(error)
          })
      }
    }
  }
})
</script>