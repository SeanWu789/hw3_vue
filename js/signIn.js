const url = 'https://vue3-course-api.hexschool.io/';
const path = 'seanwu';

const eamilInput = document.querySelector('#username');
const pwInput = document.querySelector('#password');
const loginBtn = document.querySelector('#login');


function login() {
    const username = eamilInput.value;
    const password = pwInput.value;

    const user = {
        username,
        password
    }
    
    axios.post(`${url}admin/signin`, user)
        .then(res =>{
            if(res.data.success){
                alert('登入成功')
                const {token , expired} = res.data;
                document.cookie = `SeanToken=${token}; expires=${new Date(expired)}`;
                window.location = 'products.html';
            }else{
                alert('帳號或密碼錯誤！請重新輸入');
                this.user.username = '';
                this.user.password = '';
            }
        })
        .catch((err) => {
            console.log(err);
        })
}

loginBtn.addEventListener('click', login);

