import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal'
import { getCookie, setCookie } from 'cookies-next'
import { NextApiRequest, NextApiResponse } from 'next'
import Link from 'next/link'
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
  useEffect(() => {
    if (!consent) {
      setCookieModal(true)
    }
  }, [])

  const rightFunc = () => {
    setCookie('cookie-consent', true, {
      //1 year
      expires: new Date(Number(new Date()) + 315360000000),
    })
    setCookieModal(false)
  }
  const leftFunc = () => {
    setCookieModal(false)
  }
  return (
    <main>
      {cookieModal && (
        <Modal
          title={'Cookie Consent'}
          content={
            'This website use cookies to help you have a superior and more admissible browsing experience on the website.'
          }
          rightButton={'Accept'}
          leftButton={'Decline'}
          rightFunc={rightFunc}
          leftFunc={leftFunc}
        />
      )}
      <div className="grid place-items-center h-screen">
        <div className="grid gap-5">
          {/* <Link href={'/user-login'}>
            <Button>Login as a User</Button>
          </Link>
          <Link href={'/user-registration'}>
            <Button>Register as a User</Button>
          </Link> */}
        </div>
      </div>
    </main>
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
