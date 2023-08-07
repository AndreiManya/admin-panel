import axios, { InternalAxiosRequestConfig } from 'axios'

const $host = axios.create({
  baseURL: 'http://localhost:8080/'
})

const $authHost = axios.create({
  baseURL: 'http://localhost:8080/'
})

const authInterceptor = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const token = localStorage.getItem('token')
  if (token !== null) {
    config.headers.authorization = `Bearer ${token}`
  }
  return config
}

$authHost.interceptors.request.use(authInterceptor)

export { $host, $authHost }
