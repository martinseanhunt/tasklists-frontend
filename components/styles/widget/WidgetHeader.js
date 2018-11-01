import styled from 'styled-components'

const WidgetHeader = styled.header`
  height: 75px;
  border-bottom: 1px solid #EAEDF3;
  padding: 0 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  h3 {
    padding: 0;
    margin: 0;
    color: #3e3f42;
    font-size: 1.8rem;
    font-weight: 500;
  }

  .close {
    background: none;
    border: none;
  }
`

export default WidgetHeader