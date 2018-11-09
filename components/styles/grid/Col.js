import styled from 'styled-components'

const Col = styled.div`
  margin: 0 15px;
  flex: 1;
  
  ${({division}) => division === 'halves' && `
    flex-basis: calc(50% - 30px);
    width: calc(50% - 30px);
    flex-shrink: 0;
    flex-grow: 0;
  `}

  ${({division}) => division === 'fourths' && `
    flex-basis: calc(25% - 30px);
    width: calc(25% - 30px);
    flex-shrink: 0;
    flex-grow: 0;
  `}

  ${({division}) => division === 'thirds' && `
    flex-basis: calc(33.3% - 30px);
    width: calc(33.3% - 30px);
    flex-shrink: 0;
    flex-grow: 0;
  `}

`

export default Col