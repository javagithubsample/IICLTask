import axios from "axios";

const API_URL = "http://localhost:8081/api/blogs"; 

export const getBlogs = () => axios.get(API_URL);
export const getBlogById = (id) => axios.get(`${API_URL}/${id}`);
export const createBlog = (blog) => axios.post(API_URL, blog);
export const updateBlog = (id, blog) => axios.put(`${API_URL}/${id}`, blog);
export const deleteBlog = (id) => axios.delete(`${API_URL}/${id}`);
