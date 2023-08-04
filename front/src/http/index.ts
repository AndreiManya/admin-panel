import axios, { InternalAxiosRequestConfig } from 'axios'

const $host = axios.create({
  baseURL: '/'
})

const $authHost = axios.create({
  baseURL: '/'
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
