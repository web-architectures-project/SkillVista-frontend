import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { TUserDashboardTable } from './columns'
import { useSelector } from 'react-redux'
import { selectAuthState } from '@/store/authSlice'
import { Button } from '../ui/button'

interface IProps {
  data: TUserDashboardTable[]
}

export default function DataCards({ data }: IProps) {
  const authState = useSelector(selectAuthState)
  console.log(authState)

  return (
    <div className="grid grid-cols-4 gap-7">
      {data?.map((service, Index) => (
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
          <CardFooter>
            <div>
              {true ? (
                <>
                  <div className="flex space-x-5">
                    <Button>Add Service</Button>
                    <Button>Delete Service</Button>
                  </div>
                </>
              ) : (
                <>
                  <Button>Contact</Button>
                </>
              )}
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
