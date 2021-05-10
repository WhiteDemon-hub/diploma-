<template>
  <div>
    <v-card-text class="grey p-5">
      <h3 class="text-center">Курс JS</h3>
      <div class="w-100 m-auto d-flex p-4 min-content-fit">
          <div class="m-auto ">
            <img :src='"../assets/js-logo.png"' width="120px" alt="js-logo" class="m-auto">
          </div>
      </div>
      <h4>1. Введение</h4>
      <v-sheet
        height="100"
        max-width="1200"
        class="d-flex flex-row overflow-auto m-auto">
        <v-stepper non-linear class="w-100 m-auto w-min-content">
            <v-stepper-header class="flex-nowrap w-min-content">
              <div v-for="task in js_introduction" :key="task.number" >
                <!-- {{introduction_open[task.number]}} -->
                <router-link v-if="task.number == 1 || introduction_open[task.number - 2]" :to="{ name: 'Introduction', params: { id: task.number }}" >
                  <v-stepper-step class="d-flex flex-column"
                    editable
                    :step='task.number'
                  >
                  </v-stepper-step>
                </router-link>
                <router-link v-else :to="{ name: 'Introduction', params: { id: task.number }}"
                 tag="button"
                :disabled="true">
                  <v-stepper-step class="d-flex flex-column"
                    editable
                    :step='task.number'
                  >
                  </v-stepper-step>
                </router-link>
              </div>
              
            </v-stepper-header>
          </v-stepper>
      </v-sheet>

      <h4>2. Основы</h4>
      <v-sheet
        height="100"
        max-width="1200"
        class="d-flex flex-row overflow-auto m-auto">
        <v-stepper non-linear class="w-100 m-auto w-min-content">
            <v-stepper-header class="flex-nowrap w-min-content">
              <div v-for="task in basics" :key="task.number" >
                <!-- {{introduction_open[task.number]}} -->
                <router-link v-if="task.number == 1 || basics_open[task.number - 2]" :to="{ name: 'Basic', params: { id: task.number }}" >
                  <v-stepper-step class="d-flex flex-column"
                    editable
                    :step='task.number'
                  >
                  </v-stepper-step>
                </router-link>
                <router-link v-else :to="{ name: 'Basic', params: { id: task.number }}"
                 tag="button"
                :disabled="true">
                  <v-stepper-step class="d-flex flex-column"
                    editable
                    :step='task.number'
                  >
                  </v-stepper-step>
                </router-link>
              </div>
              
            </v-stepper-header>
          </v-stepper>
      </v-sheet>

      <h4>3. Циклы и условия.</h4>
      <v-sheet
        height="100"
        max-width="1200"
        class="d-flex flex-row overflow-auto m-auto">
        <v-stepper non-linear class="w-100 m-auto w-min-content">
            <v-stepper-header class="flex-nowrap w-min-content">
              <div v-for="task in js_cycles_and_conditions" :key="task.number" >
                <!-- {{introduction_open[task.number]}} -->
                <router-link v-if="task.number == 1 || js_cycles_and_conditions_open[task.number - 2]" :to="{ name: 'CyclesAndConditions', params: { id: task.number }}" >
                  <v-stepper-step class="d-flex flex-column"
                    editable
                    :step='task.number'
                  >
                  </v-stepper-step>
                </router-link>
                <router-link v-else :to="{ name: 'CyclesAndConditions', params: { id: task.number }}"
                 tag="button"
                :disabled="true">
                  <v-stepper-step class="d-flex flex-column"
                    editable
                    :step='task.number'
                  >
                  </v-stepper-step>
                </router-link>
              </div>
            </v-stepper-header>
          </v-stepper>
      </v-sheet>

      <h4>4. Функции.</h4>
      <v-sheet
        height="100"
        max-width="1200"
        class="d-flex flex-row overflow-auto m-auto">
        <v-stepper non-linear class="w-100 m-auto w-min-content">
            <v-stepper-header class="flex-nowrap w-min-content">
              <div v-for="task in js_function" :key="task.number" >
                <!-- {{introduction_open[task.number]}} -->
                <router-link v-if="task.number == 1 || js_function_open[task.number - 2]" :to="{ name: 'Function', params: { id: task.number }}" >
                  <v-stepper-step class="d-flex flex-column"
                    editable
                    :step='task.number'
                  >
                  </v-stepper-step>
                </router-link>
                <router-link v-else :to="{ name: 'Function', params: { id: task.number }}"
                 tag="button"
                :disabled="true">
                  <v-stepper-step class="d-flex flex-column"
                    editable
                    :step='task.number'
                  >
                  </v-stepper-step>
                </router-link>
              </div>
            </v-stepper-header>
          </v-stepper>
      </v-sheet>

      <h4>5. Обработка ошибок.</h4>
      <v-sheet
        height="100"
        max-width="1200"
        class="d-flex flex-row overflow-auto m-auto">
        <v-stepper non-linear class="w-100 m-auto w-min-content">
            <v-stepper-header class="flex-nowrap w-min-content">
              <div v-for="task in js_error" :key="task.number" >
                <!-- {{introduction_open[task.number]}} -->
                <router-link v-if="task.number == 1 || js_error_open[task.number - 2]" :to="{ name: 'Error', params: { id: task.number }}" >
                  <v-stepper-step class="d-flex flex-column"
                    editable
                    :step='task.number'
                  >
                  </v-stepper-step>
                </router-link>
                <router-link v-else :to="{ name: 'Error', params: { id: task.number }}"
                 tag="button"
                :disabled="true">
                  <v-stepper-step class="d-flex flex-column"
                    editable
                    :step='task.number'
                  >
                  </v-stepper-step>
                </router-link>
              </div>
            </v-stepper-header>
          </v-stepper>
      </v-sheet>
      <h4>6. Объекты и классы.</h4>
      <v-sheet
        height="100"
        max-width="1200"
        class="d-flex flex-row overflow-auto m-auto">
        <v-stepper non-linear class="w-100 m-auto w-min-content">
            <v-stepper-header class="flex-nowrap w-min-content">
              <div v-for="task in js_object_and_class" :key="task.number" >
                <!-- {{introduction_open[task.number]}} -->
                <router-link v-if="task.number == 1 || js_object_and_class_open[task.number - 2]" :to="{ name: 'Object', params: { id: task.number }}" >
                  <v-stepper-step class="d-flex flex-column"
                    editable
                    :step='task.number'
                  >
                  </v-stepper-step>
                </router-link>
                <router-link v-else :to="{ name: 'Object', params: { id: task.number }}"
                 tag="button"
                :disabled="true">
                  <v-stepper-step class="d-flex flex-column"
                    editable
                    :step='task.number'
                  >
                  </v-stepper-step>
                </router-link>
              </div>
            </v-stepper-header>
          </v-stepper>
      </v-sheet>
    </v-card-text>
    <!-- <v-stepper non-linear class="w-100 m-auto w-min-content">
            <v-stepper-header class="flex-nowrap w-min-content">
              
              <div v-for="task in task_js" :key="task.number" >
                <router-link v-if="task.number == 1 || open[task.number - 1]" :to="{ name: 'js_task', params: { id: task.number }}" >
                  <v-stepper-step class="d-flex flex-column"
                    editable
                    :step='task.number'
                  >
                  </v-stepper-step>
                </router-link>
                <router-link v-else :to="{ name: 'js_task', params: { id: task.number }}"
                 tag="button"
                :disabled="true">
                  <v-stepper-step class="d-flex flex-column"
                    editable
                    :step='task.number'
                  >
                  </v-stepper-step>
                </router-link>
              </div>
              
            </v-stepper-header>
          </v-stepper> -->
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import firebase from '../firebase/index'
  export default Vue.extend({
    name: 'Learn',

    data: () => ({
      task_js: [] as any,
      open: [] as any,
      js_introduction: [] as any,
      introduction_open: [] as any,
      basics: [] as any,
      basics_open: [] as any,
      js_cycles_and_conditions: [] as any,
      js_cycles_and_conditions_open: [] as any,
      js_function: [] as any,
      js_function_open: [] as any,
      js_error: [] as any,
      js_error_open: [] as any,
      js_object_and_class: [] as any,
      js_object_and_class_open: [] as any,
    }),
    methods: 
    {
      async Load() 
      {
      const main : any = document.querySelector("#main");
      main.classList.remove("d-flex");

      const js_introduction : any = await firebase
      .fs
      .collection('js_introduction')
      .orderBy('number')
      .get();

      js_introduction.forEach((element : any) => {
        this.js_introduction.push(element.data())
      });

      

      const open_introduction : any = await firebase
      .fs
      .collection('js_introduction_user')
      .where('uid', '==', JSON.parse(this.$store.getters['user/GetUser']).uid)
      .get();

      open_introduction.forEach((element : any) => {
        this.introduction_open = element.data().status;
      });
      
      /////
      
      const basics : any = await firebase
      .fs
      .collection('basics')
      .orderBy('number')
      .get();


      basics.forEach((element : any) => {
        this.basics.push(element.data());
      });


      const basics_open : any = await firebase
      .fs
      .collection('basics_user')
      .where('uid', '==', JSON.parse(this.$store.getters['user/GetUser']).uid)
      .get();

      basics_open.forEach((element : any) => {
        this.basics_open = element.data().status;
      });

      ///

      const js_cycles_and_conditions : any = await firebase
      .fs
      .collection("js_cycles_and_conditions ")
      .orderBy('number')
      .get();


      js_cycles_and_conditions.forEach((element : any) => {
        this.js_cycles_and_conditions.push(element.data());
      });

      const js_cycles_and_conditions_open : any = await firebase
      .fs
      .collection('js_cycles_and_conditions_user')
      .where('uid', '==', JSON.parse(this.$store.getters['user/GetUser']).uid)
      .get();

      js_cycles_and_conditions_open.forEach((element : any) => {
        this.js_cycles_and_conditions_open = element.data().status;
      });

      /// Функции
         const js_function : any = await firebase
        .fs
        .collection("function")
        .orderBy('number')
        .get();


        js_function.forEach((element : any) => {
          this.js_function.push(element.data());
        });

        const js_function_open : any = await firebase
        .fs
        .collection('function_user')
        .where('uid', '==', JSON.parse(this.$store.getters['user/GetUser']).uid)
        .get();

        js_function_open.forEach((element : any) => {
          this.js_function_open = element.data().status;
        });

        /// Ошибки
         const js_error : any = await firebase
        .fs
        .collection("js_error")
        .orderBy('number')
        .get();


        js_error.forEach((element : any) => {
          this.js_error.push(element.data());
        });

        const js_error_open : any = await firebase
        .fs
        .collection('js_error_user')
        .where('uid', '==', JSON.parse(this.$store.getters['user/GetUser']).uid)
        .get();

        js_error_open.forEach((element : any) => {
          this.js_error_open = element.data().status;
        });

        /// Объекты
         const js_object_and_class : any = await firebase
        .fs
        .collection("js_object_and_class")
        .orderBy('number')
        .get();


        js_object_and_class.forEach((element : any) => {
          this.js_object_and_class.push(element.data());
        });

        const js_object_and_class_open : any = await firebase
        .fs
        .collection('js_object_and_class_user')
        .where('uid', '==', JSON.parse(this.$store.getters['user/GetUser']).uid)
        .get();

        js_object_and_class_open.forEach((element : any) => {
          this.js_object_and_class_open = element.data().status;
        });
      
      }
    },
    computed:
    {
      GetUser()
      {
        return this.$store.getters['user/GetUser'];
      }
    },
    watch:{
      GetUser:{
        handler:function(){
          this.Load();
        },
      }
    },
    mounted()
    {
      if(this.GetUser)
      this.Load();
    }
  })
</script>
