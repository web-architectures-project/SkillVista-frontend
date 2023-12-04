import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { TUserDashboardTable } from './columns'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import { selectAuthState } from '@/store/authSlice'

interface IProps {
  data: TUserDashboardTable[]
  userType: string
  clickChat: () => void
  handleClickInfoForChat: (value: TUserDashboardTable) => void
}

export default function DataCards({ data, userType, clickChat, handleClickInfoForChat }: IProps) {
  const authState = useSelector(selectAuthState)
  return (
    <div className="grid grid-cols-4 gap-7">
      {data?.map((service: TUserDashboardTable, Index: number) => (
        <Card key={Index}>
          <CardHeader>
            <CardTitle>Service</CardTitle>
            <CardDescription>Type of servide: {service?.short_description}</CardDescription>
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
                      >
                        Contact
                      </Button>
                      <Button>Delete Service</Button>
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
