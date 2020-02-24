import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const saveBlog = async blog => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const update = (id, blog) => {
  const request = axios.put(`${baseUrl}/${id}`, blog)
  return request.then(response => response.data)
}

const remove = (id) => {
  const config = {
    headers : { Authorization: token },
  }

  return axios.delete(`${baseUrl}/${id}`, config)
}

export default { getAll, update, saveBlog, setToken, remove }