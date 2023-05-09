import { styled } from '@/styles'

export const Container = styled('div', {
  width: '100%',
  padding: '$8',
})

export const Form = styled('form', {
  padding: '$5 $10',
  marginTop: '$10',
  backgroundColor: '$white',
  borderRadius: '$md',
  boxShadow: '0 1px 15px rgba(0,0,0,.04), 0 1px 6px rgba(0,0,0,.04)',
})

export const InputGroup = styled('div', {
  marginBottom: '$10',
})

export const InputGroupTitle = styled('h1', {
  fontSize: '$md',
  color: '$gray700',
  fontWeight: '300',
  textDecoration: 'none',
})

export const ButtonContainer = styled('div', {
  marginTop: '$5',
})