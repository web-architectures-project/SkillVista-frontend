import { apiRequest } from '@/components/apis/default'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { selectProfileId, selectUserState } from '@/store/userSlice'
import { useFormik } from 'formik'
import Image from 'next/image'
import { FC, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import * as Yup from 'yup'

interface indexProps {}

const Index: FC<indexProps> = ({}) => {
  const userState = useSelector(selectUserState)
  const profileId = useSelector(selectProfileId)
  const hiddenFileInput = useRef<any>(null)
  const [profileImg, setProfileImg] = useState<any>()
  const [changedImage, setChangedImage] = useState<any>()

  const ProfileSchema = Yup.object().shape({
    first_name: Yup.string().required(),
    last_name: Yup.string().required(),
    phone_number: Yup.number().required(),
    address: Yup.string().required(),
    county: Yup.string().required(),
    city: Yup.string().required(),
    Eircode: Yup.string().required(),
    profile_picture_url: Yup.string(),
    bio: Yup.string(),
  })

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      first_name: userState.first_name,
      last_name: userState.last_name,
      phone_number: userState.phone_number,
      address: userState.address,
      county: userState.county,
      city: userState.county,
      Eircode: userState.Eircode,
      profile_picture_url: userState.profile_picture_url,
      bio: userState.bio,
    },
    validationSchema: ProfileSchema,
    onSubmit: () => {
      apiRequest({
        method: 'PUT',
        path: `profiles/${profileId}`,
        body: formik.values,
      }).then((res) => {
        if (res.status === 200) {
          if (profileImg) {
            apiRequest({
              method: 'POST',
              path: `profiles/image/${profileId}`,
              body: { file: profileImg },
              header: {
                headers: {
                  'content-type': 'multipart/form-data',
                },
              },
            }).then((res) => {
              if (res.message === 200) {
                alert('saved successfully!')
              }
            })
          } else {
            if (res.message === 200) {
              alert('saved successfully!')
            }
          }
        }
      })
    },
  })

  const handleClick = () => {
    hiddenFileInput.current.click()
  }

  const handleChange = (event: any) => {
    const fileUploaded = event.target.files[0]
    setProfileImg(fileUploaded)

    const fileReader = new FileReader()
    fileReader.addEventListener('load', () => {
      setChangedImage(fileReader?.result)
    })

    fileReader.readAsDataURL(fileUploaded)
  }
  return (
    <div className="flex flex-col min-h-screen mx-auto max-w-2xl px-4 pt-8 pb-16">
      <p className="text-center font-bold text-3xl mb-8">Profile</p>

      <div className="pb-3 flex justify-center">
        <Image
          src={
            changedImage
              ? changedImage
              : userState.profile_picture_url
              ? userState.profile_picture_url
              : '/user.png'
          }
          width={180}
          height={180}
          alt="Picture of the author"
        />
      </div>
      <div className="pb-5 flex justify-center">
        <Button
          onClick={() => handleClick()}
          className="bg-mainblue hover:bg-slate-300"
        >
          Upload a file
        </Button>
        <input
          type="file"
          onChange={handleChange}
          ref={hiddenFileInput}
          style={{ display: 'none' }}
        />
      </div>
      <form onSubmit={formik?.handleSubmit}>
        <div className=" p-8">
          <div className="grid grid-cols-2 gap-3">
            <div className="pb-3">
              <Label>First name</Label>
              <Input
                type="string"
                name="first_name"
                placeholder="firsname"
                value={formik.values.first_name}
                onChange={formik.handleChange}
                className="form-input"
              />
            </div>
            <div className="pb-3">
              <Label>Last name</Label>
              <Input
                type="string"
                name="last_name"
                placeholder="lastname"
                value={formik.values.last_name}
                onChange={formik.handleChange}
                className="form-input"
              />
            </div>
          </div>
          <div className="pb-3">
            <Label>Phone number</Label>
            <Input
              type="text"
              name="phone_number"
              placeholder="1234567890"
              value={formik.values.phone_number}
              onChange={formik.handleChange}
              className="form-input"
            />
          </div>
          <div className="pb-3">
            <Label>Address</Label>
            <Input
              type="text"
              name="address"
              placeholder="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              className="form-input"
            />
          </div>
          <div className="pb-3">
            <Label>City</Label>
            <Input
              type="text"
              name="city"
              placeholder="city"
              value={formik.values.city}
              onChange={formik.handleChange}
              className="form-input"
            />
          </div>
          <div className="pb-3">
            <Label>County</Label>
            <Input
              type="text"
              name="county"
              placeholder="county"
              value={formik.values.county}
              onChange={formik.handleChange}
              className="form-input"
            />
          </div>
          <div className="pb-3">
            <Label>Eircode</Label>
            <Input
              type="text"
              name="Eircode"
              placeholder="Eircode"
              value={formik.values.Eircode}
              onChange={formik.handleChange}
              className="form-input"
            />
          </div>
          <div className="pb-10">
            <Label>Bio</Label>
            <Input
              type="text"
              name="bio"
              placeholder="bio"
              value={formik.values.bio}
              onChange={formik.handleChange}
              className="form-input"
            />
          </div>
          <div className="flex justify-end">
            <Button type="submit" className="bg-mainblue hover:bg-slate-300">
              Save
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Index
