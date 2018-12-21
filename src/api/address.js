import axios from 'axios';
var baseUrl = process.env.BASE_API;
const urls = {
  mbAddress: '/app/memberAddress/list',
  add: '/app/memberAddress/save',
  del: '/app/memberAddress/delete',
  edit: '/app/memberAddress/edit',
  update: '/app/memberAddress/update'
};

// 合并请求链接
const apis = Object.keys(urls)
  .reduce((acc, url) => {
    acc[url] = baseUrl + urls[url];
    return acc;
  }, {});

// 获取地址
export const getAddress = () => {
  return axios({
    url: apis.mbAddress,
    method: 'get'
  });
};

// 添加地址
export const handleAdd = (param) => {
  return axios({
    url: apis.add,
    method: 'post',
    data: param
  });
};

// 删除地址
export const handleDel = (id) => {
  return axios({
    url: apis.del,
    method: 'get',
    params: { addressId: id }
  });
};

// 编辑地址
export const handleEdit = (id) => {
  return axios({
    url: apis.edit,
    method: 'get',
    params: { addressId: id }
  });
};

// 编辑地址
export const handleUpdate = (param) => {
  return axios({
    url: apis.update,
    method: 'post',
    data: param
  });
};

