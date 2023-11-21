import { apiRequest } from '@/components/apis/default'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { selectAuthState, setAuthState } from '@/store/authSlice'
import { selectProfileId, selectUserState } from '@/store/userSlice'
import { deleteCookie } from 'cookies-next'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useFormik } from 'formik'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { FC, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'

interface indexProps {}

const Index: FC<indexProps> = ({}) => {
  const [formEditable, setFormEditable] = useState(true)
  const [isSame, setIsSame] = useState(false)
  const [inputConfirmationText, setInputConfirmationText] = useState('')

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

  const dispatch = useDispatch()
  const router = useRouter()

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
    onSubmit: () => {},
  })

  const saveProfile = () => {
    apiRequest({
      method: 'PUT',
      path: `profiles/${profileId}`,
      body: formik.values,
    }).then(res => {
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
          }).then(res => {
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
  }

  const handleClick = () => {
    hiddenFileInput.current.click()
  }

  const handleEditability = () => {
    setFormEditable(!formEditable)
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

  const handleLogout = () => {
    dispatch(setAuthState(false))
    deleteCookie('cookie-token')
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: null }),
    }
    fetch('/api/auth', options)
  }

  const handleDeleteProfile = async () => {
    try {
      await apiRequest({
        method: 'DELETE',
        path: `users/${profileId}`,
      })
      handleLogout()
      dispatch(setAuthState(false))
      deleteCookie('cookie-token')
      router.push('user-login')
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteInputConfirmation = (e: any) => {
    setInputConfirmationText(e.target.value)
  }

  useEffect(() => {
    if (inputConfirmationText === userState.first_name) setIsSame(true)
    else setIsSame(false)
  }, [inputConfirmationText, userState.first_name])

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
        <Button onClick={() => handleClick()} className="bg-mainblue hover:bg-slate-300">
          Upload a file
        </Button>
        <input
          type="file"
          onChange={handleChange}
          ref={hiddenFileInput}
          style={{ display: 'none' }}
        />
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className=" p-8">
          <div className="md:grid md:grid-cols-2 gap-3">
            <div className="pb-3">
              <Label>First name</Label>
              <Input
                type="string"
                name="first_name"
                placeholder="firsname"
                value={formik.values.first_name}
                onChange={formik.handleChange}
                className="form-input"
                disabled={formEditable}
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
                disabled={formEditable}
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
              disabled={formEditable}
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
              disabled={formEditable}
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
              disabled={formEditable}
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
              disabled={formEditable}
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
              disabled={formEditable}
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
              disabled={formEditable}
            />
          </div>
          <div className="flex space-x-2 justify-end">
            <Button
              type="submit"
              className="bg-mainblue hover:bg-slate-300"
              onClick={() => {
                saveProfile()
              }}
            >
              Save
            </Button>
            <Button
              type="button"
              className="bg-mainblue hover:bg-slate-300"
              onClick={handleEditability}
            >
              Edit
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button type="button" className="bg-mainblue hover:bg-slate-300">
                  Delete Account
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Are you sure?</DialogTitle>
                  <DialogDescription>
                    Please write {userState?.first_name} in the input box to confirm deletion
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      First Name
                    </Label>
                    <Input
                      id="username"
                      className="col-span-3"
                      onChange={handleDeleteInputConfirmation}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" onClick={handleDeleteProfile} disabled={!isSame}>
                    Delete
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Index
