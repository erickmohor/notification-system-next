// @ts-nocheck
import { format } from 'date-fns'
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'

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

export function pdfExport(data: any) {
  (<any>pdfMake).vfs = pdfFonts.pdfMake.vfs

  const content = data.map( (message: IMessage) => {
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

    message.date = format(new Date(message?.date), 'dd/MM/yyyy \'às\' H:m')
    //////////////////


    return [
      {text: message.channel, fontSize: 9, margin: [0,2,0,2]},
      {text: message.origin, fontSize: 9, margin: [0,2,0,2]},
      {text: message.isSeen, fontSize: 9, margin: [0,2,0,2]},
      {text: message.date, fontSize: 9, margin: [0,2,0,2]}
    ]
  } )

  const details = [
    {text: 'Histórico de Mensagens', fontSize: 14, bold: true, margin: [0, 20, 0, 25]},
    {
      table: {
        headerRows: 1,
        widths: ['*', '*', '*', '*'],
        body: [
          [
            {text: 'Canal de envio', style: 'tableHeader', fontSize: 10},
            {text: 'Origem de envio', style: 'tableHeader', fontSize: 10},
            {text: 'Mensagem Visualizada', style: 'tableHeader', fontSize: 10},
            {text: 'Data', style: 'tableHeader', fontSize: 10},
          ],
          ...content
        ]
      },
      layout: 'headerLineOnly'
    },
  ]

  function footerPage(currentPage: any, pageCount: any) {
    return [
      {
        text: currentPage + '/' + pageCount,
        alignment: 'right',
        fontSize: 9,
        margin: [0, 10, 20, 0]
      }
    ]
  }

  const docDefinitions = {
    header: '',
    content: details,
    footer: footerPage,
    margin: [15, 50, 15, 40],
    pageSize: 'A4',
  }

  pdfMake.createPdf(docDefinitions).download('historico-de-mensagens')
}