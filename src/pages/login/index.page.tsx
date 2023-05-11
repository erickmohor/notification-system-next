import { useContext, useState } from 'react'
import Image from 'next/image'

import { z } from 'zod'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { AuthContext } from '@/contexts/AuthContext'

import { Button } from '../components/Button'
import { Input } from '../components/Input'
import { Container, Form, FormContainer, LogoContainer } from './styles'
import logoImg from '../../assets/logo.svg'


const LoginFormSchema = z.object({
  email: z.string().email('E-mail inválido').nonempty('* Campo obrigatório'),
  password: z.string().min(6, 'A senha deve conter no mínimo 6 caracteres').nonempty('* Campo obrigatório'),
})

type LoginFormData = z.infer<typeof LoginFormSchema>

export default function Login() {
  const [isLoading, setIsLoading] = useState(false)

  const { register, 
    formState: { errors }, 
    handleSubmit } = useForm<LoginFormData>({ 
      resolver: zodResolver(LoginFormSchema),
    })

  const { signIn } = useContext(AuthContext)

  async function handleSignIn(data: LoginFormData) {
    setIsLoading(true)
    try {
      await signIn(data)
    } catch (error: any) {

      setIsLoading(false)

      if (error?.response?.data?.message === 'Invalid Credentials.') {
        return toast.error('Credenciais inválidas.')
      }

      toast.error('Erro ao efetuar o login')
    }
  }

  return (
    <Container>
      <FormContainer>
        <LogoContainer>
          <Image src={logoImg} alt='' />
        </LogoContainer>
        <Form onSubmit={handleSubmit(handleSignIn)}>
          <Input 
            type='email' 
            label='E-mail: ' 
            errorMessage={errors?.email?.message}
            {...register('email')} 
          />
          <Input 
            type='password' 
            label='Senha: ' 
            errorMessage={errors?.password?.message}
            {...register('password')} 
          />
          <Button name='Entrar' type='submit' loading={isLoading} disabled={isLoading} />
        </Form>

        <span>* Para testes:</span>
        <span>E-mail: teste@vibbra.com.br</span>
        <span>Senha: vibbra123</span>
      </FormContainer>
    </Container>
  )
}