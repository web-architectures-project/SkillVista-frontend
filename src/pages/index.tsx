import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal'
import { getCookie, setCookie } from 'cookies-next'

import { NextApiRequest, NextApiResponse } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { useEffect, useState } from 'react'

interface HomeProps {
  consent: string
}
export interface ServerSideProps {
  res: NextApiResponse
  req: NextApiRequest
}

export default function Home({ consent }: HomeProps) {
  const [cookieModal, setCookieModal] = useState(false)
  const router = useRouter()

  const rightFunc = () => {
    setCookieModal(false)
  }
  const leftFunc = () => {
    setCookie('cookie-consent', true, {
      //1 year
      expires: new Date(Number(new Date()) + 315360000000),
    })
    setCookieModal(false)
  }
  return (
    <>
      <main>
        <div className="grid place-items-center h-screen">
          <div className="grid gap-5">
            <Link href={'/user-login'}>
              <Button>Login as a User</Button>
            </Link>
            <Link href={'/user-registration'}>
              <Button>Register as a User</Button>
            </Link>
          </div>
        </div>

        {cookieModal && (
          <Modal
            title={'Cookie Consent'}
            content={
              'This website use cookies to help you have a superior and more admissible browsing experience on the website.'
            }
            rightButton={'Decline'}
            leftButton={'Accept'}
            rightFunc={rightFunc}
            leftFunc={leftFunc}
          />
        )}
      </main>
    </>
  )
}

export async function getServerSideProps({ req, res }: ServerSideProps) {
  const consent = getCookie('cookie-consent', { req, res }) || false

  return {
    props: {
      consent,
    },
  }
}
