import axios from "axios";


const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  withCredentials: true
})


export const fetchDataAPI = async () => {
  return api.get("/posts");
}