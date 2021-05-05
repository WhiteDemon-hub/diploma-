<template>
  <div>
    <v-card-text class="grey p-5">
      <h3>Курс JS</h3>
      <v-sheet
        height="260"
        max-width="1200"
        class="d-flex flex-row overflow-auto m-auto"
      >
        <div class="w-25 m-auto d-flex p-4 min-content-fit">
          <div class="m-auto ">
            <img :src='"../assets/js-logo.png"' width="120px" alt="js-logo" class="m-auto">
          </div>
        </div>
          <v-stepper non-linear class="w-75 m-auto w-min-content">
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
          </v-stepper>
      </v-sheet>
    </v-card-text>
    <!-- <v-card-text class="grey p-5">
      <h3>Курс HTML</h3>
      <v-sheet
        height="260"
        max-width="1200"
        class="d-flex flex-row overflow-auto m-auto" 
      >
        <div class="w-25 m-auto d-flex p-4 min-content-fit">
          <div class="m-auto ">
            <img :src='"../assets/html-logo.png"' width="120px" alt="js-logo" class="m-auto">
          </div>
        </div>
          <v-stepper non-linear class="w-75 m-auto w-min-content">
            <v-stepper-header class="flex-nowrap w-min-content">
              
              <v-stepper-step class="d-flex flex-column"
                editable
                step="1"
              >
              <v-rating
                :length="3"
                color="#ffc107"
                background-color="grey lighten-1"
                large
                x-small
                readonly
                value="2"
              ></v-rating>
              </v-stepper-step>
              
              <v-divider></v-divider>

              <v-stepper-step class="d-flex flex-column"
                editable
                step="2"
              >
              <v-rating
                :length="3"
                color="#ffc107"
                background-color="grey lighten-1"
                large
                x-small
                readonly
                value="2"
              ></v-rating>
              </v-stepper-step>
              
              <v-divider></v-divider>

              <v-stepper-step class="d-flex flex-column"
                editable
                step="3"
              >
              <v-rating
                :length="3"
                color="#ffc107"
                background-color="grey lighten-1"
                large
                x-small
                readonly
                value="2"
              ></v-rating>
              </v-stepper-step>
              
              <v-divider></v-divider>

              <v-stepper-step class="d-flex flex-column"
                editable
                step="4"
              >
              <v-rating
                :length="3"
                color="#ffc107"
                background-color="grey lighten-1"
                large
                x-small
                readonly
                value="2"
              ></v-rating>
              </v-stepper-step>
              
              <v-divider></v-divider>

              <v-stepper-step class="d-flex flex-column"
                editable
                step="5"
              >
              <v-rating
                :length="3"
                color="#ffc107"
                background-color="grey lighten-1"
                large
                x-small
                readonly
                value="2"
              ></v-rating>
              </v-stepper-step>
              
              <v-divider></v-divider>

              <v-stepper-step class="d-flex flex-column"
                editable
                step="6"
              >
              <v-rating
                :length="3"
                color="#ffc107"
                background-color="grey lighten-1"
                large
                x-small
                readonly
                value="2"
              ></v-rating>
              </v-stepper-step>
              
              <v-divider></v-divider>

              <v-stepper-step class="d-flex flex-column"
                editable
                step="7"
              >
              <v-rating
                :length="3"
                color="#ffc107"
                background-color="grey lighten-1"
                large
                x-small
                readonly
                value="2"
              ></v-rating>
              </v-stepper-step>
              
              <v-divider></v-divider>

              <v-stepper-step class="d-flex flex-column"
                editable
                step="8"
              >
              <v-rating
                :length="3"
                color="#ffc107"
                background-color="grey lighten-1"
                large
                x-small
                readonly
                value="2"
              ></v-rating>
              </v-stepper-step>
              
              <v-divider></v-divider>

              <v-stepper-step class="d-flex flex-column"
                editable
                step="9"
              >
              <v-rating
                :length="3"
                color="#ffc107"
                background-color="grey lighten-1"
                large
                x-small
                readonly
                value="2"
              ></v-rating>
              </v-stepper-step>
              
              <v-divider></v-divider>

              <v-stepper-step class="d-flex flex-column"
                editable
                step="10"
              >
              <v-rating
                :length="3"
                color="#ffc107"
                background-color="grey lighten-1"
                large
                x-small
                readonly
                value="2"
              ></v-rating>
              </v-stepper-step>
            </v-stepper-header>
          </v-stepper>
      </v-sheet>
    </v-card-text> -->
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import firebase from './../firebase/index'
  export default Vue.extend({
    name: 'Learn',

    data: () => ({
      task_js: [] as any,
      open: [] as any,
    }),

    async mounted()
    {
      // const user : any = await firebase.firebase.auth().currentUser;
      // console.log(user);
      const main : any = document.querySelector("#main");
      main.classList.remove("d-flex");
      
      console.log(JSON.parse(this.$store.getters['user/GetUser']).uid);
      const isOpen : any  = await firebase
      .fs
      .collection('user_passing_task_js')
      .where('uid', '==', JSON.parse(this.$store.getters['user/GetUser']).uid)
      .get();

      if(isOpen.size == 1)
      {
        isOpen.forEach((element : any) => {
          this.open = element.data().status;
        });
      }

      console.log(this.open);

      let query = await firebase
      .fs
      .collection('js_task')
      .orderBy('number')
      .get();

      query.forEach((element : any) => {
        this.task_js.push(element.data())
      });

      console.log(this.task_js);
    }
  })
</script>
