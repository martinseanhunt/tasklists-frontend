import moment from 'moment'

export default (date) => {
  if (!date) return null
  if(moment().isAfter(date)) return '#E6492D'
  if(moment().diff(date, 'days') < 3) return '#F6AB2F'
  return null
}
