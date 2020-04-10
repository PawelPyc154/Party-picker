import axios from "axios";
const axiosWithBaseURL = axios.create({
  baseURL: process.env.REACT_APP_AXIOS_BASE_URL,
});

export default axiosWithBaseURL;
