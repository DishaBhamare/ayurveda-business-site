import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// 👇 Add the interceptor here
api.interceptors.request.use((config) => {

    const token = localStorage.getItem("token");

    console.log("Interceptor token:", token);

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    console.log("Authorization header:", config.headers.Authorization);
    return config;

});

export default api;