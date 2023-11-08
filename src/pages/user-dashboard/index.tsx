import { DataTable } from '@/components/user-dashboard/DataTable'
import FullScreenSearchBar from '@/components/user-dashboard/FullScreenSearchBar'
import { columns } from '@/components/user-dashboard/columns'
import { DummyData } from '@/lib/utils/UserDashboardData'
import { NextApiRequest, NextApiResponse } from 'next'
import { FC, useContext, useEffect, useState } from 'react'
import { Modal } from '@/components/ui/modal'
import { useRouter } from 'next/router'
import { AuthContext } from '@/context/auth-context'
import { getCookies, setCookie } from 'cookies-next'
import { useQuery } from '@tanstack/react-query'

interface IndexProps {
  consent: boolean
}

interface ServerSideProps {
  res: NextApiResponse
  req: NextApiRequest
}

const Index: FC<IndexProps> = ({ consent }: IndexProps) => {
  const [cookieModal, setCookieModal] = useState(false)

  /* Cookie-consent check & Modal */
  useEffect(() => {
    if (JSON.stringify(consent) === '{}') {
      setCookieModal(true)
    }
  }, [])

  const rightFunc = () => {
    setCookieModal(false)
  }

  const leftFunc = async () => {
    await setCookie('consent', true, {
      //1 year
      expires: new Date(Number(new Date()) + 315360000000),
    })
    setCookieModal(false)
  }

  const [query, setQuery] = useState('')
  const [fetchedData, setFetchedData] = useState({})
  const router = useRouter()
  const authContext = useContext(AuthContext)
  const { data, isFetching } = useQuery({
    queryKey: ['services-data'],
    // queryFn: async () => {
    //   const response = await axios.get("http://localhost:3002/customers");
    //   return response;
    // },
  })
  const fetchDataOnEnter = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFetchedData(data?.data)
  }

  useEffect(() => {
    if (query === '') setFetchedData('')
  }, [fetchedData, query])

  // useEffect to check user authentication and redirect if not authenticated
  // useEffect(() => {
  //   !authContext?.isUserAuthenticated && router.push('/user-login')
  // }, [authContext?.isUserAuthenticated, router])

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

      {/* <div className="relative h-screen">
        <div>
          <FullScreenSearchBar
            queryData={fetchedData}
            query={query}
            setQuery={setQuery}
            fetchDataOnEnter={fetchDataOnEnter}
          />

          <DataTable
            columns={columns}
            data={DummyData}
            query={query}
            queryData={fetchedData}
          />
        </div>
      </div> */}
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
