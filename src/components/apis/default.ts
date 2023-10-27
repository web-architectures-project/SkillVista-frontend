import axios from 'axios'

interface apiRequesProps {
  method: string
  path: string
  body?: Object
}

export async function apiRequest({ method, path, body }: apiRequesProps) {
  try {
    const res = await axios({
      method: method,
      url: process.env.NEXT_PUBLIC_API_URL + path,
      data: body,
    })

    return { status: 200, message: res.data }
  } catch (error) {
    return { status: error?.response.status, message: error?.message }
  }
}

// export async function Signup(data: SignupData) {
//   const res = await fetch(process.env.NEXT_PUBLIC_API_URL + ''users/register'', {
//     method: 'POST',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       username: data.username,
//       email: data.email,
//       password: data.password,
//     }),
//   })

//   if (res.status === 201) {
//     return res.json()
//   } else {
//     return 'fail'
//   }
// }
