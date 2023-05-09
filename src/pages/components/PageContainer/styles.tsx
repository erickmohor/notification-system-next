import { styled } from '@/styles'


export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  justifyContent: 'center',
  minHeight: '100vh',
})

export const ComponentContainer = styled('div', {
  display: 'flex',
  width: '100%',
  minHeight: '100vh',
  marginLeft: '$40',
  backgroundColor: '$gray200',

  '@media(max-width: 600px)': {
    marginLeft: '$20',
  }
})