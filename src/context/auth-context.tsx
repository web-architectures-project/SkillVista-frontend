// src/context/auth-context.tsx
import React, { createContext, useState, ReactNode } from 'react'

interface AuthState {
  token: string
}

interface AuthContextType {
  authState: AuthState
  setAuthState: (userAuthInfo: { data: string }) => void
  isUserAuthenticated: () => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)
const { Provider } = AuthContext

interface AuthProviderProps {
  children: ReactNode
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    token: '',
  })

  const setUserAuthInfo = ({ data }: { data: string }) => {
    localStorage.setItem('token', data)

    setAuthState({
      token: data,
    })
  }

  // checks if the user is authenticated or not
  const isUserAuthenticated = () => {
    return !!authState.token
  }

  return (
    <Provider
      value={{
        authState,
        setAuthState: (userAuthInfo) => setUserAuthInfo(userAuthInfo),
        isUserAuthenticated,
      }}
    >
      {children}
    </Provider>
  )
}

export { AuthContext, AuthProvider }
