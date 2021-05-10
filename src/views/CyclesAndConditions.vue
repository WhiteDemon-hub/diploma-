<template>
    <div class="m-5" v-if="task">
        <h2 class="text-center">Циклы и условия.</h2>
        <div v-if="task.type == 'task'">
            <h2 v-if="task" class="mt-5 text-center">{{task.name}}</h2>
            <div class="d-flex m-5 flex-wrap">
                <div class="w-50 w-min-content p-2">
                    <prism-editor class="editor" v-model="code" :highlight="highlighter" line-numbers></prism-editor>
                    
                </div>
                <div class="w-50 p-2">
                    <div>
                        <h3 class="">Задача:</h3>
                        <div v-if="task" v-html="task.content">
                        </div>
                    </div>
                    <div>
                        <h3>Результат проверки:</h3>
                        <div v-if="result">
                            <div v-for="answer in result.result" :key="answer.answer">
                                <p v-if="answer.type == 'error'"><i class="fa fa-exclamation-triangle text-danger pr-1" aria-hidden="true"></i>{{answer.name}}: {{answer.message}}</p>
                                <p v-else>
                                    <i v-if="answer.correct" class="fa fa-thumbs-up pr-1 text-success" aria-hidden="true"></i>
                                    <i v-else class="fa fa-exclamation-triangle text-danger pr-1" aria-hidden="true"></i>
                                    Ответ: {{answer.answer}}
                                </p>
                            </div>
                        </div>
                        <h3>Вывод консоли:</h3>
                        <div>
                            <div v-for="log in result.log" :key="log.body">
                                <p><samp style="color: green;">{{log.type}}</samp> {{log.body}}</p>
                            </div>
                            <div v-for="error in result.error" :key="error.body">
                                <p><samp style="color: red;">{{error.type}}</samp> {{error.body}}</p>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div class="d-flex justify-content-between ml-5 mr-5">
                <button @click="Check" type="button" class="btn btn-primary mr-2 mt-2 mb-2">Проверить</button>
                <button v-if="!task.end" @click="Next" :disabled="GetStatus" type="button" class="btn btn-primary mr-2 mt-2 mb-2">Далее</button>
            </div>
        </div>
        <div class="d-flex flex-column w-75 m-auto" v-else>
            <h2 v-if="task" class="mt-5 text-center">{{task.name}}</h2>
            <div v-html="task.content"></div>
            <button @click="Next" type="button" class="btn btn-primary mr-2 mt-2 mb-2" style="width: 150px">Далее</button>
        </div>
    </div>
</template>

<script>
import firebase from '../firebase/index'
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
        },
        GetUser()
        {
            return this.$store.getters['user/GetUser'];
        }
    },
    watch:{
      GetUser:{
        handler:function(){
          this.LoadPage();
        },
      },
      '$route.params': {
            handler:function()
            {
                this.LoadPage();
            },
        }
    },
    mounted()
    {
        if(this.GetUser)
        this.LoadPage();
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
          .post('/test/js/cycles_and_conditions/' + this.$route.params.id, data)
          .then(async response => {
              this.result = response.data;

              let success = true;
              this.result.result.forEach(res => {
                    if(res.type == "error" || res.correct == false)
                    {
                        success = false;
                    }
              })
              if(success)
              {
                    this.status = false;
                    let st = await firebase
                    .fs
                    .collection('js_cycles_and_conditions_user')
                    .where('uid', '==', JSON.parse(this.$store.getters['user/GetUser']).uid)
                    .get();

                    let id;
                    let statusArray;
                    console.log()

                    st.forEach(element => {
                        id = element.id;
                        statusArray = element.data().status;
                    });

                    let index = statusArray.indexOf(statusArray.find(x => x.number == Number(this.$route.params.id)));
                    console.log(id);
                    if(index < 0)
                    {
                        statusArray.push({
                            number: Number(this.$route.params.id),
                            code: '',
                            status: true,
                        });
                    }
                    else
                    {
                        statusArray[index].status = true;
                        statusArray[index].code = this.code;
                    }


                    await firebase
                    .fs
                    .collection('js_cycles_and_conditions_user')
                    .doc(id)
                    .update({
                        uid: JSON.parse(this.$store.getters['user/GetUser']).uid,
                        status: statusArray,
                    })
              }
          });
      },
      async Next()
      {
        if(this.task.type == "content")
        {
            let st = await firebase
            .fs
            .collection('js_cycles_and_conditions_user')
            .where('uid', '==', JSON.parse(this.$store.getters['user/GetUser']).uid)
            .get();

            if(st.size != 0)
            {
                let id;
                let statusArray;
                st.forEach(element => {
                    id = element.id;
                    statusArray = element.data().status;
                });

                

                let index = statusArray.indexOf(statusArray.find(x => x.number == Number(this.$route.params.id)));
                console.log(id);
                if(index < 0)
                {
                    statusArray.push({
                        number: Number(this.$route.params.id),
                        code: '',
                        status: true,
                    });
                }
                else
                {
                    statusArray[index].status = true;
                    statusArray[index].code = '';
                }
                console.log(statusArray);
                await firebase
                .fs
                .collection('js_cycles_and_conditions_user')
                .doc(id)
                .update({
                    uid: JSON.parse(this.$store.getters['user/GetUser']).uid,
                    status: statusArray
                });
            }
            else
            {
                await firebase
                .fs
                .collection('js_cycles_and_conditions_user')
                .doc()
                .set({
                    uid: JSON.parse(this.$store.getters['user/GetUser']).uid,
                    status: [{
                        number: Number(this.$route.params.id),
                        code: '',
                        status: true,
                    }],
                })
            }
        }   
        this.$router.push({ path: `/js/cycles_and_conditions/${Number(this.$route.params.id) + 1}` })
        await this.LoadPage();
        this.$forceUpdate();
      },
      async LoadPage()
      {
        this.status = true;
        this.result = [];
        let status = await firebase
        .fs
        .collection('js_cycles_and_conditions_user')
        .where('uid', '==', JSON.parse(this.$store.getters['user/GetUser']).uid)
        .get();
        status.forEach(element => {
            element.data().status.forEach(num => {
                if(num.number == Number(this.$route.params.id))
                {
                    this.status = !num.status;
                    this.code = num.code;
                    this.id = num.id;
                }
            })
        });


        let js_introduction = await firebase
        .fs
        .collection('js_cycles_and_conditions ')
        .where('number', '==', Number(this.$route.params.id))
        .get();

        console.log(js_introduction.size,Number(this.$route.params.id));

        js_introduction.forEach(element => {
            // console.log(element.data());
            this.task = element.data();
        });

        
      }
    },
}
</script>