import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
// import { TextArea } from '@/components/ui/textArea'
import { useFormik } from 'formik'
import { FC, useState } from 'react'
import { Textarea } from '@/components/ui/textarea'

interface IndexProps {}

const Index: React.FC<IndexProps> = ({}) => {
  const formik = useFormik({
    initialValues: {
      displayname: '',
      description: '',
    },
    validationSchema: null,
    onSubmit: () => {},
  })

  return (
    <div className="flex flex-col min-h-screen mx-auto px-10 pt-8 pb-16 ">
      <h1 className="text-3xl font-semibold text-gray-600 pb-5">
        Professional Info
      </h1>
      <div className="text-gray-500 font-light pb-7">
        Tell us a bit about yourself. This information will appear on your
        public profile, so that potential buyers can get to know you better.
      </div>
      <hr />
      <div id="forms-wrapper" className="w-full max-w-5xl py-7">
        <form onSubmit={formik?.handleSubmit}>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <Label>DisplayName</Label>
            </div>
            <div className="md:w-2/3">
              <Input
                type="text"
                name="username"
                placeholder="Type your display name"
                className="form-input"
                value={formik?.values?.displayname}
                onChange={formik?.handleChange}
              />
              {formik?.errors?.displayname && formik.touched.displayname ? (
                <p className="text-red-400 text-sm mt-1">
                  {formik.errors.displayname}
                </p>
              ) : (
                ''
              )}
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <Label>Description</Label>
            </div>
            <div className="md:w-2/3">
              <Textarea
                placeholder="Share your service, a bit about your work experience, cool projects you've completed, and your area of expertise."
                rows="7"
                value={formik?.values?.description}
                onChange={formik?.handleChange}
              />
              {formik?.errors?.displayname && formik.touched.displayname ? (
                <p className="text-red-400 text-sm mt-1">
                  {formik.errors.displayname}
                </p>
              ) : (
                ''
              )}
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <Label>Description</Label>
            </div>
            <div className="md:w-2/3"></div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Index
