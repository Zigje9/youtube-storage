import axios, { AxiosInstance } from 'axios';

const setHeader = () => {
  axios.defaults.headers.post['Content-Type'] = 'application/json';
};

export const getAxios = (reqUrl: string, reqParams: Record<string, unknown>= {}): Promise<AxiosInstance> => {
  setHeader();
  return axios
    .create({
      baseURL: 'https://www.googleapis.com/youtube/v3',
      method: 'get',
      timeout: 10000,
      params: reqParams,
    })
    .request({ url: reqUrl });
};

export const postAxios = (reqUrl: string, reqData: Record<string, unknown>): Promise<AxiosInstance> => {
  setHeader();
  return axios
    .create({
      baseURL: 'https://www.googleapis.com/youtube/v3',
      method: 'post',
      timeout: 10000,
    })
    .request({ url: reqUrl, data: reqData });
};