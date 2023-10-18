import { FC, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Signin } from '@/components/apis/default'
import { useRouter } from '../../../node_modules/next/navigation'
<<<<<<< HEAD
=======
import { withSessionSsr } from '@/lib/withSession'
>>>>>>> aa22023d5146f9b4fe6cffa2ecc6464e7af0b51a

interface indexProps {}

const index: FC<indexProps> = ({}) => {
  const router = useRouter()
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
<<<<<<< HEAD
    onSubmit: () => {
      Signin(formik.values).then((res: any) => {
        console.log(res.token)
        if (res.token.statusCode === 200) {
          router.push('/user-dashboard')
=======
    onSubmit: async () => {
      Signin(formik.values).then((res: any) => {
        if (res.token.statusCode === 200) {
          setSession().then(() => {
            router.push('/user-dashboard')
          })
>>>>>>> aa22023d5146f9b4fe6cffa2ecc6464e7af0b51a
        } else {
          setError(res.token.message)
        }
      })
    },
  })

<<<<<<< HEAD
=======
  const setSession = async () => {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formik.values),
      }
      const response = await fetch('/api/auth', options)
      if (response.status !== 200) throw new Error("Can't login")
    } catch (err) {
      new Error(err)
    }
  }

>>>>>>> aa22023d5146f9b4fe6cffa2ecc6464e7af0b51a
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
            <span className="font-lights">Don't have an account?</span>{' '}
            <span className="text-mainblue font-lights">
              <a href="/user-registration">Sign up.</a>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default index
<<<<<<< HEAD
=======

export const getServerSideProps = withSessionSsr(
  async function getServersideProps({ req, res }) {
    try {
      const email = req.session.email || ''
      const isLoggedIn = req.session.isLoggedIn || ''

      return {
        props: {
          email: email,
          isLoggedIn: isLoggedIn,
        },
      }
    } catch (err) {
      console.log(err)

      return {
        redirect: {
          destination: '/user-login',
          statusCode: 307,
        },
      }
    }
  },
)
>>>>>>> aa22023d5146f9b4fe6cffa2ecc6464e7af0b51a
