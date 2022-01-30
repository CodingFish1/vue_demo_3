import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';
const apiUrl='https://vue3-course-api.hexschool.io/v2';
const path='williamone';

const app=Vue.createApp({
    data(){
        return {
            isPop:true,
        }
    },

    method:{
        showDetail(){
            console.log('Hi')
        }
    },
})

app.mount('#app');