import { styled } from '@/styles'

export const Container = styled('button', {
  all: 'unset',
  minWidth: 120,
  height: 46,
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '$full',
  fontSize: '$sm',
  fontWeight: '$medium',
  textAlign: 'center',
  padding: '0 $4',
  gap: '$2',
  cursor: 'pointer',
  svg: {
    width: '$4',
    height: '$4'
  },
  '&:disabled, &[aria-disabled=true]': {
    cursor: 'not-allowed',
    pointerEvents: 'none'
  },
  '&:focus': {
    boxShadow: '0 0 0 2px $colors$gray100'
  },
  variants: {
    variant: {
      primary: {
        color: '$white',
        background: '$blue300',
        '&:not(:disabled):hover': {
          background: '$blue500'
        },
        '&:disabled, &[aria-disabled=true]': {
          backgroundColor: '$gray200',
          border: '1px solid $gray400'
        }
      },
      secondary: {
        color: '$blue300',
        border: '2px solid $blue300',
        '&:not(:disabled):hover': {
          background: '$blue300',
          color: '$white'
        },
        '&:disabled, &[aria-disabled=true]': {
          color: '$gray200',
          borderColor: '$gray200'
        }
      },
    },
  },
  defaultVariants: {
    variant: 'primary',
  }
})