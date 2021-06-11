import axios, { AxiosInstance } from 'axios';
import 'dotenv/config'

const setHeader = () => {
  axios.defaults.headers['Content-Type'] = 'application/json';
  axios.defaults.headers['Access-Control-Allow-Origin'] = '*';
};

export const getAxios = (reqUrl: string, reqParams: Record<string, unknown>= {}): Promise<AxiosInstance> => {
  setHeader();
  return axios
    .create({
      baseURL: 'https://www.googleapis.com/youtube/v3',
      withCredentials: false,
      method: 'get',
      timeout: 10000,
      params: {key: process.env.REACT_APP_YOUTUBE_API_KEY, ...reqParams},
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