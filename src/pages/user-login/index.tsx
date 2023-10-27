import { FC, use, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { apiRequest } from '@/components/apis/default'
import { useRouter } from '../../../node_modules/next/navigation'
import Link from 'next/link'
import { getCookie, setCookie } from 'cookies-next'
import { useDispatch } from 'react-redux'
import { setAuthState } from '@/store/authSlice'

interface indexProps {}
interface handleTokenProps {
  token: string
}
interface handleSessionProps {
  token: string
}

const Index: FC<indexProps> = ({}) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [error, setError] = useState<string>('')
  const signinSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Password is required'),
  })

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: signinSchema,
    onSubmit: async () => {
      apiRequest({
        method: 'POST',
        path: 'users/login',
        body: {
          email: formik.values.email,
          password: formik.values.password,
        },
      }).then((res) => {
        if (res?.status === 200) {
          handleToken({ token: res.message.accessToken })
        } else {
          setError('User not found')
        }
      })
    },
  })

  /** cookie consent
   * True :  save in cookie & session
   * False : save in session */
  const handleToken = async ({ token }: handleTokenProps) => {
    const consent = getCookie('cookie-consent')
    if (consent) {
      //4 hours
      await setCookie('cookie-token', token, {
        expires: new Date(Number(new Date()) + 14400000),
      })
    }
    setSession({ token }).then(() => {
      dispatch(setAuthState(true))
      router.push('/user-dashboard')
    })
  }

  const setSession = async ({ token }: handleSessionProps) => {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: token }),
      }
      const response = await fetch('/api/auth', options)
      if (response.status !== 200) throw new Error("Can't login")
    } catch (err) {
      new Error(err)
    }
  }

  return (
    <div className="bg-slate-100">
      <div className="flex flex-col min-h-screen mx-auto max-w-2xl px-4 pt-8 pb-16">
        <p className="text-center font-bold text-3xl mb-8">Welcome back</p>
        <div className="bg-white p-8">
          <form onSubmit={formik?.handleSubmit}>
            <div className="pb-3">
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                placeholder="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                className="form-input"
              />
            </div>
            <div className="pb-3">
              <Label>Password</Label>
              <Input
                type="password"
                name="password"
                placeholder="Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                className="form-input"
              />
            </div>
            {error ? <p className="text-red-400">{error}</p> : ''}
            <div className="flex flex-col mt-5">
              <Button type="submit" className="bg-mainblue hover:bg-slate-300">
                Login
              </Button>
            </div>
          </form>
          <div className="mt-10 text-center">
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            <span className="font-lights">Don't have an account?</span>{' '}
            <span className="text-mainblue font-lights">
              <Link href="/user-registration">Sign up.</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index
