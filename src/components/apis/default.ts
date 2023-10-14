import { SignupData, SigninData } from '@/interface/default'

export async function Signup(data: SignupData) {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + 'users/register', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: data.username,
      email: data.email,
      password: data.password,
    }),
  })

  if (res.status === 201) {
    return res.json()
  } else {
    return 'fail'
  }
}

export async function Signin(data: SigninData) {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + 'users/login', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: data.email,
      password: data.password,
    }),
  })

  if (res.status === 200) {
    return res.json()
  }
}
