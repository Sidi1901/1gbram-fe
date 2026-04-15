import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Attach JWT token if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwt')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
