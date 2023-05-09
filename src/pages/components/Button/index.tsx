import { ButtonHTMLAttributes } from 'react'

import { Container } from './styles'
import { Loading } from '../Loading'

type InputProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  name: string,
  loading?: boolean,
  variant?: 'primary' | 'secondary'
}

export function Button( {name, loading = false, ...rest}: InputProps) {
  return (
    <Container {...rest}>
      {loading ? <Loading size='sm' />: name}
    </Container>
  )
}