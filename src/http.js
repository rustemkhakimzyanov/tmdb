import axios from 'axios'

const http = axios.create({
  baseURL: 'http://api.themoviedb.org/3/',
  params: {
    api_key: '5ba80b8aa58843c3413c8c892124fe92',
    language: 'ru-RU'
  }
})

http.interceptors.response.use(
  response => response,
  error => {
    alert(error.message)
    return Promise.reject(error)
  }
)

export default http
