import axios from 'axios'
import {config} from "@vue/test-utils";
import {getStorage} from "../utils/storage";
import {hex_md5} from "../utils/md5";


const instance = axios.create({
    baseURL: 'http://127.0.0.1:3000',
    timeout: 4000
})

//拦截器
instance.interceptors.request.use(config => {
    //部分接口需要拿到token
    let token = getStorage("token") || ""
    let timestamp = String(Math.round(new Date().getTime()/1000))
    let appKey = "entrytask"
    config.headers["AUTH-TOKEN"] = token;
    config.headers["AUTH-TIMESTAMP"] = timestamp;
    config.headers["AUTH-SIGN"] = hex_md5(appKey + "#" + token + "#" + timestamp);
    return config
}, error => {
    return Promise.reject(error)
});

instance.interceptors.response.use(config => {

    return config
}, error => {
    return Promise.reject(error)
});

export default instance;

