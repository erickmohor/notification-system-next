import { format } from 'date-fns'

interface IMessage {
  _id: string,
  userId: string,
  channel: string,
  date: Date | string,
  isSeen: boolean | string,
  origin: string,
  notification: {
    webPush: {
      audience: string,
      title: string,
      message: string,
      icon: string,
      url: string,
    },
    sms: {
      phones: string[],
      message: string,
    },
    email: {
      recipientEmails: string[],
      template: string,
    },
  },
  created_at: Date
  updated_at: Date
}

export function formatToCsvExport(data: any) {
  let messageData: any

  if (data?.length > 1) {
    messageData = JSON.parse(JSON.stringify(data))
  }
  
  if (messageData?.length > 1) {

    const content = messageData?.map( (message: IMessage) => {

      // Format message
      switch (message?.channel) {
      case 'sms':
        message.channel = 'SMS'
        break
      case 'webpush':
        message.channel = 'Web Push'
        break
      case 'email':
        message.channel = 'E-mail'
        break
      }

      switch (message?.origin) {
      case 'platform':
        message.origin = 'Plataforma'
        break
      case 'api':
        message.origin = 'API'
        break
      }

      switch (message?.isSeen) {
      case true:
        message.isSeen = 'Visualizado'
        break
      case false:
        message.isSeen = 'Não visualizado'
        break
      }

      message.date = format(new Date(message?.date), 'dd/MM/yyyy \'às\' H:mm')
      //////////////////

      return message
    } )

    return content
  }

}