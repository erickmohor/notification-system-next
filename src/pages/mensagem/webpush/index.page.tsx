import { useState } from 'react'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'

import { z } from 'zod'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { api } from '@/services/api'

import { Header } from '../components/Header'
import { Input } from '@/pages/components/Input'
import { Button } from '@/pages/components/Button'
import { Select } from '@/pages/components/Select'
import { PageContainer } from '@/pages/components/PageContainer'
import { ButtonContainer, Container, Form } from './styles'

const maxFileSize = 5000000 // 5MB
const acceptedImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

const webPushMessageFormSchema = z.object({
  audience: z.string().nonempty('* Campo obrigatório'),
  message: z.object({
    title: z.string().nonempty('* Campo obrigatório'),
    msg: z.string().nonempty('* Campo obrigatório'),
    icon: z
      .any()
      .refine((file) => file?.[0]?.size <= maxFileSize, 'Tamanho máximo: 5MB')
      .refine(
        (file) => acceptedImageTypes.includes(file?.[0]?.type),
        'São aceitos apenas formatos .jpg, .jpeg, .png e .webp.'
      ),
    url: z.string().nonempty('* Campo obrigatório'),
  }),
},
)

type WebPushMessageFormData = z.infer<typeof webPushMessageFormSchema>


export default function WebPushMessage() {
  const [isLoading, setIsLoading] = useState(false)

  const { register, 
    formState: { errors }, 
    handleSubmit,
    reset
  } = useForm<WebPushMessageFormData>({ 
    resolver: zodResolver(webPushMessageFormSchema),
  })

  async function handleSubmitForm(data: WebPushMessageFormData) {
    setIsLoading(true)

    // Implement here the call to the API to upload the image on AWS, for example.
    // This call must return an URL
    const uploadImageResponse = 'https://www.imageurl.com' //just for test

    data.message.icon = uploadImageResponse  // for test

    const createWebPushMessageData = {
      audience: data.audience,
      message:{
        title: data.message.title,
        message: data.message.msg,
        icon: data.message.icon,
        url: data.message.url,
      }
    }

    try {
      const response = await api.post('/message/webpush', createWebPushMessageData)

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
        <Header title="Mensagem - Web Push" />

        <Form onSubmit={handleSubmit(handleSubmitForm)}>

          <Select 
            selectOptions={[{ 
              label:'Usuários cadastrados', 
              value:'subscribedUsers' 
            }]}
            label='Audiência' 
            errorMessage={errors?.audience?.message}
            {...register('audience')} 
          />

          <Input 
            type='text'
            label='Título'
            errorMessage={errors?.message?.title?.message}
            {...register('message.title')}
          />

          <Input 
            type='text'
            label='Mensagem'
            errorMessage={errors?.message?.msg?.message}
            {...register('message.msg')}
          />
          <Input 
            type='file'
            label='Imagem do ícone'
            errorMessage={errors?.message?.icon?.message?.toString()}
            {...register('message.icon')}
          />
          <Input 
            type='url'
            label='Link'
            errorMessage={errors?.message?.url?.message}
            {...register('message.url')}
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