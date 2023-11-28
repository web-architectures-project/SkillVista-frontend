import { withSessionRoute } from '@/lib/withSession'
import { NextApiRequest, NextApiResponse } from '../../../node_modules/next/dist/shared/lib/utils'

export default withSessionRoute(async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { token } = req.body

  req.session.token = token
  await req.session.save()
  res.send('Save session')
})
