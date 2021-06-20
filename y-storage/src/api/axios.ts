import axios, { AxiosInstance } from 'axios';
import 'dotenv/config'

const setHeader = () => {
  axios.defaults.headers['Content-Type'] = 'application/json';
};

export const getAxios = (reqUrl: string, reqParams: Record<string, unknown>= {}): Promise<AxiosInstance> => {
  setHeader();
  return axios
    .create({
      method: 'get',
      timeout: 10000,
      params: {key: process.env.REACT_APP_YOUTUBE_API_KEY, ...reqParams},
      withCredentials: true,
    })
    .request({ url: reqUrl });
};

export const postAxios = (reqUrl: string, reqData: Record<string, unknown>): Promise<AxiosInstance> => {
  setHeader();
  return axios
    .create({
      method: 'post',
      timeout: 10000,
      withCredentials: true,
    })
    .request({ url: reqUrl, data: reqData });
};