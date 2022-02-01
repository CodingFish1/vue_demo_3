// import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';
const apiUrl='https://vue3-course-api.hexschool.io/v2';
const path='williamone';
let productModal="";

const app=Vue.createApp({
    data(){
        return {
            imgOK:false,
            tempProduct:{
                imagesUrl:[],
            },

            products: [],
            selectedItem:{},
            itemCounter:"",
        }
    },

    methods:{
        modalSwitcher(){
            productModal.show();
        },
        imgOK(){
            this.imgOK=ture;
        },
        addImg(){
            this.tempProduct.imagesUrl.push('');
        },
        rmImg(){
            this.tempProduct.imagesUrl.pop();
        },

        showDetail(item){
            this.selectedItem={};
            this.selectedItem=item
            console.log(this.selectedItem);},

        getProduct(){
            axios.get(`${apiUrl}/api/${path}/admin/products/all`)
                .then((res)=>{this.products=res.data.products;
                    this.itemCounter=Object.values(this.products).length;})
                .catch((error)=>{console.dir(error);})
              },
          
        deleteItem(item){
            axios.delete(`${apiUrl}/api/${path}/admin/product/${item.id}`)
                .then((res)=>{this.getProduct()})
                .catch((error)=>{console.dir(error);})
                console.log(item);
              },
        
        loginVeri(){
            const token= document.cookie.replace(/(?:(?:^|.*;\s*)hextoken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
            axios.defaults.headers.common['Authorization']=token;
            axios.post(`${apiUrl}/api/user/check`)
                    .then((res)=>{
                        if(res.data.success){this.getProduct()}
                    }).catch((error)=>{alert('驗證失敗，請重試');window.location = 'login.html';})
              }

    },

    watch:{
        subImgUrl(){
            this.newImg=true;
            this.delImg=false;
        },},

    mounted(){
        productModal=new bootstrap.Modal(document.querySelector('#productModal'));
        this.loginVeri();
    }
})

app.mount('#app');