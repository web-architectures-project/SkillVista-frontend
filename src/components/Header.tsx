import Link from 'next/link'
import { useEffect, useState } from 'react'
import { selectAuthState, setAuthState } from '@/store/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCookie, getCookie } from 'cookies-next'

const Header = () => {
  const [toggle, setToggle] = useState(false)
  const dispatch = useDispatch()
  const authState = useSelector(selectAuthState)

  /** Detect cookie when user leave and come back to the website */
  useEffect(() => {
    const token = getCookie('cookie-token')
    if (token) {
      dispatch(setAuthState(true))
    }
  }, [])

  const handleToggle = () => {
    setToggle((toggle) => !toggle)
  }
  const handleLogout = () => {
    dispatch(setAuthState(false))
    deleteCookie('cookie-token')
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: null }),
    }
    fetch('/api/auth', options)
  }

  return (
    <header className="flex items-center justify-between flex-wrap py-4 px-6 sticky top-0 ">
      <div className="flex items-center flex-shrink-0  mr-6">
        <Link
          href="/user-dashboard"
          className="font-semibold text-2xl tracking-tight text-mainblue"
        >
          SkillVista
        </Link>
      </div>
      <div>
        <div className="flex items-center w-auto lg:hidden">
          <button
            type="button"
            className="flex items-center px-3 py-2 border rounded fill-mainblue"
            onClick={() => handleToggle()}
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path stroke="currentColor" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>
      </div>

      <div className="items-center w-auto hidden md:flex ">
        <div className="lg:flex-grow text-end">
          <Link href="/user-login" className=" inline-block  mr-4">
            Become a Provider
          </Link>
          {authState ? (
            <div
              onClick={() => handleLogout()}
              className=" lg:inline-block mr-4 font-bold  px-2 py-1"
            >
              Logout
            </div>
          ) : (
            <>
              <Link href="/user-login" className=" inline-block  mr-4">
                Login
              </Link>
              <Link
                href="/user-registration"
                className=" lg:inline-block mr-4 font-bold border border-mainblue rounded px-2 py-1"
              >
                Join
              </Link>
            </>
          )}
        </div>
      </div>

      {toggle && (
        <div className="md:flex lg:items-center md:w-auto w-full block items-center">
          <div className="lg:flex-grow text-end">
            <Link
              href="/user-login"
              className="block mt-4 lg:inline-block lg:mt-0 mr-4"
            >
              Become a Provider
            </Link>
            {authState ? (
              <Link
                href="/user-registration"
                className="block mt-4 lg:inline-block lg:mt-0 mr-4 "
              >
                Logout
              </Link>
            ) : (
              <>
                <div
                  onClick={() => handleLogout()}
                  className="block mt-4 lg:inline-block lg:mt-0 mr-4"
                >
                  Login
                </div>
                <Link
                  href="/user-registration"
                  className="block mt-4 lg:inline-block lg:mt-0 mr-4 "
                >
                  Join
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
