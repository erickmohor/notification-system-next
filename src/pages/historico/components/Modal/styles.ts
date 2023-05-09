import { styled } from '@/styles'

export const ModalContainer = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  top: 0,
  left: 0,
  width: '600px',
  backgroundColor: '$white',
  border: '1px solid $gray400',
  zIndex: 3,
  padding: '$5 0',
  borderRadius: '$lg',
})

export const Title = styled('h1', {
  fontWeight: '500',
  fontSize: '$lg',
  color: '$gray800',
  marginBottom: '$5',
})

export const SubTitle = styled('h1', {
  fontWeight: '500',
  fontSize: '$lg',
  color: '$gray800',
  marginBottom: '$5',
})

export const InformationContainer = styled('div', {
  width: '100%',
  padding: '0 $5',
  paddingBottom: '$5',

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
