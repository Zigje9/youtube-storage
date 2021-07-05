const axios = require('axios');

const setHeader = () => {
  axios.defaults.headers['Content-Type'] = 'application/json';
};

const getAxios = (reqUrl, reqParams = {}) => {
  setHeader();
  return axios
    .create({
      method: 'get',
      timeout: 10000,
      params: { ...reqParams },
      withCredentials: true,
    })
    .request({ url: reqUrl });
};

module.exports = getAxios;
