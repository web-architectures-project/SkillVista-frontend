import { apiRequest } from '@/components/apis/default'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { getUserProfile, handleToken } from '@/lib/utils'
import { setAuthState } from '@/store/authSlice'
import { useFormik } from 'formik'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC, useState } from 'react'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { setProfileId, setUserId, setUserName, setUserState } from '@/store/userSlice'

interface IndexProps {}
const Index: FC<IndexProps> = () => {
  const router = useRouter()
  const [error, setError] = useState<string[] | string>()
  const dispatch = useDispatch()
  const RegistrationSchema = Yup.object().shape({
    username: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
    first_name: Yup.string().required(),
    last_name: Yup.string().required(),
    phone_number: Yup.number().required(),
    address: Yup.string().required(),
    county: Yup.string().required(),
    city: Yup.string().required(),
    eircode: Yup.string().required(),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
      .matches(
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[\]:;<>,.?/~_+-=|\\]).{8,32}$/,
        'Password must have atleast 1 Uppercase letter, 1 Lowercase letter, 1 special character and 1 number',
      )
      .min(6, 'Password must be at least 6 characters long')
      .required('Password is required'),
    repassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords dont match'),
  })

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      repassword: '',
      first_name: '',
      last_name: '',
      phone_number: '',
      address: '',
      county: '',
      city: '',
      eircode: '',
    },
    validationSchema: RegistrationSchema,
    onSubmit: () => {
      apiRequest({
        method: 'POST',
        path: 'users/register',
        body: {
          username: formik.values.username,
          email: formik.values.email,
          password: formik.values.password,
          user_type: 'user',
          first_name: formik.values.first_name,
          last_name: formik.values.last_name,
          phone_number: String(formik.values.phone_number),
          address: formik.values.address,
          city: formik.values.city,
          county: formik.values.county,
          Eircode: formik.values.eircode,
        },
      }).then(res => {
        if (res?.status === 201) {
          handleLogin()
        } else {
          setError(res?.message)
        }
      })
    },
  })

  const handleLogin = () => {
    apiRequest({
      method: 'POST',
      path: 'users/login',
      body: {
        email: formik.values.email,
        password: formik.values.password,
      },
    }).then(res => {
      if (res?.status === 200) {
        handleToken({ token: res.message.accessToken }).then(() => {
          dispatch(setAuthState(true))
          getUserProfile({ token: res.message.accessToken }).then(res => {
            dispatch(setUserState(res?.profile))
            dispatch(setUserName(res?.username))
            dispatch(setProfileId(res?.profileId))
            dispatch(setUserId(res?.userId))
          })
          router.push('/user-dashboard')
        })
      } else {
        setError(res?.message)
      }
    })
  }

  return (
    <div className="bg-slate-100">
      <div className="flex flex-col min-h-screen mx-auto max-w-2xl px-4 pt-8 pb-16">
        <p className="text-center font-bold text-3xl mb-8">Create your account</p>
        <div id="forms-wrapper" className="bg-white p-8">
          <form onSubmit={formik?.handleSubmit}>
            <div className="sm:grid sm:grid-cols-2 gap-5 aspect-auto">
              <div className="sm:col-span-2 ">
                <Label>Username</Label>
                <Input
                  type="text"
                  name="username"
                  placeholder="ex) So_nickname"
                  className="form-input"
                  value={formik?.values?.username}
                  onChange={formik?.handleChange}
                />
                {formik?.errors?.username && formik.touched.username ? (
                  <p className="text-red-400 text-sm mt-1">{formik.errors.username}</p>
                ) : (
                  ''
                )}
              </div>
              <div className="mt-3 sm:mt-0">
                <Label>First name</Label>
                <Input
                  type="text"
                  name="first_name"
                  placeholder="ex) Soyeon"
                  onChange={formik.handleChange}
                  value={formik?.values?.first_name}
                  className="form-input"
                />
                {formik?.errors?.first_name && formik.touched.first_name ? (
                  <p className="text-red-400 text-sm mt-1">{formik.errors.first_name}</p>
                ) : (
                  ''
                )}
              </div>
              <div className="mt-3 sm:mt-0">
                <Label>Last name</Label>
                <Input
                  type="text"
                  name="last_name"
                  placeholder="ex) Lee"
                  onChange={formik.handleChange}
                  value={formik.values.last_name}
                  className="form-input"
                />
                {formik?.errors?.last_name && formik.touched.last_name ? (
                  <p className="text-red-400 text-sm mt-1">{formik.errors.last_name}</p>
                ) : (
                  ''
                )}
              </div>
              <div className="col-span-2 mt-3 sm:mt-0">
                <Label>Phone number</Label>
                <Input
                  type="number"
                  name="phone_number"
                  placeholder="ex) 0987654322"
                  className="form-input"
                  value={formik?.values?.phone_number}
                  onChange={formik?.handleChange}
                />
                {formik?.errors?.phone_number && formik.touched.phone_number ? (
                  <p className="text-red-400 text-sm mt-1">{formik.errors.phone_number}</p>
                ) : (
                  ''
                )}
              </div>
              <div className="col-span-2 mt-3 sm:mt-0">
                <Label>Email</Label>
                <Input
                  type="email"
                  name="email"
                  placeholder="ex ) D123456@mytudublin.ie"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  className="form-input"
                />
                {formik?.errors?.email && formik.touched.email ? (
                  <p className="text-red-400 text-sm mt-1">{formik.errors.email}</p>
                ) : (
                  ''
                )}
              </div>
              <div className="mt-3 sm:mt-0">
                <Label>City</Label>
                <Input
                  type="text"
                  name="city"
                  placeholder="ex) Dublin"
                  onChange={formik.handleChange}
                  value={formik.values.city}
                  className="form-input"
                />
                {formik?.errors?.city && formik.touched.city ? (
                  <p className="text-red-400 text-sm mt-1">{formik.errors.city}</p>
                ) : (
                  ''
                )}
              </div>
              <div className="mt-3 sm:mt-0">
                <Label>County</Label>
                <Input
                  type="text"
                  name="county"
                  placeholder="ex) Dublin 9"
                  onChange={formik.handleChange}
                  value={formik.values.county}
                  className="form-input"
                />
                {formik?.errors?.county && formik.touched.county ? (
                  <p className="text-red-400 text-sm mt-1">{formik.errors.county}</p>
                ) : (
                  ''
                )}
              </div>
              <div className="col-span-2 mt-3 sm:mt-0">
                <Label>Eircode</Label>
                <Input
                  type="text"
                  name="eircode"
                  placeholder="ex) A65F4E2"
                  onChange={formik.handleChange}
                  value={formik.values.eircode}
                  className="form-input"
                />
                {formik?.errors?.eircode && formik.touched.eircode ? (
                  <p className="text-red-400 text-sm mt-1">{formik.errors.eircode}</p>
                ) : (
                  ''
                )}
              </div>
              <div className="col-span-2 mt-3 sm:mt-0">
                <Label>Address</Label>
                <Input
                  type="text"
                  name="address"
                  placeholder="ex) Address"
                  onChange={formik.handleChange}
                  value={formik.values.address}
                  className="form-input"
                />
                {formik?.errors?.address && formik.touched.address ? (
                  <p className="text-red-400 text-sm mt-1">{formik.errors.address}</p>
                ) : (
                  ''
                )}
              </div>
              <div className="mt-3 sm:mt-0">
                <Label>Password</Label>
                <Input
                  type="password"
                  name="password"
                  placeholder="Please enter your password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  className="form-input"
                />
                {formik?.errors?.password && formik.touched.password ? (
                  <p className="text-red-400 text-sm mt-1">{formik.errors.password}</p>
                ) : (
                  ''
                )}
              </div>
              <div className="mt-3 sm:mt-0">
                <Label>Re-Enter password</Label>
                <Input
                  type="password"
                  name="repassword"
                  placeholder="Please re-enter your password"
                  onChange={formik.handleChange}
                  value={formik.values.repassword}
                  className="form-input"
                />
                {formik?.errors?.repassword && formik.touched.repassword ? (
                  <p className="text-red-400 text-sm mt-1">{formik.errors.repassword}</p>
                ) : (
                  ''
                )}
              </div>
            </div>
            <div className="mt-2">
              <p className="text-sm text-slate-500 font-light">
                * Your password: must be at least 6 characters long
              </p>
              {Array.isArray(error) ? (
                error.map((i_error, index) => {
                  return (
                    <p className="text-sm text-red-500 font-light " key={index}>
                      {i_error}
                    </p>
                  )
                })
              ) : (
                <p className="text-sm text-slate-500 font-light">{error}</p>
              )}
            </div>

            <div className="flex flex-col mt-5">
              <Button type="submit" className="bg-mainblue">
                Create Account
              </Button>
            </div>
          </form>
          <div className="mt-10 text-center">
            <span className="font-lights">Already have an account?</span>
            <span className="text-mainblue font-lights">
              <Link href={'/user-login'}>Log in</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
