// Import the necessary dependencies and components
import { DataTable } from '@/components/user-dashboard/DataTable'
import FullScreenSearchBar from '@/components/user-dashboard/FullScreenSearchBar'
import { columns } from '@/components/user-dashboard/columns'
import { DummyData } from '@/lib/utils/UserDashboardData'
import { FC, useEffect, useState } from 'react'
import { getCookie, setCookie } from 'cookies-next'
import { NextApiRequest, NextApiResponse } from 'next'
import { Modal } from '@/components/ui/modal'

// Define the interface for the props (currently empty)
interface IndexProps {
  consent: boolean
}

interface ServerSideProps {
  res: NextApiResponse
  req: NextApiRequest
}

// Create a functional component named Index, which receives no props ({})
const Index: FC<IndexProps> = ({ consent }: IndexProps) => {
  const [cookieModal, setCookieModal] = useState(false)

  /* Cookie-consent check & Modal */
  useEffect(() => {
    setCookieModal(!consent)
  }, [consent])
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

  // Initialize state to manage the search query
  const [query, setQuery] = useState('')
  // const router = useRouter();
  // const authContext = useContext(AuthContext);

  // useEffect to check user authentication and redirect if not authenticated
  // useEffect(() => {
  //   console.log("working");
  //   !authContext?.isUserAuthenticated && router.push("/user-login");
  // }, [authContext?.isUserAuthenticated, router]);

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

      <div className="relative h-screen">
        <div>
          {/* Render the FullScreenSearchBar component and pass the query state and setQuery function as props */}
          <FullScreenSearchBar query={query} setQuery={setQuery} />

          {/* Render the DataTable component, passing columns, data, and the search query as props */}
          <DataTable columns={columns} data={DummyData} query={query} />
        </div>
      </div>
    </main>
  )
}

// Export the Index component as the default export
export default Index

export async function getServerSideProps({ req, res }: ServerSideProps) {
  const consent = getCookie('cookie-consent', { req, res }) || false

  return {
    props: {
      consent,
    },
  }
}
