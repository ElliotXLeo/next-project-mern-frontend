import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_NEXT_PROJECT_MERN_BACKEND_API_URL}`
});

export default axiosInstance;