import { styled } from '@/styles'

export const ModalContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'auto',

  height: '100%',
  width: '50%',
  padding: '$5 0',
  
  backgroundColor: '$white',
  border: '1px solid $gray400',
  borderRadius: '$lg',
})

export const Title = styled('h1', {
  display: 'flex',
  justifyContent: 'center',

  fontWeight: '500',
  fontSize: '$lg',
  color: '$gray800',
  margin: '$5 0',
})

export const SubTitle = styled('h1', {
  display: 'flex',
  justifyContent: 'center',
  margin: '$5 0',

  fontWeight: '500',
  fontSize: '$lg',
  color: '$gray800',
})

export const InformationContainer = styled('div', {
  padding: '$2 $5 $5 $5',

  h1: {
    marginBottom: 0,
    fontWeight: '500',
    fontSize: '$md',
    color: '$gray800',
  },

  span: {
    fontSize: '$sm',
    color: '$gray500',
  }
})

export const ButtonContainer = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  marginTop: '$4'
})