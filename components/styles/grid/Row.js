import styled from 'styled-components'

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;

  ${({marginBottom}) => marginBottom && `
    margin-bottom: 30px;
  `}
`

export default Row