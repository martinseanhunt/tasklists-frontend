import styled from 'styled-components'

const WidgetFooter = styled.footer`
  height: 75px;
  padding: 0 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${({isForm}) => isForm && `
    height: auto;
    padding: 30px;
    display: block;
  `}

  ${({ formPadd }) => formPadd && `
    padding: 16px;
  `}
`

export default WidgetFooter