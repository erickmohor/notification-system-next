import { keyframes, styled } from '@/styles'

const spinner = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
})

export const Spinner = styled('div', {
  border: '2px solid $gray400', 
  borderTop: '2px solid $gray700',
  borderRadius: '50%',
  animation: `${spinner} 1.5s linear infinite`,

  variants: {
    size: {
      sm: {
        width: 15,
        height: 15,
      },
      md: {
        width: 30,
        height: 30,
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
})


