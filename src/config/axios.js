import axios from "axios";
import queryString from "query-string";

// Set up default config for http requests
const axiosClient = axios.create({
  baseURL: "http://192.168.20.208:3000",
  paramsSerializer: params => queryString.stringify(params)
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  response => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  error => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axiosClient;
