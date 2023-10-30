import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextApiHandler,
} from 'next'
import { withIronSessionApiRoute, withIronSessionSsr } from 'iron-session/next'

declare module 'iron-session' {
  interface IronSessionData {
    token: string
  }
}

export const sessionOptions = {
  password: 'SkillvistaSkillvistaSkillvistaSkillvistaSkillvista',
  cookieName: 'Skillvista-cookie',
}

export function withSessionRoute(handler: NextApiHandler) {
  return withIronSessionApiRoute(handler, sessionOptions)
}

export function withSessionSsr<
  P extends { [key: string]: unknown } = { [key: string]: unknown }
>(
  handler: ({
    req,
    res,
  }: GetServerSidePropsContext) =>
    | GetServerSidePropsResult<P>
    | Promise<GetServerSidePropsResult<P>>,
) {
  return withIronSessionSsr(handler, sessionOptions)
}
