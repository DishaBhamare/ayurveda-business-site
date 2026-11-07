import axios from "axios";

const api = axios.create({
// baseURL: "https://ojasvi-backend.onrender.com/api",
baseURL: "http://localhost:5000/api",
});

// 👇 Add the interceptor here
api.interceptors.request.use((config) => {

    const token = localStorage.getItem("token");

    // console.log("Interceptor token:", token);

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    // console.log("Authorization header:", config.headers.Authorization);
    return config;

});
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");

      // Redirect to login
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;