import axios from "axios";

const config = (window as any).__APP_CONFIG__;
const baseUrl = config.BASEURL_API;

const api = axios.create({
  // baseURL: "https://test-services-oop.syx-graphics.com"
  baseURL: baseUrl
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.log("Token expired or unauthorized");
    }
    return Promise.reject(error);
  }
);

export default api;
