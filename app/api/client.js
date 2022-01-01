import { create } from "apisauce";

const apiClient = create({
  baseURL: "http://192.168.29.108:9000/api",
});

export default apiClient;
