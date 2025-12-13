// import axios from "axios";

// // 1. Spring Boot Instance
// export const springApi = axios.create({
//   baseURL: import.meta.env.VITE_SPRING_API_URL,
//   headers: { "Content-Type": "application/json" },
// });

// // 2. Flask AI Instance
// export const flaskApi = axios.create({
//   baseURL: import.meta.env.VITE_FLASK_API_URL,
// });

// // 3. Auto-attach Token to Spring Requests
// springApi.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

import axios from "axios";

const springApi = axios.create({
  baseURL: import.meta.env.VITE_SPRING_API_URL,
  withCredentials: false,
});

const flaskApi = axios.create({
  baseURL: import.meta.env.VITE_FLASK_API_URL,
  withCredentials: false,
});

// Attach JWT automatically
springApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { springApi, flaskApi };
