import axios from 'axios'
// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 60000 // request timeout
})
// request interceptor
// service.interceptors.request.use(config => {
//   config.headers['WX_TYPE'] = 'OfficialAccount'
// }, error => {
//   // Do something with request error
//   // console.log(error) // for debug
//   // Promise.reject(error)
// })

// 请求是get
service.getData = obj => {
  obj.WX_TYPE ='OfficialAccount';
  return obj
}
// 请求是post
service.postData = obj => {
  obj.append('WX_TYPE','OfficialAccount');
  return obj
}
export default service