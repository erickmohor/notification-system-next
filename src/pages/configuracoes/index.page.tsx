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
import { Header } from './components/Header'
import { ButtonContainer, Container, Form, InputGroup, InputGroupTitle } from './styles'


const applicationConfigFormSchema = z.object({
  name: z.string().nonempty('* Campo obrigatório'),
  channels: z.object({
    email: z.boolean(),
    sms: z.boolean(),
    webpush: z.boolean(),
  }),
})

type ApplicationConfigFormData = z.infer<typeof applicationConfigFormSchema>


export default function Configurations() {
  const [isLoading, setIsLoading] = useState(false)

  const { register, 
    formState: { errors }, 
    handleSubmit,
    reset
  } = useForm<ApplicationConfigFormData>({ resolver: zodResolver(applicationConfigFormSchema) })

  useEffect( () => {
    async function getApplicationData() {
      const { data } = await api.get('/configuration/me')

      if (data?.configuration?.application) {
        reset(data.configuration.application)
      }

    }
    getApplicationData()
  }, [reset])

  async function handleSubmitForm(data: ApplicationConfigFormData) {
    setIsLoading(true)

    try {
      const response = await api.put('/configuration/application', data)

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
        <Header title="Configurações" />

        <Form onSubmit={handleSubmit(handleSubmitForm)}>

          <InputGroup>
            <InputGroupTitle>Dados da Aplicação</InputGroupTitle>
            <Input 
              type='text' 
              label='Nome do aplicativo' 
              errorMessage={errors?.name?.message}
              {...register('name')} 
            />
          </InputGroup>

          <InputGroup>
            <InputGroupTitle>Canais desejados de integração</InputGroupTitle>
            <Input 
              type='checkbox'
              label='Email'
              errorMessage={errors?.channels?.email?.message}
              {...register('channels.email')}
            />
            <Input 
              type='checkbox'
              label='Sms'
              errorMessage={errors?.channels?.sms?.message}
              {...register('channels.sms')}
            />
            <Input 
              type='checkbox'
              label='Web Push'
              errorMessage={errors?.channels?.webpush?.message}
              {...register('channels.webpush')}
            />

          </InputGroup>

          <ButtonContainer>
            <Button name='Salvar' variant='primary' type='submit' loading={isLoading} disabled={isLoading} />
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