import axios from 'axios'

axios.defaults.baseURL="http://localhost:8086/blog"


//前置拦截
axios.interceptors.request.use(config=>{
    return config
})


//后置拦截
axios.interceptors.response.use(response=>{
    let res = response.data;
    if(res.code != 200) {
        return Promise.reject(res.message);
    }
    return response
},error => {
    console.log(error)
})
