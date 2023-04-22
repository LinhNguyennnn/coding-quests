import axios from "axios";

import { authorization } from "../services/spotify.services";
import config from "../config";

export const instance = axios.create({
  baseURL: config.api.baseUrl,
  timeout: 10000,
});

instance.interceptors.request.use((config) => {
  const access_token = localStorage.getItem("access_token");
  const token_type = localStorage.getItem("token_type");
  if (access_token && token_type) {
    config.headers = {
      Authorization: `${token_type} ${access_token}`,
    };
  }

  return config;
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      authorization();
    }

    return Promise.reject(error);
  }
);

export const instanceAuth = axios.create({
  baseURL: config.api.authUrl,
  timeout: 10000,
});

instanceAuth.interceptors.response.use((response) => {
  localStorage.setItem("access_token", response.data.access_token);
  localStorage.setItem("token_type", response.data.token_type);
  return response;
});
