import { Spinner } from './styles'

type LoadingProps =  {
  size?: 'sm' | 'md',
}

export function Loading({ size }: LoadingProps) {
  return (
    <Spinner size={size} />
  )
}