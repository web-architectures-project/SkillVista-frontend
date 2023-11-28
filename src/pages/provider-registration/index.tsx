// Import necessary components and libraries

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input' // Importing the Input component
import { Label } from '@/components/ui/label' // Importing the Label component
import { TextArea } from '@/components/ui/textArea'
import { useFormik } from 'formik' // Importing useFormik hook for form handling
import Image from 'next/image'
// import { useRouter } from 'next/router'
import { FC, useRef, useState } from 'react' // Importing FC (Functional Component) type from React
import * as Yup from 'yup' // Import Yup for form validation

// Define the props interface for the 'index' component
interface IndexProps {}

// Define the 'index' component as a functional component
export const Index: FC<IndexProps> = () => {
  // const router = useRouter()
  // const approved = true
  // Define the Yup schema for form validation
  const RegistrationSchema = Yup.object().shape({
    title: Yup.string().required(),
    description: Yup.string().required(),
    price: Yup.number().required(),
    availability: Yup.string().required(),
  })

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      price: 0,
      availability: '',
    },
    validationSchema: RegistrationSchema,
    onSubmit: () => {
      console.log(formik.values)
      // console.log(formik)
      // apiRequest({
      //   method: 'POST',
      //   path: 'users/register',
      //   body: {
      //     username: formik.values.username,
      //     email: 'string',
      //     password: 'string',
      //     user_type: 'string',
      //     first_name: 'string',
      //     last_name: 'string',
      //     phone_number: 'string',
      //     address: 'string',
      //     city: 'string',
      //     county: 'string',
      //     Eircode: 'string',
      //     profile_picture_url: 'string',
      //     bio: 'string',
      //   },
      // })
    },
  })

  // const [profileImg, setProfileImg] = useState<any>()
  const [changedImage, setChangedImage] = useState<string | ArrayBuffer | null>()
  const hiddenFileInput = useRef<HTMLInputElement>(null)
  const handleClick = () => {
    if (hiddenFileInput.current) {
      hiddenFileInput.current.click()
    }
  }

  let imageUrl = ''
  if (changedImage) {
    const blob = new Blob([changedImage], { type: 'image/jpeg' })
    imageUrl = URL.createObjectURL(blob)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileUploaded = event.target.files && event.target.files[0]

    if (!fileUploaded) return

    if (fileUploaded.size > 1000000) {
      alert('File size should be less than 1MB')
      return
    }

    if (!fileUploaded.type.includes('image')) {
      alert('Only image files are allowed')
      return
    }

    if (!event.target.files && fileUploaded.length > 0) {
      return
    }

    // setProfileImg(fileUploaded)

    const fileReader = new FileReader()
    fileReader.addEventListener('load', () => {
      return setChangedImage(fileReader?.result)
    })

    fileReader.readAsDataURL(fileUploaded)
  }

  return (
    // Render the main content within a grid layout
    <div className="lg:flex lg:flex-row h-screen w-full">
      <div className="hidden lg:flex lg:flex-col lg:justify-center lg:w-4/12 bg-gradient-to-bl from-blue-500 via-sky-400 to-blue-500 text-center ">
        <div className="text-white text-3xl font-semibold tracking-wide">Let&apos;s Get</div>
        <div className="text-white text-6xl font-bold tracking-wide ">Started</div>
        <div className="text-white text-sm font-light tracking-wide px-10 mt-3">
          Get notified when you get an order and use our system to discuss details with customers.
          And get paid on time, every time. Payment is available for withdrawal as soon as it
          clears.
        </div>
      </div>
      <div className="flex flex-col lg:w-8/12 w-full py-5 px-8">
        <div className="text-center text-gray-500 sm:text-2xl text-xl font-semibold border-b border-gray-200 pb-3">
          REGISTER WITH PERSONAL INFO AND PROFESSIONAL INFO
        </div>
        <div className="pt-10">
          <form onSubmit={formik?.handleSubmit}>
            <div className="pb-3 flex justify-center">
              <Image
                src={changedImage ? imageUrl : '/upload.png'}
                width={180}
                height={180}
                alt="Picture of the author"
              />
            </div>
            <div className="pb-5 flex justify-center">
              <Button onClick={handleClick} className="bg-mainblue hover:bg-slate-300">
                Upload a file
              </Button>
              <input
                type="file"
                onChange={handleFileUpload}
                ref={hiddenFileInput}
                style={{ display: 'none' }}
              />
            </div>
            <div className="pb-3">
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                placeholder="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                className="form-input"
              />
            </div>
            <div className="pb-3">
              <Label>Desciprtion</Label>
              <TextArea
                rows={5}
                name="description"
                placeholder="Tell us about yourservice"
                value={formik.values.description}
                onChange={formik.handleChange}
              />
            </div>

            <div className="pb-3">
              <Label>Price</Label>
              <div className="flex items-center">
                <Input
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  className="form-input w-1/3"
                />
                <div className="ml-3">€</div>
              </div>
            </div>
            <div className="pb-3">
              <Label>Availability</Label>
              <Input
                type="text"
                name="availability"
                placeholder=""
                value={formik.values.availability}
                onChange={formik.handleChange}
                className="form-input"
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit" className="bg-mainblue hover:bg-slate-300">
                Save
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
