import { Container, Title, TitleContainer } from './styles'

type Props = {
  title: string,
}

export function Header({ title }: Props) {
  return (
    <Container>
      <TitleContainer>
        <Title>{ title }</Title>
      </TitleContainer>
    </Container>
  )
}