import axios from 'axios';
import { baseURL, timeout } from './config';
import { ElMessage } from 'element-plus';
class LyRequest {
  constructor(baseURL, timeout = 10000) {
    this.instance = axios.create({
      baseURL,
      timeout
    });
    // 给axios实例设定请求、拦截器用于设定是否显示加载动画
    this.instance.interceptors.request.use(
      config => {
        // 响应成功后前端将token挂载到headers上交给后端检查token是否过期
        const authorization = localStorage.getItem('Token');
        config.headers.Authorization = authorization;
        return config;
      },
      err => {
        return err;
      }
    );
    this.instance.interceptors.response.use(
      config => {
        // 首次登录成功时后端返回token数据将其保存至localstorage中
        const { authorization } = config.headers;
        authorization && localStorage.setItem('Token', `Bearer ${authorization}`);
        return config;
      },
      err => {
        console.log(err);
        const { status } = err.response;
        if (status === 401) {
          ElMessage({
            message: '登录过期，请登录',
            type: 'warn'
          });
          window.location.href = '/Login';
        }
        return err;
      }
    );
  }
  request(config) {
    return new Promise((resolve, reject) => {
      this.instance
        .request(config)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
  get(config) {
    return this.request({ ...config, method: 'get' });
  }
  post(config) {
    return this.request({ ...config, method: 'post' });
  }
  delete(config) {
    return this.request({ ...config, method: 'delete' });
  }
  put(config) {
    return this.request({ ...config, method: 'put' });
  }
}

export default new LyRequest(baseURL, timeout);
