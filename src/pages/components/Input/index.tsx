import { ForwardedRef, InputHTMLAttributes, forwardRef } from 'react'

import { TextInput, Container, Label, ErrorMessage, InputContainer } from './styles'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string,
  errorMessage?: string,
}


export const Input = forwardRef<HTMLInputElement, InputProps>(

  function Input( {label, errorMessage, type, ...rest}: InputProps, ref) {

    if (type==='checkbox') {
      return CheckBoxInput({label, errorMessage, type, ...rest}, ref)
    }

    return (
      <Container>
        <InputContainer variant={errorMessage ? 'error' : 'normal'}>
          <Label variant={errorMessage ? 'error' : 'normal'}>
            {label.toUpperCase()}
          </Label>
          <TextInput 
            variant='text'
            ref={ref}
            type={type}
            {...rest}
          />
        </InputContainer>
        {errorMessage && <ErrorMessage> {errorMessage} </ErrorMessage>}
      </Container>
    )
  }

)

function CheckBoxInput({label, errorMessage, type, ...rest}: InputProps, ref: ForwardedRef<HTMLInputElement>) {
  return (
    <Container>
      <InputContainer variant='checkbox' >
        <TextInput 
          ref={ref}
          type={type}
          {...rest}
        />
        <Label>{label.toUpperCase()}</Label>
      </InputContainer>
      {errorMessage && <ErrorMessage> {errorMessage} </ErrorMessage>}
    </Container>
  ) 
}