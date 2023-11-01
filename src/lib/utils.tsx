import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { getCookie, setCookie } from 'cookies-next'
import { apiRequest } from '@/components/apis/default'

interface handleTokenProps {
  token: string
}
interface handleSessionProps {
  token: string
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** cookie consent
 * True :  save in cookie & session
 * False : save in session */
export const handleToken = async ({ token }: handleTokenProps) => {
  const consent = getCookie('cookie-consent')
  if (consent) {
    //4 hours
    await setCookie('cookie-token', token, {
      expires: new Date(Number(new Date()) + 14400000),
    })
  }
  await setSession({ token })

  return true
}

export const setSession = async ({ token }: handleSessionProps) => {
  try {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: token }),
    }
    const response = await fetch('/api/auth', options)
    if (response.status !== 200) throw new Error("Can't login")
  } catch (err) {
    new Error(err)
  }
}

/** Get User Information with only cookie */
export const getUserProfile = async ({ token }: handleTokenProps) => {
  const res = await apiRequest({
    method: 'Post',
    path: `users/validate/${token}`,
    body: { token: token },
    token: token,
  })

  const userId = res.message.userId
  const userRes = await apiRequest({
    method: 'Get',
    path: `users/${userId}`,
    token: token,
  })

  const profileId = userRes.message.profileId
  const username = userRes.message.username
  const profile = await apiRequest({
    method: 'Get',
    path: `profiles/${profileId}`,
    token: token,
  })
  return {
    profile: profile?.message,
    username: username,
    profileId: profileId,
    userId: userId,
  }
}
