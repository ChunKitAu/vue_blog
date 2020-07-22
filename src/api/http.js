import axios from 'axios';
import QS from 'qs';
import Vue from "../main";
import router from "../router";

//认证失败
let token_confrim_fail = 520;
let success =200;

class HttpRequest {
    constructor() {
        this.baseURL = 'http://120.25.237.83:8086/blog';
        // this.baseURL = 'http://localhost:8086/blog';
        this.instance = axios.create();
        this.interceptor();
    }

    // 单例模式
    static getInstance() {
        if (!this.httpRequest) {
            this.httpRequest = new HttpRequest();
        }
        return this.httpRequest;
    }

    // 拦截器
    interceptor() {
        // 请求拦截器
        this.instance.interceptors.request.use(config => {
            // do something
            return config;
        }, error => {
            // do something
            return Promise.reject(error);
        })

        // 响应拦截器
        this.instance.interceptors.response.use(response => {
            switch (response.data.code) {
                case success:
                    return response;
                    break;
                case 530:
                    router.push({
                        path: "/404"
                    });
                    return Promise.reject();
                    break;
            }
        }, error => {
            // do something
            return Promise.reject(error);
        })
    }

    // 通用的GET
    get(url, data) {
        return this.instance({
            url: url,
            method: 'get',
            baseURL: this.baseURL,
            // data: QS.stringify(data),
            params: data,
            headers: {
                'Content-Type': "application/json",
            }
        })
    }

    // 通用的POST
    post(url, data) {
        return this.instance({
            url: url,
            method: 'post',
            // data: QS.stringify(data),
            data: data,
            baseURL: this.baseURL,
            headers: {
                'Content-Type': "application/json;charset=UTF-8",
            }
        })
    }

    postFile(url, data) {
        return this.instance({
            url: url,
            method: 'post',
            data: data,
            baseURL: this.baseURL,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }


    put(url, data) {
        return this.instance({
            url: url,
            method: 'put',
            baseURL: this.baseURL,
            data: data,
            headers: {
                'Content-Type': "application/json;charset=UTF-8",
            }
        })

    }

    del(url,data) {
        return this.instance({
            url: url,
            method: 'delete',
            baseURL: this.baseURL,
            data: data,
            headers: {
                'Content-Type': "application/json;charset=UTF-8",
            }
        })

    }

}

HttpRequest.LOGIN = "/user/login";
HttpRequest.REGISTER = "/user/save";

export default HttpRequest;
