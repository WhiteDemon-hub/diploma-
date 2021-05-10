<template>
    <div class="form">
        <v-form lazy-validation
        ref="regin"
        v-model="valid"
         @submit.prevent="Reg">
            <h2 class="text-center">Регистрация</h2>
            <div class="form-group">
              <label for=""></label>
              <v-text-field
                v-model="form.email"
                :rules="[rules.required, rules.email]"
                label="Email"
                hint="XXXXX@XXXX.XXX"
              ></v-text-field>
            </div>
            <div class="form-group">
              <label for=""></label>
              <v-text-field
                    v-model="form.login"
                    :rules="[rules.required, rules.min_login]"
                    name="login"
                    label="Логин"
                    hint="Минимум 3 символов"
                ></v-text-field>
            </div>
            <div class="form-group">
              <label for=""></label>
               <v-text-field
                    v-model="form.password"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required, rules.min, (this.form.password === this.form.password_confirm) || 'Пароли не совпадают']"
                    :type="show1 ? 'text' : 'password'"
                    name="password"
                    label="Пароль"
                    hint="Минимум 8 символов"
                    counter
                    @click:append="show1 = !show1"
                ></v-text-field>
            </div>
            <div class="form-group">
              <label for=""></label>
              <v-text-field
                v-model="form.password_confirm"
                :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min, (this.form.password === this.form.password_confirm) || 'Пароли не совпадают']"
                :type="show2 ? 'text' : 'password'"
                name="password_confirm"
                label="Повторите пароль"
                hint="Минимум 8 символов"
                @click:append="show2 = !show2"
              ></v-text-field>
            </div>
           <v-file-input
                v-model="form.image"
                :rules="rule_file"
                accept="image/png, image/jpeg, image/bmp"
                placeholder="Выберете аватар"
                prepend-icon="mdi-camera"
                label="Avatar"
            ></v-file-input>
             <div class="form-group row">
                <v-btn
                        type="submit"
                        class="m-auto w-100"
                        elevation="2"
                        rounded
                        text
                >Зарегистрироватся</v-btn>
            </div>
        </v-form>

        <v-snackbar
        v-model="notification.snackbar"
        color="success"
        outlined
        right
        
        >
        <p class="text-danger p-0 m-0" >{{ notification.text }}</p>

            <template v-slot:action="{ attrs }">
                <v-btn
                color="red"
                text
                v-bind="attrs"
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
import Vue from 'vue'
import { mapActions } from 'vuex'
import firebase from '../firebase/index';
import Form from '../interfaces/user'
import Notification from '../interfaces/notification'

export default Vue.extend({
    data () {
    return {
      valid: true,
      form: {
      } as Form,
      notification: {
            snackbar: false,
            text: '',
      } as Notification,
      rule_file: [( value : File ) => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!'],
      show1: false,
      show2: false,
      rules: {
        required: (value : boolean) => !!value || 'Обязательно.',
        min: (v : string) => v.length >= 8 || 'Неменьше 8 символов',
        min_login: (v : string) => v.length >= 3 || 'Неменьше 3 символов',
        email: (value : string) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Некорректный e-mail.'
        }
      }
    }
  },
  methods: {
    ...mapActions('user', ['LoadUser']),
    Reg () {
      if ((this.$refs.regin as Vue & { validate: () => boolean }).validate()) {
        firebase.firebase.auth().createUserWithEmailAndPassword(this.form.email, this.form.password)
          .then(async (userCredential : any) => {
            
            const storageRef = firebase.firebase.storage().ref()
            const avatarsToAvatarsRef = storageRef.child('avatars/' + userCredential.user.uid + '/' + this.form.image.name)
            await avatarsToAvatarsRef.put(this.form.image);
            const user = firebase.fs.collection('users').doc(userCredential.user.uid)
            const url = await avatarsToAvatarsRef.getDownloadURL()
            const data = {
              login: this.form.login,
              email: this.form.email,
              avatar: url,
              uid: userCredential.user.uid
            }
            user.set(data)
            const newUser : any = firebase.firebase.auth().currentUser
            newUser.sendEmailVerification();
              await firebase.fs.collection('user_passing_task_js').doc().set({
              uid: userCredential.user.uid,
                status: [{
                  number: 1,
                  code: '',
                  status: false,
                }]
              });
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