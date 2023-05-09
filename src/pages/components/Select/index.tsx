import { SelectHTMLAttributes, forwardRef } from 'react'

import { Container, ErrorMessage, Label, SelectContainer } from './styles'

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string,
  errorMessage?: string,
  selectOptions: OptionsProps[],
}

export type OptionsProps = {
  label: string,
  value: string,
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(

  function Select( {label, errorMessage, selectOptions, ...rest}: SelectProps, ref) {

    return (
      <Container>
        <SelectContainer variant={errorMessage ? 'error' : 'normal'}>
          <Label variant={errorMessage ? 'error' : 'normal'}>
            {label.toUpperCase()}
          </Label>
          <select 
            ref={ref}
            {...rest}
          >
            <option value=''>Escolher</option>
            {
              selectOptions && 
            selectOptions.map( (option: OptionsProps ) => {
              return <option key={option.value} value={option.value}>{option.label}</option>
            } )
            }
          </select>
        </SelectContainer>
        {errorMessage && <ErrorMessage> {errorMessage} </ErrorMessage>}
      </Container>
    )
  }

)