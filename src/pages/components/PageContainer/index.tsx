import Sidebar from '@/pages/components/Sidebar'
import { ComponentContainer, Container } from './styles'

interface IPageProps {
  children?: React.ReactNode
}

export function PageContainer({ children }: IPageProps) {
  return (
    <Container>

      <Sidebar />

      <ComponentContainer>
        {children}
      </ComponentContainer>

    </Container>
  )
}