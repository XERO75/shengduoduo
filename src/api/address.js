// import axios from "axios";
import axios from "./../request.js";
var baseUrl = process.env.BASE_API;
const urls = {
  list: '/app/member/myAddress.htm',
  add: '/app/member_address/save.htm',
  editInfo: '/app/member_address/edit.htm',
  edit: '/app/member_address/update.htm',
  delete: '/app/member_address/delete.htm',
  // area: '/app/service_department/allpolygon.htm', //(弃)
  search: '/app/member_address/findAddressInAllDepartments.htm',
}
// 合并请求链接
const apis = Object.keys(urls)
  .reduce((acc, url) => {
      acc[url] = baseUrl + urls[url]
      return acc
  }, {});
// 地址列表
export const getAdressList = () => {
  return axios({
    url: apis.list,
    method: 'get',
    params: axios.getData({})
  });
};
// 保存添加地址
export const addAddress = (query) => {
  return axios({
    url: apis.add,
    method: 'post',
    data: query,
    params: axios.getData({})
  });
};
// 获取编辑地址信息
export const getEditInfo = (id) => {
  return axios({
    url: apis.editInfo,
    method: 'get',
    params: axios.getData({
      id: id,
    })
  });
};
// 更新编辑地址
export const editAddress = (query) => {
  return axios({
    url: apis.edit,
    method: 'post',
    data: query,
    params: axios.getData({})
  });
};
// 删除地址
export const deleteAddress = (query) => {
  return axios({
    url: apis.delete,
    method: 'post',
    data: query,
    params: axios.getData({})
  });
};
// 获取所有多边形区域的坐标数组 (弃)
// export const getArea = () => {
//   return axios({
//     url: apis.area,
//     method: 'get',
//     params: axios.getData({})
//   });
// };
// 根据字符串搜索地址
export const getSearchList = (key) => {
  return axios({
    url: apis.search,
    method: 'get',
    params: axios.getData({key: key})
  });
};
