import axios from 'axios'

interface apiRequesProps {
  method: string
  path: string
  body?: Object
  token?: string
}

export async function apiRequest({
  method,
  path,
  body,
  token,
}: apiRequesProps) {
  try {
    const res = await axios({
      method: method,
      url: process.env.NEXT_PUBLIC_API_URL + path,
      data: body,
      headers: { Authorization: `Bearer ${token}` },
    })
    console.log(res)
    return { status: res?.status || res.data?.status, message: res.data }
  } catch (error) {
    console.log(error)
    return { status: error?.response.status, message: error?.message }
  }
}
