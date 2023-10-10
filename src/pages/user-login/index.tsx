import { FC } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface indexProps {}

const index: FC<indexProps> = ({}) => {
  return (
    <div className="bg-slate-100">
      <div className="flex flex-col min-h-screen mx-auto max-w-2xl px-10 pt-8 pb-16">
        <p className="text-center text-3xl">Welcome back</p>
        <div className="bg-white border-1 border-rose-600 my-10 p-8">
          <div className="pb-5">
            <p className="font-bold mb-2">Email address</p>
            <Input type="text" name="Email" placeholder="Email" />
          </div>

          <div className="pb-5">
            <p className="font-bold mb-2">Password</p>
            <Input type="text" name="Password" placeholder="Password" />
          </div>

          <div className="flex flex-col justify-center">
            <Button type="submit" className="bg-mainblue hover:bg-slate-400">
              Log in
            </Button>
          </div>
          <div className="py-8 text-center font-light ">
            <span>Don't have an account? </span>
            <a href="/user-registration">
              <span className="text-mainblue"> Sign up</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default index
