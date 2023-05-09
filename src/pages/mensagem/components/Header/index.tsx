import Link from 'next/link'
import { 
  Container, 
  MenuContainer, 
  MenuItem, 
  MenuTitle, 
  Title, 
  TitleContainer 
} from './styles'

type Props = {
  title: string,
}

export function Header({ title }: Props) {
  return (
    <Container>
      <TitleContainer>
        <Title>{ title }</Title>
      </TitleContainer>

      <MenuContainer>
        <ul>
          <MenuTitle>Menu: </MenuTitle>
          <li>
            <Link href='/mensagem/webpush'>
              <MenuItem>Web Push</MenuItem>
            </Link>
          </li>
          <li>
            <Link href='/mensagem/email'>
              <MenuItem>E-mail</MenuItem>
            </Link>
          </li>
          <li>
            <Link href='/mensagem/sms'>
              <MenuItem>SMS</MenuItem>
            </Link>
          </li>
        </ul>
      </MenuContainer>
    </Container>
  )
}