<template>
  <div  class=" h-100 d-inline-block w-100">
    <div  class="h-100 d-flex flex-column align-items-center justify-content-center">
        <div id="login">

            <div v-if="login">
                <LogIn/>
            </div>
            <div v-else>
                <RegIn/>
            </div>
            <div class="container">
                 <h5 class="text-center text-white">Войти через:</h5>
                 <div class="d-flex flex-row m-auto">
                    <a role="button" @click="GoogleAuth()" class="h3 m-auto color"><i class="fa fa-google" aria-hidden="true"></i></a>
                    <a role="button" @click="GitHubAuth()" class="h3 m-auto color"><i class="fa fa-github" aria-hidden="true"></i></a>
                 </div>
            </div>
            <div class="d-flex justify-content-between">
                <button @click="LoginOpen(true)" class="m-auto btn-slide">Вход</button>
                <button @click="LoginOpen(false)" class="m-auto btn-slide">Регистрация</button>
            </div>
            <div class="d-flex justify-content-between text-center p-2">
                <router-link to="/reset_password" class="text-center w-100">Забыл пароль?</router-link>
            </div>
        </div>
    </div>
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
import Vue from 'vue';
import { mapActions } from 'vuex';
import LogIn from '../components/Login.vue';
import RegIn from '../components/Regin.vue';
import firebase from '../firebase/index';
import Notification from '../interfaces/notification';
export default Vue.extend({
    name: 'Login',
    data () {
        return {
            login: true,
            notification: {
                snackbar: false,
                text: '',
            } as Notification,
        }
    },
    components: 
    {
        LogIn,
        RegIn
    },
    methods:
    {
            ...mapActions('user', ['LoadUser']),

        LoginOpen (val: boolean) {
            this.login = val;
        },
            async GoogleAuth () {
                await this.socialLogin(firebase.google);
            },
            async GitHubAuth () 
            {
                await this.socialLogin(firebase.github);
                // this.$router.push({ name: 'Home' })
            },
            async  socialLogin (provider : any): Promise<void> 
            {
                firebase.firebase.auth().signInWithPopup(provider)
                .then(async (result: any) => {
                    const user: any = await firebase.fs
                        .collection('users')
                        .doc(result.user.uid)
                        .get()
                    const data : any = {
                        login: result.user.displayName,
                        email: result.user.email,
                        avatar: result.user.photoURL,
                        uid: result.user.uid
                    }
                    if (!user.exists) 
                    {
                        const createUser = firebase.fs
                        .collection('users')
                        .doc(result.user.uid)
                        createUser.set(data)  
                    }
                    let status = await firebase
                    .fs
                    .collection('user_passing_task_js')
                    .where('uid', '==',  result.user.uid)
                    .get();

                    if(status.size == 0)
                    {
                    await firebase.fs.collection('user_passing_task_js').doc().set({
                    uid: result.user.uid,
                        status: [{
                        number: 1,
                        code: '',
                        status: false,
                        }]
                    });
                    }
                    this.$router.push({ name: 'Home' })
                    
                })
                .catch((error) => {
                    this.notification.text = error.message;
                    this.notification.snackbar = true;
                    console.error(error)
                })
            }
        },
        mounted()
        {
            const main : any = document.querySelector("#main");
            main.classList.add("d-flex");
        },
})
</script>

<style scoped lang="scss">
    #main
    {
        display: flex;
    }
</style>
