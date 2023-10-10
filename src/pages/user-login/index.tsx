import { FC } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface indexProps {}

const index: FC<indexProps> = ({}) => {
  return (
    <div className="bg-slate-100">
      <div className="flex flex-col min-h-screen mx-auto max-w-2xl px-4 pt-8 pb-16">
        <p className="text-center font-bold text-3xl mb-8">Welcome back</p>
        <div className="bg-white p-8">
          <div className="pb-3">
            <Label>Email</Label>
            <Input type="Email" name="Email" placeholder="Email" />
          </div>
          <div className="pb-3">
            <Label>Password</Label>
            <Input type="text" name="Password" placeholder="Password" />
          </div>
          <div className="flex flex-col mt-5">
            <Button type="submit" className="bg-mainblue hover:bg-slate-300">
              Login
            </Button>
          </div>
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
