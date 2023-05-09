import { useContext } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { ArrowRight, ChatText, Gear, Article, Icon, SignOut } from 'phosphor-react'

import { AuthContext } from '@/contexts/AuthContext'

import logoImg from '../../../assets/logo.svg'
import { Container, LogoContainer, MenuItem } from './styles'

interface IMenuItems {
  name: string,
  link: string,
  icon: Icon,
}

const menuItems: IMenuItems[] = [
  {
    name: 'Início',
    link: '/home',
    icon: ArrowRight,
  },
  {
    name: 'Mensagem',
    link: '/mensagem',
    icon: ChatText,
  },
  {
    name: 'Histórico',
    link: '/historico',
    icon: Article,
  },
  {
    name: 'Configurações',
    link: '/configuracoes',
    icon: Gear,
  },
]

export default function Sidebar() {
  const { signOut } = useContext(AuthContext)
  
  return (
    <Container>
      <LogoContainer>
        <Image src={logoImg} alt='' />
      </LogoContainer>

      <ul>
        {
          menuItems.map( ({name, link, icon: Icon}: IMenuItems) => (
            <li key={name}>
              <Link href={link}>
                <MenuItem>
                  <Icon size={25} />
                  <span>{name}</span>
                </MenuItem>
              </Link>
            </li>
          ))
        }
        <li key='Sair'>
          <Link href='' onClick={() => signOut()}>
            <MenuItem>
              <SignOut size={25} />
              <span>Sair</span>
            </MenuItem>
          </Link>
        </li>
      </ul>
    </Container>
  )
}
