<template>
    <div>
        <h2 v-if="task" class="mt-5 text-center">{{task.name}}</h2>
        <div class="d-flex m-5">
            <div class="w-50">
                <prism-editor class="editor" v-model="code" :highlight="highlighter" line-numbers></prism-editor>
                
            </div>
            <div class="w-50 ml-5">
                <div>
                    <h3 class="">Задача:</h3>
                    <div v-if="task" v-html="task.description">
                    </div>
                </div>
                <div>
                    <h3>Результат прверки:</h3>
                    <div v-if="result">
                        
                        <div v-for="answer in result" :key="answer.type">
                            <p v-if="answer.type == 'error'"><i class="fa fa-exclamation-triangle text-danger pr-1" aria-hidden="true"></i>{{answer.name}}: {{answer.message}}</p>
                            <p v-else>
                                <i v-if="answer.correct" class="fa fa-thumbs-up pr-1 text-success" aria-hidden="true"></i>
                                <i v-else class="fa fa-exclamation-triangle text-danger pr-1" aria-hidden="true"></i>
                                Ответ: {{answer.answer}}
                            </p>
                        </div>
                    </div>
                    
                </div>
                
            </div>
        </div>
        <div class="d-flex justify-content-between ml-5 mr-5">
            <button @click="Check" type="button" class="btn btn-primary mr-2 mt-2 mb-2">Проверить</button>
            <button @click="Next" :disabled="GetStatus" type="button" class="btn btn-primary mr-2 mt-2 mb-2">Далее</button>
        </div>
    </div>
</template>

<script>
import firebase from './../firebase/index'
import axios from 'axios'
import { PrismEditor } from 'vue-prism-editor';
  import 'vue-prism-editor/dist/prismeditor.min.css';
  import { highlight, languages } from 'prismjs/components/prism-core';
  import 'prismjs/components/prism-clike';
  import 'prismjs/components/prism-javascript';
  import 'prismjs/themes/prism-tomorrow.css';
export default {
    components: {
      PrismEditor,
    },
    // props: ['id'],
    data() {
        return {
            code: 'console.log("Hello World")', 
            task: [],
            result: [],
            status: true,
            id: '',
        }
    },
    computed: {
        GetStatus()
        {
            return this.status;
        }
    },
    methods: {
      highlighter(code) {
        return highlight(code, languages.js); //returns html
      },
      async Check()
      {
          const data = {
              code: this.code,
          };
          await axios 
          .post('/test/js/' + this.$route.params.id, data)
          .then(async response => {
              this.result = response.data;

              let success = true;
              this.result.forEach(res => {
                  if(res.corect == false)
                  {
                      success = false;
                  }
              })
              if(success)
              {
                    this.status = false;
                    let st = await firebase
                    .fs
                    .collection('user_passing_task_js')
                    .where('uid', '==', JSON.parse(this.$store.getters['user/GetUser']).uid)
                    .get();

                    let statusArray;
                    st.forEach(element => {
                        statusArray = element.data().status;
                    });
                    let index = statusArray.indexOf(statusArray.find(x => x.number == Number(this.$route.params.id)));

                    statusArray[index].status = true;
                    statusArray[index].code = this.code;

                    index = statusArray.indexOf(statusArray.find(x => x.number == Number(this.$route.params.id) + 1));
                    console.log(index)
                    if(index < 0)
                    {
                        
                        statusArray.push({
                            number: Number(this.$route.params.id) + 1,
                            code: '',
                            status: false,
                        });
                    }

                    await firebase
                    .fs
                    .collection('user_passing_task_js')
                    .doc(this.id)
                    .update({
                        status: statusArray,
                    })
                    this.$forceUpdate();
              }
          });
      },
      async Next()
      {
        this.$router.push({ path: `/js/${Number(this.$route.params.id) + 1}` })
        await this.LoadPage();
        this.$forceUpdate();
      },
      async LoadPage()
      {
        console.log(this.$route.params.id);
        let status = await firebase
        .fs
        .collection('user_passing_task_js')
        .where('uid', '==', JSON.parse(this.$store.getters['user/GetUser']).uid)
        .get();

        status.forEach(element => {
            this.status = !element.data().status[Number(this.$route.params.id) - 1].status;
            this.code = element.data().status[Number(this.$route.params.id) - 1].code;
            this.id = element.id;
        });

        console.log(this.status)

        let queue = await firebase
        .fs
        .collection('js_task')
        .where('number', '==', Number(this.$route.params.id))
        .get();

        queue.forEach(element => {
            this.task = element.data();
        });
      }
    },
    async mounted()
    {
        await this.LoadPage();
    }
}
</script>