import axios from "axios";
import { baseUrl } from "./config";

const getAPI = () => ({
  baseUrl: baseUrl(),
});

const buildRequest = (request, configData) => {
  const { body, method, url } = request;
  const { apiVersion, headers } = configData;
  const api = getAPI();

  const contentType =
    body instanceof FormData ? "multipart/form-data" : "application/json";

  const defaultHeaders = {
    "content-type": contentType,
  };

  const apiUrl = api[apiVersion];

  const requestConfig = {
    baseURL: apiUrl,
    data: body,
    headers: { ...headers, ...defaultHeaders },
    method,
    url,
    // withCredentials: withCredentials(),
  };

  return requestConfig;
};

export const defaultResponse = {
  status: 500,
  data: {
    error: {
      message: "Server error",
    },
  },
};

export const formatError = (responseError) => {
  const response = responseError.response || defaultResponse;
  const errorMessage = response.data && response.data.error.message;

  return {
    code: response.status,
    message: errorMessage,
  };
};

export const makeRequest = async (request, configData) => {
  const requestConfig = buildRequest(request, configData);

  return new Promise((resolve, reject) => {
    const axiosRequest = axios(requestConfig);
    axiosRequest
      .then((response) => {
        if (configData.withHeaders) {
          resolve(response);
        } else {
          resolve(response.data);
        }
        // resolve(response.data);
      })
      .catch((error) => {
        reject(formatError(error));
      });
  });
};
