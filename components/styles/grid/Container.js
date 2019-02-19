import styled from 'styled-components'

const Container = styled.div`
  padding-top: ${({noPadd}) => noPadd ? '0' : '30px'};
  padding-left: 330px;
`

export default Container