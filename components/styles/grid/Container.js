import styled from 'styled-components'

const Container = styled.div`
  max-width: 1140px;
  margin: 0 auto;
  padding-top: ${({noPadd}) => noPadd ? '0' : '30px'};
`

export default Container