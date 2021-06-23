import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.11/vue.esm-browser.js';

let productModal = {};
let delModal  = {};

const app = createApp({
  data() {
    return {
      url: 'https://vue3-course-api.hexschool.io/',
      path: 'seanwu',
      products: [],
      isNew: false,
      tempProduct: { // 稍後調整資料使用的結構
        // imagesUrl: [],
      },
    }
  },
  mounted() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)SeanToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    axios.defaults.headers.common['Authorization'] = token;
    
    // Bootstrap 實體
    productModal = new bootstrap.Modal(document.getElementById('productModal'));
    delModal = new bootstrap.Modal(document.querySelector('#deleteModel'));

    this.getProducts();
  },
 
  methods: {
    getProducts() {
      axios.get(`${this.url}api/${this.path}/products`)
        .then((res) => {
          if(res.data.success){
            console.log(res);
            this.products = res.data.products;
            console.log(this.products);
        }else{
          alert('....')
        }
      });
    },
    openModal(option , item){
      if(option === 'add'){
          this.tempProduct = {};
          this.isNew = true;
          productModal.show();
      }else if(option === 'edit'){
          this.tempProduct = {...item};
          this.isNew = false;
          productModal.show();
      }
      else if(option === 'delete'){
          this.tempProduct = {...item};
          delModal.show();
      }
    },
    closeModal(option,item){
      if(option === 'proClose'){
          productModal.hide();
      }else if(option === 'deleteClose'){
          delModal.hide();
      }
    },
    createImages() {
      this.tempProduct.imagesUrl = [
        ''
      ]
    },
    updateProduct() {
      let url = `${this.url}api/${this.path}/admin/product`;
      let method = 'post';

      if(!this.isNew){
        url = `${this.url}api/${this.path}/admin/product/${this.tempProduct.id}`;
        method = 'put';
      }
      
      axios[method](url, {data: this.tempProduct})
        .then(res=>{
          if(res.data.success){
            this.getProducts();
            productModal.hide();
          }else{
            alert(res.data.success);
          }
        })
        .catch((err) => {
          console.log(err);
        })
    },
    delProduct() {
      axios.delete(`${this.url}api/${this.path}/admin/product/${this.tempProduct.id}`)
        .then(res =>{
          if (res.data.success) {
            alert(res.data.message);
            delModal.hide();
            this.getProducts();
          } else {
            alert(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        })
    },
     
  }
});


app.mount('#app');