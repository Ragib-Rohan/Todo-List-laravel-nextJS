import Axios from "axios";

const axios_url = Axios.create({
  baseURL: process.env.BACKEND_URL,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true,
});

export default axios_url;
