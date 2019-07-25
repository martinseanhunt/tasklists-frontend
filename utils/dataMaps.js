export const dueTypeMap = {
  ASAP: 'ASAP',
  WHENPOSSIBLE: 'when possible',
  BYDATE: 'by ',
  ONDATE: 'on '
}

export const statusMap = {
  CREATED: 'Created',
  ASSIGNED: 'Assigned',
  AWAITINGINPUT: 'Awaiting Input',
  AWAITINGASSETS: 'Awaiting Assets',
  AWAITINGFEEDBACK: 'Awaiting Feedback',
  INPROGRESS: 'In Progress',
  COMPLETED: 'Completed', 
  CLOSED: 'Closed',
  CANCELLED: 'Cancelled'
}

export const statusColorMap = {
  CREATED: '#1665D8',
  ASSIGNED: '#6758F3',
  AWAITINGINPUT: '#F6AB2F',
  AWAITINGASSETS: '#E6492D',
  AWAITINGFEEDBACK: '#F6AB2F',
  INPROGRESS: '#FACF55',
  COMPLETED: '#34AA44', 
  CLOSED: '#000001',
  CANCELLED: '#000001'
}

export const priorityColorMap = {
  HIGH: '#FACF55',
  URGENT: '#E6492D'
}