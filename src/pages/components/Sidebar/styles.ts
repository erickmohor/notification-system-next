import { styled } from '@/styles'


export const Container = styled('aside', {
  width: '8rem',
  height: '100%',
  position: 'fixed',
  zIndex: 1,
  top: 0,
  left: 0,
  backgroundColor: '$white',
  padding: '1rem',
  transition: 'all 0.3 linear',
  textDecoration: 'none',

  ul: {
    listStyle: 'none',
  },

  a: {
    textDecoration: 'none',
  },

  '@media(max-width: 600px)': {
    width: '3rem',
  }
})

export const MenuItem = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '$4 1rem',
  borderBottom: '1px solid',
  borderColor: '$gray300',
  color: '$gray800',
  fontSize: '$sm',

  span: {
    marginTop: '$2',
  },

  '&:hover': {
    color: '$blue300',
  },


  '@media(max-width: 600px)': {
    fontSize: '$xxs',
  }
})

export const LogoContainer = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  background: 'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)',
  borderRadius: '3rem',
  padding: '1rem',
})