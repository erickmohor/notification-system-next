import { format } from 'date-fns'

import { IMessage } from '../../index.page'
import { Button } from '@/pages/components/Button'
import { InformationContainer, ModalContainer, SubTitle, Title } from './styles'


type ModalProps = {
  data : IMessage,
  showModal : boolean
  closeModal : () => void
}


export function Modal({ data, showModal, closeModal }: ModalProps) {
  console.log(data)
  return (
    <ModalContainer>
      <Title>Informações</Title>
      <InformationContainer>
        <h1>Canal de envio</h1>
        <span>{data?.channel}</span>
      </InformationContainer>

      <InformationContainer>
        <h1>Data de envio</h1>
        <span>{format(new Date(data?.date), 'dd/MM/yyyy \'às\' H:m')}</span>
      </InformationContainer>

      <InformationContainer>
        <h1>Confirmação de leitura</h1>
        <span>{data?.isSeen ? 'Mensagem visualizada' : 'Mensagem não visualizada'}</span>
      </InformationContainer>

      {
        data?.notification?.webPush?.audience && (
          <>
            <SubTitle>
            Web Push
            </SubTitle>

            <InformationContainer>
              <h1>Audiência</h1>
              <span>{data?.notification?.webPush?.audience === 'subscribedUsers' ? 'Usuários cadastrados' : 'Outros'}</span>
            </InformationContainer>

            <InformationContainer>
              <h1>Título</h1>
              <span>{data?.notification?.webPush?.title}</span>
            </InformationContainer>

            <InformationContainer>
              <h1>Mensagem</h1>
              <span>{data?.notification?.webPush?.message}</span>
            </InformationContainer>

            <InformationContainer>
              <h1>Ícone</h1>
              <span>{data?.notification?.webPush?.icon}</span>
            </InformationContainer>

            <InformationContainer>
              <h1>Link</h1>
              <span>{data?.notification?.webPush?.url}</span>
            </InformationContainer>
          </>
        )
      }

      {
        data?.notification?.sms?.message && (
          <>
            <SubTitle>
            SMS
            </SubTitle>

            <InformationContainer>
              <h1>Telefones</h1>
              {
                data?.notification?.sms?.phones.map( phone => {
                  return (<span key={phone}>{phone}, </span>)
                }
                )
              }
            </InformationContainer>

            <InformationContainer>
              <h1>Mensagem</h1>
              <span>{data?.notification?.sms?.message}</span>
            </InformationContainer>
          </>
        )
      }
      
      {
        data?.notification?.email?.template && (
          <>
            <SubTitle>
          E-mail
            </SubTitle>

            <InformationContainer>
              <h1>E-mails dos destinatários:</h1>
              {
                data?.notification?.email?.recipientEmails.map( email => {
                  return (<span key={email}>{email}, </span>)
                }
                )
              }
            </InformationContainer>

            <InformationContainer>
              <h1>Template</h1>
              <span>{data?.notification?.email?.template}</span>
            </InformationContainer>
          </>
        )
      }

      <Button 
        name='Fechar'
        variant='secondary'
        onClick={() => closeModal()}
      />
    </ModalContainer>
  )

}