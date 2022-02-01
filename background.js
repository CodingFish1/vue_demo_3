// import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';
const apiUrl='https://vue3-course-api.hexschool.io/v2';
const path='williamone';
let productModal="";
let delModal="";

const app=Vue.createApp({
    data(){
        return {

            tempProduct:{
                imagesUrl:[],
            },
            axiosStatus:"",

            itemToDel:[],
            products: [],
            selectedItem:{},
            itemCounter:"",
        }
    },

    methods:{
        modalSwitcher(status,item){
            if(status==="new"){
                this.tempProduct={imagesUrl:[]};
                this.axiosStatus='new'
        }else if(status==="edit"){
                this.tempProduct=JSON.parse(JSON.stringify(item))};
                productModal.show();
                this.axiosStatus='edit'},

        addImg(){
            this.tempProduct.imagesUrl.push('');},

        rmImg(){
            this.tempProduct.imagesUrl.pop();},

        cudRouter(){
            if(this.axiosStatus==='new'){
                axios.post(`${apiUrl}/api/${path}/admin/product`,{data:this.tempProduct})
                    .then((res)=>{console.log(res);
                    this.getProduct();
                    productModal.hide()})
                    .catch((error)=>{console.dir(error);})
            }else if(this.axiosStatus==='edit'){
                axios.put(`${apiUrl}/api/${path}/admin/product/${this.tempProduct.id}`,{data:this.tempProduct})
                    .then((res)=>{console.log(res);
                    this.getProduct();
                    productModal.hide()})
                    .catch((error)=>{console.dir(error);})}},

        showDetail(item){
            this.selectedItem={};
            this.selectedItem=item
            console.log(this.selectedItem);},

        getProduct(){
            axios.get(`${apiUrl}/api/${path}/admin/products/all`)
                .then((res)=>{this.products=res.data.products;
                    this.itemCounter=Object.values(this.products).length;})
                .catch((error)=>{console.dir(error);})},
        
        isDelete(item){
            delModal.show()
            this.itemToDel=JSON.parse(JSON.stringify(item))},

        deleteItem(){
            axios.delete(`${apiUrl}/api/${path}/admin/product/${this.itemToDel.id}`)
                .then((res)=>{this.getProduct();delModal.hide()})
                .catch((error)=>{console.dir(error);})
                console.log(this.itemToDel.id)},
        
        loginVeri(){
            const token= document.cookie.replace(/(?:(?:^|.*;\s*)hextoken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
            axios.defaults.headers.common['Authorization']=token;
            axios.post(`${apiUrl}/api/user/check`)
                    .then((res)=>{if(res.data.success){this.getProduct()}})
                    .catch((error)=>{alert('驗證失敗，請重試');window.location = 'index.html';})}
    },

    mounted(){
        productModal=new bootstrap.Modal(document.querySelector('#productModal'));
        delModal=new bootstrap.Modal(document.querySelector('#delProductModal'));
        this.loginVeri();
    }
})

app.mount('#app');