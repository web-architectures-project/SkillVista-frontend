import axios from 'axios'
import { getCookie } from 'cookies-next'

interface apiRequesProps {
  method: string
  path: string
  body?: object
  header?: object
}

export const customAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

customAxios.interceptors.request.use(
  async config => {
    const accessToken = getCookie('cookie-token')
    config.headers.Authorization = `Bearer ${accessToken}`
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  },
)

export async function apiRequest({ method, path, body, header }: apiRequesProps) {
  try {
    let res = null
    if (method === 'GET') {
      res = await customAxios.get(path)
    } else if (method === 'POST') {
      res = await customAxios.post(path, body, header)
    } else if (method === 'PUT') {
      res = await customAxios.put(path, body)
    } else if (method === 'DELETE') {
      res = await customAxios.delete(path, body)
    }
    console.log(res)
    return { status: res?.status || res?.data?.status, message: res?.data }
  } catch (error) {
    console.log(error)
    if (axios.isAxiosError(error)) {
      // console.log(error.response?.data?.message)
      return {
        status: error?.response?.status,
        message: error?.response?.data?.message,
      }
    }
  }
}
