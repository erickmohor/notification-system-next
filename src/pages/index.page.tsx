import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import { PageContainer } from './components/PageContainer'


export default function Main() {
  return (
    <PageContainer />
  )
}

export const getServerSideProps: GetServerSideProps = async(ctx) => {
  const { ['nextauth.token']: token } = parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }

  return  {
    redirect: {
      destination: '/home',
      permanent: false,
    }
  }
}