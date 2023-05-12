import { styled } from '@/styles'

export const Container = styled('div', {
  width: '100%',
  padding: '$8',
})

export const LoadingContainer = styled('div', {
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

export const ModalContainer = styled('div', {
  top: 0,
  left: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'fixed',
  width: '100%',
  height: '100vh',
  zIndex: 2,
})

export const HistoryContainer = styled('div', {
  padding: '$5 $10',
  marginTop: '$10',
  backgroundColor: '$white',
  borderRadius: '$md',
  boxShadow: '0 1px 15px rgba(0,0,0,.04), 0 1px 6px rgba(0,0,0,.04)',
})

export const FilterContainer = styled('div', {
  display: 'flex',
  backgroundColor: '$gray200',
  border: '1px solid $gray400',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '$5',
  gap: '$3',

  '@media(max-width: 900px)': {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 0,
  }
})

export const FilterDateContainer = styled('div', {
  display: 'flex',
  backgroundColor: '$white',
  borderRadius: '2px',
  border: '1px solid $gray400',
  cursor: 'text',
  padding: '$2 $2',
  gap: '$3',
  marginTop: '$2',

  fontSize: '$xxs',
  color: '$gray500',
  marginBottom: '$2',

  input: {
    backgroundColor: '$white',
    borderRadius: '2px',
    border: '1px solid $gray400',
    padding: '$2',
  },

})

export const FilterDateItem = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$1',
})

export const FilterItem = styled('div', {

  button: {
    backgroundColor: '$gray400',
    borderRadius: '2px',
    border: '1px solid $gray500',
    padding: '$1',
    cursor: 'pointer',
  },

  'button:hover': {
    backgroundColor: '$gray500',
  },

})

export const TableContainer = styled('table', {
  width: '100%',
  tableLayout: 'fixed',
  justifyItems: 'center',
  borderCollapse: 'collapse',

  'thead th': {
    borderTop: '1px solid $gray300',
    borderBottom: '1px solid $gray300',
    padding: '$2 0',
    fontWeight: '500',
    fontSize: '$md',
    color: '$gray800',
  },

  'tbody td': {
    padding: '$2 0',
    borderTop: '1px solid $gray300',
    textAlign: 'center',
    fontSize: '$sm',
    color: '$gray800',
  },

  'tbody tr:hover': {
    backgroundColor: '$gray200',
    cursor: 'pointer',
  }
})

export const NoMessageContainer = styled('div', {
  margin: '$10 0',
  textAlign: 'center',
  fontSize: '$2xl',
})

export const ExportContainer = styled('div', {
  display: 'flex',
  marginBottom: '$1',
  gap: '$1',

  button: {
    cursor: 'pointer',
  }
})