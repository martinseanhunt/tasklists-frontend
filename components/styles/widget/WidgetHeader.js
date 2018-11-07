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

  p {
    color: #9ea0a5;
    line-height: 1.57;
    margin: 8px 0 0 0;
  }

  ${({ notFixed }) => notFixed && `
    height: auto;
    padding: 23px 30px;
  `}
`

export default WidgetHeader