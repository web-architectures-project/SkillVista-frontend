import { withSessionRoute } from '@/lib/withSession'
import {
  NextApiRequest,
  NextApiResponse,
} from '../../../node_modules/next/dist/shared/lib/utils'

export default withSessionRoute(async function handler(
  req: NextApiRequest | any,
  res: NextApiResponse | any,
) {
  const { email } = req.body

  req.session.email = email
  req.session.isLoggedIn = true
  await req.session.save()
  res.send('Save session')
})
