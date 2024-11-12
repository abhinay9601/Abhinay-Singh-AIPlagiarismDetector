import axios, { AxiosInstance, AxiosResponse } from "axios";

// Create a custom error type for API errors
export class ApiError extends Error {
  constructor(public response: AxiosResponse) {
    super(`API Error: ${response.status} ${response.statusText}`);
    this.name = "ApiError";
  }
}

// Create the Axios instance with default configuration
const api: AxiosInstance = axios.create({
  baseURL: "https://api.openai.com/v1",
  timeout: 10000, // 10 seconds
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config: any) => {
    // You can modify the request config here (e.g., add authentication token)
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers = config.headers || {};
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => {
    // You can modify the response data here
    return response;
  },
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      throw new ApiError(error.response);
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error("No response received from the server");
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error("Error setting up the request");
    }
  }
);

export default api;
