import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'

import { PageContainer } from '../components/PageContainer'


export default function Home() {
  return (
    <PageContainer />
  )
}

export const getServerSideProps: GetServerSideProps = async(ctx) => {
  const { ['nextauth.token']: token } = parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  return {
    props: { }
  }
}