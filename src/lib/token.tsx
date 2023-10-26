import { getCookie } from 'cookies-next'

export const token = getCookie('auth-token')
