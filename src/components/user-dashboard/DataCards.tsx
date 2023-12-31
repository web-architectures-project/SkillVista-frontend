import { MouseEventHandler } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import PlaceholderImage from '../../../public/placeholder_services.png'
import { TUserDashboardTable } from './columns'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import { selectAuthState } from '@/store/authSlice'

interface IProps {
  data: TUserDashboardTable[]
  userType: string
  clickChat: () => void
  handleClickInfoForChat: (value: TUserDashboardTable) => void
  handleDeleteService: (service_id: string) => MouseEventHandler<HTMLButtonElement> | undefined
}

export default function DataCards({
  data,
  userType,
  clickChat,
  handleClickInfoForChat,
  handleDeleteService,
}: IProps) {
  const authState = useSelector(selectAuthState)
  return (
    <div className="grid 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-7">
      {data?.map((service: TUserDashboardTable, Index: number) => (
        <Card key={Index} className="rounded-lg pb-5 ">
          <Image
            src={service?.service_image_url ? service?.service_image_url : PlaceholderImage}
            className="h-[50%] w-full rounded-t-lg"
            alt="placeholder-image"
            width={600}
            height={600}
          />
          <CardHeader className="2xl:pt-3">
            <CardTitle className="">{service?.short_description}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              <li>Provider: {service?.provider}</li>
              <li>Availability {service?.availability}</li>
              <li>Pricing: {service?.pricing}</li>
            </ul>
          </CardContent>
          {authState && (
            <CardFooter>
              <div>
                {userType === 'service_provider' ? (
                  <>
                    <div className="flex space-x-5">
                      <Button
                        onClick={() => {
                          clickChat()
                          handleClickInfoForChat(service)
                        }}
                        className="pb-2"
                      >
                        Contact
                      </Button>
                      <Button onClick={handleDeleteService(service?.service_id)}>
                        Delete Service
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <Button
                      onClick={() => {
                        clickChat()
                        handleClickInfoForChat(service)
                      }}
                    >
                      Contact
                    </Button>
                  </>
                )}
              </div>
            </CardFooter>
          )}
        </Card>
      ))}
    </div>
  )
}
