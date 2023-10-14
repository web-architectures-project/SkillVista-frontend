// Import necessary components and libraries
import Signup from '@/components/apis/default'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input' // Importing the Input component
import { Label } from '@/components/ui/label' // Importing the Label component
import { useFormik } from 'formik' // Importing useFormik hook for form handling
import { useRouter } from 'next/router'
import { FC, useState } from 'react' // Importing FC (Functional Component) type from React
import * as Yup from 'yup' // Import Yup for form validation

// Define the props interface for the 'index' component
interface IndexProps {}

// Define the 'index' component as a functional component
const Index: FC<IndexProps> = ({}) => {
  const router = useRouter()
  const [error, setError] = useState<string>()
  // Define the Yup schema for form validation
  const RegistrationSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters long')
      .required('Password is required'),
    repassword: Yup.string().oneOf(
      [Yup.ref('password')],
      'Passwords dont match',
    ),
  })

  // Initialize Formik for form management
  const formik = useFormik({
    initialValues: {
      username: '', // Initial value for the 'username' field
      email: '',
      password: '',
      repassword: '',
    },
    validationSchema: RegistrationSchema, // Apply the Yup schema for validation
    onSubmit: () => {
      Signup(formik.values).then((res: any) => {
        if (res === 'fail') {
          setError('Please wait a few mintues and try agin')
          return
        }
        if (res.statusCode) {
          router.push('/user-dashboard')
        }
      })
    },
  })

  return (
    <div className="bg-slate-100">
      <div className="flex flex-col min-h-screen mx-auto max-w-2xl px-4 pt-8 pb-16">
        {/* Forms Code */}
        <p className="text-center font-bold text-3xl mb-8">
          Create your account
        </p>
        <div id="forms-wrapper" className="bg-white p-8">
          <form onSubmit={formik?.handleSubmit}>
            {/* Create a grid layout with two columns and gap between them */}
            <div className="grid grid-cols-2 gap-5 aspect-auto">
              <div className="col-span-2">
                <Label>Username</Label>
                {/* Input field for entering a username */}
                <Input
                  type="text"
                  name="username"
                  placeholder="Please enter your username"
                  className="form-input"
                  value={formik?.values?.username}
                  onChange={formik?.handleChange}
                />
                {formik?.errors?.username && formik.touched.username ? (
                  <p className="text-red-400 text-sm mt-1">
                    {formik.errors.username}
                  </p>
                ) : (
                  ''
                )}
              </div>
              <div className="col-span-2">
                <Label>Email</Label>
                {/* Input field for re-entering the password */}
                <Input
                  type="email"
                  name="email"
                  placeholder="Please enter your email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  className="form-input"
                />
                {formik?.errors?.email && formik.touched.email ? (
                  <p className="text-red-400 text-sm mt-1">
                    {formik.errors.email}
                  </p>
                ) : (
                  ''
                )}
              </div>
              <div>
                <Label>Password</Label>
                {/* Input field for entering a password */}
                <Input
                  type="password"
                  name="password"
                  placeholder="Please enter your password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  className="form-input"
                />
                {formik?.errors?.password && formik.touched.password ? (
                  <p className="text-red-400 text-sm mt-1">
                    {formik.errors.password}
                  </p>
                ) : (
                  ''
                )}
              </div>
              <div>
                <Label>Re-Enter password</Label>
                {/* Input field for re-entering the password */}
                <Input
                  type="password"
                  name="repassword"
                  placeholder="Please re-enter your password"
                  onChange={formik.handleChange}
                  value={formik.values.repassword}
                  className="form-input"
                />
                {formik?.errors?.repassword && formik.touched.repassword ? (
                  <p className="text-red-400 text-sm mt-1">
                    {formik.errors.repassword}
                  </p>
                ) : (
                  ''
                )}
              </div>
            </div>
            <div className="mt-2">
              <p className="text-sm text-slate-500 font-light">
                * Your password: must be at least 6 characters long
              </p>
              <p className="text-red-400">{error}</p>
            </div>

            <div className="flex flex-col mt-5">
              <Button type="submit" className="bg-mainblue">
                Create Account
              </Button>
            </div>
          </form>
          <div className="mt-10 text-center">
            <span className="font-lights">Already have an account?</span>{' '}
            <span className="text-mainblue font-lights">
              <a href="/user-login">Log in.</a>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index // Export the 'index' component as the default export
