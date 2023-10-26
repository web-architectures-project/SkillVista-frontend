// Import the necessary dependencies and components
import { DataTable } from '@/components/user-dashboard/DataTable'
import FullScreenSearchBar from '@/components/user-dashboard/FullScreenSearchBar'
import { columns } from '@/components/user-dashboard/columns'
import { DummyData } from '@/lib/utils/UserDashboardData'
import { FC, useState } from 'react'
import { getCookie } from 'cookies-next'
import { NextApiRequest, NextApiResponse } from 'next'

// Define the interface for the props (currently empty)
interface IndexProps {}

interface ServerSideProps {
  res: NextApiResponse
  req: NextApiRequest
}

// Create a functional component named Index, which receives no props ({})
const Index: FC<IndexProps> = ({}) => {
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
  const token = getCookie('auth-token', { req, res })
  if (!token) {
    return {
      redirect: {
        destination: '/user-login',
        permanent: false,
      },
    }
  }

  return {
    props: {
      data: null,
    },
  }
}
