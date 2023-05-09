import { useEffect, useState } from 'react'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import DatePicker, { registerLocale } from 'react-datepicker'
import { CSVLink } from 'react-csv'
import ptBr from 'date-fns/locale/pt-BR'
import { FileXls, FilePdf } from 'phosphor-react'

import { api } from '@/services/api'
import { pdfExport } from '@/utils/pdfExport'

import { Modal } from './components/Modal'
import { Header } from './components/Header'
import { Select } from '../components/Select'
import { Loading } from '../components/Loading'
import { PageContainer } from '../components/PageContainer'
import { 
  Container, 
  ExportContainer, 
  FilterContainer, 
  FilterDateContainer, 
  FilterDateItem, 
  FilterItem, 
  HistoryContainer, 
  LoadingContainer, 
  ModalContainer, 
  NoMessageContainer, 
  TableContainer 
} from './styles'


registerLocale('ptBr', ptBr)

export interface IMessage {
  _id: string,
  userId: string,
  channel: string,
  date: Date,
  isSeen: boolean,
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


export default function MessagesHistory() {
  const [isLoadingData, setIsLoadingData] = useState(false)
  const [messagesData, setMessagesData] = useState<IMessage[]>()
  const [allMessagesData, setAllMessagesData] = useState<IMessage[]>()
  const [filterStartDate, setFilterStartDate] = useState(new Date())
  const [filterEndDate, setFilterEndDate] = useState(new Date())
  const [filterChannel, setFilterChannel] = useState('')
  const [filterOrigin, setFilterOrigin] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [modalData, setModalData] = useState<IMessage>({} as IMessage)

  const closeModal = () => {
    setShowModal(false)
  }

  useEffect( () => {
    setIsLoadingData(true)

    async function getWebPushData() {
      const { data } = await api.get('/messages/history')

      if (data?.messages) {
        setMessagesData(data.messages)
        setAllMessagesData(data.messages)
      }

    }

    getWebPushData()

    setIsLoadingData(false)
  }, [])


  function handleFilterMessages() {
    let filteredData: IMessage[] = []

    if (filterStartDate && filterEndDate) {
      // Set hours at the beginning of the day
      const startDateFormatted = new Date(new Date(filterStartDate).setHours(0,0,0,0))
      
      // Set hours at the end of the day
      const endDateFormatted = new Date(new Date(filterEndDate).setHours(23,59,59,59))
      
      filteredData = allMessagesData?.filter( (message) => {
        const messageDate = new Date(message.date)
        
        return (
          messageDate >= startDateFormatted && 
          messageDate <= endDateFormatted 
        )
      } ) as IMessage[]
    }

    if (filterChannel) {
      filteredData = filteredData.filter( message => message.channel === filterChannel )
    }
    
    if (filterOrigin) {
      filteredData = filteredData.filter( message => message.origin === filterOrigin)
    }
    
    setMessagesData(filteredData)
  }
  
  if (isLoadingData) {
    return (
      <PageContainer>
        <Container>
          <LoadingContainer>
            <Loading />
          </LoadingContainer>
        </Container>
      </PageContainer>
    )
  }
  
  const csvHeaders = [
    { label: 'Canal de envio', key: 'channel' },
    { label: 'Origem de envio', key: 'origin' },
    { label: 'Mensagem Visualizada', key: 'isSeen' },
    { label: 'Data', key: 'date' }
  ]
 
  return (
    <>
      <PageContainer>
        <Container>
          <Header title="Histórico de Mensagens" />
          <HistoryContainer>

            <ExportContainer>
              <button onClick={() => pdfExport(messagesData)}>
                <FilePdf size={20} fill='green' color='green'/>
              </button>

              <button>
                <CSVLink 
                  data={messagesData ? messagesData : []} 
                  headers={csvHeaders}
                  filename={'historico-de-mensagens.csv'}
                >
                  <FileXls size={20} fill='red' color='red'/>
                </CSVLink>
              </button>
            </ExportContainer>

            <FilterContainer>

              <FilterItem>
                <Select 
                  onChange={(event) => setFilterChannel(event.target.value)}
                  label='Canal'
                  selectOptions={[
                    {label: 'Email', value: 'email'},
                    {label: 'SMS', value: 'sms'},
                    {label: 'Web', value: 'webpush'},
                  ]}
                />
              </FilterItem>

              <FilterItem>
                <Select 
                  onChange={(event) => setFilterOrigin(event.target.value)}
                  label='Origem'
                  selectOptions={[
                    {label: 'Plataforma', value: 'platform'},
                    {label: 'API', value: 'api'}
                  ]}
                />
              </FilterItem>

              <FilterDateContainer>
                <FilterDateItem>
                  DATA INICIAL
                  <DatePicker
                    locale='ptBr'
                    dateFormat="dd/MM/yyyy"
                    selected={filterStartDate}
                    onChange={(date: Date) => setFilterStartDate(date)}
                    selectsStart
                    startDate={filterStartDate}
                    endDate={filterEndDate}
                  />
                </FilterDateItem>

                <FilterDateItem>
                  DATA FINAL
                  <DatePicker
                    locale='ptBr'
                    dateFormat="dd/MM/yyyy"
                    selected={filterEndDate}
                    onChange={(date: Date) => setFilterEndDate(date)}
                    selectsEnd
                    startDate={filterStartDate}
                    endDate={filterEndDate}
                    minDate={filterStartDate}
                  />
                </FilterDateItem>
              </FilterDateContainer>

              <FilterItem>
                <button onClick={() => handleFilterMessages()}>Filtrar</button>
              </FilterItem>
            </FilterContainer>

            {
              messagesData && messagesData.length >= 1 ?
                (
                  <TableContainer>
                    <thead>
                      <tr>
                        <th>Canal de envio</th>
                        <th>Origem de envio</th>
                        <th>Mensagem Visualizada</th>
                        <th>Data</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        messagesData &&
                    messagesData.map( (message: IMessage) => {
                      let date = new Date(message.date)
                      return (
                        <tr key={message._id} onClick={() => {
                          setModalData(message)
                          setShowModal(true)
                        }}>
                          <td>{message.channel}</td>
                          <td>{message.origin === 'platform' ? 'Plataforma' : message.origin}</td>
                          <td>{message.isSeen ? 'Sim' : 'Não'}</td>
                          <td>{date.toLocaleDateString()}</td> 
                        </tr>
                      )
                    } )
                      }
                    </tbody>
                  </TableContainer>
                ) :
                <NoMessageContainer>
                  <span>Não há mensagens</span>
                </NoMessageContainer>
            }

          </HistoryContainer>
        </Container>
      </PageContainer>
      {
        showModal && (
          <ModalContainer>
            <Modal 
              data={modalData}
              showModal={true}
              closeModal={closeModal}
            />
          </ModalContainer>
        )
      }
    </>
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