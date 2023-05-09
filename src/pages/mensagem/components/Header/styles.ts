import { styled } from '@/styles'

export const Container = styled('div', {
})

export const TitleContainer = styled('div', {
  padding: '$4 0',
  borderBottom: '1px solid',
  borderBottomColor: '$gray400',
})

export const Title = styled('h1', {
  fontSize: '$2xl',
  color: '$gray700',
  fontWeight: '300',
})

export const MenuContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  padding: '$4 0',
  borderBottom: '1px solid',
  borderBottomColor: '$gray400',
  textDecoration: 'none',

  ul: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'row',
  },

  li: {
    display: 'flex',
    flexDirection: 'row',
    paddingRight: '$2',
  },
  
  'li:after': {
    content: '|',
    paddingLeft: '$2',
  },

  a: {
    textDecoration: 'none',
  },
})

export const MenuTitle = styled('h2', {
  fontSize: '$md',
  color: '$gray700',
  fontWeight: '300',
  paddingRight: '$2',
})

export const MenuItem = styled('h1', {
  fontSize: '$md',
  color: '$gray700',
  fontWeight: '300',
  textDecoration: 'none',

  '&:hover': {
    color: '$blue300',
  },
})