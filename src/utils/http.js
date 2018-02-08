'use strict'

import axios from 'axios'
import qs from 'qs'


let Base64 = require('js-base64').Base64;
let thisUrl = window.location.href;
let loginUrl = "http://class.onelap.cn/login/?url=" + Base64.encode(thisUrl);

axios.interceptors.request.use(config => {
  // loading
  if (localStorage.getItem("token")) { // 判断是否存在token，如果存在的话，则每个http header都加上token
    config.headers.Authorization = `token ${store.state.token}`;
  }
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  return response
}, error => {
  if (error.response) {
    switch (error.response.status) {
      case 401:
        // 返回 401 清除token信息并跳转到登录页面
        localStorage.removeItem('token');
        window.location.href = loginUrl;
    }
  }
  return Promise.reject(error.response.data) // 返回接口返回的错误信息
})

function checkStatus(response) {
  // loading
  // 如果http状态码正常，则直接返回数据
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    return response
    // 如果不需要除了data之外的数据，可以直接 return response.data
  }
  // 异常状态下，把错误信息返回去
  return {
    status: -404,
    msg: '网络异常'
  }
}

function checkCode(res) {
  // 404
  if (res.status === -404) {
    console.log(res.msg)
  }
  // 后端异常根据情况添加

  return res
}

export default {
  post(url, data) {
    return axios({
      method: 'post',
      // baseURL: '/api',
      url,
      data: qs.stringify(data),
      timeout: 10000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'X-CSRF-TOKEN': '{{ csrf_token() }}'
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  },
  get(url, params) {
    return axios({
      // method: 'http://localhost:3000',
      baseURL: '',
      url,
      params, // get 请求时带的参数
      timeout: 10000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  }
}