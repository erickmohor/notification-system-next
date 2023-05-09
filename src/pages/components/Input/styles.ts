import { styled } from '@/styles'

export const Container = styled('div', {
  width: '100%',
  margin: '$2 0',
})

export const InputContainer = styled('div', {
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

  'input[type=file]::file-selector-button': {
    backgroundColor: '$gray300',
    borderRadius: '2px',
    border: '1px solid $gray500',
    padding: '$1 $2',
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

export const TextInput = styled('input', {
  fontSize: '$sm',
  color: '$gray700',
  fontWeight: 'regular',
  background: 'transparent',
  border: 0,

  '&:focus': {
    outline: 0
  },
  '&:disabled': {
    cursor: 'not-allowed'
  },
  '&::placeholder': {
    color: '$gray500'
  },

  '&:-webkit-autofill': {
    transition: 'background-color 5000s ease-in-out 0s',
    '-webkit-text-fill-color': '#3A3A3A',
  },

  variants: {
    variant: {
      text: {
        width: '100%',
      },
    },
  },

})