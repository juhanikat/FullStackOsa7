import axios from "axios"
const baseUrl = "http://localhost:3003/api/blogs"

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createBlog = async (blog) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, blog, config)
  return response
}

const updateBlog = async (blog) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog, config)
  return response
}

const removeBlog = async (blog) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.delete(baseUrl + `/${blog.id}`, config)
  return response
}

export default { getAll, createBlog, updateBlog, removeBlog, setToken }
