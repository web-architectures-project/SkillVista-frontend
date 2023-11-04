import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getCookie } from 'cookies-next'
import { getIronSession } from 'iron-session/edge'
import axios from 'axios'
import { customAxios } from './components/apis/default'

/** Maintain a login */
export const middleware = async (req: NextRequest, res: NextResponse) => {
  const token = await getCookie('cookie-token', { req, res })
  const session = await getIronSession(req, res, {
    password: 'SkillvistaSkillvistaSkillvistaSkillvistaSkillvista',
    cookieName: 'Skillvista-cookie',
  })
  if (!token && session.token) {
    customAxios.interceptors.request.use(
      async (config) => {
        config.headers.Authorization = `Bearer ${session}`
        return config
      },
      (error) => {
        return Promise.reject(error)
      },
    )
  }
}

export const config = {
  matcher: ['/user-dashboard'],
}
