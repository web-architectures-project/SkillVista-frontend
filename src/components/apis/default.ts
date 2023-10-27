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
      headers: {
        Authorization:
          'Bearer eJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjk4NDE5NzA0LCJleHAiOjE2OTg0MzQxMDR9.Zl7Vx_6Gy5zbblvVTVBizdo31mlwzWfvNJdVCEy9lN0',
      },
    })
    if (res.status === 200) {
      return res.data
    }
  } catch (error) {
    return { message: error.message }
  }
}

// export async function Signup(data: SignupData) {
//   const res = await fetch(process.env.NEXT_PUBLIC_API_URL + 'users/register', {
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

// export async function Signin(data: SigninData) {
//   const res = await fetch(process.env.NEXT_PUBLIC_API_URL + 'users/login', {
//     method: 'POST',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       email: data.email,
//       password: data.password,
//     }),
//   })

//   if (res.status === 200) {
//     return res.json()
//   }
// }
