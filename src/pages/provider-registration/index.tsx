import { apiRequest } from '@/components/apis/default'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SelectBox } from '@/components/ui/select'
import { TextArea } from '@/components/ui/textArea'
import { useFormik } from 'formik'
import Image from 'next/image'
import { listProps } from '@/components/ui/select'

import { FC, useEffect, useRef, useState } from 'react'
import * as Yup from 'yup'
import { useSelector } from 'react-redux'
import { selectUserId } from '@/store/userSlice'
import { Modal } from '@/components/ui/modal'
import { useRouter } from 'next/router'

interface IndexProps {}

export interface ListProps {
  service_category_id: number
  service_name: string
  description: string
}

const Index: FC<IndexProps> = () => {
  const router = useRouter()
  const userId = useSelector(selectUserId)
  const [error, setError] = useState<string[] | string>()
  const [profileImg, setProfileImg] = useState<File | null>()
  const [changedImage, setChangedImage] = useState<string | ArrayBuffer | null>()
  const hiddenFileInput = useRef<HTMLInputElement>(null)
  const [serviceType, setServiceType] = useState<listProps[]>([])
  const [successModal, setSuccessModal] = useState(false)

  const RegistrationSchema = Yup.object().shape({
    title: Yup.string().required('Required'),
    description: Yup.string().max(1000, 'Too Long!').required('Required'),
    price: Yup.number().required('Required'),
    serviceType: Yup.string().required('Required'),
    availability: Yup.string().max(255, 'Too Long!').required('Required'),
  })

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      price: 0,
      availability: '',
      serviceType: serviceType[0]?.service_name,
    },
    validationSchema: RegistrationSchema,
    onSubmit: () => {
      createService()
    },
  })

  useEffect(() => {
    apiRequest({
      method: 'GET',
      path: 'service-types',
    }).then(res => {
      if (res?.status === 200) {
        setServiceType(res.message)
        formik.setFieldValue('serviceType', res.message[0]?.service_name)
      }
    })
  }, [])

  const handleSuccessModal = () => {
    setSuccessModal(!successModal)
  }

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

    setProfileImg(fileUploaded)

    const fileReader = new FileReader()
    fileReader.addEventListener('load', () => {
      return setChangedImage(fileReader?.result)
    })

    fileReader.readAsDataURL(fileUploaded)
  }

  const createService = () => {
    const serviceTypeId = serviceType.find(item => item.service_name === formik.values.serviceType)
    handleSuccessModal()
    apiRequest({
      method: 'POST',
      path: 'services',
      body: {
        provider_id: userId,
        service_type_id: serviceTypeId?.service_category_id,
        description: formik.values.description,
        pricing: formik.values.price,
        availability: formik.values.availability,
        date_created: new Date(),
      },
    }).then(res => {
      if (res?.status === 200) {
        handleSuccessModal()
      } else {
        setError(res?.message)
      }
    })
  }

  const modalRightFunc = () => {
    router.push('/provider-service')
    handleSuccessModal()
  }
  const modalLeftFunc = () => {
    router.push('/user-dashboard')
    handleSuccessModal()
  }

  return (
    <div className="lg:flex lg:flex-row ">
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
          {successModal && (
            <Modal
              title={'Success'}
              content={
                'Your service has been successfully created. You can check your service in the service page.'
              }
              rightButton={'Go to Service Page'}
              leftButton={'Go to Home'}
              rightFunc={modalRightFunc}
              leftFunc={modalLeftFunc}
            />
          )}
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
              {formik?.errors?.title && formik.touched.title ? (
                <p className="text-red-400 text-sm mt-1">{formik.errors.title}</p>
              ) : (
                ''
              )}
            </div>
            <div className="pb-3">
              <Label>Service Type</Label>
              <SelectBox
                name="serviceType"
                value={formik.values.serviceType}
                lists={serviceType}
                onChange={formik.handleChange}
              />
            </div>
            <div className="pb-3">
              <Label>Desciprtion</Label>
              <TextArea
                rows={5}
                name="description"
                placeholder="Tell us about your service"
                value={formik.values.description}
                onChange={formik.handleChange}
              />
              {formik?.errors?.description && formik.touched.description ? (
                <p className="text-red-400 text-sm mt-1">{formik.errors.description}</p>
              ) : (
                ''
              )}
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
              {formik?.errors?.price && formik.touched.price ? (
                <p className="text-red-400 text-sm mt-1">{formik.errors.price}</p>
              ) : (
                ''
              )}
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
              {formik?.errors?.availability && formik.touched.availability ? (
                <p className="text-red-400 text-sm mt-1">{formik.errors.availability}</p>
              ) : (
                ''
              )}
            </div>

            {Array.isArray(error) ? (
              error.map((i_error, index) => {
                return (
                  <p className="text-sm text-red-500 font-light " key={index}>
                    {i_error}
                  </p>
                )
              })
            ) : (
              <p className="text-sm text-red-500 font-light">{error}</p>
            )}
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

export default Index
