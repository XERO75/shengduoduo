import axios from 'axios';
var baseUrl = process.env.BASE_API;
const urls = {
  autoLogin: '/app/member/simulate',
  login: '/app/member/login',
  sendCode: '/app/member/sendCode',
  register: '/app/member/register'
};
// 合并请求链接
const apis = Object.keys(urls)
  .reduce((acc, url) => {
    acc[url] = baseUrl + urls[url];
    return acc;
  }, {});

// 快速登录
export const autoLogin = () => {
  return axios({
    url: apis.autoLogin,
    method: 'post'
  });
};

// 登陆
export const handleLogin = (param) => {
  return axios({
    url: apis.login,
    method: 'post',
    data: param
  });
};

// 注册
export const register = (param) => {
  return axios({
    url: apis.register,
    method: 'post',
    data: param
  });
};

// 发送验证码
export const sendCode = (param) => {
  return axios({
    url: apis.sendCode,
    method: 'post',
    data: param
  });
};
