import styled from 'styled-components'

const Col = styled.div`
  margin: 0 15px;
  flex: 1;

  ${({fourth}) => fourth && `
    flex-basis: calc(25% - 30px);
    width: calc(25% - 30px);
    flex-shrink: 0;
    flex-grow: 0;
  `}
`

export default Col