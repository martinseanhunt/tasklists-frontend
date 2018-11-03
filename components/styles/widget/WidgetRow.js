import styled from 'styled-components'

const WidgetRow = styled.div`
  border-bottom: 1px solid #EAEDF3;
  padding: 20px 30px;

  ${({ modal }) => modal && `
    max-height: 70vh; 
    overflow: scroll;
  `}
`

export default WidgetRow