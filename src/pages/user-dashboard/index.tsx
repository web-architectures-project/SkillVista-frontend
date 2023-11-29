// import { DataTable } from '@/components/user-dashboard/DataTable'
// import FullScreenSearchBar from '@/components/user-dashboard/FullScreenSearchBar'
// import { columns } from '@/components/user-dashboard/columns'
// import { DummyData } from '@/lib/utils/UserDashboardData'
import { NextApiRequest, NextApiResponse } from 'next'
import { useEffect, useMemo, useState } from 'react'
import { Modal } from '@/components/ui/modal'
import { useRouter } from 'next/router'
import { getCookies, setCookie } from 'cookies-next'
// import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { selectAuthState } from '@/store/authSlice'
import { FullScreenSearchBar } from '@/components/user-dashboard/FullScreenSearchBar'
import { DataTable } from '@/components/user-dashboard/DataTable'
import { TUserDashboardTable, columns } from '@/components/user-dashboard/columns'
import { DummyData } from '@/lib/utils/UserDashboardData'
import { apiRequest } from '@/components/apis/default'
import { METHODS } from '@/lib/utils/ApiMethods'

interface IndexProps {
  consent: boolean
}

interface ServerSideProps {
  res: NextApiResponse
  req: NextApiRequest
}

interface ServiceAvailability {
  availability: string
  date_created: string
  description: string
  pricing: number
  provider_id: number
  service_id: number
  service_type_id: number
}

export default function Index({ consent }: IndexProps): JSX.Element {
  const [cookieModal, setCookieModal] = useState(false)
  // Remove the below when unecessary -1Solon
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [query, setQuery] = useState('')
  const [fetchedData, setFetchedData] = useState({})
  const [serviceData, setServiceData] = useState<ServiceAvailability[]>()
  const [servicesToBeUsed, setServicesTobeUsed] = useState<TUserDashboardTable[]>([])
  const [serviceDataFromSearchInput, setServiceDataFromSearchInput] =
    useState<ServiceAvailability[]>()
  const [providerName, setProviderName] = useState('')

  const serviceDataFromSearch: TUserDashboardTable[] = useMemo(() => {
    return []
  }, [])

  const regularServiceData: TUserDashboardTable[] = useMemo(() => {
    return []
  }, [])

  // Remove the below when unecessary -1Solon
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const router = useRouter()
  const authState = useSelector(selectAuthState)

  const getServiceData = async () => {
    const serviceData = await apiRequest({ method: METHODS.GET, path: '/services' })
    setServiceData(serviceData?.message)
  }

  const getProviderNameFromId = async (providerId: number) => {
    const provider = await apiRequest({ method: METHODS.GET, path: `/users/${String(providerId)}` })
    setProviderName(provider?.message?.username)
  }

  const getServicesUsingSearch = async (searchQuery: string) => {
    const serviceData = await apiRequest({ method: METHODS.GET, path: `/search/${searchQuery}` })
    setServiceDataFromSearchInput(serviceData)
  }

  useEffect(() => {
    if (serviceDataFromSearch.length === 0) getServiceData()
  }, [serviceDataFromSearch])

  useEffect(() => {
    serviceDataFromSearchInput?.message?.searchResult?.map((service: ServiceAvailability) => {
      getProviderNameFromId(service.provider_id)
      serviceDataFromSearch?.push({
        short_description: service?.description,
        provider: providerName,
        availability: service?.availability,
        pricing: String(service?.pricing),
      })
    })
    console.log(serviceDataFromSearch)
  }, [providerName, serviceDataFromSearch, serviceDataFromSearchInput?.message?.searchResult])

  useEffect(() => {
    serviceData?.map(service => {
      getProviderNameFromId(service.provider_id)
      regularServiceData?.push({
        availability: service.availability,
        pricing: String(service.pricing),
        provider: providerName,
        short_description: service.description,
      })
    })
  }, [serviceData])

  useEffect(() => {
    console.log('Running??')

    if (serviceDataFromSearch.length === 0) setServicesTobeUsed(regularServiceData)
    if (serviceDataFromSearch.length > 0) setServicesTobeUsed(serviceDataFromSearch)
  }, [serviceDataFromSearch, regularServiceData])

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

  // Remove the below when unecessary -1Solon
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const fetchDataOnEnter = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    getServicesUsingSearch(query)
  }

  useEffect(() => {
    if (query === '') setFetchedData('')
  }, [fetchedData, query])

  // useEffect to check user authentication and redirect if not authenticated
  useEffect(() => {
    // if (!authState) router.push('user-login')
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

      <div className="relative h-screen">
        <div>
          <FullScreenSearchBar
            queryData={fetchedData}
            query={query}
            setQuery={setQuery}
            fetchDataOnEnter={fetchDataOnEnter}
            toggle={DummyData ? true : false}
          />
          <DataTable
            columns={columns}
            data={servicesToBeUsed}
            query={query}
            queryData={fetchedData}
          />
        </div>
      </div>
    </main>
  )
}

export async function getServerSideProps({ req, res }: ServerSideProps) {
  const data = getCookies({ req, res })
  const consent = data['consent'] || {}

  return { props: { consent } }
}
