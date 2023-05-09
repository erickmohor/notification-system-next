import { styled } from '@/styles'

export const Container = styled('div',{
  width: '100vw',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

export const FormContainer = styled('div',{
  width: '600px',
  height: '400px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '$white',
  borderRadius: '$md',
  boxShadow: '0 1px 15px rgba(0,0,0,.04), 0 1px 6px rgba(0,0,0,.04)',

  span: {
    fontWeight: '500',
    fontSize: 'sm',
  }
})

export const Form = styled('form',{
  width: '70%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '$5 0',
})

export const LogoContainer = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  background: 'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)',
  borderRadius: '3rem',
  padding: '1rem',
})
