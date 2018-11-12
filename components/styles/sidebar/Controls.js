import styled from 'styled-components'

const Controls = styled.div`
  display: flex;
  justify-content: space-between;

  button:first-child {
    flex: 1;
    margin-right: 10px;
  }

  button:last-child {
    flex: 2.2;
    margin-right: 0;
  }
`

export default Controls