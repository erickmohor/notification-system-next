import { useEffect, useState } from 'react'
import { GetServerSideProps } from 'next'

import { z } from 'zod'
import { parseCookies } from 'nookies'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { api } from '@/services/api'
import { PageContainer } from '@/pages/components/PageContainer'
import { Button } from '@/pages/components/Button'
import { Input } from '@/pages/components/Input'
import { Header } from '../components/Header'
import { ButtonContainer, Container, Form, InputGroup, InputGroupTitle } from './styles'


const smsConfigFormSchema = z.object({
  provider: z.string().nonempty('* Campo obrigatório'),
  login: z.string().nonempty('* Campo obrigatório'),
  password: z.string(),
})

type SmsConfigFormData = z.infer<typeof smsConfigFormSchema>


export default function SmsConfig() {
  const [isLoading, setIsLoading] = useState(false)

  const { register, 
    formState: { errors }, 
    handleSubmit,
    reset
  } = useForm<SmsConfigFormData>({ 
    resolver: zodResolver(smsConfigFormSchema),
  })

  useEffect( () => {
    async function getSmsData() {
      const { data } = await api.get('/configuration/me')

      if (data?.configuration?.sms) {
        reset(data.configuration.sms)
      }

    }
    getSmsData()
  }, [reset])

  async function handleSubmitForm(data: SmsConfigFormData) {
    setIsLoading(true)

    try {
      const response = await api.put('/configuration/sms', data)

      if (response.status === 200 || 201) {
        return toast.success('Configuração salva com sucesso!')
      }
      
      toast.error('Erro ao salvar!')
    } catch (error) {
      toast.error('Erro ao salvar!')
    } finally {
      setIsLoading(false)
    }

  }

  return (
    <PageContainer>

      <Container>
        <Header title="Configurações - SMS" />

        <Form onSubmit={handleSubmit(handleSubmitForm)}>

          <InputGroup>
            <InputGroupTitle>Dados</InputGroupTitle>
            <Input 
              type='text' 
              label='Provedor de SMS integrado' 
              errorMessage={errors?.provider?.message}
              {...register('provider')} 
            />
            <Input 
              type='text'
              label='Login'
              errorMessage={errors?.login?.message}
              {...register('login')}
            />
            <Input 
              type='password'
              label='Senha (Por questão de segurança, senhas salvas não são mostradas)'
              errorMessage={errors?.password?.message}
              {...register('password')}
            />
          </InputGroup>

          <ButtonContainer>
            <Button 
              name='Salvar' 
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