import { useEffect, useState } from 'react'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'

import { z } from 'zod'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { api } from '@/services/api'
import { checkIfEmailIsValid } from '@/utils/validateEmail'

import { Header } from '../components/Header'
import { Input } from '@/pages/components/Input'
import { Button } from '@/pages/components/Button'
import { OptionsProps, Select } from '@/pages/components/Select'
import { PageContainer } from '@/pages/components/PageContainer'
import { ButtonContainer, Container, Form } from './styles'

type EmailTemplate = {
  name: string,
  url: string,
}

const emailMessageFormSchema = z.object({
  recipientEmails: z.string().nonempty('* Campo obrigatório'),
  template: z.string().nonempty('* Campo obrigatório'),
})

type EmailMsgFormData = z.infer<typeof emailMessageFormSchema>


export default function EmailMsg() {
  const [optionsData, setOptionsData] = useState<OptionsProps[]>([])
  const [errorMessage, setErrorMessage] = useState<string>()
  const [isLoading, setIsLoading] = useState(false)

  const { register, 
    formState: { errors }, 
    handleSubmit,
    reset
  } = useForm<EmailMsgFormData>({ 
    resolver: zodResolver(emailMessageFormSchema) 
  })

  useEffect( () => {
    async function getEmailData() {
      const { data } = await api.get('/configuration/me')

      const templates = data?.configuration?.email?.templates

      if (templates) {
        const optionsData: OptionsProps[] = []

        // For select field, it is necessary to transform 'name' to 'label' and 'url' to 'value'
        templates.map( (template: EmailTemplate) => {
          optionsData.push({
            label: template.name,
            value: template.url
          })
        })

        setOptionsData(optionsData)
      }
    }
    getEmailData()
  }, [])

  async function handleSubmitForm(data: EmailMsgFormData) {
    setIsLoading(true)

    const arrayOfRecipientEmails = data.recipientEmails.replace(/\s/g, '').split(',')

    const isArrayOfEmailsNotValid = arrayOfRecipientEmails.some( 
      recipientEmail => !checkIfEmailIsValid(recipientEmail) 
    )

    if (isArrayOfEmailsNotValid) {
      return setErrorMessage('E-mail digitado é inválido')
    }
    
    setErrorMessage('')

    const createEmailMessageData = {
      recipientEmails: arrayOfRecipientEmails,
      template: data.template
    }

    try {
      const response = await api.post('/message/email', createEmailMessageData)

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
        <Header title="Mensagem - E-mail" />

        <Form onSubmit={handleSubmit(handleSubmitForm)}>

          <Input 
            type='text' 
            label='E-mails do destinatário (separar por vírgula)' 
            errorMessage={errors?.recipientEmails?.message || errorMessage}
            {...register('recipientEmails')} 
          />
          
          <Select 
            label='Escolha um template' 
            selectOptions={optionsData}
            errorMessage={errors?.template?.message?.toString()}
            {...register('template')}
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