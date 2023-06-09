import type { AppProps } from 'next/app'

import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import 'react-datepicker/dist/react-datepicker.css'

import { AuthProvider } from '@/contexts/AuthContext'

import { globalStyles } from '@/styles/globals'
import Head from 'next/head'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Head>
        <title>Sistema de Notificação</title>
      </Head>
      <Component {...pageProps} />
      <ToastContainer 
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </AuthProvider>
  )
}
