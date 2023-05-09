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
const acceptedImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

const webPushConfigFormSchema = z.object({
  website: z.object({
    name: z.string().nonempty('* Campo obrigatório'),
    url: z.string().nonempty('* Campo obrigatório'),
    image: z
      .any()
      .refine((file) => file?.[0]?.size <= maxFileSize, 'Tamanho máximo: 5MB')
      .refine(
        (file) => acceptedImageTypes.includes(file?.[0]?.type),
        'São aceitos apenas formatos .jpg, .jpeg, .png e .webp.'
      ),
  }),
  permissionMessage: z.object({
    msg: z.string().nonempty('* Campo obrigatório'),
    allowButtonText: z.string().nonempty('* Campo obrigatório'),
    denyButtonText: z.string().nonempty('* Campo obrigatório'),
  }),
  welcome: z.object({
    title: z.string().nonempty('* Campo obrigatório'),
    msg: z.string().nonempty('* Campo obrigatório'),
    enableUrl: z.boolean(),
    url: z.string(),
  }),
},
)

type WebPushConfigFormData = z.infer<typeof webPushConfigFormSchema>

export default function WebPushConfig() {
  const [isLoading, setIsLoading] = useState(false)

  const { register, 
    formState: { errors }, 
    handleSubmit,
    reset
  } = useForm<WebPushConfigFormData>({ 
    resolver: zodResolver(webPushConfigFormSchema),
  })

  useEffect( () => {
    async function getWebPushData() {
      const { data } = await api.get('/configuration/me')

      if (data?.configuration?.webPush) {
        reset(data.configuration.webPush)
      }

    }
    getWebPushData()
  }, [reset])

  async function handleSubmitForm(data: WebPushConfigFormData) {
    setIsLoading(true)
    
    // Implement here the call to the API to upload the image on AWS, for example.
    // This call must return an URL
    const uploadImageResponse = 'https://www.imageurl.com' //just for test

    const webPushConfigData = {
      website: {
        name: data.website.name,
        url: data.website.url,
        imageUrl: uploadImageResponse,
      },
      permissionMessage: data.permissionMessage,
      welcome: data.welcome,
    }

    try {
      const response = await api.put('/configuration/webpush', webPushConfigData)

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
        <Header title="Configurações - Web Push" />

        <Form onSubmit={handleSubmit(handleSubmitForm)}>

          <InputGroup>
            <InputGroupTitle>Dados</InputGroupTitle>
            <Input 
              type='text' 
              label='Nome do site que irá enviar a notificação' 
              errorMessage={errors?.website?.name?.message}
              {...register('website.name')} 
            />
            <Input 
              type='url'
              label='Endereço do site que irá enviar a notificação'
              errorMessage={errors?.website?.url?.message}
              {...register('website.url')}
            />
            <Input 
              type='file'
              label='Imagem do ícone do site'
              errorMessage={errors?.website?.image?.message?.toString()}
              {...register('website.image')}
            />
          </InputGroup>

          <InputGroup>
            <InputGroupTitle>Notificação de Permissão</InputGroupTitle>
            <Input 
              type='text'
              label='Mensagem'
              errorMessage={errors?.permissionMessage?.msg?.message}
              {...register('permissionMessage.msg')}
            />
            <Input 
              type='text'
              label='Texto do botão Permitir'
              errorMessage={errors?.permissionMessage?.allowButtonText?.message}
              {...register('permissionMessage.allowButtonText')}
            />
            <Input 
              type='text'
              label='Texto do botão Negar'
              errorMessage={errors?.permissionMessage?.denyButtonText?.message}
              {...register('permissionMessage.denyButtonText')}
            />
          </InputGroup>

          <InputGroup>
            <InputGroupTitle>Notificação de Boas Vindas</InputGroupTitle>
            <Input 
              type='text'
              label='Título'
              errorMessage={errors?.welcome?.title?.message}
              {...register('welcome.title')}
            />
            <Input 
              type='text'
              label='Mensagem'
              errorMessage={errors?.welcome?.msg?.message}
              {...register('welcome.msg')}
            />
            <Input 
              type='checkbox'
              label='Habilitar link de destino, ao clicar na notificação'
              errorMessage={errors?.welcome?.enableUrl?.message}
              {...register('welcome.enableUrl')} 
            />
            <Input
              type='url'
              label='Endereço do link de destino'
              errorMessage={errors?.welcome?.url?.message}
              {...register('welcome.url')}
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