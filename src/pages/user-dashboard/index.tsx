import { NextApiRequest, NextApiResponse } from 'next'
import { MouseEventHandler, useCallback, useEffect, useMemo, useState } from 'react'
import { Modal } from '@/components/ui/modal'
import { getCookies, setCookie } from 'cookies-next'
import { useSelector } from 'react-redux'
import { selectAuthState } from '@/store/authSlice'
import { FullScreenSearchBar } from '@/components/user-dashboard/FullScreenSearchBar'
import { TUserDashboardTable } from '@/components/user-dashboard/columns'
import { apiRequest } from '@/components/apis/default'
import { METHODS } from '@/lib/utils/ApiMethods'
import DataCards from '@/components/user-dashboard/DataCards'
import { ChatBox } from '@/components/user-dashboard/chatbox'
import { selectUserType } from '@/store/userSlice'
interface IndexProps {
  consent: boolean
}

interface ServerSideProps {
  res: NextApiResponse
  req: NextApiRequest
}

type ServiceAvailability = {
  availability: string
  date_created: string
  description: string
  pricing: number
  provider_id: number
  service_id: number
  service_type_id: number
  status: number
  service_image_url: string
}

type TServiceDataFromSearch = {
  status: number
  message: {
    searchResult: ServiceAvailability[]
  }
}

export default function Index({ consent }: IndexProps): JSX.Element {
  const [showChat, setShowChat] = useState(false)
  const [cookieModal, setCookieModal] = useState(false)
  const [contactInfo, setContactInfo] = useState<TUserDashboardTable>()
  const userType = useSelector(selectUserType)
  // Remove the below when unecessary -1Solon
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [query, setQuery] = useState('')
  const [serviceData, setServiceData] = useState<ServiceAvailability[]>()
  const [servicesToBeUsed, setServicesTobeUsed] = useState<TUserDashboardTable[]>([])
  const [serviceDataFromSearchInput, setServiceDataFromSearchInput] = useState<
    TServiceDataFromSearch | undefined
  >()
  const [providerName, setProviderName] = useState('')

  const serviceDataFromSearch: TUserDashboardTable[] = useMemo(() => {
    return []
  }, [])

  const regularServiceData: TUserDashboardTable[] = useMemo(() => {
    return []
  }, [])

  // Remove the below when unecessary -1Solon
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const authState = useSelector(selectAuthState)

  const getServiceData = useCallback(async () => {
    try {
      if (authState === true) {
        const serviceData = await apiRequest({ method: METHODS.GET, path: '/services' })
        setServiceData(serviceData?.message)
      }
    } catch (err) {
      console.log(err)
    }
  }, [authState, setServiceData])

  const getProviderNameFromId = async (providerId: number) => {
    try {
      const provider = await apiRequest({
        method: METHODS.GET,
        path: `/users/${String(providerId)}`,
      })
      setProviderName(provider?.message?.username)
    } catch (err) {
      console.log(err)
    }
  }

  const handleDeleteService = (service_id: string): MouseEventHandler<HTMLButtonElement> => {
    return async event => {
      try {
        // Perform your deletion logic here
        await apiRequest({
          method: METHODS.DELETE,
          path: `/services/${service_id}`,
        })
        // Optionally prevent default behavior or stop propagation
        event.preventDefault()
        event.stopPropagation()
      } catch (err) {
        console.log(err)
      }
    }
  }

  const getServicesUsingSearch = async (searchQuery: string) => {
    try {
      serviceDataFromSearch.length = 0
      regularServiceData.length = 0
      setServiceData([])
      setServicesTobeUsed([])
      setServiceDataFromSearchInput({
        message: {
          searchResult: [],
        },
        status: 0,
      })
      const serviceData = await apiRequest({ method: METHODS.GET, path: `/search/${searchQuery}` })
      if (serviceData?.status === 200 && serviceData.message) {
        setServiceDataFromSearchInput(serviceData)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (!serviceData) getServiceData()
  }, [getServiceData, serviceData])

  useEffect(() => {
    if (serviceDataFromSearchInput) {
      serviceDataFromSearchInput?.message?.searchResult?.map((service: ServiceAvailability) => {
        getProviderNameFromId(service.provider_id)
        if (
          !serviceDataFromSearch?.some(
            innerService => innerService.service_id === String(service?.service_id),
          )
        ) {
          serviceDataFromSearch?.push({
            service_id: String(service.service_id),
            provider_id: String(service?.provider_id),
            short_description: service?.description,
            provider: providerName,
            availability: service?.availability,
            pricing: String(service?.pricing),
            service_image_url: service?.service_image_url,
          })
        }
        console.log(serviceDataFromSearch)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [providerName, serviceDataFromSearch, serviceDataFromSearchInput?.message?.searchResult])

  useEffect(() => {
    serviceData?.map(service => {
      getProviderNameFromId(service.provider_id)
      regularServiceData?.push({
        service_id: String(service.service_id),
        provider_id: String(service?.provider_id),
        availability: service.availability,
        pricing: String(service.pricing),
        provider: providerName,
        short_description: service.description,
        service_image_url: service?.service_image_url,
      })
      console.log(regularServiceData)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceData])

  useEffect(() => {
    if (serviceDataFromSearch.length === 0) setServicesTobeUsed(regularServiceData)
    else setServicesTobeUsed(serviceDataFromSearch)
  }, [serviceDataFromSearch, regularServiceData, serviceDataFromSearchInput])

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
    setQuery('')
  }

  // useEffect to check user authentication and redirect if not authenticated

  const handleChatBox = () => {
    setShowChat(!showChat)
  }

  const handleClickInfoForChat = (info: TUserDashboardTable) => {
    setContactInfo(info)
  }

  return (
    // Main container for the component
    <main className="container">
      {cookieModal && (
        <Modal
          title={'Cookie Consent'}
          content={
            'This website use cookies to help you have a superior and more admissible browsing experience on the website .'
          }
          rightButton={'Decline'}
          leftButton={'Accept'}
          rightFunc={rightFunc}
          leftFunc={leftFunc}
        />
      )}

      <div className="relative h-screen">
        {showChat && <ChatBox handleChatBox={handleChatBox} contactInfo={contactInfo} />}
        <div>
          <FullScreenSearchBar
            queryData={servicesToBeUsed}
            query={query}
            setQuery={setQuery}
            fetchDataOnEnter={fetchDataOnEnter}
            toggle={servicesToBeUsed?.length > 0 ? true : false}
          />
          <DataCards
            data={servicesToBeUsed}
            userType={userType}
            handleClickInfoForChat={handleClickInfoForChat}
            clickChat={handleChatBox}
            handleDeleteService={handleDeleteService}
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
