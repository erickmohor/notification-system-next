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

const maxFileSize = 5000000 // 5MB
const acceptedImageTypes = ['text/html']

const emailConfigFormSchema = z.object({
  server: z.object({
    name: z.string().nonempty('* Campo obrigatório'),
    port: z.string().nonempty('* Campo obrigatório'),
    login: z.string().nonempty('* Campo obrigatório'),
    password: z.string().nonempty('* Campo obrigatório'),
  }),
  sender: z.object({
    name: z.string().nonempty('* Campo obrigatório'),
    email: z.string().nonempty('* Campo obrigatório'),
  }),
  templateFiles: z
    .any()
    .refine((files) => files?.length >= 1, '* Campo obrigatório')
    .refine((files) => files?.[0]?.size <= maxFileSize, 'Tamanho máximo: 5MB')
    .refine(
      (files) => acceptedImageTypes.includes(files?.[0]?.type),
      'São aceitos apenas formatos .html'
    ),
})

type EmailConfigFormData = z.infer<typeof emailConfigFormSchema>

export default function EmailConfig() {
  const [isLoading, setIsLoading] = useState(false)

  const { register, 
    formState: { errors }, 
    handleSubmit,
    reset
  } = useForm<EmailConfigFormData>({ 
    resolver: zodResolver(emailConfigFormSchema) 
  })

  useEffect( () => {
    async function getEmailData() {
      const { data } = await api.get('/configuration/me')

      if (data?.configuration?.email) {
        reset(data.configuration.email)
      }

    }
    getEmailData()
  }, [reset])

  async function handleSubmitForm(data: EmailConfigFormData) {
    setIsLoading(true)

    // Implement here the call to the API to upload the files on AWS, for example.
    // This call must return an array of objects containing name and URL

    ////////////////////////////////////////////////////////////////////
    // Just for test
    const fileListToArray = Array.prototype.slice.call(data.templateFiles)

    let uploadFilesResponse: {name: string, url: string}[] = []

    fileListToArray.map( (template) => {
      uploadFilesResponse.push({
        name: template.name.replace(/\.[^/.]+$/, ''),
        url: `https://www.template-url.com/${template.name}`
      })
    })
    //////////////////////////////////////////////////////////////////

    const emailConfigData = {
      server: data.server,
      sender: data.sender,
      templates: uploadFilesResponse,
    }

    try {
      const response = await api.put('/configuration/email', emailConfigData)

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
        <Header title="Configurações - E-mail" />

        <Form onSubmit={handleSubmit(handleSubmitForm)}>

          <InputGroup>
            <InputGroupTitle>Dados do servidor</InputGroupTitle>
            <Input 
              type='text' 
              label='Nome do Servidor SMTP' 
              errorMessage={errors?.server?.name?.message}
              {...register('server.name')} 
            />
            <Input 
              type='text'
              label='Porta de envio'
              errorMessage={errors?.server?.port?.message}
              {...register('server.port')}
            />
            <Input 
              type='text'
              label='Login'
              errorMessage={errors?.server?.login?.message}
              {...register('server.login')}
            />
            <Input 
              type='password'
              label='Senha (Por questão de segurança, senhas salvas não são mostradas)'
              errorMessage={errors?.server?.password?.message}
              {...register('server.password')}
            />
          </InputGroup>

          <InputGroup>
            <InputGroupTitle>Dados de envio</InputGroupTitle>
            <Input 
              type='text'
              label='Nome do remetente'
              errorMessage={errors?.sender?.name?.message}
              {...register('sender.name')}
            />
            <Input 
              type='text'
              label='Email do remetente'
              errorMessage={errors?.sender?.email?.message}
              {...register('sender.email')}
            />
          </InputGroup>

          <InputGroup>
            <InputGroupTitle>Submissão de templates</InputGroupTitle>
            <Input 
              type='file'
              multiple
              label='Upload de arquivos HTML'
              errorMessage={errors?.templateFiles?.message?.toString()}
              {...register('templateFiles')}
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