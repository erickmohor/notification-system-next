import { useState } from 'react'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'

import { z } from 'zod'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { api } from '@/services/api'
import { checkIfPhoneNumberIsValid } from '@/utils/validatePhoneNumber'

import { Header } from '../components/Header'
import { Input } from '@/pages/components/Input'
import { Button } from '@/pages/components/Button'
import { PageContainer } from '@/pages/components/PageContainer'

import { ButtonContainer, Container, Form } from './styles'


const smsConfigFormSchema = z.object({
  phones: z.string().nonempty('* Campo obrigatório'),
  message: z.string().nonempty('* Campo obrigatório'),
})

type SmsConfigFormData = z.infer<typeof smsConfigFormSchema>


export default function SmsConfig() {
  const [errorMessage, setErrorMessage] = useState<string>()
  const [isLoading, setIsLoading] = useState(false)

  const { register, 
    formState: { errors }, 
    handleSubmit,
    reset
  } = useForm<SmsConfigFormData>({ 
    resolver: zodResolver(smsConfigFormSchema),
  })

  async function handleSubmitForm(data: SmsConfigFormData) {
    setIsLoading(true)

    const arrayOfPhones = data.phones.replace(/-/g, '').replace(/\s/g, '').split(',')

    const isArrayOfPhonesNotValid = arrayOfPhones.some( 
      phone => !checkIfPhoneNumberIsValid(phone) 
    )

    if (isArrayOfPhonesNotValid) {
      return setErrorMessage('Telefone digitado é inválido')
    }
    
    setErrorMessage('')

    const createSmsMessageData = {
      phones: arrayOfPhones,
      message: data.message
    }

    try {
      const response = await api.post('/message/sms', createSmsMessageData)

      if (response.status === 201) {
        reset()
        return toast.success('Mensagem enviada com sucesso!')
      }
      
      toast.error('Erro ao enviar a mensagem!')
    } catch (error) {
      toast.error('Erro ao enviar a mensagem!')
    } finally {
      setIsLoading(false)
    }
    
  }

  return (
    <PageContainer>

      <Container>
        <Header title="Mensagem - SMS" />

        <Form onSubmit={handleSubmit(handleSubmitForm)}>

          <Input 
            type='text' 
            label='Telefones (separar por vírgula)' 
            errorMessage={errors?.phones?.message || errorMessage}
            {...register('phones')} 
          />
          <Input 
            type='text'
            label='Mensagem'
            errorMessage={errors?.message?.message}
            {...register('message')}
          />

          <ButtonContainer>
            <Button 
              name='Enviar' 
              variant='primary' 
              type='submit' 
              loading={isLoading}
              disabled={isLoading}
            />
          </ButtonContainer>

        </Form>

      </Container>
    </PageContainer>
  )
}

export const getServerSideProps: GetServerSideProps = async(ctx) => {
  const { ['nextauth.token']: token } = parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  return {
    props: { }
  }
}