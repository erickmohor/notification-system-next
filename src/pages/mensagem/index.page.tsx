import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'

import { Header } from './components/Header'
import { PageContainer } from '../components/PageContainer'
import { Container } from './styles'


export default function Message() {
  return (
    <PageContainer>

      <Container>
        <Header title="Mensagem" />
      </Container>
      
    </PageContainer>
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