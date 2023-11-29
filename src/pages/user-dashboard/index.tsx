// import { DataTable } from '@/components/user-dashboard/DataTable'
// import FullScreenSearchBar from '@/components/user-dashboard/FullScreenSearchBar'
// import { columns } from '@/components/user-dashboard/columns'
// import { DummyData } from '@/lib/utils/UserDashboardData'
import { NextApiRequest, NextApiResponse } from 'next'
import { FC, useEffect, useState } from 'react'
import { Modal } from '@/components/ui/modal'
import { useRouter } from 'next/router'
import { getCookies, setCookie } from 'cookies-next'
// import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { selectAuthState } from '@/store/authSlice'
import { ChatBox } from '@/components/user-dashboard/chatbox'

interface IndexProps {
  consent: boolean
}

interface ServerSideProps {
  res: NextApiResponse
  req: NextApiRequest
}

const Index: FC<IndexProps> = ({ consent }: IndexProps) => {
  const [cookieModal, setCookieModal] = useState(false)
  const [query, setQuery] = useState('')
  const [fetchedData, setFetchedData] = useState({})
  const router = useRouter()
  const authState = useSelector(selectAuthState)

  /* Cookie-consent check & Modal */
  useEffect(() => {
    if (JSON.stringify(consent) === '{}') {
      setCookieModal(true)
    }
  }, [consent])

  const rightFunc = () => {
    setCookieModal(false)
  }

  const leftFunc = async () => {
    setCookie('consent', true, {
      //1 year
      expires: new Date(Number(new Date()) + 315360000000),
    })
    setCookieModal(false)
  }

  const fetchDataOnEnter = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFetchedData(data?.data)
  }

  useEffect(() => {
    if (query === '') setFetchedData('')
  }, [fetchedData, query])

  // useEffect to check user authentication and redirect if not authenticated
  useEffect(() => {
    // if (!authState) router.push("user-login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState])

  return (
    // Main container for the component
    <main className="container">
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

      <div className="relative h-screen"></div>
        <div>
          {/* <FullScreenSearchBar
            queryData={fetchedData}
            query={query}
            setQuery={setQuery}
            fetchDataOnEnter={fetchDataOnEnter}
          /> */}

          {/* <DataTable
            columns={columns}
            data={DummyData}
            query={query}
            queryData={fetchedData}
          /> */}
        </div>
      </div>
    </main>
  )
}

// Export the Index component as the default export
export default Index

export async function getServerSideProps({ req, res }: ServerSideProps) {
  const data = getCookies({ req, res })
  const consent = data['consent'] || {}

  return { props: { consent } }
}
