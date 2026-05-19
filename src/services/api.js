import axios from "axios";


const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  withCredentials: true
})


export const fetchDataAPI = async (pageno) => {
  try {
    const res = await api.get(`/posts?_start=${pageno}&_limit=3`);

    return res.status === 200 ? res.data : [];
  } catch (error) {
    console.log(error)
  }
}

export const fetchSinglePost = async (id) => {

  try {
    const res = await api.get(`/posts/${id}`);
    return res.status == 200 ? res.data : []
  } catch (error) {
    console.log(error)
  }

}

export const deletePostAPI = async (id) => {
  try {
    return api.delete(`/posts/${id}`);
  } catch (error) {
    console.log(error)
  }

}
export const updatePostAPI = async (id) => {
  try {
    return api.put(`/posts/${id}`);
  } catch (error) {
    console.log(error)
  }
}


export const fetchUsers = async ({ pageParam = 1 }) => {
  try {
    const res = await axios.get(
      `https://api.github.com/users?per_page=10&page=${pageParam}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};