<template>
   <div  class=" h-100 d-inline-block w-100">
        <div  class="h-100 d-flex flex-column align-items-center justify-content-center">
            <div id="reset">
                <v-form lazy-validation
                    ref="reset"
                    v-model="valid"
                    @submit.prevent="Reset">
                    <h2 class="text-center">Восстоновление пароля</h2>
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
                        <v-btn
                                type="submit"
                                class="m-auto w-100"
                                elevation="2"
                                rounded
                                text
                        >Отправить</v-btn>
                    </div>
                </v-form>
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
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import firebase from '../firebase/index';
import Notification from '../interfaces/notification';
export default {
    data()
    {
        return {
            valid: true as boolean,
            form: {
                email: '' as string,
            },
            rules: {
                required: (value : string) => !!value || 'Обязательно.',
                email: (value : string ): true|"Некорректный e-mail." => {
                const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                return pattern.test(value) || 'Некорректный e-mail.'
                }
            },
            notification: {
                snackbar: false,
                text: '',
            } as Notification,
            success: {
                snackbar: false,
                text: '',
            } as Notification,
        }
    },
    methods:
    {
        Reset(this : any)
        {
            if ((this.$refs.reset as Vue & { validate: () => boolean }).validate())
            {
                const auth = firebase.firebase.auth();
                auth.sendPasswordResetEmail(this.form.email).then(() => {
                    this.success.text = "Письмо успешно отправленно";
                    this.success.snackbar = true;
                }).catch((error : any) => {
                    this.notification.text = error.message;
                    this.notification.snackbar = true;
                    console.error(error)
                });
            }
        }
    },
    mounted()
    {
        const main : any = document.querySelector("#main");
        main.classList.add("d-flex");
    }

}
</script>
