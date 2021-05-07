<template>
  <div data-app id="body">
    <Menu id="header"/>
    <div id="main">
      <router-view></router-view>
    </div>
    <Footer id="footer"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Menu from './components/Menu.vue'
import Footer from './components/Footer.vue'
import firebase from './firebase/index';

export default Vue.extend({
  name: 'App',
  components: 
  {
    Menu,
    Footer
  },
  mounted()
  {
    // var currentUser;
    firebase.firebase.auth().onAuthStateChanged(async (user : any) => {
          console.log(user.uid);
          const data : any = await firebase.fs.collection('users').doc(user.uid).get();
          localStorage.setItem('user', JSON.stringify(data.data()));
          this.$store.dispatch('user/LoadUser', localStorage.user)
          this.$forceUpdate;
          console.log(data.data())
    });
    // const user : any = await  firebase.firebase.auth().currentUser;

    // console.log(user);

    // const data : any = await firebase.fs.collection('users').doc(user.uid).get();
    // console.log(data.data())
    // this.$forceUpdate
  },
  data: () => ({
    //
  }),
});
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900");
@import url("https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");
$purple: rgb(72, 72, 207);
$error: #f53131;
.color
{
    color: $purple;
}
.min-w-200 {
  min-width: 200px;
}
#email-ch, #login-ch
{
    display: none !important;
}
.color__blue
{
  color: #007bff;
}
.bg__purple{
  background: $purple !important;
  color: white im !important;
}
.v-application  {
  color: none !important;
}
.v-input
{
  color: $purple !important; 
}
.error--text 
{
  color: $error !important;
}




html, body {
    height: 100%;
    width: 100vw !important;
}

#body {
  display: flex;
	flex-direction: column;
	min-height: 100%;
}

#main
{
    height: 100%;
    min-height: 100%;
    flex: 1 0 auto;
    // display: flex;
    flex-direction: column;
    justify-content: space-around;
}

#header
{
    flex: 0 0 auto;
}

#footer
{
    // @extend %flex-pareant-col;
    flex: 0 0 auto;
    margin: -20px;
    margin-bottom: -30px;
}

.h-100 {
  min-height:100%
}

.v-stepper__step .primary {
  background: $purple;
}
.min-content-fit
{
  min-width: fit-content;
}
.v-stepper__step
{
  display: flex;
  flex-direction: column;
}
.v-stepper
{
  // box-shadow: none !important;
}
.w-min-content
{
  min-width: min-content !important;
}

.editor {
/* we dont use `language-` classes anymore so thats why we need to add background and text color manually */
background: #817d7d;
color: rgb(255, 255, 255);

/* you must provide font-family font-size line-height. Example: */
font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
font-size: 14px;
line-height: 1.5;
padding: 5px;
min-height: 300px;
max-height: 600px;
}

/* optional class for removing the outline */
.prism-editor__textarea:focus {
outline: none;
}

   .h100 {
        height: 100vh !important;
    }

    .btn-slide
    {
        border-bottom: 4px solid rgb(72, 72, 207);
        border-radius: 5px;
        padding: 4px;
    }

    .btn-slide:hover
    {
        background: rgba(78, 73, 71, 0.164);
    }

    #login, #reset {
        background: rgba(78, 73, 71, 0.432);
        padding: 20px;
        border-radius: 5px;
    }
</style>
