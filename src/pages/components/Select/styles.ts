import { styled } from '@/styles'

export const Container = styled('div', {
  margin: '$2 0',
})

export const SelectContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  backgroundColor: '$white',
  borderRadius: '2px',
  boxSizing: 'border-box',
  border: '1px solid $gray400',
  cursor: 'text',
  padding: '$2 $2',

  select: {
    padding: '$1',
    border: '1px solid $gray400',
    color: '$gray700',
  },

  '&:has(input:focus)': {
    borderColor: '$blue300'
  },
  '&:has(input:disabled)': {
    opacity: 0.5,
    cursor: 'not-allowed'
  },

  variants: {
    variant: {
      error: {
        border: '1px solid $red300',

        '&:has(input:focus)': {
          borderColor: '$red300'
        },
      },
      normal: {

      },
      checkbox: {
        flexDirection: 'row',
        paddingTop: '$4',
        gap: '$1',
      },
    },
  },

})

export const Label = styled('label', {
  fontSize: '$xxs',
  color: '$gray500',
  marginBottom: '$2',

  variants: {
    variant: {
      error: {
        color: '$red300',
      },
      normal: {
      },
    },
  },
})

export const ErrorMessage = styled('div', {
  fontSize: '$xs',
  color: '$red300',
  marginTop: '$1',
  marginBottom: '$5',
})