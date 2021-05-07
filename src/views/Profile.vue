<template>
<div>
    <div class="w-25 mb-auto ml-auto mr-auto border mt-5 d-flex flex-row w-min-content">
        <div class="user-avatar p-3 w-20 m-auto">
            <div v-if="User.avatar !== null">
                <v-avatar
                    :size="128"
                >
                    <img :src="User.avatar" alt="Avatar" class="v-avatar">
                </v-avatar>
            </div>
            <div v-else>
                <v-avatar class="bg-primary h1 text-white" :size="128">
                    <span class="white--text headline">{{User.login | name}}</span>
                </v-avatar>
            </div>
        </div>
    </div>
    <div class="w-75 mb-auto ml-auto mr-auto border mt-5 d-flex flex-row">
        <v-form
            lazy-validation
            ref="update_password"
            v-model="update_pwd_valid"
            @submit.prevent="UpdatePassword"
            class="m-auto">
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
                <div class="form-group row">
                <v-btn
                        type="submit"
                        class="m-auto w-100 btn-outline-danger"
                        elevation="2"
                        rounded
                        text
                >Сменить</v-btn>
            </div>
            </v-form>
    </div>
    <div class="d-flex mt-4">
        <button @click="deleteUser" type="button" class="btn btn-outline-danger m-auto">Удалить данные</button>
    </div>
    <v-snackbar
    v-model="notification.snackbar"
    color="success"
    outlined
    right>
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
    <v-snackbar
    v-model="success.snackbar"
    color="success"
    outlined
    right>
        <p class="text-success p-0 m-0" >{{ success.text }}</p>
        <template>
            <v-btn
            color="red"
            text
            @click="success.snackbar = false"
            class="btn btn-outline-success m-2"
            >
            Закрыть
            </v-btn>
        </template>
    </v-snackbar>
</div>
</template>

<script lang="ts">

import Vue from 'vue'
import firebase from './../firebase/index' 
import Notification from '../interfaces/notification';
export default Vue.extend({
    
    data() {
        return {
            valid: true,
            update_pwd_valid: true,
            editlogin: false as boolean,
            form: {
                login: '',
                password: '',
                password_confirm: '',
            },
            notification: {
                snackbar: false,
                text: '',
            } as Notification,
            success: {
                snackbar: false,
                text: '',
            } as Notification,
            show1: false,
            show2: false,
            rules: {
                min: (v : string) => v.length >= 8 || 'Неменьше 8 символов',
                min_login: (v : string ) => v.length >= 3 || 'Неменьше 3 символов',
            }
        }
    },
    methods: 
    {
        isEditLogin()
        {
            this.editlogin = !this.editlogin;
        },
        deleteUser()
        {
            const user : any = firebase.firebase.auth().currentUser;
            let credential : any;

            user.reauthenticateWithCredential(credential)

            user.delete().then(() => {
                localStorage.removeItem('user');
                this.$store.dispatch('user/ClearUser')
                this.$router.push({ name: 'Login' })
            }).catch((error : any) => {
                this.notification.text = error.message;
                this.notification.snackbar = true;
                console.error(error)
            });
        },
        UpdatePassword(this : any)
        {
            if ((this.$refs.update_password as Vue & { validate: () => boolean }).validate())
            {
                const user : any = firebase.firebase.auth().currentUser;
                // let credential : any = new firebase.firebase.auth.AuthCredential()
                // await firebase.firebase.auth().currentUser.getIdToken(true)
                // user.reauthenticateWithCredential(user.credential)
                user.updatePassword(this.form.password).then(() => {
                    this.success.text = "Пароль успешно обновлён.";
                    this.success.snackbar = true;
                }).catch((error: any) => {
                    this.notification.text = error.message;
                    this.notification.snackbar = true;
                    console.error(error)
                });
            }
        }
    },
    computed:
    {
        User () {
            if(this.$store.getters['user/GetUser'] == null || this.$store.getters['user/GetUser'] == undefined)
            {
                return false
            }
            return JSON.parse(this.$store.getters['user/GetUser'])
        }
    },
    filters: 
    {
        name: function (value : string) {
        value = String(value)
        return value.substr(0, 1)
    },
    mounted()
    {
        const main : any = document.querySelector("#main");
        main.classList.remove("d-flex");        
    }
  },
})
</script>