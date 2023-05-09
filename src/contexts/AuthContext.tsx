import { createContext, useContext, useEffect, useState } from 'react'
import Router from 'next/router'
import { destroyCookie, parseCookies, setCookie } from 'nookies'

import { api } from '@/services/api'
import * as auth from '../services/auth'


interface IAuthProvider {
  children?: React.ReactNode
}

export interface IUser {
    _id: string,
    name: string,
    email: string,
    password_hash: string,
    role: string,
    createdAt: string,
    updatedAt: string,
}

interface ISignInData {
  isSigned: boolean
  user: IUser | null
  signIn(data: auth.ISignInRequestData): Promise<void>
  signOut(): void
}

export const AuthContext = createContext<ISignInData>({} as ISignInData)

export function AuthProvider({ children }: IAuthProvider) {
  const [user, setUser] = useState<IUser | null>(null)

  useEffect(() => {
    const { 'nextauth.token': token } = parseCookies()

    if (token) {
      auth.recoverUserInformation().then(response => console.log(response))
    }

  }, [user])

  async function signIn({ email, password }: auth.ISignInRequestData) {
    const { token, user } = await auth.signIn({
      email,
      password
    })

    setCookie(undefined, 'nextauth.token', token, {
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    api.defaults.headers['Authorization'] = `Bearer ${token}`

    setUser(user)

    Router.push('/home')
  }

  async function signOut() {
    destroyCookie(undefined, 'nextauth.token')
    setUser(null)
    Router.push('/')
  }

  return (
    <AuthContext.Provider value={{ isSigned: !!user, user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  return context
}
